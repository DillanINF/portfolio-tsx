# 🚀 Portfolio Website - Dillan Ilkham

A modern, futuristic portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features an interactive 3D robot model, sleek animations, and a professional design perfect for showcasing web development projects.

## 📸 Project Screenshots

### Hero Section
![Hero Section](./screenshots/hero-section.png)
*Futuristic hero section with 3D robot model and animated navigation*

### Interactive Features
![Interactive Features](./screenshots/interactive-features.png)
*Hover effects, animated buttons, and stats card*

### Full Page View
![Full Page](./screenshots/full-page.png)
*Complete portfolio layout with all sections*

## ✨ Features

- **🤖 3D Interactive Robot Model** - Powered by Spline, responds to cursor movement
- **🎨 Futuristic Design** - Clean, modern UI with sci-fi aesthetics
- **⚡ Smooth Animations** - Framer Motion for fluid transitions and interactions
- **🔤 Orbitron Font** - Custom Google Font for tech-inspired typography
- **📱 Fully Responsive** - Optimized for all device sizes
- **🎯 Interactive Navigation** - Animated navbar with scan-line hover effects
- **💫 Futuristic Button** - Skewed design with animated cyan scan line
- **📊 Stats Card** - Display achievements and experience
- **🎭 Glass Morphism** - Modern UI with backdrop blur effects

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Spline](https://spline.design/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Google Fonts - Orbitron & Inter](https://fonts.google.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DillanINF/portfolio-tsx.git
cd portfolio-tsx
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
portfolio-tsx/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Main portfolio page
│   └── spline.d.ts          # Spline TypeScript definitions
├── public/                  # Static assets
├── screenshots/             # Project screenshots
├── package.json             # Dependencies
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Customization

### Update Personal Information

Edit `app/page.tsx` to customize:
- Name and title
- Bio and description
- Stats (years coding, projects, passion)
- Social media links
- Project showcase

### Change Colors

Modify `app/globals.css` and Tailwind classes in components:
- Primary colors: Gray scale with cyan accents
- Background: White/Gray-200
- Text: Gray-900/Gray-700

### Replace 3D Model

Update the Spline scene URL in `app/page.tsx`:
```typescript
scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode"
```

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🚀 Deploy

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DillanINF/portfolio-tsx)

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

- **Netlify**: Connect your GitHub repo
- **Railway**: Deploy with one click
- **AWS Amplify**: Connect and deploy

## 👨‍💻 About Developer

**Dillan Ilkham Nurf Fazry**
- 17-year-old Web Developer from Bekasi, Indonesia
- Student at SMK Telekomunikasi Telesandi Bekasi
- Passionate about creating innovative digital solutions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- Email: dilaninf6@gmail.com
- GitHub: [@DillanINF](https://github.com/DillanINF)

---

⭐ Star this repo if you find it helpful!
