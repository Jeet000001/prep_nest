
# PrepNest

PrepNest is a focused interview-preparation website for frontend developers. It brings theory, practical machine-coding tasks, and revision-friendly explanations into one place so learners can prepare with less noise and more hands-on practice.

## What You Can Learn

- **Concepts:** Interview questions and answers for HTML, CSS, JavaScript, and React.
- **Machine Coding:** Practical JavaScript and React problems such as arrays, strings, objects, closures, debounce, throttle, counters, stopwatches, tabs, forms, search, pagination, and infinite scrolling.
- **Syntax-highlighted solutions:** Code examples are highlighted with Shiki and displayed in a readable question list.
- **Multiple-file React solutions:** React tasks can include separate files with file tabs for a more realistic coding workflow.
- **Contact:** Visitors can ask questions, report issues, suggest resources, or offer contributions through the contact form.
- **Responsive experience:** The navigation, content layouts, and learning views work across desktop and mobile screens.
- **Custom branding:** PrepNest uses a warm amber visual system and a custom SVG app icon at `/icon.svg`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | PrepNest landing page and learning overview |
| `/concepts` | Redirects to HTML introduction |
| `/concepts/[category]/[topic]` | Theory questions for HTML, CSS, JavaScript, or React |
| `/coding` | Redirects to JavaScript strings practice |
| `/coding/[category]/[topic]` | Machine-coding questions and highlighted solutions |
| `/coding/[category]` | Category-level coding view, including React questions |
| `/contact` | Contact and contribution form |
| `/icon.svg` | Website favicon and app icon |

## Tech Stack

- [Next.js 16](https://nextjs.org/) with the App Router and Turbopack
- [React 19](https://react.dev/) and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for animated interactions
- [Shiki](https://shiki.style/) for syntax highlighting
- [Lucide React](https://lucide.dev/) for interface icons
- [EmailJS](https://www.emailjs.com/) for the contact form

## Requirements

- Node.js 20 or newer
- npm

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jeet000001/prep_nest.git
cd prep_nest
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The contact form uses EmailJS in the browser. Create a `.env.local` file in the project root and add the values from your EmailJS account:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

The form logs a configuration error and does not send a message when these variables are missing. Do not commit `.env.local` or private credentials.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

## Project Structure

```text
app/                         Next.js routes, layouts, metadata, and global styles
Components/                  Reusable navigation, learning, contact, and landing sections
data/questions/              Theory question JSON grouped by category
data/coding/                 Machine-coding question and solution JSON
hooks/                       Reusable React hooks
lib/                         Shared utilities and strict context helpers
public/                      Static assets
```

## Adding Learning Content

### Add a theory topic

1. Add a JSON file in `data/questions/<category>/`.
2. Add the topic slug and filename to the `topicFiles` map in `app/concepts/[category]/[topic]/page.tsx`.
3. Add the topic to the relevant concepts sidebar configuration in `Components/Sidebar.tsx`.

Each theory question should provide an `id`, `question`, `answer`, and an optional `code` field.

### Add a machine-coding topic

1. Add or update a JSON file in `data/coding/<category>/`.
2. Add the topic slug and source file to the `topicFiles` map in `app/coding/[category]/[topic]/page.tsx`.
3. Add the topic to `Components/CodingSidebar.tsx`.

Machine-coding entries can include an `answer`, `code`, `solution`, `explanation`, or a `files` array for multi-file solutions. Keep IDs stable when adding or editing questions.

## Deployment

The project can be deployed to any platform that supports Next.js. For Vercel:

1. Import the repository into Vercel.
2. Add the three `NEXT_PUBLIC_EMAILJS_*` variables in the project settings.
3. Deploy using the default Next.js build settings.

For a self-hosted deployment:

```bash
npm run build
npm run start
```

## Contributing

Content improvements, corrections, new interview questions, machine-coding solutions, accessibility fixes, and UI improvements are welcome. Please keep additions focused, verify JSON formatting, run lint and build locally, and describe the user-facing change in the pull request.

## License

No license has been added to this repository yet. Contact the repository owner before redistributing the project or its content.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
