# The Machine's Eye

A VLM-curated virtual photography exhibition exploring how Eastern and Western photographers represent Asian subjects differently.

## 🎨 Features

- **12 Curated Pairs**: Portrait-focused comparisons across 4 thematic sections
- **VLM Lens**: Click any image to reveal camera setup analysis (angle, lighting, framing)
- **Camera Setup Rhetoric**: Technical choices decoded as cultural rhetoric
- **Animated Methodology**: Six-agent VLM analysis visualization
- **MoMA Collection**: 154 images from MoMA's public photography archive

## 🚀 Deploy on Render

1. Push to GitHub
2. Connect to Render
3. Render will auto-detect `render.yaml` and deploy

**Build Command**: `yarn install && yarn build`  
**Start Command**: `yarn start`

## 💻 Local Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## 📁 Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── Hero.tsx             # Mantlepiece pairing
│   ├── MethodologySection   # VLM agent visualization
│   ├── PairedGallery.tsx    # Main gallery with VLM Lens
│   └── CuratorialStatement  # Exhibition thesis
├── data/
│   ├── gallery.json         # 12 curated pairs
│   └── vlm_corpus.json      # VLM intelligence (152 works)
└── lib/
    ├── gallery-data.ts      # Data utilities
    └── vlm-intelligence.ts  # VLM analysis utilities

public/gallery/
├── eastern/          # 77 Asian photographer images
└── western/          # 77 Western photographer images
```

## 📊 Data Sources

- **Images**: MoMA Photography Collection (public database)
- **Analysis**: Lydia AI multi-pass VLM analysis
- **Scores**: Humanization (1-5) and Othering (0-3) composite metrics

## 🎯 Exhibition Thesis

> *Eastern photographers documenting Asian subjects consistently score higher on humanization metrics and lower on othering metrics than Western photographers documenting the same populations.*

The key finding: **naming matters**. Asian photographers name their subjects; Western photographers often type them.

---

Built with Next.js 16, Tailwind CSS 4, and shadcn/ui.
