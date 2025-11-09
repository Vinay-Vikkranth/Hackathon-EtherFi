# ⚡ Command Cheat Sheet

Quick reference for all commands you'll need.

## 🚀 Initial Setup (Run Once)

```powershell
# Install all dependencies
npm install

# Compile smart contracts
npx hardhat compile
```

## 🔄 Daily Development Flow

### Terminal 1: Blockchain
```powershell
# Start local blockchain (keep running)
npx hardhat node
```

### Terminal 2: Deploy & Run
```powershell
# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Start development server
npm run dev
```

## 🧹 Clean & Reset

```powershell
# Clean Hardhat cache
npx hardhat clean

# Clean Next.js cache
rm -r .next

# Full clean (when things break)
rm -r node_modules
rm package-lock.json
npm install
```

## 🔨 Build & Production

```powershell
# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint
```

## 📝 Hardhat Commands

```powershell
# Compile contracts only
npx hardhat compile

# Run local node
npx hardhat node

# Deploy to localhost
npx hardhat run scripts/deploy.js --network localhost

# Clean artifacts
npx hardhat clean

# Hardhat console (advanced)
npx hardhat console --network localhost
```

## 🌐 Next.js Commands

```powershell
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run on different port
npm run dev -- --port 3001
```

## 🦊 MetaMask Setup

### Add Network (in MetaMask UI)
```
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

### Import Account
1. Copy private key from Hardhat terminal
2. MetaMask → Account Icon → Import Account
3. Paste private key

### Reset Account (when needed)
1. MetaMask → Settings
2. Advanced → Reset Account
3. Confirm

## 🔍 Debugging Commands

```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# List running processes on port 8545
netstat -ano | findstr :8545

# Kill process by PID
taskkill /PID <PID> /F

# Check if files exist
ls contracts
ls components
ls app
```

## 📦 Package Management

```powershell
# Install specific package
npm install <package-name>

# Install dev dependency
npm install -D <package-name>

# Update dependencies
npm update

# Check outdated packages
npm outdated

# View installed packages
npm list
```

## 🧪 Testing Workflow

```powershell
# 1. Start blockchain
npx hardhat node

# 2. Deploy (new terminal)
npx hardhat run scripts/deploy.js --network localhost

# 3. Start frontend
npm run dev

# 4. Open browser
# http://localhost:3000

# 5. Connect MetaMask to Hardhat Local

# 6. Start testing!
```

## 🔥 Emergency Reset

```powershell
# Stop all terminals (Ctrl+C)

# Clean everything
npx hardhat clean
rm -r .next
rm -r node_modules
rm package-lock.json
rm contract-addresses.json
rm -r public/abis

# Reinstall
npm install

# Recompile
npx hardhat compile

# Start fresh
npx hardhat node  # Terminal 1
npx hardhat run scripts/deploy.js --network localhost  # Terminal 2
npm run dev  # Terminal 2
```

## 📊 Check Status

```powershell
# Is blockchain running?
# Check Terminal 1 - should show "Started HTTP and WebSocket JSON-RPC server"

# Are contracts deployed?
# Check if contract-addresses.json exists
cat contract-addresses.json

# Are ABIs generated?
ls public/abis

# Is dev server running?
# Check Terminal 2 - should show "Ready" and localhost URL

# Check all at once (PowerShell)
if (Test-Path "contract-addresses.json") { "✅ Contracts deployed" } else { "❌ Need to deploy" }
if (Test-Path "public/abis") { "✅ ABIs exist" } else { "❌ ABIs missing" }
```

## 💾 Backup & Restore

```powershell
# Backup important files
mkdir backup
cp contract-addresses.json backup/
cp -r contracts backup/
cp -r components backup/

# Restore if needed
cp backup/contract-addresses.json .
```

## 🎯 Quick Actions

```powershell
# Restart everything quickly
# Terminal 1
Ctrl+C
npx hardhat node

# Terminal 2
Ctrl+C
npx hardhat run scripts/deploy.js --network localhost
npm run dev
```

## 📱 Browser Actions

```
Open DevTools: F12
Refresh: F5
Hard Refresh: Ctrl+Shift+R
Clear Cache: Ctrl+Shift+Delete
```

## 🔐 Security

```powershell
# NEVER commit these files (already in .gitignore):
# - node_modules/
# - .env
# - contract-addresses.json
# - artifacts/
# - cache/

# Check what will be committed
git status

# View .gitignore
cat .gitignore
```

## 📝 Logs & Debugging

```powershell
# View Hardhat logs (Terminal 1)
# Shows all transactions in real-time

# View Next.js logs (Terminal 2)
# Shows compilation and errors

# View browser console (F12)
# Shows frontend errors and warnings
```

## 🎓 Learning Path Commands

```powershell
# Day 1: Setup
npm install
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npm run dev

# Day 2: Development
# Just run:
npx hardhat node  # Terminal 1
npm run dev       # Terminal 2

# Day 3+: Same as Day 2
```

## 🆘 Common Fixes

```powershell
# Fix: Port already in use
netstat -ano | findstr :8545
taskkill /PID <PID> /F

# Fix: Contracts not loading
npx hardhat run scripts/deploy.js --network localhost

# Fix: Frontend errors
rm -r .next
npm run dev

# Fix: TypeScript errors
rm -r node_modules
npm install

# Fix: MetaMask issues
# MetaMask → Settings → Advanced → Reset Account
```

---

## 📌 Bookmark This!

**Most used commands:**
1. `npx hardhat node` - Start blockchain
2. `npx hardhat run scripts/deploy.js --network localhost` - Deploy
3. `npm run dev` - Start app
4. `npx hardhat clean` - Reset contracts
5. `rm -r .next` - Reset frontend

**Save these tabs:**
- http://localhost:3000 - App
- http://localhost:3000/api/... - API (if added)

**Keep these terminals:**
- Terminal 1: Hardhat node (always running)
- Terminal 2: npm run dev (always running)

---

**Pro Tip**: Create aliases in PowerShell profile for common commands! 🚀
