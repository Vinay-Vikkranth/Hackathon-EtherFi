# 🔧 Troubleshooting Guide

## Installation Issues

### Problem: npm install fails
**Symptoms**: Error during package installation

**Solutions**:
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again
4. If still failing, try: `npm install --legacy-peer-deps`

### Problem: Hardhat compile errors
**Symptoms**: Contract compilation fails

**Solutions**:
1. Make sure contracts are in `contracts/` folder
2. Check Solidity version (should be 0.8.20)
3. Run: `npx hardhat clean` then `npx hardhat compile`

## Blockchain Issues

### Problem: Hardhat node won't start
**Symptoms**: Port 8545 already in use

**Solutions**:
1. Check if another Hardhat node is running
2. Find and kill process: `netstat -ano | findstr :8545`
3. Kill the process: `taskkill /PID <PID> /F`
4. Start again: `npx hardhat node`

### Problem: Contracts not deploying
**Symptoms**: Deployment script fails

**Solutions**:
1. Ensure Hardhat node is running
2. Check if `contract-addresses.json` exists from previous run
3. Delete old ABIs: Remove `public/abis/` folder
4. Run deployment again

### Problem: Contract addresses not found
**Symptoms**: Frontend can't load contracts

**Solutions**:
1. Check `contract-addresses.json` exists in root
2. Check `public/abis/` folder has 3 JSON files
3. Re-run deployment: `npx hardhat run scripts/deploy.js --network localhost`

## MetaMask Issues

### Problem: Can't connect to Hardhat network
**Symptoms**: MetaMask shows wrong network

**Solutions**:
1. **Add Network Manually**:
   - MetaMask → Networks → Add network
   - Name: Hardhat Local
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Symbol: ETH

2. **Switch Network**:
   - Click network dropdown
   - Select "Hardhat Local"

### Problem: Transactions fail with "nonce too high"
**Symptoms**: All transactions rejected

**Solutions**:
1. MetaMask → Settings → Advanced → Reset Account
2. This clears transaction history
3. Try transaction again

### Problem: Account shows 0 ETH
**Symptoms**: Imported account has no balance

**Solutions**:
1. Stop Hardhat node (Ctrl+C)
2. Start fresh: `npx hardhat node`
3. Import a NEW private key from the terminal
4. Should show 10,000 ETH

### Problem: Wrong network in MetaMask
**Symptoms**: App says "Wrong network"

**Solutions**:
1. Click MetaMask network dropdown
2. Select "Hardhat Local" (Chain ID 31337)
3. If not in list, add manually (see above)

## Frontend Issues

### Problem: Page won't load
**Symptoms**: Blank page or errors

**Solutions**:
1. Check terminal for errors
2. Make sure `npm run dev` is running
3. Try different port: `npm run dev -- --port 3001`
4. Clear browser cache (Ctrl+Shift+Delete)

### Problem: "Connect Wallet" button doesn't work
**Symptoms**: No MetaMask popup

**Solutions**:
1. Ensure MetaMask is installed
2. Check if MetaMask is locked (unlock it)
3. Try different browser
4. Check browser console (F12) for errors

### Problem: Balances not updating
**Symptoms**: Shows old values

**Solutions**:
1. Wait 5-10 seconds
2. Refresh page (F5)
3. Check Hardhat node is still running
4. Verify contracts are deployed

### Problem: Transactions pending forever
**Symptoms**: MetaMask shows pending

**Solutions**:
1. Check Hardhat node terminal for errors
2. Transactions should be instant on local network
3. If stuck, reset MetaMask account
4. Clear pending transaction

## Smart Contract Issues

### Problem: Stake transaction fails
**Symptoms**: "Transaction reverted"

**Solutions**:
1. Check you have enough ETH
2. Try smaller amount (leave ETH for gas)
3. Check Hardhat node logs for error
4. Verify contract has ETH (should have 10 from deployment)

### Problem: Can't claim rewards
**Symptoms**: "No rewards to claim"

**Solutions**:
1. Wait longer (rewards accumulate slowly)
2. Check you have staked ETH
3. Go to Portfolio tab to see pending rewards
4. Need at least some time to pass for rewards

