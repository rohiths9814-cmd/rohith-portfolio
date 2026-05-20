// ============================================================
// POST /api/payment/create-order
// ============================================================
// Creates a Cashfree payment order via direct HTTP API call.
// We bypass the cashfree-pg SDK to avoid Next.js webpack
// bundling issues with static methods.
//
// This runs SERVER-SIDE only — secret keys are never exposed.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Cashfree API base URLs
const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

const API_VERSION = "2025-01-01";

export async function POST(req: NextRequest) {
  try {
    // Parse optional customer details from request body
    const body = await req.json().catch(() => ({}));
    const customerName = body.name || "Supporter";
    const customerEmail = body.email || "supporter@example.com";

    // Generate a unique order ID
    const orderId = `order_${Date.now()}_${crypto
      .randomBytes(3)
      .toString("hex")}`;

    // Build the order request for Cashfree
    const orderPayload = {
      order_amount: 10, // ₹10 fixed amount
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_phone: "9999999999",
        customer_name: customerName,
        customer_email: customerEmail,
      },
    };

    console.log(`📦 Creating order: ${orderId}`);

    // Trim env vars to strip hidden whitespace/carriage returns
    const clientId = (process.env.CASHFREE_CLIENT_ID || "").trim();
    const clientSecret = (process.env.CASHFREE_CLIENT_SECRET || "").trim();

    console.log(`🔑 Client ID: ${clientId.substring(0, 8)}... (${clientId.length} chars)`);
    console.log(`🌐 API URL: ${CASHFREE_BASE_URL}/orders`);

    // Call Cashfree API directly
    const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
        "x-api-version": API_VERSION,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Cashfree API error:", data);
      return NextResponse.json(
        { success: false, message: data.message || "Cashfree API error" },
        { status: response.status }
      );
    }

    console.log(`✅ Order created: ${data.order_id}`);

    // Determine mode for frontend SDK (must match backend)
    const mode =
      process.env.CASHFREE_ENV === "PRODUCTION" ? "production" : "sandbox";

    return NextResponse.json({
      success: true,
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
      mode,
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("❌ Error creating order:", err.message);
    return NextResponse.json(
      { success: false, message: "Failed to create payment order." },
      { status: 500 }
    );
  }
}
