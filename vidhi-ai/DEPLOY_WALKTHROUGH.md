# 🚀 VIDHI AI Deployment Walkthrough for Shilpa

**Email to use:** karkare.shilpa@gmail.com

This guide will walk you through deploying VIDHI AI step by step with screenshots and exact instructions.

---

## 📋 What We're Going to Do

1. **Deploy Database** on Render (stores patient data)
2. **Deploy Backend** on Render (handles API requests)
3. **Deploy Frontend** on Vercel (the website users see)

**Total Time:** About 20-30 minutes

---

## Part 1: Deploy the Database on Render

### Step 1.1: Sign Up for Render

![Render Homepage](file:///C:/Users/HP/.gemini/antigravity/brain/e1b926ed-2a88-46dc-8f9e-68eea86de4fb/render_home_1763809022875.png)

1. **Open Render:** https://render.com (already open in your browser!)
2. **Click "Get Started for Free"** (the blue button)
3. **Choose "Sign in with GitHub"** (easiest option)
4. **Use your GitHub account** to sign in
   - If you don't have GitHub, create one at https://github.com/signup using **karkare.shilpa@gmail.com**

### Step 1.2: Create PostgreSQL Database

Once you're logged into Render:

1. Click the **"New +"** button (top right corner)
2. Select **"PostgreSQL"** from the dropdown
3. Fill in the form:

```
Name: vidhi-ai-database
Database: vidhi_ai
User: (leave as default)
Region: Singapore (closest to India)
PostgreSQL Version: (leave as default)
Instance Type: Free
```

4. Click **"Create Database"**
5. ⏳ Wait 2-3 minutes while it creates

### Step 1.3: Save the Database URL

Once created, you'll see the database dashboard:

1. Scroll down to the **"Connections"** section
2. Find **"Internal Database URL"**
3. It will look like: `postgresql://vidhi_ai_user:xxxxx@dpg-xxxxx-a/vidhi_ai`
4. **Click the copy button** next to it
5. **Paste it in a notepad** - you'll need this in a few minutes!

### Step 1.4: Set Up Database Tables

1. On the database page, click the **"Shell"** tab (at the top)
2. A black terminal window will appear
3. Now, open this file on your computer:
   - Location: `d:\website\vidhi-ai\server\schema.sql`
   - Right-click → Open with Notepad
4. **Select all** (Ctrl+A) and **Copy** (Ctrl+C)
5. Go back to the Render Shell
6. **Right-click and Paste** (or Ctrl+V)
7. Press **Enter**
8. You should see messages like:
   ```
   CREATE TABLE
   CREATE TABLE
   CREATE TABLE
   ```
9. ✅ **Success!** Your database is ready!

---

## Part 2: Deploy the Backend on Render

### Step 2.1: Create Web Service

1. Go back to Render Dashboard (click "Dashboard" in the top left)
2. Click **"New +"** → **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click **"Next"**

### Step 2.2: Connect Your GitHub Repository

1. You'll see a list of your repositories
2. Find **"BhargavKarkare/website"**
   - If you don't see it, click **"Configure account"** and give Render permission
3. Click **"Connect"** next to your repository

### Step 2.3: Configure the Backend Service

Fill in these settings **EXACTLY**:

```
Name: vidhi-ai-backend
Region: Singapore (same as database)
Branch: main
Root Directory: vidhi-ai/server
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

**Important:** Make sure "Root Directory" is exactly `vidhi-ai/server` (no spaces, no slashes at the end)

### Step 2.4: Add Environment Variables

Scroll down to **"Environment Variables"** section:

1. Click **"Add Environment Variable"**
2. Add the first variable:
   - **Key:** `DATABASE_URL`
   - **Value:** Paste the database URL you saved earlier
3. Click **"Add Environment Variable"** again
4. Add the second variable:
   - **Key:** `PORT`
   - **Value:** `10000`

### Step 2.5: Deploy!

1. Click **"Create Web Service"** (big button at the bottom)
2. ⏳ Wait 5-10 minutes while it deploys
3. You'll see logs scrolling - this is normal!
4. Wait until you see: **"Server is running on port 10000"**
5. ✅ **Success!** Your backend is live!

### Step 2.6: Save Your Backend URL

1. At the top of the page, you'll see your service URL:
   ```
   https://vidhi-ai-backend.onrender.com
   ```
2. **Copy this URL** and save it in your notepad
3. Test it: Open this URL in a new browser tab
4. You should see: **"VIDHI AI API is running"**

---

## Part 3: Deploy the Frontend on Vercel

### Step 3.1: Sign Up for Vercel

1. Open a new tab: https://vercel.com
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### Step 3.2: Import Your Project

1. Click **"Add New..."** (top right)
2. Select **"Project"**
3. Find **"BhargavKarkare/website"**
4. Click **"Import"**

### Step 3.3: Configure the Frontend

Fill in these settings:

```
Framework Preset: Vite
Root Directory: Click "Edit" → Type: vidhi-ai/client → Click "Continue"
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 3.4: Add Environment Variable

1. Expand **"Environment Variables"**
2. Add this variable:
   - **Key:** `VITE_API_URL`
   - **Value:** Your backend URL (e.g., `https://vidhi-ai-backend.onrender.com`)
3. Make sure **"Production"** is checked

### Step 3.5: Deploy!

1. Click **"Deploy"** (big button at the bottom)
2. ⏳ Wait 2-3 minutes
3. You'll see a building animation
4. When you see **"🎉 Congratulations!"** - it's live!

### Step 3.6: Visit Your Live Website!

1. Click **"Continue to Dashboard"**
2. At the top, you'll see your live URL:
   ```
   https://website-xxxxx.vercel.app
   ```
3. **Click on it** to open your VIDHI AI application!
4. **Save this URL** - this is your live website!

---

## 🎉 Testing Your Deployment

1. Open your Vercel URL
2. You should see the VIDHI AI landing page
3. Click **"Get Started"** or **"Sign In"**
4. Create an account with **karkare.shilpa@gmail.com**
5. Test the features!

### ⚠️ First Load Note

The **first time** you access the app, it might take 30-60 seconds because the free Render backend needs to "wake up". This is normal! After that, it will be fast.

---

## 📝 Save These URLs

Write these down:

- **Your Live Website:** `_________________________________`
- **Backend API:** `_________________________________`
- **Database Name:** `vidhi-ai-database`

---

## 🔄 How to Update Later

When you make changes to your code:

1. Open PowerShell in `d:\website\vidhi-ai`
2. Run:
   ```powershell
   git add .
   git commit -m "Updated features"
   git push
   ```
3. Vercel and Render will auto-deploy in 2-5 minutes!

---

## 🆘 Need Help?

If something doesn't work:

1. **Check Render Logs:** Go to your service → "Logs" tab
2. **Check Vercel Logs:** Go to your project → "Deployments" → Click latest → "View Logs"
3. **Common Issues:**
   - "Failed to fetch" → Wait 60 seconds for backend to wake up
   - Build failed → Check if Root Directory is correct
   - Database error → Check if DATABASE_URL is set correctly

---

## ✅ Deployment Checklist

- [ ] Render account created with karkare.shilpa@gmail.com
- [ ] Database created and schema loaded
- [ ] Backend deployed and showing "API is running"
- [ ] Vercel account created with GitHub
- [ ] Frontend deployed successfully
- [ ] Can access the live website
- [ ] Can log in and use features

---

**Congratulations, Shilpa! 🎊 Your VIDHI AI is now live!**

Share your website URL with colleagues and start using it!
