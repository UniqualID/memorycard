# 🃏 Memory Card Game

A modern, full-stack, multi-theme memory card game built with the latest and greatest in web technology. This project is a flex of your React, Vite, CSS, and API-integration skills, with a modular, extensible architecture and a beautiful, responsive UI.

## 🚀 Tech Stack & Features

### **Languages & Frameworks**
- **React 19**: Lightning-fast, component-based UI with hooks and functional components.
- **Vite**: Next-gen frontend tooling for instant hot module reloads and ultra-fast builds.
- **JavaScript (ES2020+)**: Modern syntax, async/await, and modular code organization.

### **Styling**
- **Custom CSS**: Hand-crafted, responsive, and theme-aware styles. Includes:
  - Card flip animations
  - Hover effects
  - Custom backgrounds (card table felt!)
  - Modern, accessible layouts
- **CSS Modules for Cards**: Each card type (Playing, Pokémon, Numbers, Rick & Morty) has its own style for easy maintenance and extension.

### **Linting & Formatting**
- **ESLint**: Enforced code quality and best practices.
- **Prettier**: Consistent code formatting.

### **Tooling**
- **Vite**: For dev server, build, and preview.
- **UUID**: For unique card IDs.
- **React StrictMode**: For catching potential problems in development.

### **API Integrations**
- **PokéAPI**: Fetches official Pokémon artwork and names for Pokémon cards.
- **Rick and Morty API**: Fetches character images and names for Rick & Morty cards.
- **Custom Number & Playing Card Generators**: For classic and numeric card modes.

### **Component Architecture**
- **CardRow**: Handles card dealing, shuffling, and flip animations.
- **Card Components**:  
  - `PlayingCard`  
  - `PokemonCard`  
  - `NumberCard`  
  - `RickAndMortyCard`
- **StartForm**: Dynamic game setup with selectable card types and difficulty.
- **Loading**: Animated loading spinner for async API fetches.

### **UX & UI**
- **Responsive Design**: Looks great on desktop and mobile.
- **Animated Card Dealing & Flipping**: Smooth, modern transitions.
- **Score Tracking**: Live score and high score display.
- **Modal Dialogs**: For game start and end.

### **Assets**
- **Felt Table Background**: `src/assets/felt.jpg` for that authentic card table vibe.
- **SVG Icons**: For branding and polish.

---

## 🛠️ How to Run

```bash
npm install
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Live Demo

Check out the deployed app on Vercel:  
👉 [https://memorycard-flax.vercel.app/](https://memorycard-flax.vercel.app/)

---

## 🧩 Extending

Want to add more card types? Just drop a new component in `src/components/`, a data utility in `src/utils/`, and wire it up in `App.jsx` and `StartForm.jsx`. The architecture is ready for your next API flex.

---

## 🤝 Credits

- [PokéAPI](https://pokeapi.co/)
- [Rick and Morty API](https://rickandmortyapi.com/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)

---

## 💪 What You Demonstrated

- Modern React (hooks, functional components, modularity)
- Real-world API integration (REST, async/await, error handling)
- Advanced CSS (animations, responsive, custom themes)
- Tooling mastery (Vite, ESLint, Prettier)
- Clean, extensible codebase ready for new features
