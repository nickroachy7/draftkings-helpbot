# DraftKings Help Center Chatbot

A modern and user-friendly chatbot interface for answering questions about DraftKings products and services. This application uses the Perplexity AI API to provide accurate and helpful information.

## Features

- Clean, modern UI with DraftKings branding
- Real-time search functionality
- Typing animation for responses
- Bold formatting for direct answers
- Suggested articles for further reading
- Responsive design
- GitHub integration for version control

## Prerequisites

Before running this application, you'll need:

- Node.js 18+ and npm
- A Perplexity AI API key (stored in .env.local)

## Getting Started

1. Clone this repository:
```bash
git clone <repository-url>
cd draftkings-helpbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Perplexity AI API key:
```
PERPLEXITY_API_KEY=your-api-key-here
PERPLEXITY_MODEL=sonar-pro
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Type your question about DraftKings in the search bar
2. Click "Search" or press Enter
3. The chatbot will search for information and display the answer with a typing animation
4. Related articles will be shown below the answer

## Technologies Used

- Next.js
- React
- TypeScript
- Perplexity AI API
- react-type-animation for typing effects
- Axios for API requests

## License

[MIT](LICENSE)
