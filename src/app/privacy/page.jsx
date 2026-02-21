"use client"

import React from "react"
import { useTranslation } from "@/hooks/useTranslation";

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="mx-auto max-w-3xl px-6 py-16">
            <h1 className="text-3xl font-semibold tracking-tight mb-6">
                {t('privacy.title')}
            </h1>

            <p className="text-sm text-muted-foreground mb-10">
                {t('privacy.lastUpdated')}: {new Date().toLocaleDateString("es-AR")}
            </p>

            <section className="space-y-6 text-sm leading-relaxed">
                <p>
                    En este sitio respetamos tu privacidad y nos comprometemos a proteger
                    los datos personales que compartís con nosotros, de conformidad con la
                    Ley N° 25.326 de Protección de los Datos Personales de la República
                    Argentina.
                </p>

                <div>
                    <h2 className="text-lg font-medium mb-2">
                        Información que recopilamos
                    </h2>
                    <p>
                        Podemos recopilar información básica de contacto, como nombre,
                        dirección de correo electrónico, número de teléfono u otros datos
                        similares, únicamente cuando el usuario los proporciona de manera
                        voluntaria a través de formularios, WhatsApp u otros medios de
                        comunicación.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-2">
                        Uso de la información
                    </h2>
                    <p>
                        La información recopilada se utiliza exclusivamente para:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Contactarnos con nuestros clientes</li>
                        <li>Responder consultas o solicitudes</li>
                        <li>Brindar información sobre nuestros servicios</li>
                        <li>Mejorar la comunicación y atención</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-2">
                        Compartición de datos
                    </h2>
                    <p>
                        No vendemos, alquilamos ni cedemos datos personales a terceros. La
                        información proporcionada es utilizada únicamente por el titular
                        del sitio para los fines mencionados anteriormente.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-2">
                        Seguridad de la información
                    </h2>
                    <p>
                        Adoptamos medidas técnicas y organizativas razonables para proteger
                        los datos personales contra accesos no autorizados, pérdida o uso
                        indebido.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-2">
                        Derechos del usuario
                    </h2>
                    <p>
                        El usuario tiene derecho a acceder, rectificar y eliminar sus datos
                        personales en cualquier momento. Para ejercer estos derechos, puede
                        contactarse a través de los medios indicados en este sitio.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-2">
                        Cambios en esta política
                    </h2>
                    <p>
                        Nos reservamos el derecho de modificar esta Política de Privacidad
                        en cualquier momento. Las modificaciones serán publicadas en esta
                        misma página.
                    </p>
                </div>

                <div className="pt-6 border-t">
                    <p className="text-xs text-muted-foreground">
                        El titular de los datos personales tiene la facultad de ejercer el
                        derecho de acceso a los mismos en forma gratuita a intervalos no
                        inferiores a seis meses, salvo que se acredite un interés legítimo
                        al efecto, conforme lo establecido en el artículo 14, inciso 3 de la
                        Ley N° 25.326.
                    </p>
                </div>
            </section>
        </div>
    )
}