"use client";

export type SendContactResult = { ok: true } | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(formData: FormData): Promise<SendContactResult> {
  const honeypot = String(formData.get("botcheck") ?? "");
  if (honeypot) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 1 || name.length > 120) {
    return { ok: false, error: "Name looks off. Try again." };
  }
  if (!EMAIL.test(email) || email.length > 200) {
    return { ok: false, error: "Email looks off. Try again." };
  }
  if (message.length < 1 || message.length > 4000) {
    return { ok: false, error: "Brief looks off. Try again." };
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { ok: false, error: "Contact is not configured yet." };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `Brief from ${name}`,
        from_name: "Portfolio contact",
      }),
    });
    const json = (await res.json()) as { success?: boolean; message?: string };
    if (!json.success) {
      return { ok: false, error: json.message ?? "Couldn’t send. Try email instead." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Couldn’t send. Try email instead." };
  }
}
