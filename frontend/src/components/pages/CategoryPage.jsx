import React from "react";
import { useParams, Link } from "react-router-dom";
import { productGroups } from "../../mock";
import { categoryProducts } from "../../data/categoryProducts";
import { useLanguage } from "../../contexts/LanguageContext";
import CategorySidebar from "../layout/CategorySidebar";
import { ChevronRight, Home } from "lucide-react";

const CategoryPage = () => {
    const { slug } = useParams();
    const { lang } = useLanguage();

    const category = productGroups.find((group) => group.slug === slug);
    const products = categoryProducts[slug] || [];

    if (!category) {
        return (
            <div className="pt-[140px] bg-background min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
                <Link to="/products" className="text-primary hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-[140px] bg-[#f5f5f5] min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-black/5 py-4 mb-8">
                <div className="mx-auto max-w-7xl px-4 flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                    <Link to="/" className="hover:text-primary">
                        {lang === "tr" ? "ANASAYFA" : "MAIN PAGE"}
                    </Link>
                    <ChevronRight size={12} className="text-gray-400" />
                    <Link to="/products" className="hover:text-primary">
                        {lang === "tr" ? "ÜRÜNLER" : "PRODUCTS"}
                    </Link>
                    <ChevronRight size={12} className="text-gray-400" />
                    <span className="text-primary">{category.title}</span>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Sidebar */}
                    <CategorySidebar />

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/products/${slug}/${product.id}`}
                                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-6 text-center border border-gray-100"
                                    >
                                        <div className="aspect-square w-full mb-6 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={product.imageUrl}
                                                alt={lang === "tr" ? product.name_tr : product.name_en}
                                                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="text-[13px] font-bold tracking-wider text-gray-800 uppercase group-hover:text-primary transition-colors">
                                            {lang === "tr" ? product.name_tr : product.name_en}
                                        </h3>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center bg-white rounded-xl border border-gray-200">
                                    <p className="text-gray-400 italic">
                                        {lang === "tr"
                                            ? "Bu kategorideki ürünler yakında eklenecektir."
                                            : "Products in this category will be added soon."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
