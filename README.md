# ARDCO Fuel

Static marketing site for [ARDCO Fuel](https://discord.gg/ZRrZawDSyP) — an EVE Online fuel-block manufacture and delivery service across New Eden.

Built with **React + Vite**. Produces a folder of plain static files that can be served anywhere.

<img width="1407" height="819" alt="Screenshot 2026-02-03 at 00 17 44" src="https://github.com/user-attachments/assets/9b3eb3bf-36f4-440f-a766-66509d2909ff" />


---

## Prerequisites

| Tool | Minimum version |
|------|----------------|
| Node.js | 18 LTS or later |
| npm | 9 or later (ships with Node) |

---

## Getting started

### 1. Scaffold the project

Run the commands below from wherever you keep your projects. They create a fresh Vite + React app and move into it.

```bash
npm create vite@latest ardco-fuel -- --template react
cd ardco-fuel
```

### 2. Replace the default source files

| Action | Details |
|--------|---------|
| Copy `ardco-spa.jsx` | Place it in `src/` and rename it to `App.jsx`, overwriting the one Vite generated. |
| Delete `src/App.css` | All styles are injected at runtime by the component — no external stylesheet is needed. |

Everything else Vite created (`main.jsx`, `index.html`, `package.json`, etc.) can stay exactly as it is.

### 3. Set the base path

`base` in `vite.config.js` tells Vite the URL path prefix the site will be served at. If the site lives at the root of a domain (e.g. `https://ardco.fuel/`) set it to `'/'`. If it will be nested under a subfolder (e.g. `https://example.com/ardco-fuel/`) set it to that subfolder path, with leading and trailing slashes.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/',              // ← adjust to match wherever the site will be served
    plugins: [react()],
})
```

This is the **only** setting that changes between deploy targets. Everything else in the build is the same regardless of where the output ends up.

### 4. Install dependencies and build

```bash
npm install
npm run build
```

This produces a `dist/` folder containing the fully bundled, production-ready static files. That folder is all you need to hand off to any hosting provider or server.

### 5. Preview locally (optional)

```bash
npm run preview
```

Opens the production build in a local server so you can verify everything looks correct before deploying.

---

## Deploying

The build output is plain static files — no server-side runtime required. Pick whichever method fits your setup.

### GitHub Pages

Set `base` to `'/your-repo-name/'` in `vite.config.js`. Add the file below to your repository and every push to `main` will build and deploy automatically.

`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

The site will be live at `https://<your-username>.github.io/<repo-name>/` within about 30 seconds of pushing.

### Vercel or Netlify

These are the quickest option and need no configuration at all. Connect your repository to your Vercel or Netlify account through their web dashboard. Both platforms detect Vite automatically, run `npm run build`, and serve from `dist/`. Set `base` to `'/'` — there is no subfolder path involved. That is literally it.

### Custom VPS or server (nginx, Caddy, etc.)

Build locally, then copy the output to your server.

```bash
npm run build
rsync -avz dist/ user@your-server:/var/www/ardco-fuel/
```

Point your web server at that directory. An nginx example:

```nginx
server {
    listen 443 ssl;
    server_name ardco.fuel;

    root /var/www/ardco-fuel;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Set `base` to `'/'` if the site is at the domain root, or to the subfolder path if it is nested.

### Docker

A two-stage Dockerfile builds the app and serves it from a lightweight nginx image.

```dockerfile
# Stage 1 — build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 — serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t ardco-fuel .
docker run -d -p 80:80 ardco-fuel
```

Set `base` to `'/'` unless a reverse proxy in front of the container routes to a subpath, in which case match that path.

### AWS S3 + CloudFront

Build locally, then upload `dist/` to an S3 bucket configured for static website hosting.

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

Optionally put a CloudFront distribution in front for CDN caching and an SSL certificate. Set `base` to `'/'` unless CloudFront is configured to serve from a prefix.

### Shared hosting

Build locally, then upload the **contents** of `dist/` (not the folder itself) to your provider's web root — usually called `public_html` or similar — via FTP or their file manager. Set `base` to `'/'`.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Blank page after deploy | `base` in `vite.config.js` does not match the URL path the site is actually served at | Set `base` to `'/'` for a domain root, or `'/subfolder/'` (with both slashes) if nested |
| Works locally but not after deploy | Build output was not uploaded, or the CI workflow failed | Double-check that `dist/` contents are present at the server root; check CI logs if using Actions |
| Fonts not loading | Outbound request to Google Fonts is blocked | The site pulls Orbitron and Rajdhani via a CSS `@import` from `fonts.googleapis.com` — make sure the network allows it |
| YouTube embed blank | Browser autoplay or iframe policy | The embed uses the privacy-enhanced `youtube-nocookie.com` domain; no action needed on your end |

---

## Project structure (after setup)

```
ardco-fuel/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx                 # Entire site — single-file React component
│   └── main.jsx                # React entry point (Vite default, untouched)
├── index.html                  # HTML shell (Vite default, untouched)
├── package.json
└── vite.config.js              # Vite config — set `base` here to match your deploy path
```

---

## License

This project is not affiliated with CCP Games. EVE Online is a trademark of CCP Games.
