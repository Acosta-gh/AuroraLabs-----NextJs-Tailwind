import { NextResponse } from "next/server";

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

        if (!name || !email || !message) {
            return json({ error: "Todos los campos son requeridos.", code: "MISSING_FIELDS" }, 400);
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return json({ error: "Email inválido.", code: "INVALID_EMAIL" }, 400);
        }

        if (message.length < 10) {
            return json({ error: "El mensaje es muy corto.", code: "MESSAGE_TOO_SHORT" }, 400);
        }

        // Enviar email con Resend
        const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "AuroraLabs <noreply@auroralabs.com.ar>",
                to: "contact@auroralabs.com.ar",
                reply_to: email,
                subject: `Nueva consulta de ${name}`,
                html: `
                    <h2>Nueva consulta desde auroralabs.com.ar</h2>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p>${message.replace(/\n/g, "<br>")}</p>
                    <hr>
                    <small>Enviado el ${new Date().toLocaleString("es-AR")} desde IP ${clientIp}</small>
                `,
            }),
        });

        if (!emailRes.ok) {
            const err = await emailRes.text();
            console.error("Resend error:", err);
            return json({ error: "Error al enviar el email.", code: "EMAIL_ERROR" }, 500);
        }

        return json({ success: true, message: "¡Mensaje enviado!" }, 200);

    } catch (err) {
        console.error(err);
        return json({ error: "Error interno. Intentá de nuevo." }, 500);
    }
}