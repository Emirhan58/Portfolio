# Samurai Portfolio — Emirhan Kaya

## What This Is

Emirhan Kaya icin Japon/Samurai temali kisisel portfolio sitesi. Geleneksel Japon estetigi (sumi-e murekkep, kanji, wabi-sabi) ile modern web teknolojilerini birlestiren, tek sayfali (single-page scroll) dikkat cekici ve benzersiz bir portfolio deneyimi. Is basvurularinda recruiterlara gosterilecek profesyonel bir vitrin.

## Core Value

Ziyaretciyi ilk saniyede etkileyen, Japon estetigi ile harmanlanan profesyonel bir portfolio deneyimi — Emirhan'in teknik yeteneklerini ve kisiligini unutulmaz bicimde sergiler.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Single-page scroll site — 7 bolum (Hero, Hakkimda, Yetenekler, Deneyim, Projeler, Basarilar, Iletisim)
- [ ] Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- [ ] Framer Motion + GSAP animasyon sistemi
- [ ] Sadece dark theme — murekkep/gece estetigi
- [ ] Kanji intro animasyonu (侍 firca vurusuyla cizilir, sonra siteye gecis)
- [ ] Tam gaz animasyonlar: ink splash, parallax, sakura parcaciklari, katana slash, typing efekti
- [ ] Mobilde azaltilmis animasyonlar (parallax/parcacik devre disi, temel animasyonlar kalir)
- [ ] i18n (TR + EN) dil destegi v1'de
- [ ] PDF CV indirme butonu (Hero veya navbar)
- [ ] Ambient Japon muzik + etkilesim ses efektleri (toggle ile, default muted)
- [ ] Iletisim bolumu: email, GitHub, LinkedIn linkleri (form yok)
- [ ] Responsive / mobile-first yaklasim
- [ ] SEO meta tags, Open Graph
- [ ] Vercel deploy

### Out of Scope

- Iletisim formu / backend — v1'de sadece linkler yeterli
- Light mode / tema gecisi — dark theme samurai estetigini en iyi tasiyor
- Ozel mouse cursor — kullanilabilirlik oncelikli
- Ayri sayfalar / routing — single-page scroll yapisi yeterli
- CMS / admin paneli — icerik statik, DATA.md'den geliyor

## Context

**Kisi:** Emirhan Kaya — Mid-Level Backend Developer, Istanbul. Java/Spring Boot ve .NET uzmani. E-ticaret sistemleri ve event-driven mimariler.

**Icerik kaynagi:** Tum kisisel veriler `EMIRHAN_KAYA_DATA.md` dosyasinda — is deneyimi (5 pozisyon), 6+ proje, TEKNOFEST/CanSat basarilari, teknik yetenekler.

**Hedef kitle:** Recruiter ve HR profesyonelleri — is basvurularinda gosterilecek. Etkileyici ama profesyonel olmali. Tasarim "gimmick" degil, tutarli bir estetik dil olmali.

**Tasarim yonu:**
- Renk paleti: Koyu siyah/antrasit (#0a0a0a), kirmizi vurgu (#c0392b), altin (#d4a574), kagit/bej (#f5f0e8), yesil aksan (#2d5016)
- Tipografi: Noto Serif JP / Playfair Display (basliklar), Inter / Noto Sans (govde)
- Dekoratif kanji: 門 (Kapi), 道 (Yol), 技 (Beceri), 戦 (Savas), 作 (Eser), 誉 (Onur), 結 (Bag)
- Gorsel motifler: sumi-e arka planlar, enso daire, asanoha/seigaiha desenleri, katana cizgileri, sakura yapraklari, torii kapisi

**Bolumler:**
1. Hero / Landing (門) — tam ekran, dramatik giris, isim + unvan firca stili, animated ink splash
2. Hakkimda (道) — bio, profil foto ink-wash frame, istatistikler scroll counter
3. Yetenekler (技) — skill kategorileri scroll/tomar stili, proficiency barlari katana stili
4. Deneyim (戦) — dikey timeline samurai yolculugu, is kartlari ink stamp
5. Projeler (作) — grid/masonry, parsomen stili kartlar, hover ink reveal, GitHub stars
6. Basarilar (誉) — TEKNOFEST/CanSat, madalya/rozet stili
7. Iletisim (結) — sosyal linkler mon (arma) ikonlari

**Animasyonlar:**
- Scroll-triggered ink splash / brush stroke reveal
- Parallax dag/bulut katmanlari
- Sakura parcacik efektleri
- Sayfa gecislerinde katana slash
- Japoncadan Ingilizceye typing efekti
- Loading: 侍 kanji firca animasyonu

**Ses:**
- Ambient Japon muzik (shamisen/koto/shakuhachi tarzinda)
- Etkilesim sesleri (kilic cekme, sayfa gecis)
- Default muted, toggle ile acilir

## Constraints

- **Tech stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, GSAP
- **Deploy:** Vercel
- **Performans:** Lighthouse 90+ hedef, mobilde agir efektler devre disi
- **Erisilebilirlik:** Temel a11y kontrolleri (contrast, keyboard nav, screen reader uyumluluk)
- **Icerik:** Tum veriler EMIRHAN_KAYA_DATA.md'den — statik, CMS yok
- **Font:** Google Fonts (Noto Serif JP, Inter)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page scroll | Portfolio icin en etkili format, recruiter hizli tarayabilir | — Pending |
| Sadece dark theme | Japon/samurai estetigi karanlıkta en dramatik ve tutarli | — Pending |
| Tam gaz animasyon + mobil azaltma | Desktop'ta etkileyici deneyim, mobilde performans korunur | — Pending |
| i18n v1'de | Basta kurmak sonra eklemekten kolay, uluslararasi erisim | — Pending |
| Form yok, sadece linkler | Basitlik, backend gerektirmez, recruiterlar zaten LinkedIn/email kullanir | — Pending |
| Ambient ses + efektler (muted default) | Deneyimi zenginlestirir ama kullaniciyi rahatsiz etmez | — Pending |
| Kanji intro animasyonu | Ilk izlenim dramatik, temaya uygun, marka olusturur | — Pending |

---
*Last updated: 2025-03-25 after initialization*
