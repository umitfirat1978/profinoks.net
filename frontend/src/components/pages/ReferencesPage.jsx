import React from "react";
import { referenceLogos } from "../../mock";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";

const ReferencesPage = () => {
    const { lang } = useLanguage();

    return (
        <div className="mt-[122px] md:pt-[130px] lg:pt-[140px] bg-[#050505] pb-20 text-white min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <header className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-amber-500">
                        {t(lang, "references.heading")}
                    </h1>
                    <p className="mt-4 text-white/60 text-sm">
                        {t(lang, "references.tagline")}
                    </p>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {referenceLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex aspect-video items-center justify-center rounded-lg bg-white p-6 shadow-sm transition-transform hover:scale-105"
                        >
                            <img
                                src={logo}
                                alt={`Reference logo ${index + 1}`}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReferencesPage;
