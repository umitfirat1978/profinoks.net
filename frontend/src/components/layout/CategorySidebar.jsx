import React from "react";
import { Link, useParams } from "react-router-dom";
import { productGroups } from "../../mock";
import { useLanguage } from "../../contexts/LanguageContext";

const CategorySidebar = () => {
    const { slug } = useParams();
    const { lang } = useLanguage();

    return (
        <div className="w-full lg:w-[300px] flex-shrink-0">
            <div className="flex flex-col space-y-2">
                {productGroups.map((group) => {
                    const isActive = slug === group.slug;
                    return (
                        <Link
                            key={group.id}
                            to={`/products/${group.slug}`}
                            className={`px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${isActive
                                    ? "bg-primary text-white shadow-md transform translate-x-2"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {group.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySidebar;
