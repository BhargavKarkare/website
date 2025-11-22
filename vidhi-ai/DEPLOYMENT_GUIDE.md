# 🚀 VIDHI AI Deployment Guide (For Non-Technical Users)

This guide will help you deploy your VIDHI AI application online so others can access it. We'll use **free** services that are beginner-friendly.

---

## 📋 What You'll Need

Before starting, make sure you have:
- ✅ A GitHub account (free) - [Sign up here](https://github.com/signup)
- ✅ A Vercel account (free) - [Sign up here](https://vercel.com/signup)
- ✅ A Render account (free) - [Sign up here](https://render.com/register)
- ✅ Your VIDHI AI code on your computer

---

## 🎯 Deployment Overview

Your VIDHI AI application has **two parts**:
1. **Frontend (Client)** - The website users see and interact with
2. **Backend (Server)** - The behind-the-scenes code that handles data

We'll deploy them separately:
- **Frontend** → Vercel (easiest for React apps)
- **Backend** → Render (free tier includes database)

---

## 📦 Step 1: Prepare Your Code for Deployment

### 1.1 Install Git (if not already installed)

1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Install with default settings
3. Restart your computer

### 1.2 Upload Your Code to GitHub

1. **Open Command Prompt or PowerShell** in your `d:\website\vidhi-ai` folder
   - Right-click in the folder → "Open in Terminal" or "Open PowerShell window here"

2. **Run these commands one by one:**

```bash
# Initialize git repository
git init

# Add all your files
git add .

# Commit your files
git commit -m "Initial commit for VIDHI AI"

# Create a new repository on GitHub
# Go to https://github.com/new
# Name it: vidhi-ai
# Don't initialize with README
# Click "Create repository"

# Connect your local code to GitHub (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vidhi-ai.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

> **Note:** You'll be asked to log in to GitHub. Use your GitHub username and password (or personal access token).

---

## 🌐 Step 2: Deploy the Backend (Server)

### 2.1 Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account (easiest option)

### 2.2 Create a PostgreSQL Database

1. From your Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Fill in the details:
   - **Name:** `vidhi-ai-database`
   - **Database:** `vidhi_ai`
   - **User:** `vidhi_admin` (or leave default)
   - **Region:** Choose closest to your location
   - **Plan:** Select **"Free"**
3. Click **"Create Database"**
4. Wait 2-3 minutes for the database to be created
5. **Save the "Internal Database URL"** - you'll need this later
   - It looks like: `postgresql://user:password@host/database`

### 2.3 Set Up the Database Schema

1. In your Render database dashboard, click **"Connect"** → **"External Connection"**
2. You'll see connection details. We need to run the schema.

**Option A: Using Render's Web Shell (Easiest)**
1. In the database dashboard, click the **"Shell"** tab
2. Copy the contents of your `d:\website\vidhi-ai\server\schema.sql` file
3. Paste it into the shell and press Enter
4. You should see "CREATE TABLE" messages

**Option B: Using a Database Tool**
1. Download [pgAdmin](https://www.pgadmin.org/download/) or [DBeaver](https://dbeaver.io/download/)
2. Connect using the External Connection details from Render
3. Run the `schema.sql` file

### 2.4 Deploy the Backend Server

1. From Render dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"** → Select your `vidhi-ai` repository
3. Configure the service:
   - **Name:** `vidhi-ai-server`
   - **Region:** Same as your database
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Select **"Free"**
4. Click **"Advanced"** → **"Add Environment Variable"**
   - **Key:** `DATABASE_URL`
   - **Value:** Paste the Internal Database URL from Step 2.2
   - **Key:** `PORT`
   - **Value:** `10000`
5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment
7. **Save your backend URL** - it will look like: `https://vidhi-ai-server.onrender.com`

> **Important:** Free Render services sleep after 15 minutes of inactivity. The first request after sleeping takes 30-60 seconds to wake up.

---

## 💻 Step 3: Deploy the Frontend (Client)

### 3.1 Update Frontend Configuration

Before deploying, we need to tell the frontend where the backend is.

1. Open `d:\website\vidhi-ai\client\src` folder
2. Look for files that make API calls (usually in a `services` or `api` folder, or in components)
3. Find where API calls are made (look for `fetch` or `axios` calls)
4. Update the API URL to your Render backend URL

**Example:** If you see:
```javascript
const response = await fetch('http://localhost:5000/api/consultations');
```

Change it to:
```javascript
const response = await fetch('https://vidhi-ai-server.onrender.com/api/consultations');
```

> **Tip:** Search for `localhost:5000` or `localhost:3000` in your client folder and replace with your Render URL.

### 3.2 Create a Vercel Configuration File

Create a new file `d:\website\vidhi-ai\client\vercel.json` with this content:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures React Router works correctly on Vercel.

### 3.3 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** and use your GitHub account
3. Click **"Add New..."** → **"Project"**
4. Select your `vidhi-ai` repository
5. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. You'll get a URL like: `https://vidhi-ai.vercel.app`

**🎉 Your VIDHI AI is now live!**

---

## 🔧 Step 4: Update and Push Changes

After updating the API URLs in your frontend:

```bash
# In d:\website\vidhi-ai folder
git add .
git commit -m "Update API URLs for production"
git push
```

Vercel will automatically redeploy your frontend when you push to GitHub!

---

## ✅ Step 5: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://vidhi-ai.vercel.app`)
2. Try logging in or signing up
3. Test the consultation features
4. Check if data is being saved

### Common Issues and Fixes

#### ❌ "Failed to fetch" errors
- **Cause:** Backend is sleeping or CORS issue
- **Fix:** Wait 60 seconds for backend to wake up, or check CORS settings in `server/server.js`

#### ❌ White screen on Vercel
- **Cause:** Build error or routing issue
- **Fix:** Check Vercel deployment logs, ensure `vercel.json` is in the `client` folder

#### ❌ Database connection errors
- **Cause:** Wrong DATABASE_URL
- **Fix:** Double-check the environment variable in Render matches your database URL

---

## 🎨 Step 6: Custom Domain (Optional)

### Free Option: Use Vercel's Domain
- Your app is already live at `https://your-app.vercel.app`

### Paid Option: Buy a Custom Domain
1. Buy a domain from [Namecheap](https://www.namecheap.com) or [GoDaddy](https://www.godaddy.com) (~$10/year)
2. In Vercel, go to your project → **Settings** → **Domains**
3. Add your custom domain
4. Follow Vercel's instructions to update DNS settings

---

## 💰 Cost Breakdown

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| **Vercel** | ✅ Free forever | 100GB bandwidth/month |
| **Render (Backend)** | ✅ Free forever | Sleeps after 15 min inactivity |
| **Render (Database)** | ✅ Free forever | 1GB storage, expires after 90 days |
| **GitHub** | ✅ Free forever | Unlimited public repositories |

> **Note:** For production use with real patients, consider upgrading to paid plans for better reliability.

---

## 📞 Getting Help

If you get stuck:

1. **Check Deployment Logs:**
   - Vercel: Project → Deployments → Click on deployment → View logs
   - Render: Service → Logs tab

2. **Common Commands:**
   ```bash
   # Check if git is installed
   git --version
   
   # Check if node is installed
   node --version
   
   # View git status
   git status
   ```

3. **Resources:**
   - [Vercel Documentation](https://vercel.com/docs)
   - [Render Documentation](https://render.com/docs)
   - [GitHub Guides](https://guides.github.com)

---

## 🔄 Updating Your Deployed App

Whenever you make changes to your code:

```bash
# In d:\website\vidhi-ai folder
git add .
git commit -m "Description of your changes"
git push
```

- **Frontend (Vercel):** Automatically redeploys in 2-3 minutes
- **Backend (Render):** Automatically redeploys in 5-10 minutes

---

## 🎯 Next Steps

After successful deployment:

1. ✅ Test all features thoroughly
2. ✅ Set up monitoring (Render and Vercel provide basic monitoring)
3. ✅ Consider upgrading to paid plans for production use
4. ✅ Set up automated backups for your database
5. ✅ Add SSL certificate (Vercel and Render provide this automatically)

---

## 🚨 Important Security Notes

- Never commit `.env` files to GitHub (they contain sensitive data)
- Use environment variables for all secrets (database passwords, API keys)
- Regularly update dependencies: `npm update`
- Monitor your deployment logs for errors

---

**Congratulations! 🎉 Your VIDHI AI application is now deployed and accessible to the world!**

If you need help with any step, feel free to ask for clarification.
