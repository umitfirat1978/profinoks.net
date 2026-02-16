import React, { useEffect, useState } from "react";
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/0" />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto flex w-full max-w-6xl px-4">
                  <div className="max-w-xl animate-[fade-in-up_0.7s_ease-out]">
                    <div className="inline-block bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                      {t(lang, "hero.badge")}
                    </div>
                    <h1 className="mt-4 text-3xl font-semibold tracking-[0.12em] md:text-4xl lg:text-[40px]">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-lg text-sm text-white/75">
                      {t(lang, "hero.subtitle")}
                    </p>
                  </div>
                </div>
              </div>
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
                    ? "w-6 bg-amber-400"
                    : "w-2 bg-white/40 hover:bg-white/70",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product groups */}
      <section className="bg-[#050505] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-[0.2em] text-white">
              {t(lang, "productGroups.heading")}
            </h2>
            <a
              href="https://profinoks.com.tr/en/animation"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center text-xs uppercase tracking-[0.2em] text-amber-400 hover:text-amber-300 sm:inline-flex"
            >
              <span className="mr-1 inline-block h-8 w-8 rounded-full border border-amber-400/60 bg-black/60" />
              {t(lang, "productGroups.animation")}
              <ArrowRight className="ml-2 h-3 w-3" />
            </a>
          </div>

          {/* Mobile grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {productGroups.map((group) => (
              <a
                key={group.id}
                href={group.href}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-md border border-[#262626] bg-[#111111] shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="overflow-hidden bg-black">
                  <img
                    src={group.image_url || group.imageUrl}
                    alt={group.title}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/80">
                    {group.title}
                  </p>
                  <p className="mt-1 text-[11px] text-white/60">
                    {group.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Desktop interactive row */}
          <div className="mt-8 hidden lg:block">
            <div className="flex gap-4">
              {productGroups.map((group) => (
                <a
                  key={group.id}
                  href={group.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex-1 overflow-hidden rounded-md border border-[#262626] bg-[#090909]"
                >
                  {/* Inactive state */}
                  <div className="flex h-56 flex-col items-center justify-center space-y-4 bg-[#101010] transition-opacity duration-300 group-hover:opacity-0">
                    <div className="overflow-hidden rounded-md bg-black/80 p-3">
                      <img
                        src={group.image_url || group.imageUrl}
                        alt={group.title}
                        className="h-32 w-auto object-contain"
                      />
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/80">
                      {group.title}
                    </div>
                  </div>

                  {/* Active state */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                      className="flex h-full flex-col justify-between bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${group.active_background_url || group.activeBackgroundUrl})`,
                      }}
                    >
                      <div className="h-1 w-16 bg-amber-400" />
                      <div className="bg-gradient-to-t from-black/85 via-black/60 to-black/0 p-6">
                        <div className="text-xs uppercase tracking-[0.18em] text-white">
                          {group.title}
                        </div>
                        <p className="mt-2 max-w-xs text-[12px] text-white/75">
                          {group.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* References logos */}
      <section className="bg-[#050505] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
            <div>
              <a
                href="https://profinoks.com.tr/en/references"
                className="text-lg font-semibold tracking-[0.22em] text-white hover:text-amber-400"
              >
                {t(lang, "references.heading")}
              </a>
              <hr className="mt-2 h-px w-16 border-none bg-amber-400" />
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
      <section className="bg-[#050505] pb-14 pt-4 md:pb-20 md:pt-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-[0.22em] text-white">
              {t(lang, "testimonials.heading")}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={prevTestimonial}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-white/10 bg-white/5">
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                className={[
                  "grid gap-0 md:grid-cols-[1fr,1.4fr] md:gap-6 transition-opacity duration-500",
                  index === activeTestimonial ? "opacity-100" : "hidden opacity-0",
                ].join(" ")}
              >
                <div className="relative flex items-center justify-center bg-black/70 p-6">
                  <div className="relative max-w-xs">
                    <img
                      src={item.image_url || item.imageUrl}
                      alt={item.hotel}
                      className="w-full rounded-sm object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 border border-white/20" />
                  </div>
                </div>
                <div className="flex flex-col justify-center bg-[#111111] p-6 md:p-8">
                  <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
                    {item.hotel}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">
                    {item.person}
                  </div>
                  <div className="text-xs text-white/70">{item.role}</div>
                  <p className="mt-4 text-sm text-white/80 leading-relaxed">
                    {item.quote}
                  </p>
                  <div className="mt-4">
                    <a
                      href={item.detail_url || item.detailUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs uppercase tracking-[0.18em] text-amber-400 hover:text-amber-300"
                    >
                      {t(lang, "testimonials.readMore")}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
