import React, { useState } from "react";
import { projectImages } from "../../mock";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectsPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setSelectedImage(projectImages[index]);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = "auto";
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const nextIdx = (currentIndex + 1) % projectImages.length;
        setCurrentIndex(nextIdx);
        setSelectedImage(projectImages[nextIdx]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prevIdx = (currentIndex - 1 + projectImages.length) % projectImages.length;
        setCurrentIndex(prevIdx);
        setSelectedImage(projectImages[prevIdx]);
    };

    return (
        <div className="mt-[122px] md:pt-[130px] lg:pt-[140px] bg-background pb-20 text-foreground min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <header className="mb-12 border-b border-primary/30 pb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-[0.1em] uppercase text-foreground">
                        PROJELERİMİZ
                    </h1>
                    <p className="mt-4 text-primary font-medium tracking-widest uppercase text-sm">
                        FUAR FLASH SLAYT KOLEKSİYONU
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projectImages.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-50 cursor-pointer border border-black/5 hover:border-primary/50 transition-all duration-300"
                        >
                            <img
                                src={image}
                                alt={`Profinoks Project ${index + 1}`}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-xs font-bold px-3 py-1 border border-white/50 rounded-full">
                                    GÖRÜNTÜLE
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
                        onClick={closeLightbox}
                    >
                        <X size={32} />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-white/5 p-3 rounded-full hidden md:block"
                        onClick={prevImage}
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <img
                        src={selectedImage}
                        alt="Profinoks Project Full"
                        className="max-h-[85vh] max-w-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
                    />

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors bg-white/5 p-3 rounded-full hidden md:block"
                        onClick={nextImage}
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest uppercase">
                        {currentIndex + 1} / {projectImages.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;
