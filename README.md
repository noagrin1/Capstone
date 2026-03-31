# CV Standardization and Translation Tool

Web app that converts resumes (PDF, Word, image, or pasted text) into a standardized US-style format with translation and editing.

**Live demo:** [https://usresumepro.com/](https://usresumepro.com/) (deployed on Render)

## Tech Stack

- **Next.js 15** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS**, **Framer Motion**
- **OpenAI** (GPT-4o-mini for extraction, GPT-4-turbo for transformation)
- **Text extraction:** pdf-parse, mammoth, tesseract.js
- **Export:** html2pdf.js, docx

## Architecture

- **Frontend:** Single-page flow: upload/paste → processing → editable resume → PDF/Word export.
- **API routes:** `/api/ai/extract-text` (file → text), `/api/ai/extract` (text → structured JSON), `/api/ai/transform` (JSON → US-style resume).
- **Data model:** `AmericanizedResume` in `src/entities/Resume.ts` (personal_info, work_experience, education, skills, other).

## Pipeline

1. User uploads a file or pastes text.
2. If file: text is extracted (PDF/Word/OCR), then sent to extract API.
3. Extract API (GPT-4o-mini) parses text into structured JSON.
4. Transform API (GPT-4-turbo) rewrites to US style (quantifiable bullets, active language, one-page focus).
5. User edits in the browser; exports to PDF or Word.

## Run Locally

```bash
npm install
npm run dev
```

Set `OPENAI_API_KEY` in `.env.local` for AI features.

## Food2Go (Class Prototype)

Mobile-first food delivery **prototype** built for a Systems Analysis & Design / Agile modeling assignment.

- **Demo route**: `http://localhost:3000/food2go`
- **What it demonstrates** (end-to-end user flow):
  - Browse restaurants (search + filters)
  - Restaurant menu + add to cart
  - Cart (quantity updates, removal, totals)
  - Checkout form (mock address + payment method)
  - Order tracking (simulated stage progress)
  - Post-delivery feedback (rating + comment)
  - Optional extras: order history + fake login/profile

**Notes**

- Mock data only (no backend, no real payments, no real authentication).
- Prototype code lives under `src/app/food2go/` and is organized so you can explain it as iterative user-story driven screens.
- Prototype credit in UI: **Noa Grinderfer**.

## Deploy on Render (Next.js)

You can deploy this project as a **Render Web Service**:

1. Push your repo to GitHub.
2. In Render, click **New +** → **Web Service**.
3. Connect your GitHub repo and select the branch.
4. Configure:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `OPENAI_API_KEY` (required for resume AI routes)
6. Deploy.

After deploy, your Food2Go prototype will be at:

- `https://<your-render-service>.onrender.com/food2go`

If you only demo Food2Go, it still works without OpenAI keys, but setting `OPENAI_API_KEY` is recommended so the full original resume app remains functional too.
