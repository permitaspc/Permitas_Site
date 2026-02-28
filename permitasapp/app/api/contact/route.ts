import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// --- 1. Validation Schema (Zod) ---
// Enforces strict data types and sanitizes input to prevent injections.
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Invalid email address").trim(),
  phone: z.string().optional(),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(5000, "Message is too long")
    .trim(),
});

// --- 2. Vercel-Compatible Rate Limiting (In-Memory) ---
// Note: On Vercel Free Tier, this resets on cold starts.
// It is sufficient to prevent rapid-fire bot attacks on a single hot instance.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 requests per IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true; // Allowed
  }

  // If window has passed, reset the counter
  if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true; // Allowed
  }

  // If within window, check count
  if (record.count >= RATE_LIMIT_MAX) {
    return false; // Rate limited
  }

  // Increment count
  record.count += 1;
  return true; // Allowed
}

// --- 3. Main POST Handler ---
export async function POST(request: Request) {
  try {
    // A. Rate Limiting Check
    // Extract IP safely (Vercel uses x-forwarded-for)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    if (!checkRateLimit(ip)) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 },
      );
    }

    // B. Parse Request Body
    const body = await request.json();

    // C. Validation (Zod)
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      console.warn(
        "[Contact API] Validation failed:",
        validationResult.error.flatten(),
      );
      // Only return the first error message for simplicity on the frontend
      const firstError =
        Object.values(validationResult.error.flatten().fieldErrors)[0]?.[0] ||
        "Invalid input data.";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 },
      );
    }

    const validData = validationResult.data;
    console.log(
      `[Contact API] Processing valid submission from: ${validData.email}`,
    );

    // D. Transport Configuration (Nodemailer)
    // Avoid hardcoding by pulling strictly from environment variables
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const receiverEmail = process.env.RECEIVER_EMAIL;

    if (!smtpEmail || !smtpPassword || !receiverEmail) {
      console.error(
        "[Contact API] Missing Critical SMTP Environment Variables",
      );
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error. Please contact support.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // E. Construct Email Logic
    const mailOptions = {
      from: `"Permitas Website" <${smtpEmail}>`,
      to: receiverEmail,
      replyTo: validData.email, // Allows you to hit "Reply" in your inbox
      subject: `New Contact Inquiry from ${validData.name}`,
      text: `
Name: ${validData.name}
Email: ${validData.email}
Phone: ${validData.phone || "Not provided"}

Message:
${validData.message}
      `,
      // Basic HTML version for better readability in modern clients
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #333;">New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${validData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${validData.email}">${validData.email}</a></p>
          <p><strong>Phone:</strong> ${validData.phone || "Not provided"}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #555;">Message:</h3>
          <p style="white-space: pre-wrap; color: #444; line-height: 1.6;">${validData.message}</p>
        </div>
      `,
    };

    // F. Execute Delivery
    console.log("[Contact API] Attempting to send email via SMTP...");
    await transporter.sendMail(mailOptions);
    console.log("[Contact API] Email sent successfully!");

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Contact API] Fatal Server Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
