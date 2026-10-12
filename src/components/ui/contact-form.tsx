"use client";

import { useForm } from "@tanstack/react-form";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { sendMessage } from "@/app/[locale]/contact/actions";
import { type ContactStatus, contactSchema } from "@/lib/contact";

const fields = [
  { name: "name", type: "text", autoComplete: "name" },
  { name: "email", type: "email", autoComplete: "email" },
  { name: "message", type: "textarea", autoComplete: "off" },
] as const;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<ContactStatus | null>(null);

  const form = useForm({
    defaultValues: { name: "", email: "", message: "", website: "" },
    // Validating on every change lets errors clear as soon as a field is fixed.
    validators: { onChange: contactSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        const result = await sendMessage(value);
        setStatus(result);
        if (result === "sent") formApi.reset();
      } catch {
        setStatus("failed");
      }
    },
  });

  return (
    <form
      noValidate
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      {fields.map(({ name, type, autoComplete }) => (
        <form.Field key={name} name={name}>
          {(field) => {
            const { meta } = field.state;
            const shown = meta.isBlurred || field.form.state.submissionAttempts > 0;
            const error = shown ? meta.errors[0] : undefined;
            const id = `contact-${field.name}`;
            const errorId = `${id}-error`;
            const props = {
              id,
              name: field.name,
              value: field.state.value,
              autoComplete,
              required: true,
              "aria-invalid": error ? true : undefined,
              "aria-describedby": error ? errorId : undefined,
              onBlur: field.handleBlur,
              className:
                "w-full rounded-lg border border-line bg-surface px-4 py-2.5 transition-colors hover:border-ink/40 aria-invalid:border-red-600 dark:aria-invalid:border-red-400",
            };
            return (
              <div>
                <label htmlFor={id} className="mb-1.5 block font-medium">
                  {t(name)}
                </label>
                {type === "textarea" ? (
                  <textarea
                    {...props}
                    rows={6}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                ) : (
                  <input
                    {...props}
                    type={type}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
                {error ? (
                  <p id={errorId} className="mt-1.5 text-sm text-red-700 dark:text-red-300">
                    {t(`errors.${error.message}` as Parameters<typeof t>[0])}
                  </p>
                ) : null}
              </div>
            );
          }}
        </form.Field>
      ))}

      {/* Honeypot: off screen and skipped by keyboard and screen readers. */}
      <form.Field name="website">
        {(field) => (
          <input
            aria-hidden
            tabIndex={-1}
            autoComplete="off"
            name={field.name}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            className="absolute -left-[9999px] size-px opacity-0"
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 justify-self-start rounded-full bg-accent px-5 py-2.5 font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <Send aria-hidden size={18} />
            {isSubmitting ? t("sending") : t("send")}
          </button>
        )}
      </form.Subscribe>

      <div aria-live="polite">
        {status === "sent" ? (
          <p className="flex items-center gap-2 text-green-800 dark:text-green-300">
            <CircleCheck aria-hidden size={18} />
            {t("sent")}
          </p>
        ) : status ? (
          <p className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <CircleAlert aria-hidden size={18} />
            {t(status)}
          </p>
        ) : null}
      </div>
    </form>
  );
}
