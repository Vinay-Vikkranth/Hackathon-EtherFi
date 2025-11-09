# 🦊 MetaMask Setup Guide - Step by Step

## Part 1: Add Hardhat Network to MetaMask

### Step 1: Open MetaMask Extension
1. Click the MetaMask fox icon in your browser toolbar
2. If locked, enter your password to unlock

### Step 2: Access Networks Menu
1. Look at the **top-left** of MetaMask window
2. You'll see your current network (probably "Ethereum Mainnet" or another network)
3. Click on the network name dropdown

### Step 3: Add Network
1. Scroll to the **bottom** of the network list
2. Click **"Add network"** or **"Add a network manually"**
3. You might see "Add a network manually" at the bottom - click that

### Step 4: Fill in Network Details
Now you'll see a form. Fill it exactly like this:

```
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
Block Explorer URL: (leave empty - not needed)
```

**Important Details:**
- **Network Name**: You can name it anything, but "Hardhat Local" is clear
- **RPC URL**: Must be exactly `http://127.0.0.1:8545` (this is your local blockchain)
- **Chain ID**: Must be exactly `31337` (Hardhat's default)
- **Currency Symbol**: `ETH`

### Step 5: Save Network
1. Click **"Save"** button at the bottom
2. MetaMask will automatically switch to "Hardhat Local" network
3. You should see "Hardhat Local" at the top now

---

## Part 2: Import a Test Account

Now you need to import one of the test accounts that has 10,000 ETH.

### Step 6: Find Account Menu
1. In MetaMask, click the **circle icon** (or your account avatar) in the top-right
2. A dropdown menu will appear

### Step 7: Import Account
1. Click **"Import account"** from the dropdown
2. You'll see a new screen

### Step 8: Get Private Key
Open the PowerShell window where Hardhat is running. You should see accounts listed like this:

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### Step 9: Copy Private Key
**Use Account #0 for simplicity:**
```
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

1. **Carefully copy** the entire private key (including the `0x` at the start)
2. Make sure there are no extra spaces

### Step 10: Paste and Import
1. In MetaMask's "Import account" screen
2. Make sure **"Private Key"** is selected (not "JSON file")
3. **Paste** the private key into the text box
4. Click **"Import"** button

### Step 11: Verify Import
1. You should now see a new account in MetaMask
2. It should show **10000 ETH** as the balance
3. The address should be: `0xf39Fd...2266`

---

## Part 3: Connect to the App

### Step 12: Go to the Application
1. Make sure you're on: http://localhost:3000
2. You should see the liquid.stake interface

### Step 13: Click Connect Wallet
1. Click the **"Connect Wallet"** button (top-right, purple button)
2. MetaMask popup will appear

### Step 14: Approve Connection
1. MetaMask will ask "Do you want to connect this site?"
2. You'll see "liquid.stake" or "localhost:3000"
3. Click **"Next"** or **"Connect"**
4. Click **"Confirm"** on the next screen

### Step 15: You're Connected!
1. The "Connect Wallet" button should now show your address
2. Something like: `0xf39F...2266`
3. You should see a green dot indicating connection

---

## Part 4: Start Staking

### Step 16: Navigate to eETH Tab
1. The **eETH** tab should already be selected (purple highlight)
2. If not, click the **"eETH"** button

### Step 17: Enter Stake Amount
1. You'll see an input box that says "0"
2. Click on it and type an amount, like: `1`
3. This means you want to stake 1 ETH

### Step 18: Click Stake Button
1. Scroll down a bit if needed
2. Click the big purple **"Stake"** button
3. MetaMask will pop up

### Step 19: Confirm Transaction
1. MetaMask shows transaction details
2. You'll see:
   - **From**: Your address
   - **To**: Contract address
   - **Amount**: 1 ETH
   - **Gas fee**: Very small (almost free on local network)
3. Click **"Confirm"**

### Step 20: Wait for Confirmation
1. Transaction should confirm **instantly** (local blockchain)
2. You'll see a success message
3. Your balance will update

---

## 🎉 Success Checklist

After completing all steps, you should have:

- ✅ "Hardhat Local" network in MetaMask
- ✅ Test account imported with 10,000 ETH
- ✅ Connected to localhost:3000
- ✅ Wallet address showing in top-right
- ✅ Successfully staked some ETH

---

## 📸 Visual Guide

### What MetaMask Should Look Like:

**Before Setup:**
```
Network: Ethereum Mainnet (or other)
Balance: 0 ETH or your real balance
```

**After Setup:**
```
Network: Hardhat Local ← Top-left should show this
Address: 0xf39F...2266 ← Your imported test account
Balance: 10000 ETH ← (or 9999 if you staked 1)
```

---

## ❓ Troubleshooting

### "Wrong Network" Error
- Make sure MetaMask shows "Hardhat Local" at top-left
- If not, click network dropdown and select "Hardhat Local"

### "No ETH" Showing
- Verify Chain ID is exactly: `31337`
- Verify RPC URL is exactly: `http://127.0.0.1:8545`
- Make sure Hardhat node is still running (check PowerShell window)

### "Transaction Failed"
- Reset MetaMask account: Settings → Advanced → Reset Account
- Try again

### "Can't Connect"
- Refresh page: http://localhost:3000
- Check Hardhat node is running (PowerShell window should be active)
- Check dev server is running (npm run dev)

---

## 🎓 Quick Reference Card

**Network Settings:**
```
Name: Hardhat Local
RPC: http://127.0.0.1:8545
Chain ID: 31337
```

**Test Account #0:**
```
Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Balance: 10,000 ETH
```

**App URL:**
```
http://localhost:3000
```

---

## 🎯 What to Do Next

Once connected and staked:

1. **Check Portfolio Tab**
   - Click "Portfolio" button
   - See your eETH balance
   - Watch rewards accumulate

2. **Try Wrapping**
   - Go back to eETH tab
   - Click "Wrap" mode toggle
   - Wrap some eETH to weETH

3. **Claim Rewards**
   - Wait 30-60 seconds
   - Go to Portfolio
   - Click "Claim Rewards"

---

Need help with any specific step? Let me know which step you're stuck on! 🚀
