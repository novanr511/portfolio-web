# Technical SEO Knowledge Hub — Editorial Plan

**Status:** planning document  
**Article language:** English, consistent with the portfolio  
**Planning language:** Indonesian  
**Byline:** Rachmadwipa Novandri  
**Positioning:** Technical SEO as web infrastructure engineering

## 1. Editorial direction

Bangun blueprint 32 chapter sebagai **seri artikel yang saling terhubung**, bukan satu artikel 15.000–25.000 kata. Satu hub menjadi peta belajar; setiap chapter menjadi artikel tersendiri yang menjawab satu kebutuhan pencarian dengan tuntas.

- **Hub/pillar:** `Technical SEO Engineering: From Web Request to Search Index` — sekitar 1.200–1.800 kata, berisi mental model, peta lapisan, jalur diagnosis singkat, dan tautan ke seluruh artikel seri. Jangan mengulang isi supporting articles.
- **Artikel teknis fokus:** target editorial 900–1.300 kata.
- **Artikel studi kasus/implementasi:** target editorial 1.200–1.700 kata karena perlu metode, bukti, dan hasil.
- **Artikel konsep sempit:** 700–1.000 kata bila pertanyaannya memang sederhana.

Rentang tersebut adalah batas kerja editorial agar bacaan tetap terarah—**bukan target ranking**. Google tidak menetapkan jumlah kata ideal. Jika jawaban lengkap hanya butuh 800 kata, jangan menambah filler.

Pembaca utama: Technical SEO Specialist, SEO Engineer, web developer, dan engineer yang perlu menemukan akar masalah crawlability, rendering, indexing, reliability, atau performance. Artikel harus membantu pembaca melakukan sesuatu setelah membaca, bukan sekadar mengenali istilah.

## 2. Standar isi per artikel

Gunakan kerangka ini untuk membuat brief, lalu draf setiap artikel:

1. **Search need:** tulis masalah pembaca sebagai pertanyaan nyata. Satu artikel = satu intent utama.
2. **Answer first:** jawab pertanyaan utama dalam 40–70 kata setelah pembuka singkat. Jelaskan batas atau pengecualian penting.
3. **Explain the system:** uraikan komponen dan alur request/data dengan diagram kecil bila membantu.
4. **Show the SEO consequence:** bedakan dampak pada akses, crawling, rendering, indexing, usability, dan ranking. Jangan menyebut korelasi sebagai sebab langsung.
5. **Diagnose or implement:** berikan satu prosedur yang bisa diulang—misalnya `curl`, `dig`, DevTools, log, atau Search Console—serta contoh output dan interpretasinya.
6. **Close the loop:** simpulkan keputusan praktis, risiko, dan tautan ke artikel lanjutan.

### SEO dan GEO editorial checklist

- Gunakan judul/H1 deskriptif dan slug pendek; target satu primary query serta 2–4 variasi pertanyaan alami. Jangan memaksakan exact-match berulang.
- Meta description sekitar 140–160 karakter sebagai batas editorial, bukan jaminan snippet. CMS saat ini menerima maksimal 180 karakter.
- H2 menjelaskan tahapan atau pertanyaan yang benar-benar dicari. Paragraf pendek, istilah teknis dijelaskan saat pertama muncul, dan tabel hanya dipakai untuk perbandingan yang membantu.
- Cantumkan tanggal dan tautan ke dokumentasi primer. Untuk klaim yang berubah, tulis tanggal pemeriksaan/sumber. Bedakan **fakta dokumentasi**, **hasil eksperimen**, dan **interpretasi penulis**.
- Tambahkan bukti orisinal jika tersedia: command dan output yang disanitasi, diagram buatan sendiri, konfigurasi minimal, hasil before/after, atau langkah reproduksi. Jangan mengaku melakukan pengujian yang belum dilakukan.
- Buat konten mudah dikutip dengan definisi ringkas, langkah bernomor, tabel keputusan, dan istilah yang konsisten. Ini membantu pembaca dan sistem jawaban memahami halaman, tetapi tidak menjamin kutipan atau posisi di AI answers.
- Google menyatakan praktik SEO dasar tetap berlaku untuk fitur AI Search dan tidak ada schema, file AI, atau optimasi khusus yang menjamin kemunculan. Jadi “GEO” di seri ini berarti informasi yang jelas, tepercaya, bisa diverifikasi, dan mudah ditemukan—bukan trik markup.
- Jangan menambahkan FAQ hanya untuk mengejar rich results. Gunakan FAQ hanya jika ada pertanyaan lanjutan yang belum terjawab di isi utama.
- Setiap artikel menautkan ke hub dan 2–3 artikel yang benar-benar relevan. Hindari menautkan hanya demi jumlah link.

