import React from "react";

const newsItems = [
    {
        id: 1,
        title: "Endüstriyel Mutfak Projesi Hizmeti Verdiğimiz Alanlar",
        date: "17 Şubat 2026",
        content: (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                {[
                    "Restoran mutfağı", "Otel Mutfağı ve Otel Mutfak Ekipmanları", "Steakhouse mutfağı ve et teşhir dolapları",
                    "Askeri tesis mutfağı", "Bar Projeleri", "Hastane mutfakları", "Fastfood ekipmanları ve mutfağı",
                    "Okul mutfak projeleri", "Yurt mutfakları", "Burger mutfağı", "Pastane mutfağı ve pasta dolapları",
                    "Cafe mutfağı ve cafe bar ekipmanları", "Dinlenme tesisi mutfağı", "Catering mutfağı",
                    "Horeca mutfağı", "Fırın Ekipmanları", "Dönerci Mutfakları", "Her türlü paslanmaz mutfaklar",
                    "Endüstriyel Mutfak Danışmanlığı"
                ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        )
    },
    {
        id: 2,
        title: "Fimak Ürünleri Profinoks'ta",
        date: "16 Şubat 2026",
        content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p className="font-bold text-primary italic">GEÇMİŞTEN BUGÜNE, HAMURA ŞEKİL VEREN TEKNOLOJİ...</p>
                <p>1976 yılında başladığı fırın makineleri imalatında bugün 45.000 m2 toplam alan üzerine kurulmuş FİMAK fabrikasında üretilen ürünler artık PROFİNOKS'ta.</p>
                <p>Fimak günümüzde unlu mamul, fırıncılık, pastanecilik, restoran zincirleri, kafe, otel, catering alanlarında hizmet vermektedir. Fimak Retros adlı gastronomi fırını ile de gastronomi makinaları alanında da hizmet vermeye başlamıştır.</p>
                <p>Fimak 2017 Temmuz ayında Sanayi Bakanlığı onaylı AR-GE merkezlerinden biri olmaya hak kazanmıştır. Dünyanın 65 ülkesine ihracat yapmaktadır.</p>
            </div>
        )
    },
    {
        id: 3,
        title: "Bayat Ekmek Yemek Tarifleri",
        date: "15 Şubat 2026",
        content: (
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <h4 className="font-bold text-foreground uppercase text-xs tracking-wider mb-2">Bayat Ekmek Böreği</h4>
                <p className="italic text-xs text-primary/80">Malzemeler: 1 adet bayat ekmek, 200 gr kaşar rendesi, 200 gr beyaz peynir, 1,5 su bardağı süt, 2 yumurta.</p>
                <p>Ekmeklerin ziyan olması her yıl milyonlarca liranın çöpe gitmesine neden oluyor. İhtiyacımız kadarını almayı öğrenmeliyiz. Artan ekmekleri dondurucuya atabilir veya kurutup ekmek kırığı yapabilirsiniz.</p>
                <p>Eğer çok fazla değilse kalan ekmeklerinizle bu nefis böreği deneyin. Süt miktarını ekmeklerinizin kuruluk derecesine göre kontrollü olarak ekleyin.</p>
            </div>
        )
    },
    {
        id: 4,
        title: "Restoran Konseptleri",
        date: "14 Şubat 2026",
        content: (
            <div className="grid gap-4 sm:grid-cols-2 text-xs text-muted-foreground">
                <div>
                    <h5 className="font-bold text-primary/90 mb-1">Deniz Ürünleri</h5>
                    <p>Tazelik ve kalite standartları kritik öneme sahiptir. Alışverişte ürün tazeliğine dikkat edilmelidir.</p>
                </div>
                <div>
                    <h5 className="font-bold text-primary/90 mb-1">Steakhouse</h5>
                    <p>Orta ve üst düzeye hitap eder. Kaliteli et ve özel atmosfer fark yaratır.</p>
                </div>
                <div>
                    <h5 className="font-bold text-primary/90 mb-1">Pizzacı</h5>
                    <p>İyi bir pizza ustası ve kaliteli malzemeler başarının anahtarıdır.</p>
                </div>
                <div>
                    <h5 className="font-bold text-primary/90 mb-1">Kahve Evi</h5>
                    <p>Dünyanın en popüler içeceğiyle yüksek kar marjı ve yoğun trafik sağlar.</p>
                </div>
            </div>
        )
    },
    {
        id: 5,
        title: "İyi Hamburger Nasıl Yapılır?",
        date: "13 Şubat 2026",
        content: (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">Antrikottan Hazırlayın:</strong> Gerçek hamburger, kaliteli ve yağlı biftektir. %80 et, %20 yağ oranı idealdir.</p>
                <p><strong className="text-foreground">Eti Yoğurmayın:</strong> Kıymanın içine hiçbir şey eklemeyin. Sadece hafifçe sıkarak form verin ve ortasına bir delik açın.</p>
                <p><strong className="text-foreground">Pişirme:</strong> İç ısı 70°C olmalı. Son dakikada kaliteli bir peynir ekleyip eritin.</p>
            </div>
        )
    },
    {
        id: 6,
        title: "Şeflerin Kullandıkları En Temel Mutfak Aletleri",
        date: "12 Şubat 2026",
        content: (
            <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Isı Ölçer:</strong> Doğru pişirme ısısını sağlamak için kritiktir.</li>
                <li><strong className="text-foreground">Cımbız:</strong> Hassas sunumlar ve mutfak estetiği için kullanılır.</li>
                <li><strong className="text-foreground">Blender & Robot:</strong> Şeflerin hızı ve pürüzsüz dokular için sağ koludur.</li>
                <li><strong className="text-foreground">Bıçaklar:</strong> Bir şefin gururu ve en önemli enstrümanıdır.</li>
            </ul>
        )
    },
    {
        id: 7,
        title: "Espresso Reçeteleri",
        date: "11 Şubat 2026",
        content: (
            <div className="space-y-4 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Standart Espresso:</strong> 7-7.5 gr kahve, 9 bar basınç, 24-27 saniye akış süresi.</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-white/5 rounded border border-white/5">
                        <span className="font-bold text-primary">Ristretto:</span> 15-20 ml, daha yoğun ve az acı.
                    </div>
                    <div className="p-3 bg-white/5 rounded border border-white/5">
                        <span className="font-bold text-primary">Macchiato:</span> Espresso üzerine süt köpüğü.
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 8,
        title: "Endüstriyel Bulaşık Makinası Alma Rehberi",
        date: "10 Şubat 2026",
        content: (
            <div className="space-y-3 text-sm text-muted-foreground">
                <p>Bulaşık makineleri mutfağın nabzıdır. Endüstriyel modeller 3 dakikada yıkama yaparak hızı korur.</p>
                <p><strong className="text-foreground">Giyotin Tip:</strong> Yüksek kapasiteli işletmeler için ideal.</p>
                <p><strong className="text-foreground">Set Altı:</strong> Kısıtlı alanlarda endüstriyel performans sunar.</p>
            </div>
        )
    },
    {
        id: 9,
        title: "Endüstriyel Fırın Seçimleri",
        date: "09 Şubat 2026",
        content: (
            <div className="space-y-3 text-sm text-muted-foreground">
                <p>İşletmenizin türüne göre seçim yapın: Restoranlar için kombi/buharlı, et lokantaları için kurutmayan fırınlar.</p>
                <p>Gazlı fırınlar sürekli ve yoğun kullanım için, elektrikli fırınlar ise daha hafif tempolu işletmeler için uygundur.</p>
            </div>
        )
    },
    {
        id: 10,
        title: "Polietilen Kesme Bloğu Çeşitleri",
        date: "08 Şubat 2026",
        content: (
            <div className="space-y-3 text-sm text-muted-foreground">
                <p>Renk kodları hijyenin anahtarıdır: <span className="text-red-500 font-bold">Kırmızı (Çiğ Et)</span>, <span className="text-green-500 font-bold">Yeşil (Sebze)</span>, <span className="text-blue-500 font-bold">Mavi (Balık)</span>.</p>
                <p>Derin çizikler oluştuğunda bakteri yuvası haline gelmemesi için bloğu mutlaka yenileyin.</p>
            </div>
        )
    },
    {
        id: 11,
        title: "Filtre Kahve Nasıl Yapılır?",
        date: "07 Şubat 2026",
        content: (
            <div className="space-y-3 text-sm text-muted-foreground">
                <p>İyi bir filtre kahve için taze çekirdek ve kaliteli bir makine şarttır. Suyu bir kez kaynatıp dinlendirerek (kireçsiz su) kullanın.</p>
                <p>Demleme sonrası bekletmeden servis etmek aromayı korumanın en iyi yoludur.</p>
            </div>
        )
    }
];

const NewsPage = () => {
    return (
        <div className="mt-[122px] md:pt-[130px] lg:pt-[140px] bg-background pb-20 text-foreground min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-12">
                <header className="mb-12 border-b border-black/10 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-primary">
                        HABERLER & BLOG
                    </h1>
                    <p className="mt-2 text-muted-foreground text-sm">
                        Profinoks dünyasından en son güncellemeler ve sektörel rehberler.
                    </p>
                </header>

                <div className="grid gap-8">
                    {newsItems.map((item) => (
                        <article
                            key={item.id}
                            className="group overflow-hidden rounded-xl border border-black/5 bg-white transition-all hover:border-primary/30 shadow-sm"
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-2 py-1 rounded">
                                        HABER #{item.id}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
                                        {item.date}
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h2>
                                <div className="border-t border-black/5 pt-6">
                                    {item.content}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
