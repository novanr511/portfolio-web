# NOVANDRI — Pemetaan Feedback LLM & Rencana Tindak

Dokumen ini merangkum hasil audit eksternal dari tiga LLM (ChatGPT, Gemini, Claude) terhadap `novandri.com`, dipetakan ke kondisi aktual repository, lalu diterjemahkan menjadi rencana bertahap.

- **Tanggal:** 18 November 2026
- **Sumber feedback:**
  - ChatGPT — <https://chatgpt.com/share/6afd2837-b42c-83ec-a2e2-71c039b40101>
  - Gemini — <https://share.gemini.google/bKEdWfHe0DRF>
  - Claude — <https://claude.ai/share/6726b549-30fc-47b1-aa83-83b50e7c5bbc>
- **Status:** rencana disetujui untuk dibuat; **belum dieksekusi** (kecuali keputusan penamaan dicatat di bawah).

---

## 1. Kesimpulan bersama ketiga LLM

> Fondasi teknis sudah bagus, tetapi konten belum menunjukkan pengalaman nyata. Masalah utamanya bukan "kurang artikel", melainkan kualitas, fokus, dan bukti.

ChatGPT merangkum jarak yang harus dijembatani:

| Website yang menjelaskan pengetahuan | Website yang menghasilkan pengetahuan yang layak dijadikan referensi |
| --- | --- |
| Menjelaskan bagaimana RAG bekerja | Melakukan benchmark RAG dan menunjukkan hasilnya |
| Menjelaskan bagaimana Googlebot crawling | Menunjukkan analisis log, eksperimen, dan dokumentasi resmi |
| Mengatakan penulis berpengalaman | Menunjukkan proyek, implementasi, dan bukti hasil pekerjaan |

Target bersama: **`a technical knowledge publication built on real engineering experience, original experiments, verifiable research, and practical implementation.`**

Tidak ada jaminan situs akan selalu dikutip. Sasaran realistisnya adalah meningkatkan peluang menjadi salah satu sumber paling relevan dan terpercaya pada topik yang memang dikuasai.

---

## 2. Keputusan owner

| Keputusan | Nilai | Status |
| --- | --- | --- |
| Nama penulis final | **Rachmadwipa Novandri** | Disetujui 18 Nov 2026 — **belum diterapkan ke kode** |
| Nasib 489 artikel `Planned` | Ditunda | Belum diputuskan |
| Artikel di luar niche | Ditunda | Belum diputuskan |
| Metrik untuk case study Projects | Ditunda | Belum tersedia |
| Eksekusi Phase 0–4 | Ditunda | Menunggu keputusan lanjutan |

**Catatan penting:** di working tree saat ini ada perubahan belum di-commit di `src/lib/site.ts` yang mengubah `site.name` menjadi `"Novandri"`. Ini **bertentangan** dengan keputusan final di atas. Perubahan itu harus diselaraskan kembali ke `Rachmadwipa Novandri` (bersama title metadata, byline, dan `Person` schema) saat Phase 1 dieksekusi. Jangan meng-commit nilai `"Novandri"` sebagai identitas final.

---

## 3. Pemetaan temuan

