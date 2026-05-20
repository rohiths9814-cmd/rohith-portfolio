// ============================================================
// POST /api/payment/verify
// ============================================================
// Verifies payment status via direct Cashfree HTTP API call.
//
// CRITICAL: Never trust frontend-only confirmation!
// Always verify payment status server-side.
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// Cashfree API base URLs
const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

const API_VERSION = "2025-01-01";

export async function POST(req: NextRequest) {
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json(
        { success: false, message: "order_id is required" },
        { status: 400 }
      );
    }

    console.log(`🔍 Verifying payment for order: ${order_id}`);

    // Fetch order details from Cashfree API
    const response = await fetch(`${CASHFREE_BASE_URL}/orders/${order_id}`, {
      method: "GET",
      headers: {
        "x-client-id": process.env.CASHFREE_CLIENT_ID!,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET!,
        "x-api-version": API_VERSION,
      },
    });

    const orderData = await response.json();

    if (!response.ok) {
      console.error("❌ Cashfree API error:", orderData);
      return NextResponse.json(
        { success: false, message: orderData.message || "Verification failed" },
        { status: response.status }
      );
    }

    console.log(`📋 Order status: ${orderData.order_status}`);

    // Cashfree statuses: PAID, ACTIVE, EXPIRED, TERMINATED
    const isPaid = orderData.order_status === "PAID";

    return NextResponse.json({
      success: true,
      verified: isPaid,
      order_status: orderData.order_status,
      order_id: orderData.order_id,
      order_amount: orderData.order_amount,
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("❌ Error verifying payment:", err.message);
    return NextResponse.json(
      { success: false, message: "Failed to verify payment." },
      { status: 500 }
    );
  }
}