### Rambu akurasi teknis

- Jaringan, DNS, sertifikat, uptime, dan server response terutama menentukan apakah halaman dapat diakses/dikirim dengan benar; jangan otomatis menyebut semuanya sebagai ranking factor langsung.
- `200 OK` tidak menjamin indexing. Sebut soft 404 sebagai kemungkinan yang harus diperiksa dari isi dan konteks, bukan label otomatis bagi setiap halaman kosong.
- Jangan menggambarkan detail internal pipeline atau queue Google melebihi yang diterangkan dokumentasi publik. Bedakan discovery, crawling, rendering, indexing, dan serving tanpa mengklaim kontrol penuh atas Google.
- Bahas crawl budget sebagai topik lanjutan yang utamanya relevan untuk inventory URL besar/sering berubah atau kasus crawl yang terukur—bukan checklist wajib untuk situs kecil.
- Structured data harus cocok dengan konten yang terlihat; valid tidak berarti pasti mendapat rich result.
- Pada kasus AI search, jangan menjanjikan ranking, citation, atau traffic. Ukur apa yang dapat diamati dan sebutkan keterbatasan atribusi.

## 3. Susunan knowledge hub

Pillar menautkan ke tujuh cluster. Tiap supporting article menautkan balik ke pillar dan ke tetangga cluster-nya.

1. **Web foundations:** 01–03
2. **Servers and delivery:** 04–06
3. **HTTP and rendering:** 07–09
4. **URLs and crawling:** 10–13
5. **Indexing and semantics:** 14–17
6. **Performance and observability:** 18–23
7. **Platforms and operations:** 24–32

Rencana ini tidak berarti menerbitkan 32 artikel sekaligus. Pada cadence dua artikel per bulan, ini adalah backlog sekitar 16 bulan. Mulai dari kebutuhan yang paling dekat dengan pengalaman dan bukti yang bisa ditunjukkan; tunda topik e-commerce, large-scale, atau platform tertentu bila belum ada eksperimen/lingkungan nyata.

## 4. Rencana per chapter / supporting article

### PART I — Web Infrastructure Fundamentals

#### 01. What Happens When a Crawler Requests a URL?
- **Intent/query:** `how a website request works`; pembaca ingin tahu apa yang terjadi dari URL sampai response.
- **Janji jawaban:** jelaskan request lifecycle tanpa menganggap browser dan crawler identik di semua langkah.
- **Isi/H2:** DNS lookup dan koneksi; TLS dan HTTP request; edge/origin/application membentuk response; browser atau renderer memproses HTML; titik kegagalan yang relevan untuk SEO.
- **Bukti:** diagram request lifecycle + `curl -v` yang disanitasi. **Panjang:** 900–1.200 kata.

#### 02. DNS for SEO: How Domain Resolution Works and How to Debug It
- **Intent/query:** `DNS lookup troubleshooting` / `DNS and website availability`; pembaca ingin tahu mengapa domain gagal atau menuju host salah.
- **Isi/H2:** resolver dan authoritative DNS; fungsi A/AAAA/CNAME/NS/TXT; TTL, cache, dan cutover; membaca hasil `dig`/`nslookup`; kapan masalah DNS menghentikan akses crawler.
- **Bukti:** contoh hasil `dig` untuk domain demo. Jangan menyebut “propagasi” sebagai perubahan serentak di seluruh dunia. **Panjang:** 900–1.200 kata.

