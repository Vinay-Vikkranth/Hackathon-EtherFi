# Troubleshooting Guide

## Issue 1: MetaMask Connection Not Working

### Problem

You see the warning: "⚠️ MetaMask Not Detected" and cannot connect your wallet.

### Solutions

#### Step 1: Install MetaMask

1. **Download MetaMask:**
   - Go to https://metamask.io/download/
   - Click "Download" for your browser (Chrome, Firefox, Edge, etc.)
   - Follow the installation instructions

#### Step 2: Set Up MetaMask

1. **Create or Import a Wallet:**
   - Open MetaMask extension
   - Create a new wallet or import an existing one
   - Save your seed phrase securely
   - Set a password

#### Step 3: Connect to Ethereum Mainnet

1. **Verify Network:**
   - Open MetaMask
   - Check the network dropdown (top of MetaMask window)
   - Make sure "Ethereum Mainnet" is selected
   - If not, select it from the dropdown

#### Step 4: Enable Extension

1. **Check Browser Settings:**
   - Make sure MetaMask extension is enabled
   - In Chrome: Go to `chrome://extensions/`
   - Toggle MetaMask to "Enabled"
   - Refresh the dashboard page

#### Step 5: Connect Wallet

1. **On the Dashboard:**
   - Click "Connect Wallet" button
   - MetaMask popup should appear
   - Click "Connect" or "Next" to approve the connection
   - Select the account you want to connect
   - Click "Connect"

### Common Issues

**MetaMask popup doesn't appear:**

- Check if popups are blocked in your browser
- Allow popups for `localhost:3000`
- Try clicking the button again

**"User rejected the request" error:**

- Make sure you click "Connect" or "Approve" in the MetaMask popup
- Don't close the popup without responding

**Wallet connected but balance doesn't show:**

- Make sure you're on Ethereum Mainnet
- The balance will show 0 if the account is empty
- Check your account in MetaMask to verify it has ETH

---

## Issue 2: DeFiLlama API Not Loading

### Problem

You see the warning: "⚠️ Unable to load live protocol data from DeFiLlama API."

### Solutions

#### Solution 1: Check Internet Connection

1. Make sure you have a stable internet connection
2. Try refreshing the page
3. Check if other websites load correctly

#### Solution 2: Wait and Retry

1. The DeFiLlama API might be temporarily down
2. Wait a few minutes and refresh the page
3. The dashboard will automatically retry every minute

#### Solution 3: Verify API Status

1. Check DeFiLlama website: https://defillama.com
2. If the website is down, the API will also be down
3. Wait until the service is restored

#### Solution 4: Use Mock Data (Already Implemented)

- The dashboard now includes **fallback mock data**
- If the API fails, it will show realistic demo data:
  - TVL: $3.2B
  - 24h Fees: $120k
  - 24h Revenue: $95k
- This allows the dashboard to work even if the API is unavailable
- Perfect for demos and presentations

### Understanding the Error

The dashboard tries multiple methods to fetch data:

1. **First:** Searches all protocols to find ether.fi
2. **Second:** Tries direct protocol slugs (`etherfi`, `ether-fi`)
3. **Fallback:** Uses mock data if all attempts fail

This ensures the dashboard always shows data, even if the API is unavailable.

---

## Quick Fixes Summary

### For MetaMask:

1. ✅ Install MetaMask extension
2. ✅ Enable the extension in browser
3. ✅ Create/import a wallet
4. ✅ Select Ethereum Mainnet
5. ✅ Click "Connect Wallet" on dashboard
6. ✅ Approve the connection in MetaMask popup

### For DeFiLlama API:

1. ✅ Check internet connection
2. ✅ Refresh the page
3. ✅ Wait a few minutes and retry
4. ✅ Dashboard will use mock data if API fails (already implemented)

---

## Testing Your Setup

### Test MetaMask Connection:

1. Open the dashboard
2. Click "Connect Wallet"
3. MetaMask popup should appear
4. Approve the connection
5. Your wallet address should appear
6. Your ETH balance should display

### Test API Data:

1. Open the dashboard
2. Check the "Protocol Statistics" section
3. You should see:
   - Total Value Locked (TVL)
   - 24h Fees
   - 24h Revenue
4. If API is down, you'll see mock data instead

---

## Still Having Issues?

### Check Browser Console:

1. Open browser Developer Tools (F12)
2. Go to "Console" tab
3. Look for error messages
4. Share the errors if you need help

### Common Console Errors:

**"MetaMask not detected":**

- MetaMask is not installed or enabled
- Install/enable MetaMask extension

**"Failed to connect":**

- MetaMask is locked
- Unlock MetaMask and try again

**"Network error":**

- Check internet connection
- API might be down (mock data will be used)

---

## Need More Help?

1. Check the browser console for specific errors
2. Verify MetaMask is installed and enabled
3. Make sure you're on Ethereum Mainnet
4. Try refreshing the page
5. Check your internet connection

The dashboard is designed to work even if the API is down (using mock data), so you can still demonstrate all features!