| # | Temuan | Didukung oleh | Bukti aktual di repo | Dampak | Prioritas |
| --- | --- | --- | --- | --- | --- |
| 1 | Akses crawler tidak konsisten (parked-domain Hostinger / `PERMISSION_DENIED`) | ChatGPT + Gemini; Claude **tidak** mengalami | Perlu verifikasi langsung: DNS, canonical host, robots.txt, log Vercel | Blocker — konten bagus tak akan dikutip jika gagal di-fetch | **P0** |
| 2 | Halaman stub / "Planned" | Claude (paling keras), Gemini, ChatGPT | **489 file** bertag `Planned` + `"Reserved title for a future NOVANDRI article"`; 314 file memuat `"hypothetical and illustrative"` | Merusak persepsi kualitas seluruh situs | **P0** |
| 3 | Identitas penulis tidak konsisten | Claude, ChatGPT, Gemini | `site.name` = "Novandri" (WIP), title metadata = "Novandri R.", byline = "Rachmadwipa Novandri" | Entity ambiguity untuk LLM & Google | **P0** |
| 4 | Kesalahan referensi faktual | ChatGPT | `what-happens-when-a-crawler-requests-a-url.mdx:218` menyebut RFC 9293 sebagai "Domain Name System (DNS) Transport Protocol"; padahal RFC 9293 = TCP. Artikel lain sudah benar | Satu standar salah merusak trust seluruh artikel infrastruktur | **P0** |
| 5 | Topical dilution / tag berantakan | Semua | **518 tag unik**, termasuk `Planned`, `Finance`, `HR`, `Agriculture`, REIT, estate planning | Melemahkan topical authority | **P1** |
| 6 | Pola produksi massal | Claude, Gemini | **940/1000 artikel** terbit 16–18 Nov 2026; judul & deskripsi memakai template yang sama | Mudah dikenali sebagai konten massal → cenderung diabaikan | **P1** |
| 7 | Projects kosong | Semua | `src/lib/projects.ts` → `export const projects = []` | Klaim keahlian tidak punya pegangan | **P1** |
| 8 | Rujukan melingkar, tanpa data primer | Semua | Artikel 404 penuh "as the X article explains" ke artikel situs sendiri; kasus berlabel hypothetical | Information gain rendah = kurang layak dikutip | **P1** |
| 9 | Structured data belum lengkap | Semua | `WebSite`/`Person`/`Article` sudah ada (sedang diperbaiki), tapi belum ada `sameAs` LinkedIn/GitHub; `dateModified` tidak konsisten | Author entity sulit diverifikasi | **P1** |
| 10 | Blok "Direct answer / Key takeaways" | Gemini minta; Claude bilang **sudah ada** | Sudah ada di sebagian artikel → perlu standarisasi, bukan fitur baru | Token awal lebih mudah diekstrak sistem retrieval | **P2** |
| 11 | Citation intelligence belum ada | ChatGPT | Belum ada monitoring Bing AI Performance / GSC / UTM | Hasil strategi tidak terukur | **P2** |
| 12 | `llms.txt` | Gemini minta dibuat; ChatGPT bilang jangan diprioritaskan | **Sudah ada** (`/llms.txt` dan `/llms-full.txt` sesuai README) | Tidak ada kerjaan baru — cukup verifikasi akses | **P3** |
| 13 | Konten berbahasa Indonesia | Claude saja | Belum ada | Diferensiasi dengan kompetitor | **P3 (opsional)** |

---

## 4. Temuan yang saling bertentangan

1. **`llms.txt`** — Gemini menyarankan dibuat, ChatGPT menyarankan jangan diprioritaskan (Google menyatakan netral untuk visibilitas/ranking). Faktanya sudah ada. **Keputusan: verifikasi saja, jangan investasi waktu.**
2. **Parked-domain / akses gagal** — ChatGPT dan Gemini melihatnya, Claude tidak. Kemungkinan transient (deploy DNS/cache), bukan bukti semua pengunjung terdampak. **Jangan diasumsikan; harus diverifikasi dulu.**
3. **Blok "Direct answer"** — Claude memujinya sudah bagus, Gemini meminta ditambahkan. **Keputusan: standarisasi di artikel unggulan, bukan menambah fitur baru.**

---

## 5. Ketegangan dengan standar editorial internal

`docs/publication-wide-editorial-standard.md` saat ini mendefinisikan NOVANDRI sebagai **publikasi lintas delapan pilar** (technology, business, ideas, markets, human decisions) dengan byline `Rachmadwipa Novandri`. Saran LLM untuk "pilih satu niche sempit" (Claude) dan "kurangi artikel keuangan/makro" (Gemini) **bertentangan** dengan positioning tersebut.

Ini bukan kontradiksi yang harus diselesaikan sekarang. Yang perlu dicatat:

