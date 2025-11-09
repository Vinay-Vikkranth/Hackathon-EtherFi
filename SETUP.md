# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
cd etherfi-dashboard
npm install
```

### Step 2: Install Ollama
1. Download Ollama from [https://ollama.ai](https://ollama.ai)
2. Install it on your system
3. Pull a model:
   ```bash
   ollama pull llama3.2
   ```
   Or use a smaller model:
   ```bash
   ollama pull llama3.2:1b  # Smaller, faster model
   ```

### Step 3: Start Ollama
Ollama should start automatically after installation. Verify it's running:
```bash
ollama list
```

### Step 4: Start the Dashboard
```bash
npm run dev
```

### Step 5: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## ✅ What You Should See

1. **Protocol Statistics**: Real-time TVL, fees, and revenue from DeFiLlama
2. **Wallet Connection**: Button to connect MetaMask
3. **Demo Portfolio**: Example user dashboard (marked as DEMO MODE)
4. **AI Assistant**: Chat interface for questions

## 🧪 Testing

### Test Wallet Connection
1. Install MetaMask browser extension
2. Click "Connect Wallet"
3. Approve the connection
4. Your wallet address and ETH balance should appear

### Test AI Assistant
1. Make sure Ollama is running
2. Type a question like: "How much could I earn if I stake 20 ETH?"
3. The AI should respond with calculations

### Test Protocol Data
- Protocol statistics should load automatically
- Data refreshes every minute
- Check for TVL, fees, and revenue values

## 🐛 Common Issues

### Issue: Ollama not responding
**Solution**: 
- Check if Ollama is running: `ollama list`
- Restart Ollama if needed
- Make sure the model is downloaded: `ollama pull llama3.2`

### Issue: Wallet not connecting
**Solution**:
- Make sure MetaMask is installed
- Unlock MetaMask
- Refresh the page
- Check browser console for errors

### Issue: Protocol data not loading
**Solution**:
- Check internet connection
- DeFiLlama API might be temporarily down
- Check browser console for errors

## 📝 Next Steps

1. **Customize Demo Data**: Edit `components/DemoPortfolio.tsx` to change demo values
2. **Change AI Model**: Edit `.env.local` to use a different Ollama model
3. **Add Features**: Extend the dashboard with additional features
4. **Deploy**: Deploy to Vercel or your preferred hosting

## 🎯 For Hackathon Demo

1. **Show Real Data**: Point out the live DeFiLlama data
2. **Connect Wallet**: Demonstrate wallet connection
3. **Demo Portfolio**: Explain the demo data
4. **AI Assistant**: Ask questions like:
   - "How much could I earn if I stake 20 ETH?"
   - "How does ether.fi staking work?"
   - "What are eETH tokens?"

## 💡 Tips

- Keep Ollama running in the background
- Have MetaMask installed and ready
- Test the AI assistant before the demo
- Check that DeFiLlama API is accessible

---

Happy hacking! 🚀

