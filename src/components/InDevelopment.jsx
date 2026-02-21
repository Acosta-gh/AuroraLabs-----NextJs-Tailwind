"use client";

import { Construction, Hammer } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

function InDevelopment({ constructionProgress = 65 }) {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="relative bg-primary/10 p-6 rounded-full border border-primary/20">
                            <Construction className="w-16 h-16 text-primary" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                        {t('inDevelopment.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
                        {t('inDevelopment.description')}
                    </p>
                </div>

                {/* Progress indicator */}
                <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Hammer className="w-4 h-4 animate-pulse" />
                        <span>{t('inDevelopment.progress')}</span>
                    </div>
                    <div className="max-w-xs mx-auto h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full animate-pulse"
                            style={{ width: `${constructionProgress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-8 text-sm text-muted-foreground">
                    <p>{t('inDevelopment.footer')}</p>
                </div>
            </div>
        </div>
    );
}

export default InDevelopment;