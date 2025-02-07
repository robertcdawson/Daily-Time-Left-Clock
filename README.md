# Daily Time Left Clock

A simple, elegant web application that helps you visualize how much time you have left in your day. The app features a circular visualization where a "sun" travels around the perimeter of a circle, representing the progression of time between your wake and sleep times.

## Features

- Visual time tracking with an intuitive circular design
- Customizable wake and sleep times
- Real-time updates
- Persistent settings (saved in localStorage)
- Clean, minimal interface
- Mobile and desktop responsive

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Usage

1. When you first open the app, it will use default wake (7:00 AM) and sleep (11:00 PM) times
2. Click the settings gear (⚙️) to adjust your wake and sleep times
3. The circle shows your day's progress:
   - The outer circle represents your entire day
   - The moving dot represents the current time
   - The time display shows both current time and time remaining until sleep

## Tech Stack

- Vue.js 3 with Composition API
- Vite for build tooling
- SVG for smooth graphics
- Modern CSS with flexbox and transitions

## Browser Support

This application supports all modern browsers on both desktop and mobile devices.
