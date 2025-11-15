# Image Discovery 🖼️

A modern, beautiful image search application powered by Flickr API. Built with React 18 and Tailwind CSS.

## ✨ Features

- **Modern UI**: Beautiful gradient design with smooth animations
- **Real-time Search**: Debounced search with instant results
- **Search History**: Keeps track of recent searches
- **Infinite Scroll**: Automatically loads more images as you scroll
- **Image Modal**: Click any image to view it in full size
- **Responsive Design**: Works perfectly on all devices
- **Performance Optimized**: Built with React hooks and modern best practices

## 🚀 Tech Stack

- **React 18** - Latest React with hooks and concurrent features
- **Tailwind CSS 3** - Utility-first CSS framework
- **Flickr API** - Image search powered by Flickr
- **Modern JavaScript** - ES6+ features, async/await, custom hooks

## 📦 Project Structure

```
src/
├── components/          # React components
│   ├── search/         # Search input component
│   ├── search-list/    # Search history dropdown
│   ├── list/           # Image grid component
│   ├── loader/         # Loading spinner
│   ├── no-result/      # Empty state component
│   └── model/          # Image modal
├── hooks/              # Custom React hooks
│   ├── useImageSearch.js      # Image search logic
│   ├── useInfiniteScroll.js   # Infinite scroll handling
│   └── useSearchHistory.js    # Search history management
├── utils/              # Utility functions
│   ├── helper.js       # Helper functions (debounce, localStorage, etc.)
│   ├── config.js       # App configuration
│   └── urls.js         # API endpoints
├── App.js             # Main app component
└── index.js           # App entry point
```

## 🛠️ Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build
```

## 🎨 Features Breakdown

### Custom Hooks
- `useImageSearch` - Manages API calls and photo state
- `useInfiniteScroll` - Handles infinite scrolling
- `useSearchHistory` - Manages search history in localStorage

### Utility Functions
- `debounce` - Delays function execution
- `throttle` - Limits function execution frequency
- `buildFlickrImageUrl` - Constructs Flickr image URLs
- `localStorage helpers` - Type-safe localStorage operations

### Modern React Patterns
- Functional components with hooks
- Memoized callbacks and values
- Custom hooks for reusable logic
- Proper error handling
- Accessible UI components

## 🎯 Key Improvements from Original

1. **React 18** - Upgraded from React 16 to 18
2. **Tailwind CSS** - Replaced SCSS with utility-first Tailwind
3. **Hooks** - Converted class components to functional components
4. **Modern Patterns** - Used latest React best practices
5. **Better UX** - Added loading states, animations, and better error handling
6. **Optimized Performance** - Debouncing, memoization, and lazy loading
7. **Beautiful UI** - Modern gradient design with smooth transitions

## 🌈 Color Theme

The app uses a beautiful purple-blue-pink gradient theme:
- Primary: Purple shades (#9333ea - #6b21a8)
- Secondary: Blue shades (#0ea5e9 - #0369a1)
- Accent: Pink shades (#ec4899 - #be185d)

## 📝 Available Scripts

### `yarn start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `yarn build`
Builds the app for production to the `build` folder

### `yarn test`
Launches the test runner in interactive watch mode

## 📄 License

MIT

## 👨‍💻 Author

SrinivasNarayansetty
