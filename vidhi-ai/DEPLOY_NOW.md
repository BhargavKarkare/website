# 🚀 Deploy VIDHI AI Right Now - Step by Step

Follow these steps **exactly** to deploy your VIDHI AI application. I'll guide you through each step.

---

## ✅ Step 1: Your Code is Ready!

Good news! Your code has been pushed to GitHub at:
**https://github.com/BhargavKarkare/website**

The VIDHI AI folder is inside this repository.

---

## 🗄️ Step 2: Deploy the Database (5 minutes)

### 2.1 Sign Up for Render

1. Open your browser and go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Click **"Sign in with GitHub"** (easiest option)
4. Authorize Render to access your GitHub account

### 2.2 Create PostgreSQL Database

1. Once logged in, click the **"New +"** button (top right)
2. Select **"PostgreSQL"**
3. Fill in these details:
   - **Name:** `vidhi-ai-db`
   - **Database:** `vidhi_ai`
   - **User:** Leave as default
   - **Region:** Choose **"Singapore"** or closest to India
   - **PostgreSQL Version:** Leave as default
   - **Datadog API Key:** Leave empty
   - **Instance Type:** Select **"Free"**
4. Click **"Create Database"**
5. Wait 2-3 minutes for the database to be created

### 2.3 Save Database Connection Info

1. Once created, you'll see the database dashboard
2. Scroll down to **"Connections"**
3. Find **"Internal Database URL"** - it looks like:
   ```
   postgresql://vidhi_ai_user:xxxxx@dpg-xxxxx-a/vidhi_ai
   ```
4. **COPY THIS URL** - you'll need it in the next step!
5. Keep this tab open

### 2.4 Set Up Database Tables

1. On the database page, click the **"Shell"** tab at the top
2. A terminal will open
3. Open this file on your computer: `d:\website\vidhi-ai\server\schema.sql`
4. Copy ALL the contents of that file
5. Paste it into the Render Shell
6. Press **Enter**
7. You should see messages like "CREATE TABLE" - this means it worked! ✅

---

## 🖥️ Step 3: Deploy the Backend Server (10 minutes)

### 3.1 Create Web Service

1. Go back to Render dashboard (click "Dashboard" at top)
2. Click **"New +"** → **"Web Service"**
3. Click **"Build and deploy from a Git repository"** → **Next**
4. Find and select your repository: **"BhargavKarkare/website"**
   - If you don't see it, click "Configure account" and give Render access
5. Click **"Connect"**

### 3.2 Configure the Service

Fill in these settings **exactly**:

- **Name:** `vidhi-ai-backend`
- **Region:** Same as your database (Singapore)
- **Branch:** `main`
- **Root Directory:** `vidhi-ai/server`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Select **"Free"**

### 3.3 Add Environment Variables

1. Scroll down to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Add these two variables:

   **Variable 1:**
   - **Key:** `DATABASE_URL`
   - **Value:** Paste the Internal Database URL you copied earlier

   **Variable 2:**
   - **Key:** `PORT`
   - **Value:** `10000`

4. Click **"Create Web Service"**
5. Wait 5-10 minutes for deployment (you'll see logs scrolling)
6. Once you see "Server is running on port 10000" - it's ready! ✅

### 3.4 Save Your Backend URL

1. At the top of the page, you'll see your service URL, like:
   ```
   https://vidhi-ai-backend.onrender.com
   ```
2. **COPY THIS URL** - you'll need it for the frontend!
3. Test it by opening this URL in your browser - you should see:
   ```
   VIDHI AI API is running
   ```

---

## 🌐 Step 4: Deploy the Frontend (5 minutes)

### 4.1 Sign Up for Vercel

1. Open a new tab and go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### 4.2 Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: **"BhargavKarkare/website"**
3. Click **"Import"**

### 4.3 Configure the Project

Fill in these settings:

- **Framework Preset:** Select **"Vite"**
- **Root Directory:** Click **"Edit"** → Type `vidhi-ai/client` → Click **"Continue"**
- **Build Command:** `npm run build` (should be auto-filled)
- **Output Directory:** `dist` (should be auto-filled)
- **Install Command:** `npm install` (should be auto-filled)

### 4.4 Add Environment Variable

1. Click **"Environment Variables"** to expand
2. Add this variable:
   - **Key:** `VITE_API_URL`
   - **Value:** Paste your backend URL from Step 3.4 (e.g., `https://vidhi-ai-backend.onrender.com`)
3. Make sure **"Production"** is checked

### 4.5 Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes (you'll see a building animation)
3. Once you see "🎉 Congratulations!" - it's live! ✅

### 4.6 Get Your Live URL

1. Click **"Continue to Dashboard"**
2. At the top, you'll see your live URL, like:
   ```
   https://website-xxxxx.vercel.app
   ```
3. Click on it to open your live VIDHI AI application!

---

## 🎉 Step 5: Test Your Deployment

1. Open your Vercel URL
2. You should see the VIDHI AI landing page
3. Click **"Get Started"** or **"Sign In"**
4. Try creating an account
5. Log in and test the features

### ⚠️ Important Note

The first time you access the app, it might take 30-60 seconds to load because the free Render backend "wakes up" from sleep. This is normal!

---

## 📝 Your Deployment URLs

Write these down for future reference:

- **Live Website:** `_________________________________`
- **Backend API:** `_________________________________`
- **Database:** `_________________________________`
- **GitHub Repo:** https://github.com/BhargavKarkare/website

---

## 🔄 How to Update Your App Later

Whenever you make changes to your code:

1. Open PowerShell in `d:\website\vidhi-ai`
2. Run these commands:
   ```powershell
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Vercel and Render will automatically redeploy! (takes 2-5 minutes)

---

## 🆘 Troubleshooting

### "Failed to fetch" error
- Wait 60 seconds for the backend to wake up
- Check if your backend URL is correct in Vercel environment variables

### Can't see the database shell
- Try refreshing the Render page
- Or use a database tool like pgAdmin to connect

### Deployment failed on Vercel
- Check the deployment logs
- Make sure Root Directory is set to `vidhi-ai/client`
- Make sure `VITE_API_URL` environment variable is set

### Backend shows "Application failed to respond"
- Check the Render logs for errors
- Make sure `DATABASE_URL` is set correctly
- Make sure the database schema was run

---

## 🎯 Next Steps After Deployment

1. ✅ Share your live URL with colleagues
2. ✅ Test all features thoroughly
3. ✅ Monitor the Render and Vercel dashboards
4. ✅ Consider upgrading to paid plans for production use (no sleep time)

---

**Need help?** The detailed guide is in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Congratulations! 🎊 Your VIDHI AI is now live on the internet!**
