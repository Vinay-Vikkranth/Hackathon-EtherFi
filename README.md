# Ether.fi Dashboard with AI Assistant

A comprehensive dashboard for the ether.fi protocol featuring real-time protocol statistics, wallet integration, and an AI-powered assistant for user guidance.

## 🚀 Features

- **Real-Time Protocol Data**: Live TVL, fees, and revenue from DeFiLlama API
- **Wallet Integration**: Connect MetaMask to view your real ETH balance
- **Demo Portfolio**: Example user dashboard showing staking data (clearly marked as demo)
- **AI Assistant**: Powered by Ollama (local LLM) - answers questions and calculates projections
- **Beautiful UI**: Modern, responsive design with smooth animations

## 📋 Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension (for wallet connection)
- Ollama (for AI assistant) - [Download here](https://ollama.ai)

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd etherfi-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install and set up Ollama:**
   ```bash
   # Download Ollama from https://ollama.ai
   # After installation, pull a model:
   ollama pull llama3.2
   # Or use other models like:
   # ollama pull llama2
   # ollama pull mistral
   ```

4. **Create environment file (optional):**
   ```bash
   # Create .env.local if you want to customize Ollama settings
   OLLAMA_API_URL=http://localhost:11434/api/generate
   OLLAMA_MODEL=llama3.2
   ```

## 🎯 Running the Application

1. **Make sure Ollama is running:**
   ```bash
   # Ollama should start automatically after installation
   # Check if it's running:
   ollama list
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Connecting Your Wallet

1. Click "Connect Wallet" button
2. Select MetaMask from the popup
3. Approve the connection
4. Your wallet address and ETH balance will be displayed

### Using the AI Assistant

1. Type your question in the chat input
2. Try questions like:
   - "How much could I earn if I stake 20 ETH?"
   - "How does ether.fi staking work?"
   - "What are eETH and weETH tokens?"
   - "Explain restaking on ether.fi"

### Viewing Protocol Statistics

- Real-time TVL, fees, and revenue are automatically fetched from DeFiLlama
- Data refreshes every minute
- 24h change percentages are shown

## 🏗️ Project Structure

```
etherfi-dashboard/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── route.ts          # Ollama API integration
│   ├── providers.tsx             # Wagmi & React Query providers
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main dashboard page
│   └── globals.css               # Global styles
├── components/
│   ├── ProtocolStats.tsx         # DeFiLlama protocol data
│   ├── WalletConnection.tsx      # MetaMask wallet connection
│   ├── DemoPortfolio.tsx         # Demo user portfolio
│   └── AIAssistant.tsx           # AI chat interface
└── lib/
    └── defillama.ts              # DeFiLlama API client
```

## 🔧 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Wagmi & Viem**: Ethereum wallet integration
- **React Query**: Data fetching and caching
- **Ollama**: Local LLM for AI assistant
- **DeFiLlama API**: Protocol data
- **Lucide React**: Icons

## 🎨 Features Explained

### Real Protocol Data
- Fetches live data from DeFiLlama API
- Updates every minute
- Shows TVL, fees, revenue, and changes

### Wallet Connection
- Uses Wagmi for wallet integration
- Supports MetaMask and other injected wallets
- Displays real ETH balance
- Shows wallet address with copy functionality

### Demo Portfolio
- Clearly marked as "DEMO MODE"
- Shows example staking data
- Displays staked ETH, eETH balance, rewards, and APY
- Includes estimated earnings

### AI Assistant
- Powered by Ollama (runs locally)
- Uses protocol data for context
- Calculates earnings projections
- Answers questions about ether.fi
- Provides educational content

## 🐛 Troubleshooting

### Ollama not working
- Make sure Ollama is installed and running
- Check if the model is downloaded: `ollama list`
- Verify Ollama is accessible at `http://localhost:11434`
- Try pulling the model again: `ollama pull llama3.2`

### Wallet not connecting
- Make sure MetaMask is installed
- Check if MetaMask is unlocked
- Try refreshing the page
- Check browser console for errors

### API errors
- Check your internet connection
- DeFiLlama API might be down (check their status)
- Check browser console for detailed error messages

## 🚀 Deployment

To build for production:

```bash
npm run build
npm start
```

For deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Note**: Ollama needs to be running locally. For production deployment, you might want to use a cloud-based LLM service or set up Ollama on a server.

## 📝 License

This project is built for educational/hackathon purposes.

## 🤝 Contributing

This is a hackathon project. Feel free to fork and improve!

## 🙏 Acknowledgments

- [ether.fi](https://ether.fi) - Protocol
- [DeFiLlama](https://defillama.com) - Protocol data
- [Ollama](https://ollama.ai) - Local LLM
- [Wagmi](https://wagmi.sh) - Ethereum React Hooks

---

Built with ❤️ for Hackathon