- Keputusan penamaan sudah bulat: **Rachmadwipa Novandri** — selaras dengan standar editorial yang sudah ada.
- Keputusan soal **cakupan topik** masih ditunda. Jika diputuskan mempersempit fokus, dokumen standar editorial harus ikut direvisi agar tidak bentrok dengan praktik produksi.

---

## 6. Rencana bertahap

### Phase 0 — Verifikasi & stop the bleeding (1–3 hari)

- [ ] Cek akses langsung: apex vs `www`, `/about`, dan 3 URL artikel yang disebut ChatGPT — status HTTP, pastikan bukan parked-domain
- [ ] Audit `robots.txt`, `sitemap.xml`, canonical, izin `OAI-SearchBot`, dan meta robots
- [ ] Cek access log Vercel per crawler (Googlebot, GPTBot, OAI-SearchBot, PerplexityBot)
- [ ] Putuskan nasib 489 artikel `Planned`: hapus permanen atau `noindex` dulu

**Output:** situs dapat diakses dan informasi dapat diverifikasi.

### Phase 1 — Trust & fondasi (minggu 1–2)

- [ ] Samakan identitas penulis di semua tempat → **Rachmadwipa Novandri** (site name, title metadata, byline, `Person` schema + `sameAs` LinkedIn/GitHub)
- [ ] Perbaiki RFC 9293 dan audit klaim angka (timeout DNS, latency, ambang performa) → beri sumber primer atau label *heuristic/ilustrasi*
- [ ] Standarisasi aturan referensi: tiap klaim penting dipetakan ke sumber primer (bukan daftar referensi tanpa hubungan ke klaim)
- [ ] Isi `Projects` dengan 3–4 case study nyata + metrik (LCP turun X→Y, indeksasi naik Z%, dll.)
- [ ] Bangun Author Profile yang memisahkan *demonstrated experience* dan *ongoing research*

**Output:** identitas dan pengalaman penulis lebih mudah dibuktikan.

### Phase 2 — Fokus & bukti (minggu 3–4)

- [ ] Putuskan dan terapkan restrukturisasi 518 tag → 4–6 pillar induk
- [ ] Tangani artikel di luar fokus yang disepakati: pindah ke situs terpisah atau `noindex`
- [ ] Hilangkan rujukan melingkar; ganti dengan sumber eksternal yang spesifik
- [ ] Standarisasi blok "Direct answer / Key takeaways" di artikel unggulan

**Output:** informasi yang lebih terfokus dan dapat diverifikasi.

### Phase 3 — Pengetahuan original (bulan 2)

- [ ] Publikasi 3–5 engineering experiments (benchmark dense vs hybrid RAG, dampak reranking, analisis crawl log, benchmark rendering Next.js)
- [ ] Sertakan metodologi, dataset, tabel metrik, kode, dan keterbatasan

**Output:** aset informasi original yang membedakan situs dari tutorial generik.

### Phase 4 — Pengukuran (bulan 3)

- [ ] Aktifkan Bing AI Performance (fitur Feb 2026) untuk melihat jumlah sitasi dan grounding query
- [ ] Pantau Google Search Console + referral `utm_source=chatgpt.com`
- [ ] Uji citation visibility secara berkala terhadap daftar pertanyaan target

**Output:** sistem pengukuran AI search visibility.

---

## 7. Status working tree saat dokumen dibuat

Perubahan belum di-commit (8 file):

| File | Perubahan |
| --- | --- |
| `src/lib/site.ts` | `site.name`: "Novandri R." → "Novandri" ⚠️ harus diselaraskan ke "Rachmadwipa Novandri" |
| `src/app/layout.tsx` | JSON-LD `WebSite` dipindah ke root layout + `publisher` → `Person` |
| `src/app/page.tsx` | Hapus `WebSite` duplikat dari JSON-LD home |
| `src/app/about/page.tsx`, `src/app/articles/page.tsx`, `src/app/articles/[slug]/page.tsx`, `src/app/projects/page.tsx` | Tambah `siteName` pada Open Graph |
| `.env.example` | `NEXT_PUBLIC_SITE_URL` → `https://novandri.com` |

