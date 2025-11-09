# 🎯 Quick Visual Guide - MetaMask + Hardhat

## The Setup in 3 Minutes

### 📍 WHERE YOU ARE NOW
```
Browser Tab: http://localhost:3000
Status: Page loaded, showing "Connect Your Wallet"
```

### 🎯 WHERE YOU NEED TO GO
```
MetaMask: Connected to Hardhat Local network
Account: Imported test account with 10,000 ETH
App: Connected and ready to stake
```

---

## STEP-BY-STEP VISUAL FLOW

### STEP 1: ADD NETWORK
```
MetaMask (top-left) → Click Network Dropdown
  ↓
Current: "Ethereum Mainnet" or other
  ↓
Scroll down → Click "Add network"
  ↓
Click "Add a network manually"
  ↓
FILL IN THIS FORM:
┌─────────────────────────────────────┐
│ Network Name: Hardhat Local         │
│ RPC URL: http://127.0.0.1:8545      │
│ Chain ID: 31337                     │
│ Currency Symbol: ETH                │
└─────────────────────────────────────┘
  ↓
Click "Save"
  ✓ Done! You'll see "Hardhat Local" at top
```

### STEP 2: IMPORT ACCOUNT
```
MetaMask (top-right) → Click Account Circle
  ↓
Dropdown menu appears
  ↓
Click "Import account"
  ↓
Select: "Private Key" (not JSON)
  ↓
PASTE THIS:
┌─────────────────────────────────────────────────────────────────────┐
│ 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 │
└─────────────────────────────────────────────────────────────────────┘
  ↓
Click "Import"
  ✓ Done! You'll see 10000 ETH balance
```

### STEP 3: CONNECT TO APP
```
Go to: http://localhost:3000
  ↓
Click "Connect Wallet" button (purple, top-right)
  ↓
MetaMask popup appears
  ↓
Click "Next" or "Connect"
  ↓
Click "Confirm"
  ✓ Done! Button now shows your address
```

### STEP 4: STAKE
```
Make sure "eETH" tab is selected (purple)
  ↓
Type amount in the box: 1
  ↓
Click "Stake" button (big purple button)
  ↓
MetaMask popup appears
  ↓
Click "Confirm"
  ✓ Done! You now have 1 eETH
```

---

## 📋 COPY-PASTE CHECKLIST

Open this guide side-by-side with your browser. Check off each step:

### Network Setup
- [ ] Opened MetaMask extension
- [ ] Clicked network dropdown (top-left)
- [ ] Clicked "Add network"
- [ ] Filled in:
  - [ ] Network Name: `Hardhat Local`
  - [ ] RPC URL: `http://127.0.0.1:8545`
  - [ ] Chain ID: `31337`
  - [ ] Symbol: `ETH`
- [ ] Clicked "Save"
- [ ] Network switched to "Hardhat Local"

### Account Import
- [ ] Clicked account icon (top-right)
- [ ] Clicked "Import account"
- [ ] Selected "Private Key"
- [ ] Pasted: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- [ ] Clicked "Import"
- [ ] See 10000 ETH balance

### App Connection
- [ ] Visited http://localhost:3000
- [ ] Clicked "Connect Wallet"
- [ ] Confirmed in MetaMask popup
- [ ] See address in top-right

### First Stake
- [ ] eETH tab selected
- [ ] Entered amount (try 1)
- [ ] Clicked "Stake"
- [ ] Confirmed in MetaMask
- [ ] See success message

---

## 🖼️ WHAT YOU SHOULD SEE

### MetaMask After Setup:
```
┌─────────────────────────────────┐
│ [Hardhat Local ▼]        [👤]  │  ← Network + Account
├─────────────────────────────────┤
│ Account 1                       │
│ 0xf39F...2266                   │
│                                 │
│ 10000 ETH                       │  ← Your balance
│ $0.00 USD                       │
├─────────────────────────────────┤
│ [Send] [Swap] [Buy] [Portfolio] │
└─────────────────────────────────┘
```

### App After Connection:
```
┌─────────────────────────────────────────────────┐
│ liquid.stake          [0xf39F...2266]    │  ← Shows your address
├─────────────────────────────────────────────────┤
│ [eETH] [Portfolio] [Advanced]                   │
│                                                 │
│ Stake interface appears here                    │
└─────────────────────────────────────────────────┘
```

---

## ⚡ SUPER QUICK VERSION

If you just want the essentials:

**1. Add Network in MetaMask:**
- Network: `Hardhat Local`
- RPC: `http://127.0.0.1:8545`
- Chain ID: `31337`

**2. Import Account:**
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

**3. Connect:**
- Click "Connect Wallet" on the app
- Approve in MetaMask

**4. Stake:**
- Enter amount → Click Stake → Confirm

---

## 🆘 STUCK? COMMON ISSUES

### Issue: "I don't see 10000 ETH after importing"
**Fix:** Make sure MetaMask shows "Hardhat Local" network (top-left)

### Issue: "Wrong network" error when connecting
**Fix:** Switch MetaMask to "Hardhat Local" (click network dropdown)

### Issue: "Transaction failed"
**Fix:** 
1. Check Hardhat is running (look for PowerShell window with blockchain logs)
2. Reset MetaMask: Settings → Advanced → Reset Account

### Issue: "Can't find 'Add network' in MetaMask"
**Fix:** 
- Try clicking the network name at the top
- Look for "Add network" or "Custom RPC"
- Some versions have it under Settings → Networks

---

## 📞 WHICH STEP ARE YOU ON?

Tell me where you are and I'll help:

1. ❓ "I'm trying to add the network" → See STEP 1 above
2. ❓ "I added network, now what?" → Go to STEP 2
3. ❓ "I imported account but no ETH showing" → Check network is "Hardhat Local"
4. ❓ "Everything is set up, how do I stake?" → See STEP 4

---

Let me know which step you're stuck on and I'll provide more detailed help! 🚀