#### 03. HTTPS, TLS, and SEO: Diagnose Certificates and Redirects
- **Intent/query:** `HTTPS certificate SEO issues`; pembaca menghadapi certificate warning, mixed content, atau redirect ke HTTP.
- **Isi/H2:** TLS/certificate chain secara ringkas; hostname dan masa berlaku sertifikat; HTTPS redirect dan canonical consistency; diagnosis dengan browser/`openssl`/`curl`; skenario migrasi HTTPS.
- **Bukti:** contoh output pemeriksaan sertifikat dan matriks varian http/https, www/non-www. Hindari klaim TLS sebagai faktor ranking tunggal. **Panjang:** 1.000–1.300 kata.

### PART II — Server, Hosting, and Content Delivery

#### 04. Web Server vs Application Server: Where SEO Errors Begin
- **Intent/query:** `web server vs application server`; pembaca perlu melokalisasi error antara proxy, runtime, app, dan database.
- **Isi/H2:** peran web server/reverse proxy; alur request ke runtime; kapan HTML statis vs dinamis dibuat; gejala timeout, crash, atau response kosong; langkah diagnosis dari status/header ke log.
- **Bukti:** diagram Nginx/reverse proxy → app → DB dan satu contoh response yang gagal. **Panjang:** 1.000–1.300 kata.

#### 05. CDN Caching and Googlebot: Avoid Origin Overload
- **Intent/query:** `CDN cache miss Googlebot`; pembaca baru memindahkan situs ke CDN dan melihat kenaikan request origin atau crawler errors.
- **Isi/H2:** edge, origin, hit/miss; cache key dan `Cache-Control`; cold-cache dan pre-warming; WAF/bot challenges; monitoring origin setelah cutover.
- **Bukti:** diagram cache hit/miss dan header contoh. Gunakan artikel Google tentang migrasi CDN (11 Nov 2026) sebagai contoh terkini, bukan aturan bahwa setiap CDN otomatis menaikkan crawl rate. **Panjang:** 1.200–1.500 kata.

#### 06. Website Uptime, 5xx Errors, and Crawl Reliability
- **Intent/query:** `5xx errors Googlebot` / `website downtime SEO`; pembaca ingin memisahkan isu ketersediaan dari masalah indexing.
- **Isi/H2:** bedakan 500/502/503/504; bagaimana server health memengaruhi fetch dan crawl capacity; pemeriksaan monitoring dan logs; respons saat outage; pencegahan lewat health checks dan capacity planning.
- **Bukti:** timeline insiden simulasi dan contoh metrik. Nyatakan dampak dengan kalibrasi; tidak semua gangguan singkat punya hasil ranking yang sama. **Panjang:** 900–1.200 kata.

### PART III — HTTP, Document, and Rendering

#### 07. HTTP Status Codes for SEO: Diagnose 200, Redirects, 404, and 5xx
- **Intent/query:** `HTTP status codes SEO`; pembaca ingin tahu status apa yang harus dikirim dan bagaimana mengujinya.
- **Isi/H2:** 200/204 dan batas artinya; redirect 301/302/307/308; 404 vs 410; 429 dan 5xx; soft 404 dan empty-success response; resep `curl -I -L` untuk diagnosis.
- **Bukti:** tabel status → arti → tindakan, dengan contoh redirect chain yang direproduksi. **Panjang:** 1.200–1.600 kata.

