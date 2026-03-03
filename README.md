# Safety Vision — Real-Time Face Mask Detection

> An interactive technical presentation for an industrial-grade face mask detection system, built with **YuNet** face detection and **MobileNetV2** classification.

[![Deploy to GitHub Pages](https://github.com/rebeeh/Face-Mask-Detection-Overview/actions/workflows/deploy.yaml/badge.svg)](https://github.com/rebeeh/Face-Mask-Detection-Overview/actions/workflows/deploy.yaml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald)](https://rebeeh.github.io/Face-Mask-Detection-Overview/)
[![Detection Code](https://img.shields.io/badge/Detection%20Code-Python%20Repo-blue)](https://github.com/rebeeh/Face-Mask-Detection-Python)

> 🐍 **Looking for the actual detection system?** The Python source code (OpenCV + TensorFlow) lives at  
> **[github.com/rebeeh/Face-Mask-Detection-Python](https://github.com/rebeeh/Face-Mask-Detection-Python)**

---

## 🎯 Overview

This repository is an **interactive slideshow** (React/Vite SPA) that documents the architecture, data pipeline, and performance analytics of a production-grade real-time face mask detection system.

**Key system metrics:**

| Metric | Value |
|---|---|
| Precision | 98.2% |
| Recall | 97.5% |
| F1 Score | 0.978 |
| Inference Latency | 22ms |
| mAP@.5 | 0.962 |

---

## 🏗️ System Architecture

The underlying ML system uses a two-stage pipeline:

```
Camera Frame
    │
    ▼
┌─────────────────────────────┐
│  YuNet Face Detector (ONNX) │  ~5ms / face
│  Score threshold: 0.60      │
│  NMS threshold: 0.30        │
└────────────┬────────────────┘
             │  Face ROI crops
             ▼
┌──────────────────────────────────────────┐
│  Preprocessing Pipeline                   │
│  1. BGR → RGB color conversion            │
│  2. Aspect-ratio-preserving square pad    │
│  3. Resize to 224×224 + MobileNet norm   │
└────────────┬─────────────────────────────┘
             │  Normalized tensor
             ▼
┌──────────────────────────────────────────┐
│  MobileNetV2 Classifier (TFLite FP16)    │
│  Binary: With Mask / No Mask             │
│  Quantized: 3.4MB → 1.8MB (47% savings) │
└──────────────────────────────────────────┘
```

**Threading model:** Camera I/O runs in a dedicated thread with a `threading.Lock` mutex, decoupling frame capture from inference to sustain 30+ FPS with 0ms input lag.

---

## 📊 Dataset

- **Base images:** 3,833 (1,916 masked / 1,917 unmasked) — near-perfect class balance
- **Augmentations:** Rotation, brightness, blur, zoom
- **Training:** 8 epochs · Binary Cross-Entropy · Adam optimizer
- **Validation accuracy at epoch 8:** 97.8%

---

## 🖥️ Presentation Tech Stack

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool & dev server |
| TailwindCSS v4 | Utility-first styling |
| Framer Motion | Slide & element animations |
| Recharts | Training analytics charts |
| Lucide React | Icon system |

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/rebeeh/Face-Mask-Detection-Overview.git
cd Face-Mask-Detection-Overview

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output is written to `./dist/`.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── types/
│   └── index.ts              # Shared TypeScript interfaces
├── data/
│   └── constants.ts          # Chart data & code snippet constants
├── components/
│   ├── ui/
│   │   ├── GlassCard.tsx     # Reusable frosted-glass card
│   │   ├── CodeBlock.tsx     # Syntax-highlighted code display
│   │   └── SlideContainer.tsx# Animated slide wrapper
│   ├── layout/
│   │   ├── ProgressBar.tsx   # Top progress indicator
│   │   ├── SideNav.tsx       # Left dot-navigation
│   │   └── NavControls.tsx   # Bottom prev/next navigation
│   └── slides/
│       ├── HeroSlide.tsx
│       ├── DataSlide.tsx
│       ├── StackSlide.tsx
│       ├── PreprocessingSlide.tsx
│       ├── YuNetSlide.tsx
│       ├── AnalyticsSlide.tsx
│       ├── MobileNetSlide.tsx
│       ├── ThreadingSlide.tsx
│       ├── OptimizationSlide.tsx
│       └── ConclusionSlide.tsx
└── App.tsx                   # Root orchestrator (~90 lines)
```

---

## ⌨️ Navigation

| Action | Control |
|---|---|
| Next slide | `→` Arrow / `Space` |
| Previous slide | `←` Arrow |
| Jump to slide | Click the left sidebar dot |

---

## 🌐 Deployment

This project is automatically deployed to **GitHub Pages** on every push to `main` via the workflow at [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml).

**Live URL:** [https://rebeeh.github.io/Face-Mask-Detection-Overview/](https://rebeeh.github.io/Face-Mask-Detection-Overview/)

To deploy your own fork:
1. Fork this repository
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. Push any change to `main` — the workflow handles the rest

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
