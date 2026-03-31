# Food2Go Only Deployment

Standalone mobile-first prototype for `Food2Go`, extracted from the larger Capstone app so it can deploy independently on Render.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/food2go`.

## Deploy on Render

1. Push this folder to GitHub (same repo is fine).
2. In Render, create a new **Web Service**.
3. Configure:
   - **Root Directory**: `food2go-only`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Deploy.

No OpenAI or other API keys are required for this standalone Food2Go prototype.
