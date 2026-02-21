"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

import Link from 'next/link';
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 px-6 relative bottom-20">
                <h1 className="text-8xl md:text-9xl font-bold text-primary">
                    404
                </h1>

                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        {t('notFound.title')}
                    </h2>
                    <p className="text-muted-foreground">
                        {t('notFound.description')}
                    </p>
                </div>

                <Button size="lg" asChild className="mt-8">
                    {/* Cambiamos 'to' por 'href' */}
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        {t('notFound.backHome')}
                    </Link>
                </Button>
            </div>
        </div>
    );
}