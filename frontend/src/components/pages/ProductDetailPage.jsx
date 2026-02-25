import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productGroups } from "../../mock";
import { categoryProducts } from "../../data/categoryProducts";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChevronRight, ChevronUp, ChevronDown, Share2, FileText } from "lucide-react";

const ProductDetailPage = () => {
    const { categorySlug, productId } = useParams();
    const { lang } = useLanguage();
    const [quantity, setQuantity] = useState(1);

    const category = productGroups.find((g) => g.slug === categorySlug);
    const categoryProds = categoryProducts[categorySlug] || [];
    const product = categoryProds.find((p) => p.id === parseInt(productId));

    if (!product || !category) {
        return (
            <div className="pt-[140px] bg-background min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <Link to="/products" className="text-primary hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    const productName = lang === "tr" ? product.name_tr : product.name_en;

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
                    <Link to={`/products/${categorySlug}`} className="hover:text-primary">
                        {category.title}
                    </Link>
                    <ChevronRight size={12} className="text-gray-400" />
                    <span className="text-primary">{productName}</span>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-20">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Gallery Section */}
                        <div className="lg:col-span-1 flex flex-col items-center space-y-4">
                            <button className="text-gray-400 hover:text-primary">
                                <ChevronUp size={24} />
                            </button>
                            <div className="flex flex-col space-y-4">
                                <div className="w-16 h-16 border border-primary p-1 rounded-md cursor-pointer overflow-hidden">
                                    <img src={product.imageUrl} alt="" className="w-full h-full object-contain" />
                                </div>
                                {/* Placeholder for more thumbs */}
                                <div className="w-16 h-16 border border-gray-200 p-1 rounded-md cursor-pointer hover:border-primary transition-colors overflow-hidden">
                                    <img src={product.imageUrl} alt="" className="w-full h-full object-contain opacity-50" />
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-primary">
                                <ChevronDown size={24} />
                            </button>
                        </div>

                        {/* Main Image Section */}
                        <div className="lg:col-span-6 flex items-center justify-center bg-white">
                            <img
                                src={product.imageUrl}
                                alt={productName}
                                className="max-w-full max-h-[500px] object-contain"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="p-8 border border-gray-100 rounded-xl bg-gray-50/30">
                                <h1 className="text-2xl font-bold tracking-wider text-[#7a4141] uppercase mb-4">
                                    {productName}
                                </h1>

                                <div className="space-y-4">
                                    {/* Placeholder specs since data doesn't have them */}
                                    <p className="text-sm font-semibold text-gray-700">
                                        Dimensions W: -- L: -- H: -- cm
                                    </p>

                                    <ul className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <li key={i} className="flex items-start text-sm text-gray-600">
                                                <span className="text-primary mr-2">»</span>
                                                <span>{lang === "tr" ? "Yüksek kaliteli paslanmaz çelik" : "High quality stainless steel"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-10 flex flex-col space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                                                {lang === "tr" ? "Adet" : "Piece"}
                                            </span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                className="w-16 px-3 py-2 border border-gray-200 rounded text-center focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <button className="flex-grow bg-[#7a4141] text-white py-3 px-6 rounded font-bold text-sm tracking-widest uppercase hover:bg-[#633535] transition-colors flex items-center justify-center space-x-2">
                                            <span className="text-lg">🛒</span>
                                            <span>{lang === "tr" ? "TEKLİF LİSTESİNE EKLE" : "ADD TO OFFER LIST"}</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <a href="#" className="text-[#25D366] hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.096 3.389l-.72 2.628 2.688-.705c.828.461 1.777.726 2.787.726 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm3.39 8.215c-.149.42-.77.77-1.064.811-.294.041-.659.066-1.134-.087-.294-.095-1.259-.461-2.405-1.485-.945-.845-1.583-1.892-1.769-2.214-.186-.322-.02-.496.141-.657.145-.145.322-.376.483-.563.161-.186.215-.318.322-.529.107-.211.054-.397-.027-.562-.081-.165-.726-1.752-.996-2.405-.262-.633-.529-.546-.726-.556-.188-.01-.403-.013-.618-.013s-.565.081-.861.4c-.297.321-1.134 1.109-1.134 2.704 0 1.594 1.159 3.134 1.321 3.354.162.22 2.228 3.414 5.418 4.793.758.329 1.35.525 1.812.67.762.243 1.455.209 2.003.127.611-.091 1.88-.769 2.147-1.516.267-.741.267-1.378.188-1.516s-.29-.208-.611-.371z" /></svg>
                                            </a>
                                            <button className="text-[#3b5998] hover:scale-110 transition-transform">
                                                <Share2 size={24} />
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-2 text-primary font-bold text-xs">
                                            <FileText size={20} className="text-red-600" />
                                            <span className="uppercase tracking-wider">{lang === "tr" ? "Teknik Döküman" : "Technical Document"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
