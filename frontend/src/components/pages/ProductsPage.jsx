import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { productGroups } from "../../mock";
import CategorySidebar from "../layout/CategorySidebar";
import { ChevronRight, Home } from "lucide-react";

const ProductsPage = () => {
    const { lang } = useLanguage();

    return (
        <div className="pt-[140px] bg-[#f5f5f5] min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-black/5 py-4 mb-8">
                <div className="mx-auto max-w-7xl px-4 flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                    <Link to="/" className="hover:text-primary flex items-center">
                        {lang === "tr" ? "ANASAYFA" : "MAIN PAGE"}
                    </Link>
                    <ChevronRight size={12} className="text-gray-400" />
                    <span className="text-primary">
                        {lang === "tr" ? "ÜRÜNLER" : "PRODUCTS"}
                    </span>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Sidebar */}
                    <CategorySidebar />

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {productGroups.map((group) => (
                                <Link
                                    key={group.id}
                                    to={`/products/${group.slug}`}
                                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-6 text-center border border-gray-100"
                                >
                                    <div className="aspect-square w-full mb-6 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={group.imageUrl}
                                            alt={group.title}
                                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-[13px] font-bold tracking-wider text-gray-800 uppercase group-hover:text-primary transition-colors">
                                        {group.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
