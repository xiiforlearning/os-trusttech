import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    console.log("Contact form submission:", { name, email });

    const botToken = "8145934463:AAHiZz-YznSSaSUgRcrPR7CjIzWiFymdP0k";
    const chatId = "8039409077";
    const message = `
New Form Submission:
Name: ${name}
Email: ${email}
Phone: ${phone}
    `;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    // 🔥 CORRECT REDIRECT
    return Response.redirect(new URL("/", request.url), 303);
  } catch (error) {
    console.error("Error processing contact form:", error);

    return Response.redirect(new URL("/", request.url), 303);
  }
}
