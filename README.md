# Coming Soon Landing Page

A minimal black landing page with gold text, company logo, and a Contact Us form integrated with EmailJS.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an `.env.local` file in the project root with your EmailJS credentials:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

- Create a service and an email template in your EmailJS dashboard.
- Ensure your template expects parameters: `from_name`, `reply_to`, and `message`.

3. Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000.

## Customization

- Replace the logo at `public/TX BG.png` if needed (keep the same file name or update the path in `src/app/page.tsx`).
- Update the gold/black styling via Tailwind classes in `src/app/page.tsx`.

## Tech

- Next.js App Router, React
- Tailwind CSS
- EmailJS via `@emailjs/browser`
