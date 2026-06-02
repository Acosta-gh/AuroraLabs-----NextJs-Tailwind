export const runtime = 'edge';

import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function json(data, status = 200) {
    return NextResponse.json(data, { status });
}

export async function OPTIONS() {
    return new NextResponse(null, { status: 204 });
}

export async function POST(request) {
    try {
        const clientIp =
            request.headers.get("CF-Connecting-IP") ||
            request.headers.get("x-forwarded-for") ||
            "unknown";

        const body = await request.json();
        const name = (body.name || "").trim();
        const email = (body.email || "").trim();
        const message = (body.message || "").trim();
        const lang = body.lang || "es";

        if (!name || !email || !message) {
            return json({ error: "Todos los campos son requeridos.", code: "MISSING_FIELDS" }, 400);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return json({ error: "Email inválido.", code: "INVALID_EMAIL" }, 400);
        }

        if (message.length < 10) {
            return json({ error: "El mensaje es muy corto.", code: "MESSAGE_TOO_SHORT" }, 400);
        }

        const { data, error } = await resend.emails.send({
            from: "AuroraLabs <noreply@mail.auroralabs.com.ar>",
            to: ["acosta@auroralabs.com.ar"],
            replyTo: email,
            subject: `Nueva consulta de ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}\nIP: ${clientIp}\nIdioma: ${lang}`,
        });

        if (error) {
            console.error("Resend error:", error);
            return json({ error: "Error al enviar el mensaje.", code: "EMAIL_ERROR", details: error }, 500);
        }

        return json({ success: true, message: "¡Mensaje enviado!" }, 200);

    } catch (err) {
        console.error(err);
        return json({ error: "Error interno. Intentá de nuevo." }, 500);
    }
}
