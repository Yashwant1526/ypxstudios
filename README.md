# YPX Studios

## Local development

### Frontend
1. Open the client folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev -- --host 0.0.0.0
   ```
4. Open the Vite URL shown in the terminal.

### Backend API
1. Open the server folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set the values.
4. Start the API:
   ```bash
   npm start
   ```

## Admin login
Use the credentials from your `.env` file:
- Email: `admin@ypxstudios.com`
- Password: `ChangeMe123!`

## Environment configuration
- Frontend env file: `client/.env.example`
- Root env file: `.env.example`
- Server env file: `server/.env.example`

## Deployment
This project includes deployment-ready config:
- `render.yaml` for Render
- `client/vercel.json` for Vercel
- `client/public/_redirects` for SPA routing

### Render
- Deploy the backend from the `server` directory.
- Deploy the frontend as a static site from the `client` directory.
- Set `VITE_API_BASE_URL` to your live API URL.

### Vercel
- Import the `client` folder as the project root.
- Set the build command to `npm install && npm run build`.
- Set the output directory to `dist`.

## Customisation
Update these files with your real business details:
- `client/src/config.js`
- `client/src/data.js`
- `client/src/pages/Portfolio.jsx`
- `server/data/store.json`

## Notes
This is structured for a real business platform, with placeholder data wired in for easier replacement later.
