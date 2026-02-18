import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { contactInfo, productGroups } from "../../mock";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
    const { lang } = useLanguage();

    return (
        <footer className="bg-[#323232] pt-16 pb-8 text-white border-t border-white/5">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* About Section */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                            {lang === "tr" ? "PROFİNOKS HAKKINDA" : "ABOUT PROFINOKS"}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                            {lang === "tr"
                                ? "2010 yılından beri endüstriyel mutfak ekipmanları üretimi ve montajı konusunda hizmet vermekteyiz. Kaliteli üretim anlayışımız ve müşteri memnuniyeti odaklı çalışma prensibimizle sektörde öncü firmalardan biriyiz."
                                : "Since 2010, we have been providing services in the production and installation of industrial kitchen equipment. We are one of the leading companies in the sector with our quality production approach and customer satisfaction-oriented working principle."}
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://www.facebook.com/profinoks.endustriyelmutfakekipmanlari" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" title="Facebook"><Facebook size={18} /></a>
                            <a href="https://www.instagram.com/profinoks/?hl=tr" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" title="Instagram"><Instagram size={18} /></a>
                            <a href="https://www.linkedin.com/in/profinoks-end%C3%BCstriyel-mutfak-ekipmanlari-4471921b2/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" title="LinkedIn"><Linkedin size={18} /></a>
                            <a href="https://www.youtube.com/channel/UCTsoSgntPEXAshH80VtSa-g/featured" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" title="YouTube"><Youtube size={18} /></a>
                            <a href="https://api.whatsapp.com/send?phone=905306140705" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors" title="WhatsApp"><MessageCircle size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                            {lang === "tr" ? "HIZLI BAĞLANTILAR" : "QUICK LINKS"}
                        </h3>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><Link to="/corporate" className="hover:text-primary transition-colors flex items-center">› <span className="ml-2">{lang === "tr" ? "Kurumsal" : "Corporate"}</span></Link></li>
                            <li><Link to="/products" className="hover:text-primary transition-colors flex items-center">› <span className="ml-2">{lang === "tr" ? "Ürünler" : "Products"}</span></Link></li>
                            <li><Link to="/references" className="hover:text-primary transition-colors flex items-center">› <span className="ml-2">{lang === "tr" ? "Referanslar" : "References"}</span></Link></li>
                            <li><Link to="/projects" className="hover:text-primary transition-colors flex items-center">› <span className="ml-2">{lang === "tr" ? "Projeler" : "Projects"}</span></Link></li>
                            <li><Link to="/news" className="hover:text-primary transition-colors flex items-center">› <span className="ml-2">{lang === "tr" ? "Haberler" : "News"}</span></Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center">› <span className="ml-2">{lang === "tr" ? "İletişim" : "Contact"}</span></Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                            {lang === "tr" ? "İLETİŞİM BİLGİLERİ" : "CONTACT INFO"}
                        </h3>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 text-primary shrink-0 mt-0.5" />
                                <span>{contactInfo.address}</span>
                            </li>
                            {contactInfo.phone.map((p, idx) => (
                                <li key={idx} className="flex items-center">
                                    <Phone size={18} className="mr-3 text-primary shrink-0" />
                                    <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{p}</a>
                                </li>
                            ))}
                            {contactInfo.emails.map((e, idx) => (
                                <li key={idx} className="flex items-center">
                                    <Mail size={18} className="mr-3 text-primary shrink-0" />
                                    <a href={`mailto:${e}`} className="hover:text-primary transition-colors">{e}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary">
                            {lang === "tr" ? "ÇALIŞMA SAATLERİ" : "WORKING HOURS"}
                        </h3>
                        <div className="bg-white/5 p-4 rounded-sm border border-white/10">
                            <p className="text-sm text-white/80 leading-relaxed font-medium">
                                {contactInfo.workingHours}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
                    <p>© {new Date().getFullYear()} Profinoks Endüstriyel Mutfak. Tüm hakları saklıdır.</p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
