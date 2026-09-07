# Pawsome & Co. — Pet Shop & Accessories Store Template

A complete, responsive, multi-page HTML5 + Bootstrap 5 template for a pet shop and
accessories store, with light/dark mode, RTL support, client-side form validation,
and SEO-ready markup.

## Quick Start

1. Unzip the project.
2. Serve the folder with any static server (see `documentation/installation-guide.html`).
3. Open `pages/index.html` (the root `index.html` redirects there automatically).

## Structure

```
pet-shop-template/
├── assets/
│   ├── css/        style.css, dark-mode.css, rtl.css
│   ├── js/         main.js
│   └── images/     products, pets, blog, brands, team
├── pages/          14 HTML pages (see below)
├── documentation/  installation, customization, credits guides
├── index.html      redirects to pages/index.html
├── sitemap.xml
└── robots.txt
```

## Pages Included

| Page | File |
|---|---|
| Home (general) | `pages/index.html` |
| Home (premium lifestyle) | `pages/index-2.html` |
| About Us | `pages/about.html` |
| Shop | `pages/shop.html` |
| Product Details | `pages/product-details.html` |
| Featured Brands | `pages/brands.html` |
| Grooming Services | `pages/grooming.html` |
| Services (overview) | `pages/services.html` |
| Service Details (template) | `pages/service-details.html` |
| Pet Care Tips (blog list) | `pages/blog.html` |
| Blog Details | `pages/blog-details.html` |
| Contact Us | `pages/contact.html` |
| 404 | `pages/404.html` |
| Coming Soon | `pages/coming-soon.html` |

## Key Features

- Bootstrap 5 only — no Tailwind CSS
- Mobile-first responsive design (mobile / tablet / desktop / large desktop)
- Light & dark mode with system-preference detection and `localStorage` persistence
- RTL stylesheet (`assets/css/rtl.css`) for Arabic/Hebrew layouts
- Client-side form validation (no browser `alert()` boxes)
- Live countdown timer on the Coming Soon page
- Skeleton loader styles for future dynamic content
- Reduced-motion support throughout
- JSON-LD structured data (PetStore / LocalBusiness) on every page
- `sitemap.xml` and `robots.txt` included

## Placeholder Images

Every image uses [placehold.co](https://placehold.co) with brand-colored backgrounds
and descriptive labels so the template always renders correctly out of the box.
Swap these for licensed pet photography before going live — see
`documentation/customization-guide.html`.

## License

This template uses Bootstrap (MIT) and Google Fonts (OFL). Replace all placeholder
imagery with your own licensed assets before commercial use.
