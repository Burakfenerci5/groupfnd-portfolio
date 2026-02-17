# FND Group — AI Product Studio

A modern, high-performance portfolio site built with Next.js 14, showcasing FND Group's AI Product Studio capabilities and methodology.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## ✨ Features

- **Responsive Bento Grid** layout showcasing portfolio projects
- **Animated Hero Section** with Spotlight effect and profile badge
- **Proprietary Launch Engine Visualization** (3-step Flywheel)
- **Horizontal Tech Stack Marquee** with infinite scroll
- **Dark Mode UI** with cinematic noise overlay texture
- **Glowing hover effects** and interactive card animations

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (already configured at `Burakfenerci5/groupfnd-portfolio`)
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and configure build settings
5. Click **Deploy**

**Environment Variables:** None required for this project.

**Build Settings:**
- Framework Preset: `Next.js`
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)

### Alternative Deployment Options

- **Netlify:** Connect GitHub repo, set build command to `npm run build`
- **Railway:** One-click deploy with GitHub integration
- **Self-hosted:** Run `npm run build && npm start` on any Node.js server

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles & noise overlay
├── components/
│   ├── hero.tsx            # Hero section with profile & CTAs
│   ├── FeaturedWork.tsx    # 4-column Bento Grid portfolio
│   ├── Flywheel.tsx        # Agency methodology visualization
│   ├── Footer.tsx          # Contact & social links
│   └── ui/
│       ├── bento-grid.tsx  # Reusable grid components
│       └── spotlight.tsx   # Animated spotlight effect
└── lib/
    └── utils.ts            # Utility functions (cn)
```

## 📧 Contact

**Email:** burakf@groupfnd.com  
**LinkedIn:** [linkedin.com/in/burakfenercioglu](https://www.linkedin.com/in/burakfenercioglu/)  
**GitHub:** [github.com/Burakfenerci5](https://github.com/Burakfenerci5)

---

© 2026 FND Group. Built with Next.js & Agentforce Principles.