#### 08. JavaScript SEO: SSR, CSR, SSG, and ISR Explained
- **Intent/query:** `SSR vs CSR SEO`; pembaca harus memilih cara rendering untuk tipe halaman tertentu.
- **Isi/H2:** apa yang ada di HTML awal; CSR/SSR/SSG/ISR secara praktis; bagaimana Google memproses JavaScript menurut docs; metadata dan konten yang bergantung pada API; cara membandingkan source HTML dengan rendered page.
- **Bukti:** halaman demo dengan HTML awal dan hasil render, diuji tanpa JS dan dengan browser. Hindari klaim bahwa CSR pasti gagal atau SSR menjamin indexing. **Panjang:** 1.200–1.600 kata.

#### 09. Raw HTML vs Rendered DOM: What Can a Crawler Read?
- **Intent/query:** `view source vs rendered DOM SEO`; pembaca mencari konten, link, atau metadata yang baru muncul setelah JavaScript.
- **Isi/H2:** parsing HTML dan DOM; anchor `href` vs click handler; konten dan metadata hasil JS; resource/API yang gagal; langkah cek via View Source, DevTools, dan URL Inspection.
- **Bukti:** before/after kecil yang menunjukkan link yang dapat dan tidak dapat diikuti. **Panjang:** 900–1.200 kata.

### PART IV — URL Architecture and Crawling

#### 10. SEO URL Structure: Normalize Hostnames, Paths, and Parameters
- **Intent/query:** `SEO URL structure` / `URL normalization`; pembaca ingin menghindari versi URL duplikat dan parameter tak terkendali.
- **Isi/H2:** anatomi URL; aturan konsistensi scheme/host/trailing slash; query parameters dan tracking; pola URL stabil; pemeriksaan redirect, internal links, sitemap, dan canonical.
- **Bukti:** contoh satu URL kanonis dan varian-varian yang dialihkan/dikendalikan. **Panjang:** 900–1.200 kata.

#### 11. How Googlebot Discovers and Crawls Pages
- **Intent/query:** `how Googlebot finds pages`; pembaca ingin tahu hubungan internal links, sitemap, dan proses crawl.
- **Isi/H2:** URL discovery; crawl request dan response; peran internal links/sitemap; faktor akses dan crawl demand; cara melihat bukti di Search Console dan logs.
- **Bukti:** graf mini discovery dari homepage ke artikel dan pemeriksaan link crawlable. Jangan menjanjikan sitemap submission = crawling. **Panjang:** 1.000–1.300 kata.

#### 12. Robots.txt vs Noindex vs Sitemap: What Each One Does
- **Intent/query:** `robots.txt vs noindex`; pembaca ingin mencegah crawl atau index dengan mekanisme yang benar.
- **Isi/H2:** robots.txt mengatur crawl; `noindex` mengatur eligibility indexing setelah halaman dapat dibaca; sitemap membantu discovery; contoh konflik umum; checklist validasi robots dan page directives.
- **Bukti:** tabel tujuan → kontrol yang sesuai dan tes `curl`. Tegaskan robots.txt bukan kontrol akses atau jaminan penghapusan dari index. **Panjang:** 1.000–1.300 kata.

#### 13. Crawl Budget: When It Matters and How to Diagnose It
- **Intent/query:** `crawl budget optimization`; pembaca perlu tahu apakah situsnya punya masalah kapasitas atau inventory.
- **Isi/H2:** definisi capacity vs demand; skala/kondisi yang membuatnya relevan; URL traps/duplicates; host health dan 5xx/429; analisis Crawl Stats dan logs; prioritas perbaikan.
- **Bukti:** contoh hitungan URL inventory, bukan angka ambang yang diperlakukan mutlak. Mulai dengan klarifikasi bahwa banyak situs kecil tidak perlu mengoptimalkan crawl budget. **Panjang:** 1.100–1.400 kata.

### PART V — Indexing and Search Engine Understanding

