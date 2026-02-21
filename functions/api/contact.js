function getCorsHeaders(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = env.ALLOWED_ORIGINS
        ? env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
        : ["http://localhost:5173"];
    const allowedOrigin = allowedOrigins.find((a) => origin.startsWith(a));
    return {
        "Access-Control-Allow-Origin": allowedOrigin || allowedOrigins[0],
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}

function json(data, status = 200, cors = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", ...cors },
    });
}

export async function onRequestOptions({ request, env }) {
    return new Response(null, { status: 204, headers: getCorsHeaders(request, env) });
}

export async function onRequestPost({ request, env }) {
    const cors = getCorsHeaders(request, env);

    try {
        const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";

        // Rate limiting
        const rateLimitKey = `ratelimit-${clientIp}`;
        const attempts = await env.CONTACT_SUBMISSIONS.get(rateLimitKey);
        if (attempts && parseInt(attempts) >= 5) {
            return json({ error: "Demasiadas solicitudes. Intentá de nuevo en un minuto.", code: "RATE_LIMIT" }, 429, cors);
        }
        await env.CONTACT_SUBMISSIONS.put(rateLimitKey, String((parseInt(attempts) || 0) + 1), {
            expirationTtl: 60,
        });

        const body = await request.json();
        const name = (body.name || "").trim();
        const email = (body.email || "").trim();
        const message = (body.message || "").trim();

        if (!name || !email || !message) {
            return json({ error: "Todos los campos son requeridos.", code: "MISSING_FIELDS" }, 400, cors);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return json({ error: "Email inválido.", code: "INVALID_EMAIL" }, 400, cors);
        }
        if (message.length < 10) {
            return json({ error: "El mensaje es muy corto.", code: "MESSAGE_TOO_SHORT" }, 400, cors);
        }

        // Guardar en KV
        const id = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const submission = {
            id, name, email: email.toLowerCase(), message,
            timestamp: new Date().toISOString(),
            ip: clientIp,
        };
        await env.CONTACT_SUBMISSIONS.put(id, JSON.stringify(submission), {
            expirationTtl: 90 * 24 * 60 * 60,
        });

        // Enviar email con Resend
        const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'AuroraLabs <noreply@auroralabs.com.ar>',
                to: 'contact@auroralabs.com.ar',
                reply_to: email,
                subject: `Nueva consulta de ${name}`,
                html: `
          <h2>Nueva consulta desde auroralabs.com.ar</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <small>Enviado el ${new Date().toLocaleString('es-AR')} desde IP ${clientIp}</small>
        `,
            }),
        });

        if (!emailRes.ok) {
            console.error('Resend error:', await emailRes.text());
            // El mensaje igual quedó guardado en KV, no fallamos por esto
        }

        return json({ success: true, message: "¡Mensaje enviado!" }, 200, cors);

    } catch (err) {
        console.error(err);
        return json({ error: "Error interno. Intentá de nuevo." }, 500, cors);
    }
}