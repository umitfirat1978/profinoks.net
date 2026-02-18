import React from "react";
import { referenceLogos } from "../../mock";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";

const ReferencesPage = () => {
    const { lang } = useLanguage();

    return (
        <div className="mt-[122px] md:pt-[130px] lg:pt-[140px] bg-background pb-20 text-foreground min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <header className="mb-12 border-b border-black/10 pb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-primary">
                        {t(lang, "references.heading")}
                    </h1>
                    <p className="mt-4 text-muted-foreground text-sm">
                        {t(lang, "references.tagline")}
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {referenceLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex h-48 items-center justify-center rounded-lg bg-white p-8 shadow-sm transition-transform hover:scale-105 border border-black/5"
                        >
                            <img
                                src={logo}
                                alt={`Reference logo ${index + 1}`}
                                className="max-h-32 max-w-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReferencesPage;