#### 14. Discovered, Crawled, Rendered, Indexed: Why the Stages Differ
- **Intent/query:** `crawled but not indexed`; pembaca ingin memahami apa yang diketahui dan belum diketahui Search Console.
- **Isi/H2:** discovery vs fetch; rendering dan ekstraksi; canonical/duplicate processing; indexing bukan serving; daftar diagnosis untuk status “not indexed”.
- **Bukti:** decision tree dari URL Inspection + contoh status yang dibedakan. Jangan menjanjikan bahwa request indexing akan membuat halaman masuk index. **Panjang:** 1.000–1.300 kata.

#### 15. Canonical Tags and Duplicate URLs: Signals, Not Commands
- **Intent/query:** `canonical tag SEO`; pembaca perlu memilih URL utama dan memperbaiki sinyal yang bertentangan.
- **Isi/H2:** duplicate cluster dan canonical selection; redirect, `rel=canonical`, sitemap sebagai sinyal dengan kekuatan berbeda; self-canonical dan konsistensi internal links; common mistakes; diagnosis URL Inspection.
- **Bukti:** matriks sinyal untuk beberapa varian URL dan contoh canonical valid. **Panjang:** 1.100–1.400 kata.

#### 16. Hreflang for International SEO: Build Valid Language Clusters
- **Intent/query:** `hreflang implementation`; pembaca ingin menyajikan versi bahasa/region yang tepat tanpa canonical conflict.
- **Isi/H2:** locale URL architecture; language/region codes; self and reciprocal references; HTML vs sitemap implementation; validasi loop, canonical, dan URL live.
- **Bukti:** diagram cluster tiga locale dan contoh tag yang tervalidasi. Jangan mengandalkan IP redirect sebagai pengganti URL versi bahasa. **Panjang:** 1.100–1.400 kata.

#### 17. Structured Data and Schema.org: What It Can—and Cannot—Do
- **Intent/query:** `structured data SEO`; pembaca ingin tahu kapan JSON-LD berguna dan apa yang tidak dijaminnya.
- **Isi/H2:** data terstruktur vs teks biasa; pilih tipe yang sesuai; implementasi JSON-LD dan entity IDs; kecocokan dengan konten terlihat; Rich Results Test dan batas hasil.
- **Bukti:** satu `Article`/`BlogPosting` contoh yang berasal dari data artikel nyata. Jelaskan bahwa valid markup bukan jaminan rich result atau ranking. **Panjang:** 1.000–1.300 kata.

### PART VI — Performance and Observability

#### 18. Web Performance from DNS to Browser: Find the Slow Layer
- **Intent/query:** `diagnose website performance bottleneck`; pembaca perlu menentukan apakah lambatnya di network, server, app, atau browser.
- **Isi/H2:** breakdown waktu request; DNS/connect/TLS/TTFB; backend dan cache; blocking resources/main thread; waterfall yang membantu menemukan bottleneck.
- **Bukti:** satu waterfall DevTools/WebPageTest dengan setiap fase diberi label. Hindari menyamakan satu skor lab dengan pengalaman semua pengguna. **Panjang:** 1.000–1.300 kata.

#### 19. Core Web Vitals: Diagnose LCP, INP, and CLS
- **Intent/query:** `Core Web Vitals troubleshooting`; pembaca ingin menemukan penyebab, bukan hanya melihat skor.
- **Isi/H2:** definisi dan ambang good terbaru; diagnosis LCP; breakdown INP; sumber CLS; data lab vs field/CrUX; pilih perbaikan dari bottleneck.
- **Bukti:** Lighthouse + field-data example dengan mobile/desktop dipisahkan. Cantumkan tanggal cek ambang. Jangan menyatakan CWV bagus otomatis memberi ranking. **Panjang:** 1.200–1.500 kata.

#### 20. Mobile-First Indexing: Check Content and Rendering Parity
- **Intent/query:** `mobile-first indexing checklist`; pembaca ingin memastikan Google dapat mengambil versi mobile yang sama pentingnya.
- **Isi/H2:** arti mobile-first; paritas konten/metadata/structured data; mobile crawl resources; lazy loading dan interaksi; pengujian viewport dan URL Inspection.
- **Bukti:** tabel parity mobile-vs-desktop untuk satu halaman. Fokus ke akses dan kesamaan informasi, bukan memiliki URL m-dot. **Panjang:** 900–1.200 kata.

