import { z } from "zod";

// Error messages are keys in "contact.form.errors", translated on the client.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "nameRequired").max(100, "nameTooLong"),
  email: z.email("emailInvalid"),
  message: z.string().trim().min(10, "messageTooShort").max(5000, "messageTooLong"),
  /** Honeypot: hidden from people, so only bots fill it in. */
  website: z.string().max(0),
});

export type ContactMessage = z.infer<typeof contactSchema>;

export type ContactStatus = "sent" | "invalid" | "limited" | "failed";

/**
 * Allows `limit` hits per key within `windowMs`. State lives in memory, so on
 * serverless hosting each warm instance counts on its own: enough to stop a
 * script hammering one instance, not a distributed flood.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string, now = Date.now()) => {
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
    const limited = recent.length >= limit;
    if (!limited) recent.push(now);
    hits.set(key, recent);
    return limited;
  };
}
