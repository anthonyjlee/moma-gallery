# The Machine's Eye

A virtual photography exhibition that uses vision-language models to analyze how Eastern and Western photographers represent Asian subjects differently. Built with MoMA's public photography collection.

**Live Demo:** [moma-virtual-gallery.onrender.com](https://moma-virtual-gallery.onrender.com)

## Overview

This project explores a simple question: *How does a photographer's cultural background shape the way they represent their subjects?*

Using 152 photographs from MoMA's collection, we compare how Asian photographers document Asian subjects versus how Western photographers document the same populations. The analysis reveals consistent patterns in naming conventions, camera positioning, and visual treatment.

## Key Finding

> Asian photographers documenting Asian subjects consistently score higher on humanization metrics and lower on othering metrics than Western photographers documenting the same populations.

The pattern is clearest in **naming**: Asian photographers name their subjects as individuals; Western photographers often reduce them to types ("Hopi Indian," "Man in headdress").

## Features

- **12 Curated Pairings** — Portrait comparisons across 4 thematic sections
- **VLM Lens** — Click any image to reveal camera setup analysis (angle, lighting, framing)
- **Animated Methodology** — Six-agent VLM analysis visualization
- **Humanization & Othering Scores** — Composite metrics derived from multi-pass VLM analysis

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- TypeScript
- shadcn/ui components

## Local Development

```bash
# Clone the repository
git clone https://github.com/anthonyjlee/moma-gallery.git
cd moma-gallery

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── Hero.tsx            # Opening comparison
│   ├── MethodologySection  # VLM agent visualization
│   ├── PairedGallery.tsx   # Main gallery with VLM Lens
│   └── CuratorialStatement # Exhibition thesis
├── data/
│   ├── gallery.json        # 12 curated pairs
│   └── vlm_corpus.json     # VLM analysis for 152 works
└── lib/
    ├── gallery-data.ts     # Data utilities
    └── vlm-intelligence.ts # VLM analysis utilities

public/gallery/
├── eastern/                # Asian photographer images
└── western/                # Western photographer images
```

## Data Sources

- **Images**: MoMA Photography Collection (public database)
- **Analysis**: Multi-pass VLM analysis using vision-language models
- **Metrics**: Humanization (1-5) and Othering (0-3) composite scores

## Deployment

The project includes a `render.yaml` for one-click deployment to Render:

1. Fork or push to your GitHub repository
2. Connect to Render
3. Render auto-detects the configuration and deploys

**Build Command:** `yarn install && yarn build`  
**Start Command:** `yarn start`

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

## License

MIT

## Acknowledgments

- The Museum of Modern Art for their public collection database
- All photographers whose work appears in this exhibition
