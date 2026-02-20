import React from "react";
import { useParams, Link } from "react-router-dom";
import { productGroups } from "../../mock";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";
import { ChevronRight, Home } from "lucide-react";

const CategoryPage = () => {
    const { slug } = useParams();
    const { lang } = useLanguage();

    const category = productGroups.find((group) => group.slug === slug);

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
        <div className="pt-[140px] bg-background min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-black/5 py-4">
                <div className="mx-auto max-w-6xl px-4 flex items-center space-x-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <Link to="/" className="hover:text-primary flex items-center">
                        <Home size={14} className="mr-1" />
                        {lang === "tr" ? "ANASAYFA" : "HOME"}
                    </Link>
                    <ChevronRight size={12} />
                    <Link to="/products" className="hover:text-primary">
                        {lang === "tr" ? "ÜRÜNLERİMİZ" : "PRODUCTS"}
                    </Link>
                    <ChevronRight size={12} />
                    <span className="text-foreground font-bold">{category.title}</span>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Category Image */}
                    <div className="aspect-square bg-white border border-black/5 rounded-lg overflow-hidden shadow-sm">
                        <img
                            src={category.imageUrl}
                            alt={category.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Category Info */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase text-foreground mb-6">
                            {category.title}
                        </h1>
                        <div className="h-1 w-20 bg-primary mb-8"></div>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                            {category.description}
                        </p>

                        <div className="bg-primary/5 border border-primary/10 p-6 rounded-lg">
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">
                                {lang === "tr" ? "DETAYLI BİLGİ İÇİN" : "FOR DETAILED INFORMATION"}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {lang === "tr"
                                    ? "Bu kategorideki ürünlerimiz hakkında detaylı bilgi ve teklif almak için bizimle iletişime geçebilirsiniz."
                                    : "You can contact us to get detailed information and offers about our products in this category."}
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors"
                            >
                                {lang === "tr" ? "BİZE ULAŞIN" : "CONTACT US"}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Products Grid Placeholder */}
                <div className="mt-20">
                    <h2 className="text-xl font-bold tracking-widest uppercase mb-8 flex items-center">
                        <span className="mr-4">{lang === "tr" ? "ÜRÜNLER" : "PRODUCTS"}</span>
                        <div className="flex-grow h-px bg-black/5"></div>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Product list will go here */}
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-black/5 rounded-xl">
                            <p className="text-muted-foreground italic">
                                {lang === "tr"
                                    ? "Bu kategorideki ürünler yakında eklenecektir."
                                    : "Products in this category will be added soon."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
