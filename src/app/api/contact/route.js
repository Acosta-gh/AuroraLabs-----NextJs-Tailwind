// app/api/contact/route.js
// En lugar de llamar a Resend directamente, guardamos el contacto en PocketBase.
// PocketBase se encarga de enviar el email via su hook interno.

export const runtime = 'edge';

import { NextResponse } from "next/server";

const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://api.auroralabs.com.ar";

function json(data, status = 200) {
    return NextResponse.json(data, { status });
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}

export async function POST(request) {
    try {
        // ── Leer IP del cliente ──────────────────────────────────────────────
        const clientIp =
            request.headers.get("CF-Connecting-IP") ||
            request.headers.get("x-forwarded-for") ||
            "unknown";

        // ── Validar campos ───────────────────────────────────────────────────
        const body = await request.json();
        const name = (body.name || "").trim();
        const email = (body.email || "").trim();
        const message = (body.message || "").trim();

        if (!name || !email || !message) {
            return json({ error: "Todos los campos son requeridos.", code: "MISSING_FIELDS" }, 400);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return json({ error: "Email inválido.", code: "INVALID_EMAIL" }, 400);
        }

        if (message.length < 10) {
            return json({ error: "El mensaje es muy corto.", code: "MESSAGE_TOO_SHORT" }, 400);
        }

        // ── Guardar en PocketBase (colección "contacts") ─────────────────────
        // El hook de PocketBase se dispara automáticamente después de este POST.
        const pbRes = await fetch(`${POCKETBASE_URL}/api/collections/contacts/records`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                message,
                ip: clientIp,
                sent_at: new Date().toISOString(),
                lang: body.lang || "en",
            }),
        });

        if (!pbRes.ok) {
            let errorMsg = "Error al guardar la consulta.";
            let pbError = {};

            try {
                pbError = await pbRes.json();
                errorMsg = pbError.message || errorMsg;
                console.error("PocketBase error:", pbError);
            } catch (e) {
                const errText = await pbRes.text();
                console.error("PocketBase raw error:", errText);
            }

            return json({
                error: errorMsg,
                code: "DB_ERROR",
                details: pbError
            }, pbRes.status === 400 || pbRes.status === 403 ? pbRes.status : 500);
        }

        return json({ success: true, message: "¡Mensaje enviado!" }, 200);

    } catch (err) {
        console.error(err);
        return json({ error: "Error interno. Intentá de nuevo." }, 500);
    }
}