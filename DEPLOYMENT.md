# Deployment Guide

This guide will help you deploy the YouTube API Platform to production using Vercel (frontend) and Render (backend API).

## Prerequisites

- GitHub repository with code pushed
- Vercel account (free)
- Render account (free)
- YouTube API Key from Google Cloud Console

## Step 1: Deploy Backend to Render

### 1. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Verify your email

### 2. Create PostgreSQL Database
1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Name: `youtube-api-db`
4. Database: `youtube_api`
5. User: `youtube_api_user`
6. Region: Choose closest to your users
7. Plan: Free
8. Click "Create Database"

### 3. Deploy Backend API
1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository: `nishkarshk212/yt_tg_bot`
4. Configure:
   - **Name**: `youtube-api-backend`
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run db:generate`
   - **Start Command**: `npm run server`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: (select from database created in step 2)
   - `JWT_SECRET`: (generate a secure random string)
   - `YOUTUBE_API_KEY`: (your YouTube API key)
   - `FRONTEND_URL`: (will add after Vercel deployment)
6. Plan: Free
7. Click "Create Web Service"

### 4. Run Database Migrations
1. Once deployed, go to your web service in Render
2. Click "Shell" tab
3. Run: `npx prisma migrate deploy`
4. Run: `npx prisma db seed`

### 5. Note Your Backend URL
Your backend URL will be: `https://youtube-api-backend.onrender.com`

## Step 2: Deploy Frontend to Vercel

### 1. Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Verify your email

### 2. Import Project
1. In Vercel dashboard, click "Add New Project"
2. Select your GitHub repository: `nishkarshk212/yt_tg_bot`
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://youtube-api-backend.onrender.com` (from Step 1)
5. Click "Deploy"

### 3. Update Backend FRONTEND_URL
1. Go back to Render dashboard
2. Open your web service settings
3. Update `FRONTEND_URL` to your Vercel URL
4. Save and redeploy

## Step 3: Verify Deployment

### Test Backend API
```bash
curl https://youtube-api-backend.onrender.com/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### Test Frontend
1. Open your Vercel URL
2. Navigate to `/docs`
3. Test API explorer with your API key

## Step 4: Create Admin User

1. Register a new account on your deployed frontend
2. Manually update the user role to ADMIN in the database:
   - Go to Render database dashboard
   - Open PostgreSQL shell
   - Run: `UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';`

## Environment Variables Reference

### Backend (Render)
- `NODE_ENV`: `production`
- `PORT`: `10000`
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secure random string (use: `openssl rand -base64 32`)
- `YOUTUBE_API_KEY`: Your YouTube Data API v3 key
- `FRONTEND_URL`: Your Vercel frontend URL

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL`: Your Render backend URL

## Troubleshooting

### Backend Issues
- **Database connection errors**: Check DATABASE_URL is correct
- **Migration errors**: Run `npx prisma migrate deploy` in Render shell
- **Port issues**: Ensure PORT is set to 10000 (Render requirement)

### Frontend Issues
- **API connection errors**: Verify NEXT_PUBLIC_API_URL is correct
- **Build errors**: Check logs in Vercel dashboard
- **CORS errors**: Ensure FRONTEND_URL matches your Vercel domain

### Common Issues
- **Free tier sleep**: Render free tier sleeps after 15min inactivity (wakes on request)
- **Database connection limits**: Free PostgreSQL has connection limits
- **Rate limits**: Check your plan limits in dashboard

## Monitoring

### Render Monitoring
- View logs in web service dashboard
- Monitor metrics in database dashboard
- Set up alerts for errors

### Vercel Monitoring
- View deployment logs
- Monitor analytics in dashboard
- Set up custom domains

## Scaling

### When to Upgrade
- High traffic: Upgrade Render plan
- More storage: Upgrade PostgreSQL plan
- Custom domain: Available on paid plans
- Better performance: Upgrade Vercel plan

## Cost Summary

### Free Tier Costs
- **Render**: $0/month (web service + PostgreSQL)
- **Vercel**: $0/month (Next.js hosting)
- **Total**: $0/month

### Paid Tier Options
- **Render Pro**: $7/month (better performance)
- **Vercel Pro**: $20/month (more bandwidth)
- **PostgreSQL**: $9/month (more connections)

## Security Best Practices

1. Never commit `.env` files
2. Use strong JWT secrets
3. Rotate API keys regularly
4. Enable HTTPS (automatic on both platforms)
5. Monitor usage logs
6. Set up rate limiting
7. Keep dependencies updated

## Support

- **Render**: [support.render.com](https://support.render.com)
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **GitHub Issues**: [github.com/nishkarshk212/yt_tg_bot/issues](https://github.com/nishkarshk212/yt_tg_bot/issues)
