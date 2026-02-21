import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { productGroups, megaMenuProducts } from "../../mock";

const MegaMenu = ({ lang, onMouseEnter, onMouseLeave, onClose }) => {
    const [activeCategory, setActiveCategory] = useState(productGroups[0]?.slug);
    const menuRef = useRef(null);

    const currentProducts = megaMenuProducts[activeCategory] || [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-black/5 animate-in fade-in slide-in-from-top-2 duration-300 z-50 overflow-hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="mx-auto flex max-w-6xl min-h-[500px]">
                {/* Left Sidebar: Categories */}
                <div className="w-[300px] border-r border-black/5 bg-white overflow-y-auto max-h-[70vh]">
                    <div className="flex flex-col">
                        {productGroups.map((group) => (
                            <button
                                key={group.slug}
                                onMouseEnter={() => setActiveCategory(group.slug)}
                                className={`px-8 py-3.5 text-left transition-all duration-200 border-b border-black/5 last:border-b-0 ${activeCategory === group.slug
                                    ? "bg-primary/5 text-primary border-l-4 border-l-primary"
                                    : "text-gray-800 hover:bg-gray-50 border-l-4 border-l-transparent"
                                    }`}
                            >
                                <span className="text-[13px] font-bold uppercase tracking-[0.1em]">
                                    {group.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Content: Products Grid */}
                <div className="flex-1 bg-white p-10 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-4 gap-10">
                        {currentProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${activeCategory}`}
                                className="group flex flex-col items-center text-center focus:outline-none"
                                onClick={onClose}
                            >
                                <div className="aspect-[4/3] w-full overflow-hidden bg-white border border-black/5 rounded-md mb-4 group-hover:shadow-md transition-shadow flex items-center justify-center p-4">
                                    <img
                                        src={product.imageUrl}
                                        alt={lang === "tr" ? product.name_tr : product.name_en}
                                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h4 className="text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-wide px-2">
                                    {lang === "tr" ? product.name_tr : product.name_en}
                                </h4>
                            </Link>
                        ))}
                        {currentProducts.length === 0 && (
                            <div className="col-span-4 flex flex-col items-center justify-center h-64 text-gray-400 space-y-4">
                                <div className="w-12 h-1 bg-gray-100 rounded-full"></div>
                                <p className="text-sm italic">
                                    {lang === "tr" ? "Bu kategoride ürün bulunamadı." : "No products found in this category."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
