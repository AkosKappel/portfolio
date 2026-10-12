"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { type ContactStatus, contactSchema, createRateLimiter } from "@/lib/contact";

const isRateLimited = createRateLimiter(5, 10 * 60 * 1000);

/** Sends a contact form message by e-mail through the Resend API. */
export async function sendMessage(input: unknown): Promise<ContactStatus> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    // A filled honeypot gets the normal success answer, so bots learn nothing.
    const onlyHoneypot = parsed.error.issues.every((issue) => issue.path[0] === "website");
    return onlyHoneypot ? "sent" : "invalid";
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) return "limited";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return "failed";
  }

  const { name, email, message } = parsed.data;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n${name} <${email}>`,
    }),
  });

  if (!response.ok) {
    console.error(`Contact form: Resend answered ${response.status}`, await response.text());
    return "failed";
  }
  return "sent";
}
