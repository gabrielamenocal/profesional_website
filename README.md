# Gabriela E. Menocal — Professional Website

This is a polished professional portfolio website tailored from Gabriela E. Menocal's résumé.

It is designed as a **static website** with a tiny **Node.js local preview server**. That means:

- You can run it on Windows with Node.js.
- You can deploy it easily to Cloudflare Pages.
- There are no npm packages to install.
- There is no fragile `node_modules` folder.

## Run on Windows

1. Install the LTS version of Node.js from https://nodejs.org/.
2. Extract this ZIP file.
3. Double-click `run-windows.bat`.
4. Open `http://localhost:3000` if the browser does not open automatically.

Manual PowerShell method:

```powershell
node -v
node server.js
```

Then open:

```text
http://localhost:3000
```

## Deploy to Cloudflare Pages

Because the actual website is static, Cloudflare Pages is the best deployment method.

Recommended settings:

```text
Framework preset: None
Build command: None or exit 0
Build output directory: public
```

Steps:

1. Push this project to GitHub.
2. In Cloudflare, go to Workers & Pages.
3. Create a new Pages project.
4. Connect the GitHub repository.
5. Use the settings above.
6. Deploy.
7. After the `*.pages.dev` URL works, add your custom domain in the Pages project's Custom domains tab.

## Edit the website

Main content:

```text
public/index.html
```

Visual styling:

```text
public/styles.css
```

Small browser behavior:

```text
public/app.js
```

Resume PDF:

```text
public/assets/gabriela-menocal-resume.pdf
```

## Replace placeholder domain

Before deploying, replace `https://your-domain.com` in:

```text
public/index.html
public/robots.txt
public/sitemap.xml
```

Use your real domain, for example:

```text
https://gabrielamenocal.com
```

## Privacy note

The public page intentionally does **not** display the phone number. The résumé PDF still contains the full résumé details. If you do not want the phone number public, replace the PDF with a web-safe résumé version before deploying.

The contact form uses `mailto:` and opens the visitor's email app. It does not store messages and does not send emails from the server. To make it a real backend contact form, connect a provider such as Resend, Postmark, SendGrid, or Mailgun.
