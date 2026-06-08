import { NextRequest, NextResponse } from "next/server";

let resend: any = null;

// Lazy load Resend to avoid errors if API key is missing
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    const { Resend } = require("resend");
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

interface ContactRequest {
  name: string;
  from_email: string;
  message: string;
}

function validateContactRequest(data: unknown): {
  valid: boolean;
  error?: string;
} {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const req = data as Record<string, unknown>;
  const name = String(req.name || "").trim();
  const from_email = String(req.from_email || "").trim();
  const message = String(req.message || "").trim();

  // Check required fields
  if (!name || !from_email || !message) {
    return { valid: false, error: "Missing required fields" };
  }

  // Validate name length
  if (name.length < 2 || name.length > 100) {
    return { valid: false, error: "Name must be between 2 and 100 characters" };
  }

  // Validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(from_email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Validate message length
  if (message.length < 2 || message.length > 5000) {
    return {
      valid: false,
      error: "Message must be between 2 and 5000 characters",
    };
  }

  // Basic spam detection
  const spamKeywords = [
    "viagra",
    "cialis",
    "casino",
    "lottery",
    "prize",
    "click here now",
    "act now",
    "limited time",
    "buy now",
    "free money",
  ];
  const messageLower = message.toLowerCase();
  const spamCount = spamKeywords.filter((keyword) =>
    messageLower.includes(keyword)
  ).length;

  if (spamCount >= 3) {
    return { valid: false, error: "Message contains suspicious content" };
  }

  // Check for excessive links
  const urlPattern =
    /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/g;
  const urlsFound = message.match(urlPattern) || [];
  if (urlsFound.length > 5) {
    return { valid: false, error: "Message contains too many links" };
  }

  // Check for excessive special characters
  const specialCharCount = (message.match(/[^a-zA-Z0-9\s]/g) || []).length;
  const specialCharRatio = specialCharCount / message.length;
  if (specialCharRatio > 0.3) {
    return {
      valid: false,
      error: "Message contains too many special characters",
    };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request
    const validation = validateContactRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { status: 400, message: validation.error },
        { status: 400 }
      );
    }

    const { name, from_email, message } = body as ContactRequest;

    // Check if Resend API key is configured
    const resendClient = getResend();
    if (!resendClient) {
      // Log the contact form data for manual processing
      console.log("Contact form submitted - Resend API key not configured", {
        name,
        from_email,
        message,
        timestamp: new Date().toISOString(),
      });
      
      return NextResponse.json(
        { 
          status: 503, 
          message: "Email service temporarily unavailable. Please try again later or email brandonflowers@gmail.com directly."
        },
        { status: 503 }
      );
    }

    // Send email via Resend
    const contactEmail = process.env.CONTACT_EMAIL || "brandonflowers@gmail.com";

    const emailResponse = await resendClient.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: from_email,
      subject: `Contact form submission from ${from_email}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(from_email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return NextResponse.json(
        { status: 500, message: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "success",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
