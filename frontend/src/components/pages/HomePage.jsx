import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  sliderItems as sliderMock,
  productGroups as productMock,
  referenceLogos as referenceMock,
  testimonials as testimonialMock,
} from "../../mock";
import { ChevronLeft, ChevronRight, ArrowRight, User } from "lucide-react";
import { fetchHomePageData } from "../../api";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";
import useEmblaCarousel from "embla-carousel-react";

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: false
  });

  const [emblaRefT, emblaApiT] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1, // Default to 1 for mobile
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 2 }
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrevT = useCallback(() => {
    if (emblaApiT) emblaApiT.scrollPrev();
  }, [emblaApiT]);

  const scrollNextT = useCallback(() => {
    if (emblaApiT) emblaApiT.scrollNext();
  }, [emblaApiT]);

  // Auto-scroll effect for references
  useEffect(() => {
    if (!emblaApi) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [emblaApi]);

  useEffect(() => {
    let isMounted = true;

    fetchHomePageData()
      .then((data) => {
        if (!isMounted) return;
        if (data?.slider?.length) setSliderItems(data.slider);

        // If API provides product groups, merge them with mock data to preserve slugs and local image paths
        if (data?.product_groups?.length) {
          setProductGroups(prevGroups =>
            prevGroups.map(mockGroup => {
              const apiGroup = data.product_groups.find(g => g.id === mockGroup.id);
              return apiGroup ? { ...mockGroup, ...apiGroup, slug: mockGroup.slug, imageUrl: mockGroup.imageUrl, href: mockGroup.href } : mockGroup;
            })
          );
        }

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
    <div className="bg-background text-foreground">
      {/* Hero slider */}
      <section className="relative w-full">
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
      <section className="bg-white py-14 md:py-20 border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 lg:mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.16em] text-foreground uppercase flex items-center justify-center">
              <span className="bg-black/5 px-6 py-2 border-b-2 border-primary">
                {t(lang, "productGroups.heading")}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productGroups.map((group) => (
              <Link
                key={group.id}
                to={`/products/${group.slug}`}
                className="group flex flex-col overflow-hidden bg-white border border-black/5 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-gray-50 p-12">
                  <img
                    src={group.imageUrl}
                    alt={group.title}
                    className="h-full w-full object-contain brightness-100 invert-0 opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col p-6 text-center border-t border-black/5 relative">
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-foreground">
                    {group.title}
                  </h3>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-primary scale-x-50 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* References logos */}
      <section className="bg-white py-10 md:py-14 w-full max-w-none overflow-hidden">
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
              <div>
                <Link
                  to="/references"
                  className="text-lg font-semibold tracking-[0.22em] text-foreground hover:text-primary"
                >
                  {t(lang, "references.heading")}
                </Link>
                <hr className="mt-2 h-px w-16 border-none bg-primary" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground md:mt-0">
                {t(lang, "references.tagline")}
              </p>
            </div>
          </div>

          <div className="relative mt-8 group">
            {/* Horizontal Lines - Now Full Width */}
            <div className="absolute -top-6 left-0 right-0 h-px bg-black/10" />
            <div className="absolute -bottom-6 left-0 right-0 h-px bg-black/10" />

            {/* Navigation Arrows - Positioned at viewport edges */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={scrollPrev}
                className="text-primary hover:scale-110 transition-transform bg-white/50 backdrop-blur-sm rounded-full p-2"
                aria-label="Previous references"
              >
                <ChevronLeft size={48} strokeWidth={3} />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={scrollNext}
                className="text-primary hover:scale-110 transition-transform bg-white/50 backdrop-blur-sm rounded-full p-2"
                aria-label="Next references"
              >
                <ChevronRight size={48} strokeWidth={3} />
              </button>
            </div>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex">
                {referenceLogos.map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex-[0_0_auto] px-5 sm:px-10"
                  >
                    <div className="flex h-32 w-64 items-center justify-center bg-white">
                      <img
                        src={logo.image_url || logo}
                        alt="Reference logo"
                        className="max-h-28 max-w-[220px] object-contain transition-opacity opacity-80 hover:opacity-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer testimonials */}
      <section className="bg-white pb-20 pt-10 border-t border-black/5 w-full max-w-none overflow-hidden">
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-foreground uppercase">
                {t(lang, "testimonials.heading")}
              </h2>
              <div className="mt-4 h-1 w-16 bg-primary" />
            </div>
          </div>

          <div className="relative group">
            {/* Navigation Arrows - Extreme edges */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={scrollPrevT}
                className="text-primary hover:scale-110 transition-transform bg-white/50 backdrop-blur-sm rounded-full p-2"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={48} strokeWidth={3} />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={scrollNextT}
                className="text-primary hover:scale-110 transition-transform bg-white/50 backdrop-blur-sm rounded-full p-2"
                aria-label="Next testimonials"
              >
                <ChevronRight size={48} strokeWidth={3} />
              </button>
            </div>

            <div className="overflow-hidden" ref={emblaRefT}>
              <div className="flex">
                {testimonials.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex-[0_0_100%] lg:flex-[0_0_50%] px-4 lg:px-6"
                  >
                    <div className="flex flex-col md:flex-row h-full border-t border-b border-black/5 md:border-none shadow-sm">
                      {/* Left Side: Image (Narrower - 1/3) */}
                      <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-[#E5E7EB]">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.person}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <User size={64} className="text-primary/10" strokeWidth={1} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/5" />
                      </div>

                      {/* Right Side: Text (Wider - 2/3) (Maroon BG) */}
                      <div className="w-full md:w-2/3 bg-primary p-6 lg:p-8 text-left flex flex-col justify-center min-h-[220px]">
                        <div>
                          <div className="text-[13px] lg:text-[14px] font-bold text-white tracking-[0.18em] uppercase mb-1">
                            {item.person}
                          </div>
                          <div className="text-[11px] lg:text-[12px] text-white/70 uppercase tracking-[0.15em] mb-4">
                            {item.role}
                          </div>
                          <p className="text-[12px] lg:text-[13px] text-white/90 leading-relaxed font-light italic border-l-2 border-white/20 pl-4">
                            "{item.quote}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
