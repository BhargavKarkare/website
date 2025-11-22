# 🚀 Quick Deployment Checklist

Use this checklist when deploying VIDHI AI to production.

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All code is committed to Git
- [ ] `.gitignore` file is in place (prevents sensitive files from being uploaded)
- [ ] No `.env` files are committed (check with `git status`)

### 2. Backend Setup (Render)
- [ ] PostgreSQL database created on Render
- [ ] Database schema (`schema.sql`) has been run
- [ ] Backend service deployed on Render
- [ ] Environment variable `DATABASE_URL` is set
- [ ] Backend URL saved (e.g., `https://vidhi-ai-server.onrender.com`)

### 3. Frontend Setup (Vercel)
- [ ] Created `.env` file in `client` folder with:
  ```
  VITE_API_URL=https://your-backend-url.onrender.com
  ```
- [ ] `vercel.json` file is in the `client` folder
- [ ] Frontend deployed on Vercel
- [ ] Frontend URL saved (e.g., `https://vidhi-ai.vercel.app`)

### 4. Testing
- [ ] Can access the frontend URL
- [ ] Login/Signup works
- [ ] Can create consultations
- [ ] Can view patients
- [ ] Data persists after refresh

## 🔄 Updating Your Deployed App

When you make changes to your code:

```bash
# 1. Save your changes
git add .

# 2. Commit with a message
git commit -m "Your change description"

# 3. Push to GitHub
git push
```

**That's it!** Vercel and Render will automatically redeploy.

## 🆘 Troubleshooting

### Backend is sleeping (Render free tier)
- **Symptom:** First request takes 30-60 seconds
- **Solution:** This is normal on free tier. Consider upgrading for production use.

### "Failed to fetch" errors
- **Check:** Is `VITE_API_URL` set correctly in Vercel?
- **Check:** Is the backend service running on Render?
- **Check:** Are there CORS errors in browser console?

### White screen on Vercel
- **Check:** Vercel deployment logs for build errors
- **Check:** Is `vercel.json` in the `client` folder?
- **Check:** Browser console for JavaScript errors

### Database connection errors
- **Check:** Is `DATABASE_URL` environment variable correct in Render?
- **Check:** Is the database service running?
- **Check:** Can you connect to the database using the connection string?

## 📊 Monitoring

### Vercel Dashboard
- View deployment history
- Check build logs
- Monitor bandwidth usage

### Render Dashboard
- View service logs
- Check database usage
- Monitor uptime

## 💡 Tips

1. **Always test locally first** before deploying
2. **Check logs** if something doesn't work
3. **Use environment variables** for all configuration
4. **Keep your dependencies updated** with `npm update`
5. **Monitor your free tier limits** to avoid service interruptions

## 🔗 Important URLs

After deployment, save these URLs:

- **Frontend (Vercel):** `_______________________________`
- **Backend (Render):** `_______________________________`
- **Database (Render):** `_______________________________`
- **GitHub Repository:** `_______________________________`

---

**Need help?** Refer to the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.
