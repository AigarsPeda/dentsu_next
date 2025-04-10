// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  console.log("Received request");

  try {
    const body = await request.json();
    console.log("Form submission:", body);

    // Fetch email settings from Strapi
    const path = `/global`;
    const url =
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Missing API token" },
        { status: 500 }
      );
    }

    const strapiRes = await fetch(`${url}/api${path}?populate=emailsettings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!strapiRes.ok) {
      console.error("Failed to fetch email config:", await strapiRes.text());
      return NextResponse.json(
        { success: false, message: "Failed to fetch email configuration" },
        { status: 500 }
      );
    }

    const configData = await strapiRes.json();
    const emailSettings = configData.data.attributes.emailsettings;

    if (!emailSettings) {
      return NextResponse.json(
        { success: false, message: "Email settings not found" },
        { status: 500 }
      );
    }

    console.log("Email settings found:", {
      host: emailSettings.host,
      email: emailSettings.email,
    });

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: emailSettings.host || "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailSettings.email,
        pass: emailSettings.password,
      },
    });

    // Format email content nicely
    const emailText = Object.entries(body)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n\n");

    // Send email
    await transporter.sendMail({
      from: `"DENTSU WEBSITE Contact form" <${"dentsu website"}>`, // sender address
      to: emailSettings.email, // You might want to make this configurable in Strapi too
      subject: "DENTSU WEBSITE Contact form",
      text: emailText,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>DENTSU WEBSITE</h2>
        <div style="margin-top: 20px;">
          ${Object.entries(body)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join("")}
        </div>
      </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
