import { Resend } from "resend";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.MAIL_API_KEY);

const MAX_MSG_LENGTH = 2000;
const MAX_SENDS_PER_WINDOW = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const sendLog = new Map();

function isRateLimited(userId) {
    const now = Date.now();
    const entries = sendLog.get(userId) ?? [];
    const fresh = entries.filter((t) => now - t < RATE_WINDOW_MS);
    if (fresh.length >= MAX_SENDS_PER_WINDOW) {
        sendLog.set(userId, fresh);
        return true;
    }
    fresh.push(now);
    sendLog.set(userId, fresh);
    return false;
}

export async function POST(req) {
    try {
        if (!process.env.MAIL_API_KEY) {
            return NextResponse.json({ ok: false, error: "MAIL_API_KEY is not set" }, { status: 500 });
        }

        const hdrs = await headers();
        const sess = await auth.api.getSession({ headers: hdrs });

        if (!sess?.user) {
            return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const { msg } = await req.json();
        const email = sess.user.email;
        const userId = sess.user.id ?? email;

        if (!email || typeof msg !== "string" || !msg.trim()) {
            return NextResponse.json(
                { ok: false, error: "Email and message are required" },
                { status: 400 }
            );
        }

        if (msg.trim().length > MAX_MSG_LENGTH) {
            return NextResponse.json(
                { ok: false, error: `Message must be under ${MAX_MSG_LENGTH} characters` },
                { status: 400 }
            );
        }

        if (userId && isRateLimited(userId)) {
            return NextResponse.json(
                { ok: false, error: "Too many messages — try again later" },
                { status: 429 }
            );
        }

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'skmahirashef04@gmail.com',
            subject: 'New Portfolio Message',
            replyTo: email,
            text: msg.trim(),
        });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Mail API error:", err);
        return NextResponse.json(
            { ok: false, error: "Failed to send email" },
            { status: 500 }
        );
    }
}