#### 21. Server Logs for SEO: See What Googlebot Requests
- **Intent/query:** `analyze Googlebot server logs`; pembaca ingin bukti request, status, dan pola crawl dari server.
- **Isi/H2:** field access log; mengenali dan memverifikasi Googlebot; parsing request per URL/status; menemukan 5xx, 404, redirect, parameter; mengubah temuan menjadi tindakan.
- **Bukti:** dataset log sintetik/sanitized + skrip Python kecil. Jangan pernah menampilkan IP/token/log pelanggan yang sensitif. **Panjang:** 1.200–1.600 kata.

#### 22. Google Search Console for Technical SEO: A Diagnostic Workflow
- **Intent/query:** `Google Search Console technical SEO`; pembaca ingin tahu laporan mana yang dipakai untuk diagnosis tertentu.
- **Isi/H2:** URL Inspection; Page Indexing; Sitemaps; Crawl Stats; CWV; alur dari gejala → laporan → verifikasi server → tindakan.
- **Bukti:** checklist troubleshooting dan screenshot yang menyembunyikan data pribadi. Terangkan batas sampel dan delay data. **Panjang:** 1.000–1.300 kata.

#### 23. SEO Observability: Turn Logs and Checks into Useful Alerts
- **Intent/query:** `SEO monitoring and alerting`; pembaca ingin mengubah audit berkala menjadi pemeriksaan berkelanjutan.
- **Isi/H2:** bedakan metrics/logs/traces; pilih sedikit indikator yang actionable; sumber data Search Console/CDN/app; alert threshold dan escalation; contoh dashboard sederhana.
- **Bukti:** diagram pipeline mini dan 3 alert yang bisa dijalankan. Hindari dashboard besar tanpa keputusan yang dipicu. **Panjang:** 1.100–1.400 kata.

### PART VII — Platform Implementations and SEO Operations

#### 24. WordPress Technical SEO: From Permalink to HTML Response
- **Intent/query:** `WordPress technical SEO troubleshooting`; pembaca ingin menemukan bagian sistem WordPress yang membuat URL/metadata/error.
- **Isi/H2:** request lifecycle PHP–WordPress–database; rewrite/permalink dan query; tema/plugin dan metadata/sitemap; cache dan performance; urutan debug tanpa langsung menonaktifkan semua plugin.
- **Bukti:** staging WordPress bersih + contoh log/config yang diuji. Jika belum ada pengalaman langsung, tandai sebagai lab tutorial, bukan klaim pengalaman klien. **Panjang:** 1.200–1.600 kata.

#### 25. Technical SEO for Next.js and Headless CMS
- **Intent/query:** `Next.js technical SEO` / `headless CMS SEO`; pembaca butuh setup metadata, canonical, sitemap, rendering, dan preview yang tepat.
- **Isi/H2:** siapa pemilik URL publik pada arsitektur headless; metadata/SSR/SSG/ISR; canonical dan sitemap dari data CMS; cache/revalidation dan stale content; test HTML hasil build/deploy.
- **Bukti:** implementasi yang benar-benar diuji di portfolio ini—misalnya metadata, sitemap, static verification file—dan repo link. Jangan menampilkan secret atau endpoint admin. **Panjang:** 1.300–1.700 kata.

#### 26. E-commerce Technical SEO: Product URLs and Faceted Navigation
- **Intent/query:** `ecommerce faceted navigation SEO`; pembaca mengelola katalog dan kombinasi filter yang menghasilkan banyak URL.
- **Isi/H2:** product/variant inventory; filter vs sort vs pagination; URL explosion/crawl traps; canonical/indexability trade-offs; monitoring stok, redirect, dan schema.
- **Bukti:** katalog demo dengan peta URL dan aturan keputusan. **Prioritas rendah** sampai tersedia contoh nyata/dataset yang dapat dibagikan. **Panjang:** 1.200–1.600 kata.

