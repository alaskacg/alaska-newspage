# Alaska News Portal

A modern, Progressive Web App (PWA) for discovering Alaska news organized by region. Built with React, TypeScript, and Lovable Cloud.

## Features

- 🗺️ **Interactive Regional Map** - Explore Alaska news by clicking on regions (Southeast, Southcentral, Interior, Southwest, Northern, Statewide)
- 📱 **PWA Support** - Install on mobile or desktop for app-like experience
- 🔐 **User Authentication** - Save favorites and personalize your news feed
- 🎨 **Beautiful Design** - Alaska-inspired color palette with smooth animations
- ⚡ **Real-time Updates** - Powered by Lovable Cloud for instant news updates
- 📍 **Leaflet Maps** - Interactive mapping with region markers
- 💾 **Offline Support** - Service worker caching for offline access

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom Alaska theme
- **UI Components**: Shadcn/ui
- **Maps**: Leaflet & React-Leaflet
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth
- **PWA**: Service Worker, Web Manifest

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` to view the app.

## Database Schema

### Regions Table
Stores Alaska regional information with coordinates for map markers.

### News Items Table
Contains news articles linked to regions with metadata (title, description, URL, source, category).

### User Favorites Table
Tracks user-saved news items with RLS policies for privacy.

## Authentication

Email/password authentication is enabled with auto-confirm for development. Users can:
- Sign up for new accounts
- Sign in to existing accounts
- Save favorite news articles
- Access personalized feeds

## Deployment

Deploy easily through Lovable:
1. Click "Publish" in the Lovable editor
2. Your app is live with automatic backend deployment

### Custom Domain
Connect a custom domain in Project > Settings > Domains.

## PWA Installation

Users can install the app on:
- **iOS**: Safari > Share > Add to Home Screen
- **Android**: Chrome > Menu > Install App
- **Desktop**: Chrome/Edge > Install icon in address bar

## Future Enhancements

Ready for integration:
- xAI API for natural language search
- AI-powered news summarization
- Personalized recommendations
- RSS feed auto-import
- Admin dashboard
- Real-time notifications

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Shadcn components
│   ├── Header.tsx    # Navigation header
│   ├── AlaskaMap.tsx # Interactive map
│   └── NewsCard.tsx  # News item card
├── pages/            # Route pages
│   ├── Index.tsx     # Home page
│   ├── RegionPage.tsx # Regional news
│   └── AuthPage.tsx  # Authentication
├── lib/              # Utilities
│   └── pwa.ts        # PWA registration
└── integrations/     # Backend integration
    └── supabase/     # Lovable Cloud client
```

## Contributing

This is a Lovable-managed project. Edit through:
1. Lovable editor (recommended)
2. Local IDE with Git sync
3. GitHub Codespaces

## License

Built with ❤️ using Lovable

## Support

- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Discord](https://discord.lovable.dev/)
- Project URL: https://lovable.dev/projects/097ee2f7-b418-454a-8c7a-fafb643dcfd7
