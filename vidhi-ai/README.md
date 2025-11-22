# VIDHI AI - Pediatric Clinical Assistant

## Prerequisites
- **Node.js**: You must have Node.js installed to run this application. Download it from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: Ensure you have PostgreSQL installed and running.

## Setup

1. **Install Dependencies**
   Open a terminal in the root directory and run:
   ```bash
   cd vidhi-ai/client
   npm install
   cd ../server
   npm install
   ```

2. **Database Setup**
   - Create a database named `vidhi_ai`.
   - Run the schema script located at `vidhi-ai/server/schema.sql` in your database.

3. **Environment Variables**
   - Check `vidhi-ai/server/.env` and update the `DATABASE_URL` if necessary.

## Running the App

1. **Start Backend**
   ```bash
   cd vidhi-ai/server
   npm start
   ```

2. **Start Frontend**
   ```bash
   cd vidhi-ai/client
   npm run dev
   ```

## Troubleshooting
- If you see "node is not recognized", please install Node.js and restart your terminal.
