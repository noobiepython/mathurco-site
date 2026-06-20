# Mathurco — website

A clean, fully static one-page site for **mathurco.co**. No build step, no
dependencies, no framework — just open `index.html`.

## Files

| File           | What it is                                              |
| -------------- | ------------------------------------------------------- |
| `index.html`   | The page (hero, thesis, stats, services, platforms, approach, contact). |
| `styles.css`   | All styling. Re-theme via the variables at the top.     |
| `main.js`      | Enhancement script (mobile menu, footer year, scroll-reveal). |
| `favicon.svg`  | The cairn mark favicon (matches the header logo).       |

## Preview locally

Just double-click `index.html`, or run a tiny local server:

```bash
cd mathurco-site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing the content

- **Copy / wording** — all text lives in `index.html`. Search for the section
  (`<!-- Hero -->`, `<!-- About -->`, etc.) and edit in place.
- **Colours / fonts** — open `styles.css` and edit the `:root` variables at the
  top. The palette is deliberately near-monochrome: `--ink` (near-black) drives
  text and the dark bands, `--paper`/`--paper-2` the backgrounds, `--muted` the
  labels. Type is a single family (`--font`, Inter).
- **Contact email** — it's a `mailto:` link in the Contact section of
  `index.html`, currently `mathurco@mathurco.co`.
- **Platform / partner logos** — the "Platforms & partners" section uses plain
  text wordmarks (`<ul class="logos">`) styled in monochrome to match the design.
  To use official brand logos instead, drop each brand's SVG into that list.
  **Before publishing, confirm you're entitled to display these marks** — only
  show a vendor's logo if you're an authorised partner or their brand guidelines
  permit it, since logos can imply a partnership/endorsement that doesn't exist.
  The on-page line "Platform and product names are the trademarks of their
  respective owners" is a sensible disclaimer to keep either way.

- **Proof stats** — the "By the numbers" band (`<dl class="stats">` in
  `index.html`) currently holds **placeholder figures** (`15+`, `40+`, `$500M+`).
  Replace the `<dt>` numbers and `<dd>` labels with your real, defensible
  numbers — or delete the whole `<section ... id="proof">` if you'd rather not
  publish figures.
- **Logo / mark** — the cairn (balanced stacked stones) is an inline SVG in the
  header and footer of `index.html`, as a faint watermark in the contact band,
  and in `favicon.svg`. The header/footer/watermark versions use `currentColor`,
  so they inherit the surrounding text colour. Edit the `<ellipse>` stack to
  change the mark.
- **Motion** — `main.js` reveals elements (class `reveal`) as they scroll into
  view. It's disabled automatically for visitors who prefer reduced motion, and
  the page stays fully readable with JavaScript off.

> Note: the About/Services copy is professional **placeholder** text I drafted
> from what Mathurco appears to do. Tweak it to match exactly how you want to
> position the business.

## Deploy + connect mathurco.co

Any static host works. Three easy, free options:

### Cloudflare Pages (recommended)
1. Go to **Cloudflare Pages → Create a project → Direct Upload**.
2. Upload the contents of this `mathurco-site` folder.
3. In **Custom domains**, add `mathurco.co`. If your DNS is already on
   Cloudflare, it wires up automatically; otherwise point your domain's
   nameservers to Cloudflare first.

### Netlify (drag-and-drop)
1. Sign in at app.netlify.com → **Add new site → Deploy manually**.
2. Drag the `mathurco-site` folder onto the page.
3. **Domain settings → Add custom domain → `mathurco.co`**, then add the DNS
   records Netlify shows you (an `A`/`ALIAS` for the apex and a `CNAME` for
   `www`).

### GitHub Pages
1. Push these files to a GitHub repo (e.g. `mathurco-site`).
2. **Settings → Pages →** deploy from the `main` branch, root folder.
3. Add `mathurco.co` under **Custom domain**, then create a `CNAME` DNS record
   pointing `www` to `<username>.github.io` and the apex `A` records GitHub
   lists.

Whichever you pick, the host will provision an HTTPS certificate for you
automatically once DNS resolves (can take a few minutes to a few hours).
