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