### Problem: Wrap fails
**Symptoms**: "Transfer failed" error

**Solutions**:
1. Make sure you have eETH balance
2. Try approving first (happens automatically)
3. Check console for detailed error
4. Verify both eETH and weETH contracts deployed

### Problem: Unstake fails
**Symptoms**: "Insufficient balance" error

**Solutions**:
1. Check your eETH balance
2. Can only unstake up to staked amount
3. Try smaller amount
4. Check Portfolio tab for exact balance

## Development Issues

### Problem: TypeScript errors everywhere
**Symptoms**: Red squiggly lines

**Solutions**:
1. Run `npm install` completely
2. Wait for installation to finish
3. Restart VS Code
4. Errors should disappear

### Problem: Tailwind classes not working
**Symptoms**: No styling

**Solutions**:
1. Check `globals.css` has `@tailwind` directives
2. Restart dev server (`npm run dev`)
3. Clear `.next` folder: `rm -r .next`
4. Build again

### Problem: Module not found errors
**Symptoms**: Can't find components

**Solutions**:
1. Check file paths match imports
2. Verify files exist in correct folders
3. Check `tsconfig.json` paths configuration
4. Restart VS Code

## Performance Issues

### Problem: Slow transactions
**Symptoms**: Takes long to confirm

**Solutions**:
- Local network should be instant
- Check if Hardhat node is responsive
- Restart Hardhat node
- Check system resources

### Problem: High CPU usage
**Symptoms**: Computer slowing down

**Solutions**:
1. Hardhat node can use CPU
2. This is normal for local blockchain
3. Close other applications
4. Consider using more powerful machine

## Browser Issues

### Problem: CORS errors
**Symptoms**: "Access blocked" in console

**Solutions**:
1. Use Chrome or Brave browser
2. Check MetaMask is enabled
3. Allow site in MetaMask settings

### Problem: MetaMask popup blocked
**Symptoms**: No popup appears

**Solutions**:
1. Allow popups for localhost
2. Click browser popup blocker icon
3. Always allow for this site

## Data Issues

### Problem: Lost test data
**Symptoms**: All balances reset

**Solutions**:
- This is normal when restarting Hardhat node
- Local blockchain doesn't persist
- Re-stake test amounts
- Not a bug, just how local testing works

### Problem: Rewards not accumulating
**Symptoms**: No change in rewards

**Solutions**:
1. Wait at least 30 seconds
2. Refresh Portfolio page
3. Check time-based calculations in contract
4. Verify you have staked amount > 0

## Emergency Reset

If all else fails, complete reset:

```powershell
# 1. Stop all running processes (Ctrl+C in terminals)

# 2. Clean everything
npm run clean  # if available, or:
rm -r node_modules
rm -r .next
rm -r cache
rm -r artifacts
rm package-lock.json

# 3. Reinstall
npm install

# 4. Recompile
npx hardhat compile

# 5. Start fresh
npx hardhat node  # Terminal 1
npx hardhat run scripts/deploy.js --network localhost  # Terminal 2
npm run dev  # Terminal 2

# 6. Reset MetaMask
# MetaMask → Settings → Advanced → Reset Account

# 7. Import fresh account from Hardhat terminal
```

## Still Having Issues?

1. **Check Logs**: Look at Hardhat terminal and browser console (F12)
2. **Read Error Messages**: They usually tell you what's wrong
3. **Start Simple**: Try with minimal amounts first
4. **One Thing at a Time**: Don't try multiple actions simultaneously

## Debug Checklist

Before asking for help, verify:

- [ ] Node.js installed (v18+)
- [ ] npm install completed successfully
- [ ] Hardhat node running (Terminal 1)
- [ ] Contracts deployed (Terminal 2)
- [ ] Dev server running (Terminal 2)
- [ ] MetaMask installed and unlocked
- [ ] Connected to Hardhat network (Chain ID 31337)
- [ ] Test account imported with ETH balance
- [ ] Browser at http://localhost:3000
- [ ] No errors in browser console (F12)
- [ ] No errors in Hardhat node terminal

---

**Remember**: This is a local development environment. You can always reset everything and start fresh! 🔄
