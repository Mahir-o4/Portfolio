import { Resend } from "resend";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.MAIL_API_KEY);

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

        if (!email || !msg) {
            return NextResponse.json(
                { ok: false, error: "Email and message are required" },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'skmahirashef04@gmail.com',
            subject: 'New Portfolio Message',
            replyTo: email,
            text: msg,
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

