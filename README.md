# Genius Song Searcher

A modern React application that integrates with the Genius API to search for artists and display their complete song catalogs.

## Technology Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **HTTP Client**: Axios with interceptors
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint with React plugins
- **Language**: TypeScript 5.9.2

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Genius API Access Token

### Installation

1. Clone the repository:
```bash
git clone https://github.com/luchotc/genius-song-searcher
cd genius-song-searcher
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Copy the example environment file:
```bash
cp env.example .env
```

Then edit the `.env` file and replace `your_genius_api_token_here` with your actual Genius API token.

To get a Genius API token:
1. Visit [Genius API Clients](https://genius.com/api-clients)
2. Sign up or log in to your account
3. Create a new API client
4. Copy your access token
5. Paste it in the `.env` file

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port if 5173 is in use)

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Development

### TypeScript
This project uses TypeScript for type safety and better development experience. The TypeScript configuration is defined in `tsconfig.json` with strict mode enabled.

### Linting
Run the linter to check for code quality issues:
```bash
npm run lint
```

### Building for Production
Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

The application integrates with the Genius API

### API Endpoints Used:
- `GET /search` - Search for artists
- `GET /artists/{id}` - Get artist details
- `GET /artists/{id}/songs` - Get artist songs with pagination