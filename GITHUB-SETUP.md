# GitHub Repository Setup Guide

Your project is now initialized as a Git repository. Follow these steps to push it to GitHub:

## 📝 Step 1: Create Repository on GitHub

### Option A: Using GitHub Web Interface (Easy)

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name:** `user-crud-api`
   - **Description:** `Express.js CRUD API with PostgreSQL and Docker`
   - **Public or Private:** Choose based on your preference
   - **Do NOT initialize with README** (we already have one)
   - **Do NOT add .gitignore** (we already have one)
   - **Do NOT add license** (optional)
3. Click "Create repository"

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI from: https://cli.github.com/
# Then login:
gh auth login

# Create repository
gh repo create user-crud-api --public --source=. --push --remote=origin
```

---

## 🔗 Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Follow these commands:

```bash
# Navigate to project
cd d:\company\projects\penteai\postgres

# Add remote repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/user-crud-api.git

# Rename branch to main (if not already)
git branch -M main

# Push all commits to GitHub
git push -u origin main
```

### Example with actual username:
```bash
git remote add origin https://github.com/johndoe/user-crud-api.git
git branch -M main
git push -u origin main
```

---

## 🔑 Step 3: Set Up SSH (Optional but Recommended)

SSH is more secure than HTTPS and won't require entering password every time.

### Generate SSH Key:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

When prompted:
- **File location:** Press Enter (default location)
- **Passphrase:** Press Enter (or set one for security)

### Add SSH Key to GitHub:
1. Copy your public key:
   ```bash
   type $env:USERPROFILE\.ssh\id_ed25519.pub | clip
   ```

2. Go to GitHub: https://github.com/settings/keys
3. Click "New SSH key"
4. Paste the key and save

### Use SSH for remote:
```bash
git remote set-url origin git@github.com:YOUR-USERNAME/user-crud-api.git
```

---

## ⚙️ Step 4: Configure GitHub Secrets (For CI/CD)

Go to your GitHub repository and add these secrets:

**Settings → Secrets and variables → Actions → New repository secret**

### Required for Deploy Pipeline:
```
DOCKER_USERNAME     = your-docker-hub-username
DOCKER_PASSWORD     = your-docker-hub-password-or-token
DEPLOY_HOST         = your-server-ip.com
DEPLOY_USER         = ubuntu (or your SSH user)
DEPLOY_KEY          = (your private SSH key)
```

### Optional:
```
SNYK_TOKEN          = (for security scanning)
SLACK_WEBHOOK       = (for notifications)
```

---

## 📊 Step 5: Verify Repository Setup

```bash
# Check remote configuration
git remote -v

# Check branch
git branch

# Check commit history
git log --oneline
```

Expected output:
```
origin  https://github.com/YOUR-USERNAME/user-crud-api.git (fetch)
origin  https://github.com/YOUR-USERNAME/user-crud-api.git (push)

* main

7f1f650 Initial commit: User CRUD API with Express.js and PostgreSQL
```

---

## 🚀 Step 6: Making Updates

After setting up, use these commands for future commits:

```bash
# Check what changed
git status

# Stage changes
git add .

# Commit changes
git commit -m "Your descriptive message"

# Push to GitHub
git push origin main
```

### Useful Commands:
```bash
# Create a new branch for features
git checkout -b feature/new-feature
git push -u origin feature/new-feature

# Switch branches
git checkout main
git checkout feature/new-feature

# Merge branches
git checkout main
git merge feature/new-feature
git push origin main

# View commit history
git log --oneline --graph --all
```

---

## 🔍 Troubleshooting

### "fatal: The current branch main has no upstream branch"
```bash
git push -u origin main
```

### "fatal: 'origin' does not appear to be a 'git' repository"
```bash
git remote add origin https://github.com/YOUR-USERNAME/user-crud-api.git
```

### "Permission denied (publickey)"
You need to add SSH key to GitHub. Follow Step 3 above.

### "fatal: Authentication failed"
Try using SSH instead of HTTPS, or generate a Personal Access Token on GitHub.

---

## 📋 GitHub Actions Automatic Workflows

Once pushed to GitHub, your CI/CD pipelines will automatically run:

### On Every Push:
- ✅ CI Pipeline (ci.yml) - Tests and builds
- ✅ Security Scan (security.yml) - Checks vulnerabilities

### On Main Branch Push/Tag:
- ✅ Deploy Pipeline (deploy.yml) - Deploys to production

**Monitor workflows:**
1. Go to your GitHub repo
2. Click "Actions" tab
3. See all workflow runs and their status

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Documentation](https://docs.github.com)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [GitHub Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## ✅ Checklist

- [ ] Created GitHub account (https://github.com)
- [ ] Created new repository on GitHub
- [ ] Connected local repository to GitHub
- [ ] Set up SSH keys (recommended)
- [ ] Added GitHub secrets for CI/CD
- [ ] Verified repository with `git remote -v`
- [ ] Added README badge (see below)

---

## 📌 Add GitHub Actions Badges to README

Copy this to your README.md for status indicators:

```markdown
# User CRUD API

[![CI Pipeline](https://github.com/YOUR-USERNAME/user-crud-api/workflows/CI%20Pipeline/badge.svg)](https://github.com/YOUR-USERNAME/user-crud-api/actions)
[![Deploy](https://github.com/YOUR-USERNAME/user-crud-api/workflows/Deploy%20to%20Production/badge.svg)](https://github.com/YOUR-USERNAME/user-crud-api/actions)
[![Security](https://github.com/YOUR-USERNAME/user-crud-api/workflows/Security%20Scan/badge.svg)](https://github.com/YOUR-USERNAME/user-crud-api/actions)

A production-ready Express.js CRUD API with PostgreSQL database using MVC pattern.
...
```

---

Done! Your project is now ready for GitHub! 🎉
