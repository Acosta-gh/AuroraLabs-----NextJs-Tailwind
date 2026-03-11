"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center space-y-6 px-6 relative bottom-20">
                <h1 className="text-8xl md:text-9xl font-bold text-primary">
                    404
                </h1>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                            Página no encontrada
                        </h2>
                        <p className="text-muted-foreground">
                            La página que buscás no existe.
                        </p>
                    </div>

                    <div className="pt-2 space-y-1 border-t border-border/50">
                        <h2 className="text-xl md:text-2xl font-medium text-foreground/80">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground/80 text-sm">
                            The page you are looking for does not exist.
                        </p>
                    </div>
                </div>

                <Button size="lg" asChild className="mt-8">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Volver al Inicio / Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}