#### 27. Website Migration SEO: Infrastructure Checklist Before and After Launch
- **Intent/query:** `website migration SEO checklist`; pembaca akan mengganti domain, CMS, hosting, CDN, atau URL.
- **Isi/H2:** inventaris/baseline sebelum pindah; mapping URL dan redirect; DNS/TLS/robots/canonical/sitemap; launch-day tests; monitoring pasca-migrasi dan rollback criteria.
- **Bukti:** checklist berbasis staging/demo, contoh mapping old→new dan validasi otomatis. Jangan gunakan satu trafik case sebagai jaminan outcome universal. **Panjang:** 1.300–1.700 kata.

#### 28. SEO Regression Tests in CI/CD: Catch Errors Before Release
- **Intent/query:** `automated SEO tests CI/CD`; pembaca ingin mencegah deploy yang menghapus metadata, merusak sitemap, atau membuat route gagal.
- **Isi/H2:** pilih invariants yang penting; HTTP/metadata/canonical/robots tests; sitemap link checks; rendered HTML/schema checks; GitHub Actions workflow dan post-deploy smoke tests.
- **Bukti:** workflow minimal yang dijalankan pada repo demo/portfolio. Sertakan false positives dan secrets handling. **Panjang:** 1.200–1.600 kata.

#### 29. A Technical SEO Audit That Follows the Request Path
- **Intent/query:** `technical SEO audit process`; pembaca ingin urutan audit berbasis risiko, bukan spreadsheet ratusan warning.
- **Isi/H2:** scope dan baseline; mulai dari DNS/HTTP/server; rendering/document; crawl/index; prioritization berdasar dampak dan bukti; laporan yang menghubungkan root cause ke owner/test.
- **Bukti:** audit satu situs demo dengan temuan prioritas P0/P1/P2. Jangan melakukan audit menyeluruh situs pihak lain tanpa izin. **Panjang:** 1.300–1.700 kata.

#### 30. Three Technical SEO Bugs Diagnosed from Symptom to Root Cause
- **Intent/query:** `technical SEO debugging examples`; pembaca ingin belajar menalar gejala yang tampak sama tetapi akar penyebab berbeda.
- **Isi/H2:** halaman 200 tetapi isi gagal dirender; Googlebot mendapat 403 dari WAF; canonical/sitemap/redirect tidak konsisten; untuk setiap kasus: symptom → hypotheses → tests → root cause → fix → regression test.
- **Bukti:** minimal 3 reproduksi yang dibuat atau benar-benar diamati; beri label jelas jika kasus simulasi. **Panjang:** 1.300–1.700 kata.

#### 31. Technical SEO at Scale: URL Inventory, Capacity, and Observability
- **Intent/query:** `technical SEO at scale`; pembaca menangani situs besar/sering berubah dan perlu mengalokasikan crawler/origin capacity.
- **Isi/H2:** kapan topik skala relevan; inventory dan URL generation; demand vs capacity; log/sample/BigQuery analysis; prioritas crawl, cache, dan server.
- **Bukti:** contoh data sintetis atau anonymized; gunakan crawl-budget docs untuk konteks dan batas. **Panjang:** 1.200–1.600 kata. Jangan sarankan strategi enterprise untuk blog kecil.

#### 32. AI Search and Technical SEO: What Website Owners Should Actually Do
- **Intent/query:** `AI search SEO requirements` / `GEO technical SEO`; pembaca ingin membedakan panduan resmi dari klaim optimasi AI yang belum terbukti.
- **Isi/H2:** apa yang Google nyatakan tentang AI Overviews/AI Mode; syarat dasar crawl/index/snippet; konten first-hand, sumber, dan struktur yang jelas; kontrol crawling/preview; cara mengukur Search Console dan batas atribusi.
- **Bukti:** checklist berdasarkan Google AI features guidance dan contoh halaman yang dapat diakses. Tegaskan tak ada file/schema khusus yang menjamin citation; jangan menggeneralisasi mekanisme Google ke semua answer engine. **Panjang:** 1.000–1.300 kata.