Perubahan ini searah dengan rekomendasi LLM. **Jangan ditimpa**; hanya nilai nama penulis yang perlu diselaraskan sesuai keputusan owner.

---

## 8. Prinsip rigor & strategi keunggulan (untuk artikel selanjutnya)

Bagian ini bersifat operasional: dipakai sebagai pedoman produksi artikel baru, melengkapi `docs/publication-wide-editorial-standard.md`.

### 8.1 "100% faktual" bukan target yang bisa dicapai — "100% dapat diaudit" bisa

Tidak ada publikasi yang bisa menjamin 100% faktual selamanya. Standar yang bisa dijamin adalah:

> **Setiap klaim material dapat ditelusuri ke bukti, statusnya dinyatakan dengan jelas, dan bisa dibantah oleh pembaca.**

Ini lebih kuat dari klaim "100% benar", karena LLM dan Google mencari **verifiability**, bukan kesempurnaan absolut.

Klaim di artikel harus punya status:

| Status | Arti | Contoh |
| --- | --- | --- |
| `verified` | Sumber primer sudah dicek langsung, sesuai | RFC 9111 mendefinisikan `Cache-Control` |
| `source-reported` | Benar menurut sumber, tapi bukan pengukuran Anda | "Google mendokumentasikan dukungan HTTP/2" |
| `measured` | Anda ukur sendiri, dengan metode tercatat | "Recall@10 turun 0,12 saat hybrid dimatikan" |
| `inferred` | Kesimpulan Anda, bukan fakta sumber | "Ini kemungkinan menyebabkan..." |
| `illustrative` | Contoh hipotetis | "Misalkan timeout 2 detik..." |

**Aturan emas:** `illustrative` tidak boleh diam-diam berubah menjadi `verified`. Ini persis yang terjadi sekarang — 314 artikel memuat `"hypothetical and illustrative"` dan 489 artikel adalah placeholder. Ini bukan masalah "kurang riset", melainkan masalah status klaim yang bocor.

### 8.2 Kenapa Anda bisa mengalahkan situs yang Anda kutip

Anda tidak akan menang kalau menulis ulang apa yang ada di RFC atau dokumentasi Google. Sumber itu sudah lebih otoritatif di medan mereka sendiri.

Anda menang di lapisan yang tidak mereka layani:

| Yang dilakukan sumber primer | Celah yang bisa Anda isi |
| --- | --- |
| Menyatakan norma ("RFC 9293 = TCP") | Menerjemahkan ke keputusan praktis ("ini artinya untuk debugging Anda...") |
| Ditulis untuk pembaca ahli | Dibaca oleh orang yang sedang panik menghadapi error 403 |
| Statis, tidak menyatakan mana yang sudah usang | Anda menyatakan "diverifikasi 18 Nov 2026, cek ulang jika X berubah" |
| Tidak punya data lapangan Anda | Anda punya log, benchmark, screenshot, angka dari Kemkes/Niagahoster/klien |
| Tidak membandingkan antar sumber | Anda menunjukkan sumber mana yang kontradiktif dan mana yang benar |

Strateginya bukan "lebih benar dari RFC", tapi menjadi **lapisan verifikasi + sintesis + aplikasi** yang tidak bisa diberikan RFC.

**Syarat keras:** setiap artikel harus punya **delta** yang dinyatakan eksplisit — *"Artikel ini menambahkan X yang tidak ada di sumber-sumber ini."* Tanpa delta, Anda hanya duplikat yang kalah.

### 8.3 Sistem rigor yang bisa dibangun di repo ini

Repo sudah punya `docs/publication-wide-editorial-standard.md` (delapan pilar, aturan "no fabrication") dan `scripts/verify-sources.mjs` + `scripts/check-articles.mjs`. Tinggal diperkuat:

**a. Evidence ledger per artikel** — bukan daftar referensi di bawah, tapi pemetaan klaim:

