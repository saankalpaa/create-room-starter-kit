# Game Room Starter Kit

A Next.js application for creating and managing game rooms, built with Firebase and Material-UI.

## Features

- Create and join game rooms
- Real-time room updates using Firestore
- Player management
- Host controls
- Copy room ID functionality
- Responsive Material-UI design

## Prerequisites

- Node.js 18+ and npm
- Firebase account

## Setup

1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Firestore in your Firebase project
3. Create a `.env.local` file in the root directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Install dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and Firebase configuration
- `src/types/` - TypeScript type definitions

## Technologies Used

- Next.js 14
- TypeScript
- Firebase/Firestore
- Material-UI
- Tailwind CSS

## Integration with Your Game

To integrate this starter kit with your game:

1. The server (`server/index.js`) handles all room management logic. You can extend it by:
   - Adding game-specific events in the socket.io handlers
   - Modifying the room data structure to include game-specific information
   - Adding game state management

2. The client components (`client/src/components/`) can be customized:
   - Modify the UI to match your game's theme
   - Add game-specific UI elements
   - Implement game logic in the `Room` component's `gameStarted` handler

3. Key integration points:
   - `socket.on('gameStarted', ...)` in the Room component is where you can initialize your game
   - The room object contains all player information and can be extended with game-specific data
   - The host controls can be extended with game-specific options

## Customization

### Room Configuration
- Modify the maximum players per room in `server/index.js`
- Change the room ID format in the `createRoom` handler
- Add custom room settings

### UI Customization
- Modify the theme in `client/src/App.js`
- Customize components in the `client/src/components` directory
- Add your game's branding and styling

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this starter kit in your projects! 