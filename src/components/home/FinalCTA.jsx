"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function FinalCTA() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const phone = "5492926501348";
    const message = t("hero.whatsappMessage");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorMap = {
                    RATE_LIMIT:      { title: t('finalCta.modal.rateLimitTitle'),      text: t('finalCta.modal.rateLimitText') },
                    MISSING_FIELDS:  { title: t('finalCta.modal.missingFieldsTitle'),  text: t('finalCta.modal.missingFieldsText') },
                    INVALID_EMAIL:   { title: t('finalCta.modal.invalidEmailTitle'),   text: t('finalCta.modal.invalidEmailText') },
                    MESSAGE_TOO_SHORT:{ title: t('finalCta.modal.messageTooShortTitle'),text: t('finalCta.modal.messageTooShortText') },
                };
                setError(errorMap[data.code] || { title: t('finalCta.modal.errorTitle'), text: t('finalCta.modal.errorText') });
            }
        } catch {
            setError({ title: t('finalCta.modal.errorTitle'), text: t('finalCta.modal.errorText') });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        setIsModalOpen(true);
    };

    return (
        <section id='contact' className="py-20 lg:py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-purple-500/5 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative">
                <Fade triggerOnce direction="up" duration={800} cascade damping={0.1}>
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{t('finalCta.title')}</h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t('finalCta.subtitle')}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="group">
                                    <FaWhatsapp className="h-5 w-5 mr-2" />
                                    {t("hero.whatsapp")}
                                </Button>
                            </a>
                            <Button size="lg" variant="outline" className="group" onClick={handleOpenModal}>
                                <Mail className="mr-2 h-5 w-5" />
                                {t('finalCta.email')}
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                            {t('finalCta.emailFallback')}{" "}
                            <a href="mailto:contact@auroralabs.com.ar" className="underline hover:text-foreground transition-colors">contact@auroralabs.com.ar</a>
                        </p>
                        <div className="pt-8">
                            <p className="text-sm text-muted-foreground">{t('finalCta.response')}</p>
                        </div>
                    </div>
                </Fade>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">{t('finalCta.modal.title')}</DialogTitle>
                        <DialogDescription>{t('finalCta.modal.description')}</DialogDescription>
                    </DialogHeader>
                    {submitted ? (
                        <div className="text-center py-8 space-y-3">
                            <div className="text-4xl">✉️</div>
                            <p className="font-semibold text-lg">{t('finalCta.modal.successTitle')}</p>
                            <p className="text-sm text-muted-foreground">{t('finalCta.modal.successText')}</p>
                            <Button variant="outline" className="mt-4" onClick={() => setIsModalOpen(false)}>{t('finalCta.modal.close')}</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">{t('finalCta.modal.nameLabel')}</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder={t('finalCta.modal.namePlaceholder')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">{t('finalCta.modal.emailLabel')}</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder={t('finalCta.modal.emailPlaceholder')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">{t('finalCta.modal.messageLabel')}</label>
                                <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder={t('finalCta.modal.messagePlaceholder')} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>{t('finalCta.modal.cancel')}</Button>
                                <Button type="submit" className="flex-1" disabled={loading}>
                                    {loading ? <span className="animate-pulse">{t('finalCta.modal.sending')}</span> : <><Mail className="mr-2 h-4 w-4" />{t('finalCta.modal.send')}</>}
                                </Button>
                            </div>
                            {error && (
                                <div className="text-sm text-red-500 text-center">
                                    <p className="font-medium">{error.title}</p>
                                    <p>{error.text}</p>
                                </div>
                            )}
                            <p className="text-xs text-muted-foreground text-center">{t('finalCta.modal.disclaimer')}</p>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}

export default FinalCTA;