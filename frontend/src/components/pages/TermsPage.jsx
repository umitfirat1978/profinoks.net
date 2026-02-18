import React from "react";

const TermsPage = () => {
    return (
        <div className="mt-[122px] md:pt-[130px] lg:pt-[140px] bg-background pb-20 text-foreground min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-12">
                <header className="mb-12 border-b border-black/10 pb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase text-primary">
                        Hizmet Şartları ve Yasal Uyarı
                    </h1>
                    <p className="mt-4 text-muted-foreground text-sm">Son Güncelleme: 17.02.2026</p>
                </header>

                <div className="max-w-none space-y-8 text-foreground/80 leading-relaxed">
                    <section className="bg-gray-50 p-6 rounded-lg border border-black/10">
                        <h2 className="text-xl font-bold text-foreground uppercase tracking-wider mb-4">İNTERNET SİTESİ KULLANIM KOŞULLARI VE YASAL UYARI</h2>
                        <p className="text-sm">
                            <strong>1. TARAFLAR VE KONU</strong><br />
                            İşbu Kullanım Koşulları ("Sözleşme"), [PROFİNOKS ENDRÜSTRİYEL MUTFAK EKİP. İNŞ. TUR. YAPI MALZ. SAN. VE TİC. LTD. ŞTİ.] ("Site Sahibi") tarafından işletilen [profinoks.com , profinoks.com.tr , profinoks.net] ("Site") internet sitesinin kullanımına ilişkin şartları belirlemektedir. Siteye erişim sağlayan, ziyaret eden veya Siteyi herhangi bir şekilde kullanan tüm gerçek ve tüzel kişiler ("Kullanıcı"), işbu Sözleşme hükümlerini kabul etmiş sayılır.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground border-l-4 border-primary pl-4 uppercase tracking-wider">2. HİZMETİN KAPSAMI</h2>
                        <p>
                            Site Sahibi, Site üzerinden [profinoks.com , profinoks.com.tr , profinoks.net] konusunda içerik paylaşımı, bilgilendirme veya hizmet sunumu gerçekleştirmektedir. Site Sahibi, Site üzerinden sunulan hizmetleri, içerikleri ve özellikleri dilediği zaman, önceden bildirimde bulunmaksızın değiştirme, durdurma veya sonlandırma hakkını saklı tutar.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground border-l-4 border-primary pl-4 uppercase tracking-wider">3. KULLANIM ŞARTLARI VE YÜKÜMLÜLÜKLER</h2>
                        <ul className="list-none space-y-3">
                            <li><span className="text-primary font-bold mr-2">3.1.</span> Kullanıcı, Siteyi kullanırken Türk Ceza Kanunu, Türk Borçlar Kanunu, Türk Ticaret Kanunu, Fikir ve Sanat Eserleri Kanunu ve ilgili diğer tüm mevzuat hükümlerine uymayı kabul ve taahhüt eder.</li>
                            <li><span className="text-primary font-bold mr-2">3.2.</span> Kullanıcı, Siteye zarar verecek, işleyişini aksatacak veya diğer kullanıcıların Siteyi kullanmasını engelleyecek yazılım, virüs veya benzeri zararlı içerik göndermemeyi taahhüt eder.</li>
                            <li><span className="text-primary font-bold mr-2">3.3.</span> Site üzerinden elde edilen bilgiler, Site Sahibinin yazılı izni olmaksızın kopyalanamaz, çoğaltılamaz, dağıtılamaz veya ticari amaçla kullanılamaz.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground border-l-4 border-primary pl-4 uppercase tracking-wider">4. FİKRİ MÜLKİYET HAKLARI</h2>
                        <p>
                            Sitede yer alan tüm metinler, grafikler, logolar, görseller, ses dosyaları, yazılımlar ve diğer içerikler ("İçerik"), Site Sahibine veya lisans verenlerine aittir ve ulusal/uluslararası telif hakkı yasalarıyla korunmaktadır. Kullanıcı, İçeriği değiştiremez, kopyalayamaz, tersine mühendislik yapamaz veya kaynak koda dönüştüremez.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground border-l-4 border-primary pl-4 uppercase tracking-wider">5. SORUMLULUK REDDİ (DISCLAIMER)</h2>
                        <ul className="list-none space-y-3">
                            <li><span className="text-primary font-bold mr-2">5.1.</span> Site Sahibi, Sitede yer alan bilgilerin doğruluğu, güncelliği veya eksiksizliği konusunda garanti vermez. Sitedeki bilgiler genel bilgilendirme amacı taşır ve profesyonel tavsiye niteliğinde değildir.</li>
                            <li><span className="text-primary font-bold mr-2">5.2.</span> Site Sahibi, Sitenin kesintisiz veya hatasız çalışacağını garanti etmez. Teknik sorunlar, bakım çalışmaları veya mücbir sebepler nedeniyle Siteye erişimde yaşanabilecek aksaklıklardan Site Sahibi sorumlu tutulamaz.</li>
                            <li><span className="text-primary font-bold mr-2">5.3.</span> Site, üçüncü taraf web sitelerine bağlantılar (linkler) içerebilir. Site Sahibi, bu bağlantıların içeriğinden veya güvenliğinden sorumlu değildir.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground border-l-4 border-primary pl-4 uppercase tracking-wider">6. GİZLİLİK VE KİŞİSEL VERİLER</h2>
                        <p>
                            Kullanıcının Siteyi kullanımı sırasında elde edilen kişisel veriler, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Sitenin "Gizlilik Politikası" ve "Aydınlatma Metni" çerçevesinde işlenmektedir. Kullanıcı, Siteyi kullanarak kişisel verilerinin işlenmesine ilişkin şartları kabul etmiş sayılır.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground border-l-4 border-primary pl-4 uppercase tracking-wider">7. SÖZLEŞME DEĞİŞİKLİKLERİ</h2>
                        <p>
                            Site Sahibi, işbu Sözleşme hükümlerini dilediği zaman tek taraflı olarak değiştirme hakkını haizdir. Güncel Sözleşme, Sitede yayınlandığı andan itibaren geçerlilik kazanır. Kullanıcıların Siteyi düzenli olarak kontrol ederek değişikliklerden haberdar olması kendi sorumluluğundadır.
                        </p>
                    </section>

                    <section className="space-y-4 text-sm bg-gray-50 p-6 rounded-lg border border-black/5">
                        <h2 className="text-lg font-bold text-foreground uppercase tracking-wider">8. UYGULANACAK HUKUK VE YETKİ - 9. İLETİŞİM</h2>
                        <p>
                            İşbu Sözleşme'den doğabilecek her türlü uyuşmazlığın çözümünde Türk Hukuku uygulanacak olup, [İSTANBUL] Mahkemeleri ve İcra Daireleri yetkilidir.
                        </p>
                        <div className="mt-4 pt-4 border-t border-black/10 space-y-1">
                            <p><strong>Unvan:</strong> PROFİNOKS ENDRÜSTRİYEL MUTFAK EKİP. İNŞ. TUR. YAPI MALZ. SAN. VE TİC. LTD. ŞTİ.</p>
                            <p><strong>Adres:</strong> Firuzköy Mah. Mezarlık Üstü Cad. No:13 34325 Avcılar/İstanbul</p>
                            <p><strong>E-posta:</strong> info@profinoks.com.tr</p>
                            <p><strong>Telefon:</strong> +90 212 5015125</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
