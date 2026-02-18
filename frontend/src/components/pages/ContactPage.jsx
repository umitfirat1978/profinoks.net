import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { contactInfo } from "../../mock";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
    const { lang } = useLanguage();

    return (
        <div className="pt-[140px] bg-background min-h-screen">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-semibold tracking-[0.2em] uppercase text-foreground mb-4">
                        {lang === "tr" ? "İLETİŞİM" : "CONTACT"}
                    </h1>
                    <div className="h-1 w-20 bg-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                    {/* Info Section */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-xl font-semibold tracking-wide text-foreground mb-8 border-l-4 border-primary pl-4 uppercase">
                                {lang === "tr" ? "İLETİŞİM BİLGİLERİ" : "CONTACT INFORMATION"}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="h-10 w-10 shrink-0 bg-black/5 rounded-full flex items-center justify-center mr-4 border border-black/10 group hover:border-primary transition-colors">
                                            <MapPin size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">
                                                {lang === "tr" ? "ADRES" : "ADDRESS"}
                                            </p>
                                            <p className="text-sm text-foreground/80 leading-relaxed">
                                                {contactInfo.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="h-10 w-10 shrink-0 bg-white/5 rounded-full flex items-center justify-center mr-4 border border-white/10 hover:border-primary transition-colors">
                                            <Phone size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">
                                                {lang === "tr" ? "TELEFON" : "PHONE"}
                                            </p>
                                            {contactInfo.phone.map((p, idx) => (
                                                <p key={idx} className="text-sm text-foreground/80">
                                                    <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{p}</a>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="h-10 w-10 shrink-0 bg-white/5 rounded-full flex items-center justify-center mr-4 border border-white/10 hover:border-primary transition-colors">
                                            <Mail size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">
                                                {lang === "tr" ? "E-POSTA" : "EMAIL"}
                                            </p>
                                            {contactInfo.emails.map((e, idx) => (
                                                <p key={idx} className="text-sm text-foreground/80">
                                                    <a href={`mailto:${e}`} className="hover:text-primary transition-colors">{e}</a>
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="h-10 w-10 shrink-0 bg-white/5 rounded-full flex items-center justify-center mr-4 border border-white/10 hover:border-primary transition-colors">
                                            <Clock size={20} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">
                                                {lang === "tr" ? "ÇALIŞMA SAATLERİ" : "WORKING HOURS"}
                                            </p>
                                            <p className="text-sm text-foreground/80">
                                                {contactInfo.workingHours}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-[300px] w-full rounded-md overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 border border-black/5">
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5323930825964!2d28.718617815413554!3d40.99173917930263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa1102604043b%3A0xb198357a6e114a1a!2sProfinoks!5e0!3m2!1str!2str!4v1652367412345!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white p-8 rounded-md border border-black/10 shadow-sm">
                        <h2 className="text-xl font-semibold tracking-wide text-foreground mb-8 border-l-4 border-primary pl-4 uppercase">
                            {lang === "tr" ? "BİZE ULAŞIN" : "CONTACT FORM"}
                        </h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">{lang === "tr" ? "ADINIZ" : "NAME"}</label>
                                    <input type="text" className="w-full bg-gray-50 border border-black/10 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">{lang === "tr" ? "E-POSTA" : "EMAIL"}</label>
                                    <input type="email" className="w-full bg-gray-50 border border-black/10 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">{lang === "tr" ? "KONU" : "SUBJECT"}</label>
                                <input type="text" className="w-full bg-gray-50 border border-black/10 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">{lang === "tr" ? "MESAJINIZ" : "MESSAGE"}</label>
                                <textarea rows="5" className="w-full bg-gray-50 border border-black/10 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-[0.3em] py-4 rounded-sm transition-colors">
                                {lang === "tr" ? "GÖNDER" : "SEND MESSAGE"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
