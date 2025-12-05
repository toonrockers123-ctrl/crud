# ⚠️ GitHub Authentication Issue - Fix Guide

## Problem:
- Git config user: `toonrockers123-ctrl`
- Remote repository: `https://github.com/toonrockers123-ctrl/crud.git`
- Error: **Permission denied (403)**

## Solution Options:

### **Option 1: Use Personal Access Token (Recommended for HTTPS)**

1. **Generate Personal Access Token on GitHub:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: `Git CLI Token`
   - Select scopes: Check `repo` (all)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Update Git Credentials:**
   ```bash
   git config --global credential.helper wincred
   ```

3. **Try pushing again:**
   ```bash
   cd d:\company\projects\penteai\postgres
   git push -u origin main
   ```
   - When prompted for username: `toonrockers123-ctrl`
   - When prompted for password: Paste your **Personal Access Token**

---

### **Option 2: Use SSH (More Secure)**

1. **Generate SSH Key:**
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```
   - File location: Press Enter (default)
   - Passphrase: Press Enter (or set one)

2. **Add SSH Key to GitHub:**
   ```bash
   # Copy the public key
   type $env:USERPROFILE\.ssh\id_ed25519.pub | clip
   ```
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste the key
   - Click "Add SSH key"

3. **Update Git Remote to use SSH:**
   ```bash
   cd d:\company\projects\penteai\postgres
   git remote set-url origin git@github.com:toonrockers123-ctrl/crud.git
   git push -u origin main
   ```

---

### **Option 3: Update Git Config to Match GitHub Account**

1. **Update local Git config:**
   ```bash
   cd d:\company\projects\penteai\postgres
   git config user.name "toonrockers123-ctrl"
   git config user.email "your-email@example.com"
   ```

2. **Then use Personal Access Token (Option 1) to push**

---

## 🚀 Quick Fix (Start Here):

```bash
# Step 1: Go to project directory
cd d:\company\projects\penteai\postgres

# Step 2: Generate Personal Access Token from:
# https://github.com/settings/tokens (copy the token)

# Step 3: Configure Git to cache credentials
git config --global credential.helper wincred

# Step 4: Push to GitHub
git push -u origin main

# When prompted:
# Username: toonrockers123-ctrl
# Password: (paste your Personal Access Token here)
```

---

## ✅ Verify After Push:

```bash
# Check remote
git remote -v

# Check log
git log --oneline

# Check branch
git branch
```

Expected output:
```
origin  https://github.com/toonrockers123-ctrl/crud.git (fetch)
origin  https://github.com/toonrockers123-ctrl/crud.git (push)

* main
7f1f650 Initial commit: User CRUD API with Express.js and PostgreSQL
```

---

## 🔗 Required Links:

- Personal Access Token: https://github.com/settings/tokens
- SSH Keys: https://github.com/settings/keys
- Repository: https://github.com/toonrockers123-ctrl/crud

---

Try **Option 1 (Personal Access Token)** first - it's the quickest! 🎯
