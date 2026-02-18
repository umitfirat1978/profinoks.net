import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  sliderItems as sliderMock,
  productGroups as productMock,
  referenceLogos as referenceMock,
  testimonials as testimonialMock,
} from "../../mock";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { fetchHomePageData } from "../../api";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";

const SLIDE_INTERVAL = 6000;

const HomePage = () => {
  // Start with mocked data for instant render; replace with backend data if available
  const { lang } = useLanguage();
  const [sliderItems, setSliderItems] = useState(sliderMock);
  const [productGroups, setProductGroups] = useState(productMock);
  const [referenceLogos, setReferenceLogos] = useState(referenceMock);
  const [testimonials, setTestimonials] = useState(testimonialMock);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetchHomePageData()
      .then((data) => {
        if (!isMounted) return;
        if (data?.slider?.length) setSliderItems(data.slider);
        if (data?.product_groups?.length) setProductGroups(data.product_groups);
        if (data?.references?.length)
          setReferenceLogos(data.references.map((r) => r.image_url));
        if (data?.testimonials?.length) setTestimonials(data.testimonials);
      })
      .catch((err) => {
        // Fail silently and keep mock data
        console.error("Failed to fetch home page data", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        sliderItems.length ? (prev + 1) % sliderItems.length : prev
      );
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [sliderItems.length]);

  useEffect(() => {
    const tTimer = setInterval(() => {
      setActiveTestimonial((prev) =>
        testimonials.length ? (prev + 1) % testimonials.length : prev
      );
    }, 9000);
    return () => clearInterval(tTimer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) =>
      testimonials.length ? (prev + 1) % testimonials.length : prev
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      !testimonials.length ? prev : prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-[#050505] text-white">
      {/* Hero slider */}
      <section className="relative w-full pt-[122px] md:pt-[130px] lg:pt-[140px]">
        <div className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
          {sliderItems.map((slide, index) => (
            <div
              key={slide.id}
              className={[
                "absolute inset-0 transition-opacity duration-700",
                index === activeSlide ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <img
                src={slide.image_url || slide.imageUrl}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}

          {/* Slider controls */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-6">
            <button
              type="button"
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white shadow-sm transition-colors hover:bg-black/80"
              onClick={() =>
                setActiveSlide((prev) =>
                  !sliderItems.length
                    ? prev
                    : prev === 0
                      ? sliderItems.length - 1
                      : prev - 1
                )
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white shadow-sm transition-colors hover:bg-black/80"
              onClick={() =>
                setActiveSlide((prev) =>
                  sliderItems.length ? (prev + 1) % sliderItems.length : prev
                )
              }
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-1.5">
            {sliderItems.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={[
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeSlide
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product groups */}
      <section className="bg-[#050505] py-14 md:py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 lg:mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.16em] text-white uppercase flex items-center justify-center">
              <span className="bg-white/10 px-6 py-2 border-b-2 border-primary">
                {t(lang, "productGroups.heading")}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productGroups.map((group) => (
              <a
                key={group.id}
                href={group.href || "#"}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col overflow-hidden bg-[#1a1c23] transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-[#1a1c23] p-12">
                  <img
                    src={group.image_url || group.imageUrl}
                    alt={group.title}
                    className="h-full w-full object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col p-6 text-center border-t border-white/5 relative">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-white">
                    {group.title}
                  </h3>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-white scale-x-50 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* References logos */}
      <section className="bg-[#050505] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                to="/references"
                className="text-lg font-semibold tracking-[0.22em] text-white hover:text-primary"
              >
                {t(lang, "references.heading")}
              </Link>
              <hr className="mt-2 h-px w-16 border-none bg-primary" />
            </div>
            <p className="mt-3 text-sm text-white/70 md:mt-0">
              {t(lang, "references.tagline")}
            </p>
          </div>

          <div className="mt-8 overflow-hidden border-y border-white/5 py-4">
            <div className="flex animate-[slide-left_40s_linear_infinite] gap-10 opacity-80 hover:opacity-100">
              {[...referenceLogos, ...referenceLogos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex h-16 w-32 items-center justify-center bg-white"
                >
                  <img
                    src={logo.image_url || logo}
                    alt="Reference logo"
                    className="max-h-14 max-w-[110px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer testimonials */}
      <section className="bg-[#050505] pb-20 pt-10 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white uppercase">
              {t(lang, "testimonials.heading")}
            </h2>
            <div className="mt-4 h-1 w-16 bg-primary" />
          </div>

          <div className="relative overflow-hidden min-h-[350px] md:min-h-[300px] flex items-center">
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                className={[
                  "absolute inset-0 flex flex-col md:flex-row items-center transition-all duration-700 ease-in-out",
                  index === activeTestimonial
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10 pointer-events-none",
                ].join(" ")}
              >
                <div className="w-full md:w-1/2 h-64 md:h-80 overflow-hidden relative border-4 border-primary">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1550963295-019d8a8a61c5?q=80&w=600&auto=format&fit=crop"}
                    alt={item.person}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 bg-primary p-8 md:p-12 text-left relative flex flex-col justify-between min-h-[256px] md:min-h-[320px]">
                  <div>
                    <div className="text-sm md:text-base font-bold text-white tracking-widest uppercase mb-1">
                      {item.person}
                    </div>
                    <div className="text-xs text-white/70 uppercase tracking-widest mb-6">
                      {item.role}
                    </div>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed font-light italic">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="inline-flex h-8 w-8 items-center justify-center bg-white text-primary">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="mt-12 flex items-center justify-center space-x-6">
            <button
              type="button"
              onClick={prevTestimonial}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-primary hover:text-primary transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={[
                    "h-1.5 rounded-full transition-all duration-300",
                    index === activeTestimonial
                      ? "w-8 bg-primary"
                      : "w-2 bg-white/10 hover:bg-white/30"
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextTestimonial}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:border-primary hover:text-primary transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