| Klaim | Status | Sumber | Diakses |
| --- | --- | --- | --- |
| RFC 9111 mendefinisikan `Cache-Control` | `verified` | rfc-editor.org/rfc/rfc9111 | 2026-11-18 |
| Googlebot mendukung HTTP/2 | `source-reported` | developers.google.com/search/docs | 2026-11-18 |
| Latensi naik 40 ms saat X | `measured` | benchmark/internal-2026-11 | 2026-11-18 |

**b. Source tiering** — RFC/standar (T0) > dokumentasi resmi (T1) > paper (T2) > artikel Anda sendiri (T3, hanya pelengkap, bukan rujukan utama). Ini langsung mengatasi rujukan melingkar yang disebut Claude.

**c. Pre-publication gate** — extend script yang sudah ada: gagal build jika ada klaim material tanpa source ID, atau jika status `illustrative` dipakai di bagian "Direct answer".

**d. Post-publication** — halaman errata/changelog publik. Ini sinyal *freshness* dan kejujuran yang sangat kuat untuk LLM.

### 8.4 Supaya tetap perform: pisahkan dua lapisan

Rigor sering membuat tulisan berat dan sulit diekstrak. Solusinya bukan mengorbankan rigor, tapi **memisahkan lapisan**:

1. **Lapisan jawaban** (3–5 kalimat di awal): tegas, memuat angka/definisi kunci, langsung menjawab query. Ini yang diambil LLM.
2. **Lapisan bukti** (di bawah): tabel klaim, metodologi, keterbatasan, tautan primer. Ini yang membuat dipercaya.

Jadi *direct answer* tetap tajam, tetapi di belakangnya ada mesin bukti yang rigid. Keduanya tidak perlu kompromi.

### 8.5 Topik lebar ≠ otoritas lemah — ini masalah taksonomi, bukan cakupan

Saran LLM supaya "pilih satu niche" bertentangan dengan standar editorial Anda sendiri (delapan pilar: technology, business, ideas, markets, dll.). Ketertarikan luas adalah aset. Yang salah bukan luasnya, melainkan **strukturnya**.

Model yang diusulkan:

- **Satu entitas penulis yang konsisten:** `Rachmadwipa Novandri` (sudah diputuskan owner).
- **Satu metode yang konsisten di semua topik.** Empat format yang dipakai ulang:
  1. *Definitive reference* — pembahasan standar/primer
  2. *Evidence review* — bandingkan sumber, tunjuk yang usang/kontradiktif
  3. *Field measurement* — apa yang Anda bangun/ukur, lengkap dengan data
  4. *Decision memo / troubleshooting* — masalah → akar → diagnosis → verifikasi
- Topik boleh apa saja, asal format dan standar buktinya sama. Di sinilah "publikasi" dibedakan dari "content farm".

Dengan model ini, artikel tentang *estate planning* dan artikel tentang RFC 9111 bisa hidup berdampingan — selama keduanya melewati gerbang bukti yang sama dan jujur soal status klaim.

**Perbaikan taksonomi:** 518 tag → **facet, bukan daftar datar**:

```
Pillar (8) × Method (4) × Technology/Topic × Status (verified/illustrative)
```

Ini menyelamatkan keluasan topik sekaligus memberi sinyal hierarki yang rapi ke parser LLM (keluhan Gemini soal ratusan tag di `/articles`).

### 8.6 Checklist penerapan untuk setiap artikel baru

- [ ] Ada pernyataan **delta**: ini menambahkan apa dibanding sumber yang dikutip
- [ ] Setiap klaim material punya status (`verified` / `source-reported` / `measured` / `inferred` / `illustrative`)
- [ ] Sumber primer dipakai sebagai rujukan utama; artikel sendiri bukan rujukan utama
- [ ] Ada blok jawaban di awal + lapisan bukti di bawah (dua lapisan terpisah)
- [ ] Tanggal verifikasi sumber dicantumkan, dengan catatan kapan harus dicek ulang
- [ ] Tag menggunakan facet (pillar × method × topik × status), bukan tag datar baru
