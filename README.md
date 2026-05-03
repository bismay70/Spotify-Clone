# Spotify Clone

A Spotify-inspired full-stack music app built with React, Vite, Express, MongoDB, and Cloudinary. The repo includes a public-facing music player, an admin panel for managing content, and a backend API for songs and albums.

## Features

- Play and pause music
- Skip to the next or previous track
- Browse tracks and albums in the player UI
- Track playback progress and total duration
- Manage songs and albums from the admin panel
- Upload media through the backend API and Cloudinary

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Admin Panel: React, Vite, Tailwind CSS, React Toastify
- Backend: Node.js, Express, MongoDB, Cloudinary, Multer

## Project Structure

```text
spotify/
├── admin/
├── backend/
├── frontend/
└── README.md
```

## Getting Started

Run each app in its own terminal.

### 1. Install dependencies

```bash
cd frontend
npm install

cd ../admin
npm install

cd ../backend
npm install
```

### 2. Configure environment variables

Create a `.env` file in `backend/` with the values used by the server:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
PORT=4000
```

### 3. Start the apps

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run dev
```

Admin panel:

```bash
cd admin
npm run dev
```

## Available Scripts

Frontend and admin apps both support:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Backend supports:

- `npm start`

## Notes

- The backend API exposes routes for songs and albums.
- The frontend player uses local track data for playback behavior.
- This project is intended for learning and portfolio use.
