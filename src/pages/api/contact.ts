import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, redirect }) => {
  // Errors send the visitor back to the form (Contact.astro shows the message)
  const fail = (reason: "invalid" | "failed") =>
    redirect(`/?contact=${reason}#contact`, 303);

  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString()?.trim();
    const email = formData.get("email")?.toString()?.trim();
    const message = formData.get("message")?.toString()?.trim();
    const botcheck = formData.get("botcheck");

    // Silently drop spam submissions detected by honeypot
    if (botcheck) {
      return redirect("/success", 303);
    }

    // Validate inputs (limits mirror the form's maxlength attributes)
    if (
      !name ||
      !email ||
      !message ||
      name.length > 100 ||
      email.length > 150 ||
      message.length > 2500 ||
      !EMAIL_RE.test(email)
    ) {
      return fail("invalid");
    }

    const accessKey =
      import.meta.env.WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not configured");
      return fail("failed");
    }

    const response = await fetch("https://api.web3forms.com/submit", {
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
        from_name: "Portfolio Contact Form",
        subject: `New Portfolio Message from ${name}`,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return redirect("/success", 303);
    }

    console.error("Web3Forms error:", result);
    return fail("failed");
  } catch (error) {
    console.error("Contact API error:", error);
    return fail("failed");
  }
};
