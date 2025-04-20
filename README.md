# OS TrustTech - Software Development Company Website

A modern, multilingual website for OS TrustTech, a software development company based in Uzbekistan. Built with Next.js, Tailwind CSS, and internationalization support.

## Features

- **Internationalization (i18n)**: Support for English, Russian, and Uzbek
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Dark Mode**: Automatic and manual dark mode toggle
- **SEO Optimized**: Meta tags, sitemap, and robots.txt
- **Form Handling**: Contact form with React Hook Form validation
- **State Management**: Zustand for project filtering
- **Accessibility**: WCAG compliant components

## Tech Stack

- **Framework**: Next.js 15.3+
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Icons**: React Icons (Feather)
- **Internationalization**: next-intl
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/os-trusttech.git
cd os-trusttech
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
os-trusttech/
├── public/
│   ├── locales/          # Translation files
│   │   ├── en/
│   │   ├── ru/
│   │   └── uz/
│   └── ...               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # Locale-specific pages
│   │   ├── api/          # API routes
│   │   └── ...
│   ├── components/       # Reusable components
│   ├── context/          # React Context providers
│   ├── store/            # Zustand stores
│   ├── utils/            # Utility functions
│   └── middleware.ts     # i18n routing middleware
└── ...
```

## Internationalization

The website supports three languages:

- English (en)
- Russian (ru)
- Uzbek (uz)

Translation files are located in `public/locales/{locale}/common.json`. To add new translations, add entries to these files.

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The build output will be in the `.next` folder.

## Deployment

This Next.js project can be deployed to any platform that supports Node.js or as a static site. For the best experience, we recommend:

- [Vercel](https://vercel.com/) - Zero configuration, developed by Next.js team
- [Netlify](https://netlify.com/) - Easy deployment with CI/CD
- [AWS Amplify](https://aws.amazon.com/amplify/) - For enterprise deployment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

OS TrustTech Team
