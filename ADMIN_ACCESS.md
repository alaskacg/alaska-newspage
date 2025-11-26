# 🔒 Secure Admin Access Guide

## Overview
Admin access is secured and not publicly visible. Only authenticated admin users can access the admin panel.

---

## 🎯 First-Time Setup (One-Time Only)

### Step 1: Access Setup Page
Navigate directly to: **`/setup`**
- This page is not linked anywhere publicly
- It only works once (disabled after first admin is created)
- Bookmark this URL for reference

### Step 2: Create Your Admin Account
1. Enter your email address
2. Create a secure password (minimum 6 characters)
3. Enter the setup code: **`ANPadmin`**
4. Click "Create Admin Account"

### Step 3: Setup Complete
- You'll be automatically redirected to the admin panel
- The setup page is now permanently disabled for security
- Your admin account is ready to use

---

## 🔐 Daily Admin Login Workflow

### How to Access Admin Features

1. **Go to the Login Page**
   - Click the User icon in the header (top right)
   - Or navigate to: **`/auth`**

2. **Sign In**
   - Enter your admin email
   - Enter your admin password
   - Click "Sign In"

3. **Access Admin Panel**
   - After successful login, you'll see "Admin Access Granted" ✓
   - Two buttons will appear:
     - **Home** - Return to main site
     - **Admin Panel** - Access weekly reports management
   - Click "Admin Panel" to manage content

---

## 📝 Managing Weekly Reports

Once in the Admin Panel (`/admin/weekly-reports`):

1. **Upload New Report**
   - Title: Enter the report title
   - Description: Add optional description
   - Video File: Select video to upload
   - Click "Upload Weekly Report"

2. **Automatic Features**
   - Video uploaded to secure storage (admin-only)
   - Database entry created
   - Push notifications sent to subscribers
   - Latest report displays on homepage

3. **Delete Reports**
   - Each report has a "Delete" button
   - Removes video from storage
   - Removes database entry

---

## 🛡️ Security Features

✅ **No Public Admin Links**
- Admin setup removed from public navigation
- Setup page URL not advertised anywhere
- Admin panel requires authentication + role verification

✅ **Role-Based Access Control**
- User roles stored in secure database table
- Admin status verified on every action
- Non-admins redirected automatically

✅ **Secure Storage**
- Only admins can upload videos
- Only admins can delete videos
- Public can view, not modify

✅ **Auto-Confirm Email**
- Enabled for faster setup
- No email verification needed
- Secure for private admin use

---

## 🔗 Important URLs (Bookmark These)

| URL | Purpose |
|-----|---------|
| `/auth` | Login page (your main entry point) |
| `/setup` | First-time admin creation (one-time use) |
| `/admin/weekly-reports` | Admin panel for managing videos |

---

## 💡 Pro Tips

1. **Bookmark the login page** (`/auth`) for quick access
2. **Use a password manager** for your admin credentials
3. **Stay logged in** - you won't need to re-enter credentials frequently
4. **Direct URL access** - You can go straight to `/admin/weekly-reports` if already logged in

---

## ❓ Troubleshooting

**Can't access admin panel?**
- Make sure you're logged in at `/auth`
- Verify you see "Admin Access Granted" after login
- Check that you created your account via `/setup` (not regular signup)

**Forgot which email you used?**
- Check your browser's saved passwords
- Or create a new admin via database if needed

**Setup page not working?**
- It only works once
- After first admin is created, it's permanently disabled
- This is a security feature

---

## 🎉 You're All Set!

Your admin access is now secure and ready to use. Simply go to `/auth`, log in, and click "Admin Panel" to manage your weekly reports!
