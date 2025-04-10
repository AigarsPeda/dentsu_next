// If using Pages Router (api/contact/contact.ts)
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ResponseData = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = req.body;

    const path = `/global`;
    const url =
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Missing API token",
      });
    }

    const strapiRes = await fetch(`${url}/api${path}?populate=emailsettings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Strapi response status:", strapiRes.status);

    if (!strapiRes.ok) {
      console.error("Failed to fetch email config:", await strapiRes.text());
      return res.status(500).json({
        success: false,
        message: "Failed to fetch email configuration",
      });
    }

    const configData = await strapiRes.json();
    const emailSettings = configData.data.attributes.emailsettings;

    if (!emailSettings) {
      return res.status(500).json({
        success: false,
        message: "Email settings not found",
      });
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
}
