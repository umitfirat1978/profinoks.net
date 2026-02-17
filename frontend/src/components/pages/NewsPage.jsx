import React from "react";

const NewsPage = () => {
    return (
        <div className="mt-[122px] md:pt-[130px] lg:pt-[140px] bg-[#050505] pb-20 text-white min-h-screen">
            <div className="mx-auto max-w-5xl px-4 py-12">
                <header className="mb-16 border-b border-amber-500/30 pb-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-amber-500">
                        HABERLER & BLOG
                    </h1>
                    <p className="mt-4 text-white/50 text-sm tracking-[0.2em] uppercase">
                        Endüstriyel Mutfak Dünyasından Güncel Bilgiler ve Rehberler
                    </p>
                </header>

                <div className="space-y-24">
                    {/* 1. Hizmet Alanları & Fimak */}
                    <section>
                        <div className="grid gap-12 lg:grid-cols-[1fr,1.5fr]">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
                                <h2 className="text-2xl font-bold text-amber-400 mb-6 uppercase">
                                    Endüstriyel Mutfak Projesi Hizmet Alanları
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/70">
                                    {[
                                        "Restoran mutfağı", "Otel Mutfağı", "Steakhouse mutfağı", "Askeri tesis mutfağı",
                                        "Bar Projeleri", "Hastane mutfakları", "Fastfood ekipmanları", "Okul mutfak projeleri",
                                        "Yurt mutfakları", "Burger mutfağı", "Pastane mutfağı", "Cafe mutfağı",
                                        "Dinlenme tesisi mutfağı", "Catering mutfağı", "Horeca mutfağı", "Fırın Ekipmanları",
                                        "Dönerci Mutfakları", "Paslanmaz mutfaklar", "Mutfak Danışmanlığı"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center space-x-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-center">
                                <h2 className="text-3xl font-bold text-white mb-6 uppercase border-l-4 border-amber-500 pl-4">
                                    Fimak Ürünleri Profinoks'ta
                                </h2>
                                <div className="space-y-4 text-white/80 leading-relaxed italic border-b border-white/5 pb-6 mb-6">
                                    <p className="font-semibold text-amber-400">GEÇMİŞTEN BUGÜNE, HAMURA ŞEKİL VEREN TEKNOLOJİ...</p>
                                    <p>
                                        1976 yılında başladığı fırın makineleri imalatında bugün 45.000 m2 toplam alan üzerine kurulmuş FİMAK fabrikasında, uzman kadrosu ile günümüzün en son teknolojilerini kullanarak üretilen FİMAK ürünleri artık PROFİNOKS'ta..
                                    </p>
                                </div>
                                <div className="space-y-4 text-white/70 text-sm leading-relaxed">
                                    <p>
                                        Fimak günümüzde unlu mamul, fırıncılık, pastanecilik, restoran zincirleri, kafe, otel, catering alanlarında hizmet vermektedir. Fimak Retros adlı gastronomi fırını ile de gastronomi makinaları alanında da hizmet vermeye başlamıştır.
                                    </p>
                                    <p>
                                        Fimak 2017 Temmuz ayında Sanayi Bakanlığı onaylı Türkiye'deki AR-GE merkezlerinden biri olmaya hak kazanmıştır. Dünyanın 65 ülkesine ihracat yapmakta ve ABD pazarında da faaliyetlerini sürdürmektedir.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Bayat Ekmek Yemek Tarifleri */}
                    <section className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-10">
                        <h2 className="text-3xl font-bold text-amber-500 mb-8 uppercase text-center">
                            Bayat Ekmek Yemek Tarifleri
                        </h2>
                        <div className="mx-auto max-w-3xl">
                            <h3 className="text-xl font-bold text-white mb-4">Bayat Ekmek Böreği</h3>
                            <div className="mb-8 rounded-lg bg-amber-500/10 p-6 border border-amber-500/20">
                                <h4 className="font-bold text-amber-400 mb-3 uppercase text-xs tracking-widest">Malzemeler</h4>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-white/90">
                                    <li>● 1 adet bayat ekmek</li>
                                    <li>● 200 gr kaşar rendesi</li>
                                    <li>● 200 gr beyaz peynir</li>
                                    <li>● 1,5 su bardağı süt</li>
                                    <li>● 2 yumurta</li>
                                </ul>
                            </div>
                            <div className="space-y-4 text-white/80 leading-relaxed text-sm">
                                <p>
                                    Ekmeklerin ziyan olması her yıl milyonlarca liranın çöpe gitmesine neden oluyor. Ekmekleri ziyan etmemek için ihtiyacımız kadarını almayı öğrenmeliyiz. Artan ekmekleri dondurucuya atabilir veya kurutup ekmek kırığı yapabilirsiniz.
                                </p>
                                <p>
                                    Eğer çok fazla değilse kalan ekmeklerinizle bu nefis böreği deneyin. Süt miktarını ekmeklerin kuruluk derecesine göre kontrollü olarak ekleyin. Afiyet olsun!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 3. Restoran Konseptleri */}
                    <section>
                        <h2 className="text-3xl font-bold text-white mb-10 uppercase text-center">
                            Restoran Konseptleri
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "Deniz Ürünleri", text: "Hızlı servisten üst düzeye kadar seçenekler sunar. Tazelik ve kalite standartları kritik öneme sahiptir." },
                                { title: "Steakhouse", text: "Orta ve üst düzeye hitap eder. Kaliteli et ve özel atmosfer konuklara kendilerini özel hissettirir." },
                                { title: "Aile Restoranları", text: "Makul fiyatlar ve masaya servis ile her yaş grubuna hitap eden rahat mekanlardır." },
                                { title: "Etnik Restoranlar", text: "İtalyan, Çin, Meksika gibi farklı kültürlerin lezzetlerini sunan karlı konseptlerdir." },
                                { title: "Pizzacı", text: "Self servis veya full servis olabilir. Kaliteli malzeme ve iyi bir usta başarının anahtarıdır." },
                                { title: "Sandiviççi", text: "Kar marjı yüksek, trendlere kolay ayak uyduran ve dışarı servis imkanı sunan işletmelerdir." },
                                { title: "Kahve Evi", text: "Dünyanın en popüler içeceği kahve ile yüksek kar marjı ve yoğun müşteri trafiği sağlar." },
                                { title: "Fırın", text: "Taze unlu mamullerle rekabetçi bir piyasada fark yaratmayı gerektiren konseptlerdir." }
                            ].map((item, i) => (
                                <div key={i} className="rounded-lg border border-white/5 bg-[#111] p-6 hover:border-amber-500/30 transition-colors">
                                    <h3 className="text-lg font-bold text-amber-400 mb-3">{item.title}</h3>
                                    <p className="text-sm text-white/60 leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-center text-white/50 text-xs italic">
                            Restoran açma fikrinde olanlar, kendi bilgi ve deneyimlerine en uygun konsepti seçmelidirler.
                        </p>
                    </section>

                    {/* 4. İyi Hamburger Nasıl Yapılır? */}
                    <section className="grid gap-12 lg:grid-cols-2 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-amber-500 mb-8 uppercase">
                                İyi Hamburger Nasıl Yapılır?
                            </h2>
                            <div className="space-y-6 text-white/80 text-sm leading-relaxed">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Antrikottan Hazırlayın</h3>
                                    <p>
                                        Gerçek hamburger, iri kıyma haline getirilmiş yağlı, kaliteli biftektir. Özellikle 'düve' antrikotu, iç dokuları yağlı olduğu için en iyi sonucu verir. İdeal oran: %80 et, %20 yağ.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Kıymayı İri Çektirin</h3>
                                    <p>
                                        İçin sulu kalması için 2 veya 3 numara ayna ile tek çekim yaptırın. Eti yoğurmayın! Sadece hafifçe sıkarak top yapın ve bastırın.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-8">
                            <h3 className="text-lg font-bold text-amber-400 mb-4 uppercase">Püf Noktaları</h3>
                            <ul className="space-y-4 text-sm text-white/70">
                                <li className="flex gap-3">
                                    <span className="text-amber-500 font-bold">01</span>
                                    <span>Eti hiç yoğurmayın, içine hiçbir şey eklemeyin.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-amber-500 font-bold">02</span>
                                    <span>Etin ortasına parmağınızla bir delik açın ki pişerken toplanmasın.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-amber-500 font-bold">03</span>
                                    <span>İç ısısı 70°C olmalı. Pişmenin son dakikasında kaliteli bir peynir ekleyin.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-amber-500 font-bold">04</span>
                                    <span>Dijon hardalı ve ketçap ile servis yapın.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 5. Mutfak Aletleri */}
                    <section className="border-y border-white/5 py-16">
                        <h2 className="text-3xl font-bold text-white mb-10 uppercase text-center">
                            Şeflerin En Temel Mutfak Aletleri
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "Isı Ölçer", text: "Doğru ısıda pişimi ayarlamak için vazgeçilmezdir." },
                                { title: "Cımbız", text: "Hassas sunumlar ve detaylar için şeflerin gizli yardımcısı." },
                                { title: "Blender", text: "İşleri hızlandıran, şefin eli ayağı olan robotlar." },
                                { title: "Mutfak Tartısı", text: "Ölçülü ve standart lezzetler için geleneksel ve dijital tartılar." },
                                { title: "Sorbe Makinası", text: "Pürüzsüz püreler ve pürüzsüz tatlar için ideal." },
                                { title: "Bıçaklar", text: "Bir şefin gururu. Her iş için ayrı, keskin ve kaliteli bir bıçak." }
                            ].map((item, i) => (
                                <div key={i} className="text-center group">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                                        <span className="text-xl font-bold">{i + 1}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed px-4">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 6. Espresso & Kahve */}
                    <section>
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold text-amber-500 uppercase">Espresso Reçeteleri</h2>
                                <div className="space-y-4 text-sm text-white/80 leading-relaxed">
                                    <p className="font-bold text-white uppercase italic">Altın Kural: 7-7.5 gr kahve, 9 bar basınç, 24-27 saniye akış.</p>
                                    <p>Doğru espresso kremsi, fındık kabuğu renginde ve pürüzsüz olmalıdır.</p>
                                    <div className="grid gap-4 pt-4">
                                        <div className="rounded border border-white/5 p-4 bg-white/5">
                                            <h4 className="font-bold text-amber-400">Ristretto (15-20 ml)</h4>
                                            <p className="text-xs text-white/60">Daha yoğun ve az acı tat.</p>
                                        </div>
                                        <div className="rounded border border-white/5 p-4 bg-white/5">
                                            <h4 className="font-bold text-amber-400">Macchiato</h4>
                                            <p className="text-xs text-white/60">Espresso üzerine 1-2 kaşık süt köpüğü.</p>
                                        </div>
                                        <div className="rounded border border-white/5 p-4 bg-white/5">
                                            <h4 className="font-bold text-amber-400">Lungo (50-70 ml)</h4>
                                            <p className="text-xs text-white/60">Daha fazla su ile daha acı bir tat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold text-amber-500 uppercase">Filtre Kahve Rehberi</h2>
                                <div className="space-y-4 text-sm text-white/80 leading-relaxed">
                                    <p>1908'de Melitta Bentz tarafından keşfedilen bu yöntem, günümüzde French Press, Chemex ve otomatik makinelerle demlenir.</p>
                                    <div className="rounded-xl border border-white/10 bg-amber-500/5 p-6">
                                        <h4 className="font-bold text-white mb-3 underline decoration-amber-500">İyi bir demleme için:</h4>
                                        <ul className="space-y-3 text-xs">
                                            <li>● Kireçsiz su (Mümkünse hazır su) kullanın.</li>
                                            <li>● Kağıt filtreleri her seferinde yenileyin.</li>
                                            <li>● Makinenizi her kullanımdan sonra temizleyin.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 7. Bulaşık Makinesi & Fırın Seçimi */}
                    <section className="rounded-2xl bg-[#111] p-8 md:p-12">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6 uppercase">Endüstriyel Bulaşık Makinesi</h2>
                                <div className="space-y-4 text-sm text-white/70">
                                    <p>Mekanınızın kabusa dönmemesi için doğru makine seçimi kritiktir. Endüstriyel makineler 3 dakikada yıkama yapar.</p>
                                    <div className="grid gap-4 mt-6">
                                        <div className="border-l-2 border-amber-500 pl-4">
                                            <h4 className="font-bold text-white">Giyotin Tip</h4>
                                            <p>Yüksek kapasite ve yer sorunu olmayan işletmeler için hız garantisi sunar.</p>
                                        </div>
                                        <div className="border-l-2 border-amber-500 pl-4">
                                            <h4 className="font-bold text-white">Set Altı Tip</h4>
                                            <p>Kısıtlı alanda ev tipi rahatlığı ve endüstriyel performans sağlar.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6 uppercase">Fırın Seçim Rehberi</h2>
                                <div className="space-y-4 text-sm text-white/70">
                                    <p>İşletmenizin temposuna göre gazlı (yoğun kullanım) veya elektrikli (hafif kullanım) seçenekleri değerlendirilmelidir.</p>
                                    <ul className="space-y-2 mt-4">
                                        <li><span className="text-amber-500">●</span> <span className="font-bold">Restoranlar:</span> Kombi/akıllı fırınlar.</li>
                                        <li><span className="text-amber-500">●</span> <span className="font-bold">Et Lokantaları:</span> Kurutmayan, mühürleme yapan fırınlar.</li>
                                        <li><span className="text-amber-500">●</span> <span className="font-bold">Pastaneler:</span> Patisserie tipi kombi fırınlar.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 8. Kesme Blokları */}
                    <section className="text-center">
                        <h2 className="text-3xl font-bold text-amber-500 mb-8 uppercase">Polietilen Kesme Bloğu Renk Kodları</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { color: "bg-white text-black", label: "Beyaz", use: "Unlu Mamüller" },
                                { color: "bg-yellow-400 text-black", label: "Sarı", use: "Pişmiş Et" },
                                { color: "bg-red-600", label: "Kırmızı", use: "Çiğ Et" },
                                { color: "bg-green-600", label: "Yeşil", use: "Çiğ Sebze" },
                                { color: "bg-blue-600", label: "Mavi", use: "Çiğ Balık" },
                                { color: "bg-[#4a2c2a]", label: "Kahve", use: "Sebzeler" }
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col items-center justify-center p-4 rounded shadow-lg w-32 ${item.color}`}>
                                    <span className="font-bold text-xs uppercase">{item.label}</span>
                                    <span className="text-[10px] opacity-80 mt-1">{item.use}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm text-white/50 max-w-2xl mx-auto italic">
                            Kesme bloğu derin çizikler aldığında bakteri oluşumunu önlemek için mutlaka değiştirilmelidir.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
