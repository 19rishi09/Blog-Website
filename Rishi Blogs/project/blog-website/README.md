# BlogSpace - Full-Featured Blog Platform

A modern, responsive blog platform built with React, TypeScript, and Tailwind CSS. Features user authentication, blog post creation, interactive comments, and a beautiful user interface.

## Features

- 🔐 **User Authentication** - Secure login and signup system
- ✍️ **Blog Creation** - Rich text editor for creating and publishing posts
- 💬 **Comment System** - Interactive commenting with likes and replies
- 🔍 **Search & Filter** - Find posts by title, content, or tags
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 🏷️ **Tagging System** - Organize posts with custom tags
- ❤️ **Like System** - Like posts and comments
- 📤 **Share Posts** - Native sharing with clipboard fallback

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
blog-website/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   ├── BlogPost.tsx
│   │   ├── CommentSection.tsx
│   │   ├── CreatePost.tsx
│   │   └── Header.tsx
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   └── useBlog.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── types.ts
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.