# 3Digit-All Factory Website

A premium, production-ready website for 3Digit-All Factory - a Colombian enterprise software company specializing in 3D solutions, digital twins, AI-accelerated software, and digital transformation.

## 🚀 Features

- **3D Background**: Persistent Three.js canvas with:
  - Infinite glowing grid shader with perspective
  - Particle field with 2000+ particles
  - Floating hardware elements (circuit boards, servers, GPUs)
  - Light streaks and beams
  - Post-processing effects (Bloom, Chromatic Aberration, Noise, Vignette)

- **Smooth Scrolling**: Lenis + GSAP ScrollTrigger for ultra-smooth scroll experience
- **Scroll-to-Top Loop**: Seamless infinite scroll experience
- **Responsive Design**: Adapts to mobile with reduced complexity
- **Custom Cursor**: Animated cursor with trail effect
- **Preloader**: Animated logo assembly animation

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles + Tailwind
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main page component
│   └── components/
│       ├── ThreeBackground.tsx     # Main 3D canvas
│       ├── shaders/
│       │   └── InfiniteGrid.tsx  # Custom GLSL grid shader
│       ├── ParticleField.tsx     # GPU particle system
│       ├── FloatingHardware.tsx   # 3D hardware elements
│       ├── LightStreaks.tsx       # Animated light beams
│       ├── Navigation.tsx         # Header + hamburger menu
│       ├── HeroSection.tsx        # Hero with animations
│       ├── ServicesSection.tsx    # Hexagonal 3D icons
│       ├── AboutSection.tsx       # Company info + stats
│       ├── PortfolioSection.tsx   # Project showcase
│       ├── TeamSection.tsx        # Team + tech stack
│       ├── ContactSection.tsx     # Contact form + CTA
│       ├── CustomCursor.tsx       # Animated cursor
│       └── Preloader.tsx          # Loading animation
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **@react-three/postprocessing** - Post-processing effects
- **GSAP + ScrollTrigger** - Animation and scroll effects
- **Lenis** - Smooth scrolling library
- **Tailwind CSS** - Utility-first CSS
- **Three.js** - 3D graphics

## 🎨 Design

### Color Palette
- Background: `#0A0A0A`
- Grid/Lights: `#FFFFFF`
- Accent Cyan: `#00F0FF`
- Accent Magenta: `#FF00AA`

### Typography
- Primary: Space Grotesk
- Monospace: JetBrains Mono

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## 📱 Sections

1. **Hero** - Big headline + animated logo
2. **Services** - 6 service cards with 3D hexagonal icons
3. **About** - Company story + statistics
4. **Portfolio** - 6 featured projects
5. **Team** - Team members + tech stack + Neutrino™
6. **Contact** - Contact form + CTA + footer

## ✨ Key Interactions

- Background 3D reacts to scroll position
- Hover effects on all cards and buttons
- Scroll indicator animation
- Infinite scroll loop
- Hamburger menu slide-in panel
- Form submission with loading state

## 📧 Contact Form Setup

The contact form sends emails to 3digitallfactory@gmail.com. To enable this feature:

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security"
   - Enable 2-Step Verification

2. **Generate an App Password:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app
   - Select "Other (Custom name)" and enter "3Digit-All Factory Website"
   - Copy the 16-character password

3. **Configure the environment:**
   - Edit `.env.local` file
   - Replace `EMAIL_PASS=placeholder_password` with your App Password

4. **Restart the development server** for changes to take effect.

## ⚡ Performance

- Instanced meshes for particles
- Optimized GLSL shaders
- Mobile detection for reduced complexity
- `prefers-reduced-motion` support

## 📄 License

© 2026 3Digit-All Factory. All rights reserved.
Cartagena, Colombia.
