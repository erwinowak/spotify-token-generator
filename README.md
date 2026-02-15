# 🎵 Spotify Refresh Token Generator

A modern, beautiful web application for generating Spotify refresh tokens. Built with Next.js 16, Tailwind CSS v4, Framer Motion, and shadcn/ui.

![Spotify Token Generator](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.0-black?style=for-the-badge&logo=bun)

## ✨ Features

- 🎨 **Beautiful UI** - Modern, responsive design with dark mode support
- 🚀 **Fast & Optimized** - Built with Next.js 16 and optimized for performance
- 🎭 **Smooth Animations** - Powered by Framer Motion for delightful user experience
- 🔒 **Secure** - OAuth 2.0 flow with state validation
- 📱 **Responsive** - Works perfectly on all devices
- 🌙 **Dark Mode** - Automatic dark mode support
- 🎯 **SEO Optimized** - Full SEO metadata and dynamic Open Graph images

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui
- **Package Manager:** Bun
- **Form Validation:** Zod + React Hook Form
- **Icons:** Lucide React

## 📋 Prerequisites

- [Bun](https://bun.sh) (v1.0 or higher)
- [Node.js](https://nodejs.org) (v20 or higher) - if not using Bun
- [Docker](https://www.docker.com) (for containerized deployment)
- Spotify Developer Account

## 🚀 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/your-username/spotify-token-generator.git
cd spotify-token-generator
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Optional: Set your site URL for production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note:** For local development, you don't need any environment variables. The app works out of the box.

### 4. Run the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
bun run build
bun run start
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t spotify-token-generator .
```

### Run Docker Container

```bash
docker run -p 3000:3000 spotify-token-generator
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## 📝 How to Use

1. **Get Spotify Credentials**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app or select an existing one
   - Copy your **Client ID** and **Client Secret**

2. **Set Redirect URI**
   - In your Spotify app settings, add the redirect URI:
   - For local development: `http://127.0.0.1:3000/api/callback`
   - For production: `https://yourdomain.com/api/callback`
   - **Important:** Use `127.0.0.1` instead of `localhost` for local development

3. **Generate Token**
   - Enter your Client ID and Client Secret
   - The redirect URI is pre-filled (you can copy it)
   - Click "Continue to Authorization"
   - Authorize the application on Spotify
   - Copy your refresh token

## 🔧 Configuration

### Spotify App Settings

In your Spotify Developer Dashboard:

1. **Redirect URIs:**
   - Development: `http://127.0.0.1:3000/api/callback`
   - Production: `https://yourdomain.com/api/callback`

2. **Scopes:** The application automatically requests all necessary scopes:
   - `user-read-private`
   - `user-read-email`
   - `user-read-playback-state`
   - `user-modify-playback-state`
   - `user-read-currently-playing`
   - `playlist-read-private`
   - `playlist-read-collaborative`
   - `playlist-modify-public`
   - `playlist-modify-private`
   - `user-library-read`
   - `user-library-modify`
   - `user-top-read`
   - `user-read-recently-played`
   - `user-follow-read`
   - `user-follow-modify`

## 📁 Project Structure

```
spotify-token-generator/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── wizard/      # Wizard step components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── assets/          # Static assets
├── public/              # Public assets
├── Dockerfile           # Docker configuration
├── .dockerignore        # Docker ignore file
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## 🧪 Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

### Code Style

The project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (if configured) for code formatting

## 🔒 Security

- All sensitive data (Client Secret) is handled server-side
- State parameter validation prevents CSRF attacks
- OAuth 2.0 best practices implemented
- No tokens are stored on the server

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Copyright (c) 2024 Erwin Nowak

See [LICENSE](LICENSE) file for full license text and additional terms.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/spotify-token-generator/issues).

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using Next.js and Spotify API
