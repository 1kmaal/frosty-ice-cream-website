# Frosty Ice Cream Website

A responsive Frosty ice cream website built with React, Vite, Tailwind CSS, Framer Motion, shadcn-style UI components, and custom animated pages.

## Pages

- Home
- Flavors
- Experience
- Reviews
- FAQ
- Contact
- Order
- Payment
- Sign Up

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Deploy from GitHub

Recommended easiest option:

1. Create a new GitHub repository.
2. Upload/push this project.
3. Go to Vercel.
4. Import the GitHub repository.
5. Use these settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
6. Deploy.

This project includes `vercel.json` and `netlify.toml` so direct routes like `/order`, `/payment`, `/reviews`, and `/faq` work after deployment.

## Environment variables

The frontend demo can run without setting anything.

If you later connect real Convex/Auth, add this variable:

```bash
VITE_CONVEX_URL=your_convex_url_here
```

## Notes

- Do not upload `node_modules` to GitHub.
- Do not upload `.env.local` to GitHub.
- Use `npm install` after cloning/downloading.
