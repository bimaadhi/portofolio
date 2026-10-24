# Portfolio Website — Bima Adhi Parawangsa

Website personal portfolio modern, fluid glass, dan motion graphics interaktif untuk **Bima Adhi Parawangsa**, seorang Software Engineer dan mahasiswa Teknik Informatika di Universitas Duta Bangsa Surakarta.

---

## 🚀 Fitur Utama & Visual Direction
- **Minimalist Dark Interface**: Nuansa deep black (`#090a0f`) dengan kontras cyan/electric blue glow dan surface dark glass.
- **Fluid Glass & Glassmorphism**: Panel kaca interaktif dengan dynamic cursor glow specular reflection (`FluidGlass.jsx`).
- **Motion Graphics (React Bits Inspired)**:
  - `ShinyText`: Shimmer light sweep animasi pada teks heading dan status badge.
  - `ScrollFloat`: Efek reveal float halus saat scroll masuk ke viewport.
  - `ScrollVelocity`: Dual marquee horizontal dinamis dengan akselerasi scroll velocity.
  - `TechText`: Efek cyber decipher / matrix decoding teks nama Bima Adhi Parawangsa.
  - `ElectricLogo`: Monogram brand wordmark interaktif "BAP DEV" dengan electric aura.
  - `SpecularButton`: Tombol interaktif dengan follow-light cursor highlight & ripple.
  - `ProfileVisual`: 3D interactive physics tilt lanyard card dengan fallback terverifikasi.
  - `DriftWall`: Ambient generative drifting glow canvas latar belakang.
- **Modular Data Architecture**: Semua data (profil, pendidikan, pengalaman, keahlian, proyek, kontak) terpusat di folder `src/data/`.
- **Zero Heavy 3D Dependencies**: Bersih tanpa Three.js, React Three Fiber, GSAP, atau GSAP ScrollTrigger sesuai arahan.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + CSS Variables Glassmorphism
- **Motion & Interaction**: React Bits design patterns + Framer Motion
- **Icons**: Lucide React + Bespoke SVG Social Icons
- **Typography**: Inter & JetBrains Mono (Google Fonts)

---

## 📁 Struktur Project
```
c:/portofolio/
├── public/
│   └── images/
│       └── profile-me.jpeg (Opsional: letakkan foto profil Anda di sini)
├── src/
│   ├── components/
│   │   ├── react-bits/
│   │   │   ├── DriftWall.jsx
│   │   │   ├── ElectricLogo.jsx
│   │   │   ├── FluidGlass.jsx
│   │   │   ├── ProfileVisual.jsx
│   │   │   ├── ProjectEffects.jsx
│   │   │   ├── ScrollFloat.jsx
│   │   │   ├── ScrollVelocity.jsx
│   │   │   ├── ShinyText.jsx
│   │   │   ├── SpecularButton.jsx
│   │   │   └── TechText.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── SocialIcons.jsx
│   ├── data/
│   │   ├── education.js
│   │   ├── experience.js
│   │   ├── profile.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── socialLinks.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ Menjalankan Project
```bash
# Jalankan development server
npm run dev

# Jalankan production build
npm run build

# Preview production build
npm run preview
```

---

## 📝 Konfigurasi yang Perlu Diisi
1. **Foto Profil**: Simpan foto profil Anda pada path `public/images/profile-me.jpeg`. Bila belum ada, sistem otomatis menampilkan lanyard badge kartu identitas yang rapi tanpa broken image.
2. **Social Media & Kontak**: Edit file `src/data/socialLinks.js` untuk memperbarui nomor WhatsApp, username TikTok, Instagram, LinkedIn, GitHub, dan email Anda.
3. **Backend Form**: Form pesan pada section Contact sudah memiliki validasi lengkap dan fallback ke mail client. Hubungkan form ke webhook seperti Formspree, Resend, atau REST API backend Anda untuk pengiriman otomatis via database.
