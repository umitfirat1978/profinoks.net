import React from "react";

const CorporatePage = () => {
    return (
        <div className="mt-[122px] md:pt-[130px] lg:pt-[140px] bg-[#050505] pb-20 text-white min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-12">
                {/* HAKKIMIZDA */}
                <section className="mb-20">
                    <header className="mb-8 border-b border-primary/30 pb-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-primary">
                            HAKKIMIZDA
                        </h1>
                    </header>
                    <div className="space-y-6 text-white/80 leading-relaxed text-base md:text-lg">
                        <p>
                            Endüstriyel mutfak ekipmanları sektöründe 2010 yılında kurulan Profinoks Mutfak, yüksek kalite standartları, geçmiş tecrübeleri, ürün çeşitliliği ve proje tamamlama süreçleri ile kısa sürede sektöründe önemli başarılara imza atmıştır.
                        </p>
                        <p>
                            Yaptığımız tüm işlerde müşteri memnuniyetini esas alarak yalın bir endüstriyel mutfak firması olmanın dışında müşterilerimize ihtiyaç duydukları ürün ve proje üzerine danışmanlık hizmetleri de vererek ürün ve proje koordinasyonu sağlamaktayız. Ürettiğimiz ürün ve tamamladığımız projelerde kalite standartlarımızı önceden oluşturur, sonuca ulaşıncaya kadar bu kalite anlayışından taviz vermeden devam ettiririz.
                        </p>
                        <p>
                            Bize göre kalite yapılacak işin kanıtsanmış doğruluğunu ifade eder. Başka bir ifade ile başta sağlık ve can güvenliği olmak suretiyle insanların çok yönlü olarak ele alması gereken en önemli yaşam unsurudur. Kaliteden kasıt sadece ürün kalitesi olarak algılanmamalıdır. Bize göre kalite bir standarttır ve hayatın her alanında yer almalıdır.
                        </p>
                        <p>
                            İşte bu sebeple Profinoks Mutfak; Müşterilerin ihtiyacı olan ürünleri yüksek çeşitlilik ve kalite standartları ile müşterilerine sunmaktadır.
                        </p>
                        <p>
                            Mutfak sektöründe faaliyet gösteren firmamız sizlerinde katılımı ile başta işleyiş, düzen ve sistem dahilinde kalite bilincini çalışanlarına ve müşterilerine yaşatmak için gerekli her türlü alt yapı oluşumunu sağlayarak çalışmalarına devam edecektir.
                        </p>
                    </div>
                </section>

                {/* MİSYON & VİZYON */}
                <section className="mb-20">
                    <header className="mb-8 border-b border-primary/30 pb-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-primary">
                            MİSYON & VİZYON
                        </h2>
                    </header>

                    <div className="grid gap-12 md:grid-cols-2">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-primary pl-4">
                                MİSYONUMUZ
                            </h3>
                            <p className="text-white/80 leading-relaxed">
                                PROFİNOKS MUTFAK olarak üstlenmiş olduğumuz misyon; faaliyet gösterdiğimiz sektörde standardı yüksek ürün ve kalite odaklı hizmet anlayışı ile projeler üretmeye devam etmektir. Bu doğrultuda hedefimiz, çevreye ve evrensel değerlere karşı sorumluluklarımızı yerine getirmek, gelişen Türkiye’yle beraber hedeflerimize doğru büyüyerek ilerlemektir.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-primary pl-4">
                                VİZYONUMUZ
                            </h3>
                            <p className="text-white/80 leading-relaxed">
                                Kuruluşumuzdan bugüne firmamız “Üstün Hizmet, Kesin Çözüm ve Güven” sloganı üzerine şekillenmiştir. Bu vizyonun bizim için anlamı sunduğumuz ürün ve hizmetlerle piyasada bize duyulan güveni her gün hak etmek ve müşteri memnuniyetini sağlayarak daha ileri seviyelere taşımaktır.
                            </p>
                        </div>
                    </div>
                </section>

                {/* KALİTE POLİTİKAMIZ */}
                <section>
                    <header className="mb-8 border-b border-primary/30 pb-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase text-primary">
                            KALİTE POLİTİKAMIZ
                        </h2>
                    </header>
                    <div className="text-white/80 leading-relaxed">
                        <p className="mb-6 italic text-lg">
                            Profinoks Mutfak olarak en önemli ürünümüz KALİTE ‘dir. Kalite sürdürülebilir ve geliştirilebilir bir hizmet olduğunda anlam kazanır. Firmamızın sürdürülebilir kalite standartları ile çözüm odaklı projeler sunmaya devam edecektir.
                        </p>
                        <h4 className="text-white font-bold mb-4 uppercase">Kalite Politikalarımız;</h4>
                        <ul className="space-y-4">
                            {[
                                "KALİTE firmamızın kültürüdür. O ‘nu sürekli geliştireceğiz.",
                                "Müşteri isteklerini mümkün olan en kısa zamanda ve en iyi şekilde hazırlayacağız.",
                                "Hedeflerimiz doğrultusunda karşılaştığımız problemleri çözmenin yanında, problemin kaynağını araştırıp tekrarını önlemektir.",
                                "Çalışanlarımız için eğitim programları düzenleyerek tüm aşamalarda gelişimi birincil koşul olarak gerçekleştireceğiz.",
                                "Uluslararası standartlara uygun olarak imalatını yapmış olduğumuz mutfak ekipmanları ve aksesuar çeşitleri ile sizlere her zaman doğru olanı sağlayacağız."
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="text-primary mr-2 mt-1">●</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CorporatePage;
