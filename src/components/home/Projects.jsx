"use client";

import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "@/hooks/useTranslation";

import Link from "next/link";

function Projects() {
    const { t } = useTranslation();

    const projects = [
        { title: t('projects.items.project1.title'), category: t('projects.items.project1.category'), description: t('projects.items.project1.description'), image: t('projects.items.project1.image'), metrics: t('projects.items.project1.metrics'), link: t('projects.items.project1.link') },
        { title: t('projects.items.project2.title'), category: t('projects.items.project2.category'), description: t('projects.items.project2.description'), image: t('projects.items.project2.image'), metrics: t('projects.items.project2.metrics'), link: t('projects.items.project2.link') },
        { title: t('projects.items.project0.title'), category: t('projects.items.project0.category'), description: t('projects.items.project0.description'), image: t('projects.items.project0.image'), metrics: t('projects.items.project0.metrics'), link: t('projects.items.project0.link') },
    ];

    return (
        <section id='projects' className="container mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-6xl mx-auto">
                <Fade triggerOnce direction="up" cascade damping={0.1}>
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{t('projects.title')}</h2>
                        <p className="text-lg md:text-xl text-muted-foreground">{t('projects.subtitle')}</p>
                    </div>
                </Fade>

                <Fade triggerOnce cascade damping={0.15} delay={200}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {projects.map((project, index) => (
                            <div key={index} className="group relative" >
                                <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                                <div className="relative bg-background rounded-xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
                                    <div className="relative h-48 overflow-hidden bg-muted">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 right-3">
                                            <div className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium border border-border/50">
                                                {project.category}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <h3 className="font-semibold text-lg text-foreground">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                                        <div className="pt-3 border-t border-border/50">
                                            {/* <p className="text-sm font-medium text-primary">{project.metrics}</p> */}
                                            <Link href={project.link} target="_blank">
                                                <Button size="lg" variant="default" className="group w-full">
                                                    {t('projects.watch')}
                                                    <ExternalLink className="ml-2 h-4 w-4 " />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Fade>

                <Fade triggerOnce delay={400}>
                    <div className="text-center">
                        <a href='#contact'>
                            <Button size="lg" variant="outline" className="group">
                                {t('projects.cta')}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>
                    </div>
                </Fade>

            </div>
        </section>
    );
}

export default Projects;