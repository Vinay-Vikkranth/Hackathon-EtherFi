# 🚀 Quick Setup Guide

## Visual Walkthrough

### Step 1: Install & Setup
```powershell
# Install dependencies
npm install

# Compile contracts
npx hardhat compile
```

### Step 2: Start Blockchain (Terminal 1)
```powershell
npx hardhat node
```
**Keep this running!** You'll see 20 accounts with private keys.

### Step 3: Deploy Contracts (Terminal 2)
```powershell
npx hardhat run scripts/deploy.js --network localhost
```

### Step 4: Configure MetaMask

#### Network Settings:
- **Network Name**: Hardhat Local
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `31337`
- **Currency Symbol**: ETH

#### Import Test Account:
1. Copy any private key from Terminal 1
2. MetaMask → Import Account → Paste private key
3. You now have 10,000 test ETH!

### Step 5: Start App (Terminal 2)
```powershell
npm run dev
```

### Step 6: Open Browser
Go to: **http://localhost:3000**

## 📸 Expected Screens

### 1. Welcome Modal
- First-time educational information
- Click "Got it! Let's Start Learning"

### 2. Connect Wallet
- Click "Connect Wallet" button (top right)
- MetaMask popup → Connect
- Wallet address appears

### 3. Stake ETH
- **eETH** tab
- Enter amount (e.g., "1")
- Click **Stake**
- MetaMask confirms → Success!

### 4. View Portfolio
- **Portfolio** tab
- See your eETH balance
- Watch rewards accumulate
- Click **Claim Rewards** when ready

## 🎯 Test Scenarios

### Scenario 1: Basic Staking
1. Stake 1 ETH
2. Wait 30 seconds
3. Go to Portfolio
4. See ~0.000003 ETH rewards
5. Claim rewards

### Scenario 2: Wrapping
1. Stake 2 ETH (get 2 eETH)
2. Switch to **Wrap** mode
3. Wrap 1 eETH
4. Check Portfolio for weETH balance

### Scenario 3: Full Cycle
1. Stake 3 ETH
2. Wait for rewards
3. Claim rewards
4. Unstake 1 ETH
5. Wrap 1 eETH
6. Check all balances

## ⚠️ Common Issues

### Issue: "Cannot connect to network"
**Solution**: Make sure `npx hardhat node` is running

### Issue: "Transaction failed"
**Solution**: 
- Check you're on Hardhat network in MetaMask
- Reset MetaMask account if needed

### Issue: "No balances showing"
**Solution**: 
- Refresh page
- Check contract addresses in `contract-addresses.json`

### Issue: TypeScript errors
**Solution**: 
- Run `npm install` again
- Errors will disappear after installation

## 💡 Tips

- Keep Hardhat node terminal visible to see transactions
- Each transaction is instant on local network
- Rewards accumulate per second (3.5% APR)
- Use small amounts first to test
- Check console (F12) for detailed logs

## 🎓 Learning Path

**Beginner**: 
1. Connect wallet
2. Stake small amount
3. View portfolio

**Intermediate**:
1. Stake → Wait → Claim rewards
2. Try wrapping eETH to weETH

**Advanced**:
1. Multiple stake/unstake cycles
2. Test reward calculations
3. Experiment with different amounts

## 📊 Understanding the Numbers

- **APR**: 3.5% annually
- **Per Day**: ~0.0096% (3.5 / 365)
- **Per Second**: ~0.000000111% 

Example: Stake 1 ETH
- After 1 minute: ~0.0000001 ETH rewards
- After 1 hour: ~0.000004 ETH rewards
- After 1 day: ~0.000096 ETH rewards

---

**Ready to start?** Open 2 terminals and follow the steps! 🚀