## 5. Urutan produksi yang disarankan

### Batch 1 — fondasi dan kebutuhan paling umum

1. Hub/pillar.
2. 01 — request lifecycle.
3. 07 — HTTP status codes.
4. 08 — rendering architecture.
5. 11 — crawling and discovery.
6. 12 — robots/noindex/sitemap.
7. 14 — crawled vs indexed.
8. 25 — Next.js/headless implementation (gunakan bukti dari portfolio).

### Batch 2 — diagnosis dan implementasi lanjutan

02 DNS; 03 HTTPS/TLS; 04 server/app; 05 CDN; 09 HTML/DOM; 10 URLs; 15 canonical; 17 structured data; 18 performance; 19 Core Web Vitals; 22 Search Console.

### Batch 3 — operasi, skala, dan niche

06 reliability; 13 crawl budget; 16 international; 20 mobile; 21 logs; 23 observability; 24 WordPress; 26 e-commerce; 27 migration; 28 CI/CD; 29 audit; 30 debugging cases; 31 scale; 32 AI Search/GEO.

Jalankan keyword/intent validation sebelum tiap batch dengan data Search Console setelah properti terverifikasi, autocomplete/PAA, dan hasil pencarian aktual. Prioritaskan query yang sesuai pengalaman penulis, bukan sekadar volume besar. Bila dua topik menjawab intent yang sama, gabungkan atau bedakan jelas dengan contoh/use case agar tidak saling bersaing.

## 6. Reference map — sumber primer

Gunakan halaman dokumentasi hidup sebagai sumber; buka ulang saat artikel ditulis karena dokumentasi dapat berubah. Cantumkan sumber tepat pada klaim terkait, bukan daftar link tanpa konteks di akhir.

- **Search lifecycle, helpful content, AI Search:** [How Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works), [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features). Relevan untuk 01, 08–14, 17, 22, 29–32.
- **Crawling, robots, sitemap, URLs:** [Crawl budget](https://developers.google.com/crawling/docs/crawl-budget), [Robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot), [URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure), [Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable). Relevan untuk 10–16, 21–23, 26, 31.
- **HTTP, indexing, canonical, structured data:** [HTTP status codes for Google Search](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes), [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). Relevan untuk 07, 09, 14–17, 27–30.
- **Current CDN example:** [Google Search Central — Crawling the web during a CDN migration](https://developers.google.com/search/blog/2026/11/crawling-cdn), published 11 Nov 2026. Relevan untuk 05; treat as one documented scenario, not a universal performance rule.
- **Web protocols:** [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP), [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110), [RFC 8446 — TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446). Relevan untuk 01–04, 07, 18.
- **Performance:** [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), [web.dev — Web Vitals](https://web.dev/articles/vitals). Relevan untuk 18–20.
- **Framework/platform:** [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata), [Next.js rendering](https://nextjs.org/docs/app), [WordPress Developer Resources](https://developer.wordpress.org/), [Schema.org](https://schema.org/). Relevan untuk 17, 24–28.

## 7. Measurement and refresh loop

- **Before publishing:** confirm the exact question/query, inspect current results, list authoritative sources, and define what original evidence the article adds.
- **At publish:** validate title/description/slug, rendered HTML, canonical, sitemap inclusion, internal links, code snippets, and mobile readability.
- **After indexing:** check Search Console impressions/clicks/queries and indexing status; record the baseline rather than judging after a few days.
- **Quarterly:** refresh only when a source, API, threshold, or implementation has materially changed. Add an `updated` date only after a substantive update.
- **Success criteria:** readers can diagnose or implement the task; examples reproduce; search queries match the article's intent; organic visibility is a measured outcome, not a promised deliverable.
