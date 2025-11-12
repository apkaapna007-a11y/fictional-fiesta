# Nelson-GPT — Pediatric Knowledge at Your Fingertips

## 📖 Project Overview

**Nelson-GPT** is a Perplexity-style chat application redesigned for pediatric medical knowledge assistance. It provides evidence-based, conversational pediatric knowledge sourced from the *Nelson Textbook of Pediatrics*, built with a warm professional aesthetic and designed for healthcare professionals, medical students, and pediatricians.

### Key Features

- **Perplexity-Style UI**: Pixel-perfect recreation of Perplexity's web app with warm medical branding
- **Warm Medical Theme**: Amber, ivory, and soft gray palette optimized for clinical settings
- **Dual Mode Chat**: 
  - **Academic Mode**: Detailed, textbook-style explanations with evidence
  - **Clinical Mode**: Practical diagnostic approaches and clinical reasoning
- **Hero Input Component**: Beautiful welcome screen with customizable input
- **Smooth Animations**: 60fps Framer Motion transitions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## ⚙️ Tech Stack

### Frontend
- **React 19** with **TypeScript**
- **Vite** for fast development and bundling
- **TailwindCSS 4** for styling with custom warm color palette
- **Framer Motion** for smooth animations
- **Zustand** for state management

### Coming Soon
- Backend RAG pipeline with Mistral API
- Neon PostgreSQL with pgvector for knowledge retrieval
- PWA support with offline functionality
- WebSocket streaming for real-time responses

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd project

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── SplashScreen.tsx       # Initial splash animation
│   ├── WelcomeScreen.tsx      # Welcome screen with hero input
│   ├── HeroInput.tsx          # Main input component with mode toggle
│   ├── ChatScreen.tsx         # Chat interface layout
│   ├── ChatHeader.tsx         # Chat header with title
│   ├── ChatMessages.tsx       # Message display component
│   ├── ChatInput.tsx          # Footer input dock
│   └── ...
├── store/
│   └── chatStore.ts           # Zustand chat state management
├── App.tsx                     # Main app component
├── main.tsx                    # React entry point
└── index.css                   # Global styles with Tailwind
```

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Warm Ivory | `#FFFBF7` | Main background |
| Warm Beige | `#F4EFEA` | User messages |
| Warm Tan | `#E8DED5` | Borders |
| Warm Gray | `#D9CFCC` | Secondary text |
| Warm Amber | `#D4A574` | Primary accent |
| Warm Gold | `#B8860B` | Hover states |
| Clinical Green | `#6B9E7F` | Clinical mode accent |

### Typography
- **Font Family**: System UI stack (-apple-system, BlinkMacSystemFont, Segoe UI, Inter, Roboto)
- **Border Radius**: 20px primary, 12px secondary
- **Shadows**: Soft 4-20px with warm amber tint

## 📝 Components

### HeroInput
The main welcome input component featuring:
- **Mode Toggle**: Switch between Academic and Clinical modes
- **Auto-resizing Textarea**: Expands up to 3 lines
- **Smart Send Button**: Disabled state when empty, animated interactions
- **Mode Descriptions**: Contextual hints for each mode

```tsx
<HeroInput
  mode={mode}
  onModeChange={setMode}
  onSubmit={handleSubmit}
/>
```

### SplashScreen
Brief animated splash on app load:
- 2.5 second display
- Typing animation of "Nelson-GPT"
- Subtitle and footer information
- Smooth fade transitions

### ChatScreen
Full conversation interface:
- **Header**: Back button, chat title, menu
- **Messages**: Animated message bubbles with role-based styling
- **Input Dock**: Floating input with mode indicator

## 🎬 Animations

All animations use Framer Motion for smooth 60fps performance:
- `fade-in/out`: 0.5s opacity transitions
- `slide-up/down`: 0.4s spring cubic-bezier
- `spring-scale`: 0.6s entrance animations
- `pulse-dot`: 1.5s repeating pulse

## 🔧 Development

### Type Checking
```bash
npm run type-check
```

### Development Server
The Vite dev server runs on `http://localhost:5173` by default with Hot Module Replacement (HMR) enabled.

## 📦 Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

## 🌐 Deployment

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📚 References

- Nelson Textbook of Pediatrics (Source material)
- Perplexity.co (UI inspiration)
- Framer Motion (Animation docs)
- Tailwind CSS (Styling framework)

## 🔐 Privacy & Disclaimers

Nelson-GPT provides evidence-based pediatric knowledge sourced from the Nelson Textbook of Pediatrics. **Always consult with qualified healthcare professionals for clinical decisions.**

## 📄 License

ISC License - See package.json for details

## 🎯 Future Roadmap

- [ ] Backend RAG integration with Mistral API
- [ ] Neon PostgreSQL vector search
- [ ] PWA installation support
- [ ] Offline chat history
- [ ] Citation management and export
- [ ] Growth charts and dosing calculators
- [ ] Voice input support
- [ ] Dark mode refinement
- [ ] Mobile app (React Native)

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Made with ❤️ for pediatric healthcare professionals**
