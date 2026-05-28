# Cloudflare deployment guide

Use this project with Cloudflare Pages.

## Why Cloudflare Pages

This site is a static professional portfolio. It does not need a traditional Node.js server in production. The included `server.js` is only for previewing the website locally on your Windows machine.

## Build settings

Use these settings in Cloudflare Pages:

```text
Framework preset: None
Build command: None or exit 0
Build output directory: public
```

## Custom domain

After the temporary `*.pages.dev` site works:

1. Open the Cloudflare Pages project.
2. Go to Custom domains.
3. Add the root domain, for example `gabrielamenocal.com`.
4. Add the `www` version too, for example `www.gabrielamenocal.com`.
5. Let Cloudflare create the DNS records.

## Important

Do not manually create random CNAME records first. Add the domain from inside the Pages project so Cloudflare connects it correctly.
