"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";
import { useInView } from "@/hooks/useInView";

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const { t } = useTranslation();
    const [titleRef, titleInView] = useInView();

    const faqs = [
        { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
        { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
        { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
        { question: t('faq.q4.question'), answer: t('faq.q4.answer') },
        { question: t('faq.q5.question'), answer: t('faq.q5.answer') },
        { question: t('faq.q6.question'), answer: t('faq.q6.answer') },
        { question: t('faq.q7.question'), answer: t('faq.q7.answer') },
    ];

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden bg-muted/30">
            <div className="container mx-auto px-6 relative">
                <div className="max-w-3xl mx-auto">

                    <div ref={titleRef} className={`text-center space-y-4 mb-16 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">{t('faq.title')}</h2>
                        <p className="text-lg md:text-xl text-muted-foreground">{t('faq.subtitle')}</p>
                    </div>

                    <div className={`space-y-3 transition-all duration-700 delay-200 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-background rounded-xl border border-border/50 overflow-hidden hover:border-border transition-all duration-300 shadow-sm">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-muted/50 transition-colors"
                                >
                                    <span className="font-semibold text-lg text-foreground pr-4">{faq.question}</span>
                                    <ChevronDown className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                                        <div className="h-px bg-border/50 mb-4" />
                                        <p className="text-muted-foreground leading-relaxed text-base">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FAQ;