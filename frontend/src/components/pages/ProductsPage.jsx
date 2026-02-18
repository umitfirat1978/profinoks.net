import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { productGroups } from "../../mock";

const ProductsPage = () => {
    const { lang } = useLanguage();

    return (
        <div className="pt-[140px] bg-[#050505] min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-3xl font-semibold tracking-[0.2em] uppercase text-white mb-4">
                        {lang === "tr" ? "ÜRÜNLERİMİZ" : "PRODUCTS"}
                    </h1>
                    <div className="h-1 w-20 bg-primary"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {productGroups.map((group) => (
                        <div
                            key={group.id}
                            className="group relative overflow-hidden rounded-md border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-black/40">
                                <img
                                    src={group.imageUrl}
                                    alt={group.title}
                                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-sm font-semibold tracking-[0.1em] text-white uppercase mb-2 group-hover:text-primary transition-colors">
                                    {group.title}
                                </h3>
                                <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                                    {group.description}
                                </p>
                                <div className="mt-auto pt-4 flex items-center text-[10px] tracking-[0.2em] text-primary uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {lang === "tr" ? "İNCELE" : "VIEW DETAILS"} →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
