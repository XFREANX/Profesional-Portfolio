import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
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

    // Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const accessKey =
      import.meta.env.WEB3FORMS_ACCESS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY ||
      "4524cf7f-589e-4fdc-a142-82649120a132";

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
    } else {
      console.error("Web3Forms error:", result);
      return new Response(
        JSON.stringify({ error: result.message || "Failed to send message" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

