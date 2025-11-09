# 🏗️ System Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Next.js Frontend App                   │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │           React Components                    │  │    │
│  │  │  ┌────────────┐  ┌──────────────┐           │  │    │
│  │  │  │   Header   │  │ Educational  │           │  │    │
│  │  │  │            │  │    Modal     │           │  │    │
│  │  │  └────────────┘  └──────────────┘           │  │    │
│  │  │                                               │  │    │
│  │  │  ┌──────────────────┐  ┌─────────────────┐  │  │    │
│  │  │  │     Staking      │  │   Portfolio     │  │  │    │
│  │  │  │    Interface     │  │     View        │  │  │    │
│  │  │  └──────────────────┘  └─────────────────┘  │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │           Web3 Context                        │  │    │
│  │  │  - Wallet Connection                          │  │    │
│  │  │  - Contract Instances                         │  │    │
│  │  │  - State Management                           │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                 │
│                           │ ethers.js                       │
│                           ▼                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │               MetaMask Wallet                       │    │
│  │  - Private Key Storage                              │    │
│  │  - Transaction Signing                              │    │
│  │  - Network Management                               │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ JSON-RPC
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 Hardhat Local Blockchain                     │
│                  (http://localhost:8545)                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Smart Contracts (Solidity)               │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │     LiquidStakingToken (eETH)                │    │  │
│  │  │  - stake()          - unstake()               │    │  │
│  │  │  - claimRewards()   - getStakeInfo()          │    │  │
│  │  │  - ERC20 functions  - Reward tracking         │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │    WrappedStakingToken (weETH)               │    │  │
│  │  │  - wrap()           - unwrap()                │    │  │
│  │  │  - ERC20 functions  - getExchangeRate()       │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │         StakingLender                         │    │  │
│  │  │  - depositAndBorrow()  - repayAndWithdraw()   │    │  │
│  │  │  - calculateInterest() - getLoanInfo()        │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  │                                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Account State Storage                    │  │
│  │  - Balances (ETH, eETH, weETH)                       │  │
│  │  - Staking positions                                  │  │
│  │  - Rewards accumulation                               │  │
│  │  - Loan data                                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Staking Flow
```
User Input (1 ETH)
    │
    ▼
StakingInterface Component
    │
    ▼
Web3Context.contracts.eeth.stake()
    │
    ▼
MetaMask (Sign Transaction)
    │
    ▼
Hardhat Network (Process Transaction)
    │
    ▼
LiquidStakingToken.stake()
    │
    ├─► Store staked amount
    ├─► Start reward tracking
    └─► Mint 1 eETH to user
    │
    ▼
Update UI (Show new balance)
```

### 2. Reward Calculation Flow
```
Time Passes
    │
    ▼
calculatePendingRewards()
    │
    ├─► Get time elapsed since last update
    ├─► Calculate: (amount × APR × time) / (365 days × 10000)
    └─► Return pending rewards
    │
    ▼
Display in Portfolio Tab
```

### 3. Wrapping Flow
```
User has eETH
    │
    ▼
StakingInterface (Wrap Mode)
    │
    ▼
Approve eETH spending
    │
    ▼
MetaMask (Sign Approval)
    │
    ▼
Call weETH.wrap()
    │
    ▼
Transfer eETH from user to weETH contract
    │
    ▼
Mint weETH to user (1:1)
    │
    ▼
Update UI
```

## Component Hierarchy

```
App (page.tsx)
│
├─► Header
│   ├─► Logo
│   └─► Connect Wallet Button
│
├─► Educational Modal (on first visit)
│   └─► Tutorial Content
│
├─► Tab Navigation
│   ├─► eETH
│   ├─► Portfolio
│   └─► Advanced
│
├─► StakingInterface (eETH Tab)
│   ├─► InfoBox (How it works)
│   ├─► Mode Toggle (Stake/Wrap)
│   ├─► Input Section
│   │   ├─► Amount Input
│   │   ├─► MAX Button
│   │   └─► Token Selector
│   ├─► Exchange Arrow
│   ├─► Receive Section
│   ├─► Action Buttons
│   │   ├─► Stake/Wrap
│   │   └─► Unstake (if stake mode)
│   └─► Rewards Info Panel
│
├─► PortfolioView (Portfolio Tab)
│   ├─► InfoBox (Understanding Portfolio)
│   ├─► Overview Header
│   ├─► Balance Cards
│   │   ├─► eETH Balance
│   │   └─► weETH Balance
│   ├─► Staking Rewards Panel
│   │   ├─► APR Display
│   │   ├─► Rewards Breakdown
│   │   └─► Claim Button
│   └─► Coming Soon Section
│
└─► Footer
    └─► Legal Disclaimer
```

## State Management

```
Web3Context (Global State)
│
├─► account: string | null
│   └─► Connected wallet address
│
├─► provider: BrowserProvider | null
│   └─► ethers.js provider instance
│
├─► signer: Signer | null
│   └─► Transaction signer
│
├─► contracts: {
│   ├─► eeth: Contract | null
│   ├─► weeth: Contract | null
│   └─► lender: Contract | null
│   }
│
├─► isConnecting: boolean
│   └─► Loading state for wallet connection
│
└─► error: string | null
    └─► Error messages

Component Local State (Example: StakingInterface)
│
├─► activeMode: 'stake' | 'wrap'
├─► stakeAmount: string
├─► receiveAmount: string
├─► ethBalance: string
├─► eethBalance: string
├─► isLoading: boolean
└─► showInfo: boolean
```

## File Dependencies

```
page.tsx
├─► imports Header
├─► imports StakingInterface
├─► imports PortfolioView
├─► imports EducationalModal
└─► imports Web3Provider

Web3Context.tsx
├─► imports ethers (BrowserProvider, Contract)
└─► imports React (createContext, useState, useEffect)

StakingInterface.tsx
├─► imports useWeb3
├─► imports ethers
└─► imports InfoBox

PortfolioView.tsx
├─► imports useWeb3
├─► imports ethers
└─► imports InfoBox

Smart Contracts
│
LiquidStakingToken.sol
├─► extends ERC20 (OpenZeppelin)
└─► extends Ownable (OpenZeppelin)

WrappedStakingToken.sol
├─► extends ERC20 (OpenZeppelin)
└─► imports IERC20 (OpenZeppelin)

StakingLender.sol
└─► imports IERC20 (OpenZeppelin)
```

## Network Communication

```
Frontend ←──────→ MetaMask ←──────→ Hardhat Network
   │                 │                    │
   │                 │                    │
ethers.js         Wallet              Blockchain
   │              Provider                │
   │                 │                    │
   ▼                 ▼                    ▼
Contract ABIs    Sign TX            Execute TX
Read/Write       Manage Keys        Update State
```

## Development Workflow

```
Developer
    │
    ├─► Edit Smart Contracts (contracts/)
    │   └─► npx hardhat compile
    │
    ├─► Edit Frontend (components/, app/)
    │   └─► Hot reload (automatic)
    │
    ├─► Deploy Contracts
    │   └─► npx hardhat run scripts/deploy.js
    │
    └─► Test in Browser
        └─► http://localhost:3000
```

## Build Process

```
Development
│
├─► Hardhat
│   ├─► Compile .sol → JSON artifacts
│   ├─► Deploy to local network
│   └─► Generate contract-addresses.json
│
└─► Next.js
    ├─► Compile .tsx → JavaScript
    ├─► Process Tailwind CSS
    ├─► Bundle assets
    └─► Start dev server

Production
│
├─► Hardhat
│   └─► Deploy to testnet/mainnet
│
└─► Next.js
    ├─► npm run build
    ├─► Optimize assets
    ├─► Generate static pages
    └─► npm start
```

## Security Layers

```
User Action
    │
    ▼
Frontend Validation
    │
    ▼
MetaMask Confirmation
    │
    ▼
Smart Contract Guards
    │ (require statements)
    ▼
Transaction Execution
    │
    ▼
Blockchain State Update
```

## Technology Stack Detail

```
Layer 1: User Interface
├─► Next.js 14 (React Framework)
├─► React 18 (UI Library)
├─► TypeScript (Type Safety)
└─► Tailwind CSS (Styling)

Layer 2: Web3 Integration
├─► ethers.js v6 (Blockchain Library)
├─► MetaMask (Wallet)
└─► JSON-RPC (Communication Protocol)

Layer 3: Blockchain
├─► Hardhat Network (Local Blockchain)
├─► Solidity 0.8.20 (Smart Contract Language)
└─► OpenZeppelin (Security Libraries)

Layer 4: Development Tools
├─► TypeScript Compiler
├─► Hardhat Toolbox
├─► ESLint (Code Quality)
└─► PostCSS (CSS Processing)
```

## Event Flow

```
User Action (Click "Stake")
    │
    ▼
onClick Handler
    │
    ▼
handleStake() function
    │
    ▼
contracts.eeth.stake({ value })
    │
    ▼
MetaMask Popup
    │
    ▼
User Confirms
    │
    ▼
Transaction Sent to Network
    │
    ▼
Hardhat Processes TX
    │
    ▼
Smart Contract Executes
    │
    ▼
Emit Event (Staked)
    │
    ▼
Transaction Confirmed
    │
    ▼
loadBalances() Called
    │
    ▼
UI Updates with New Data
    │
    ▼
Success Message Shown
```

---

## Quick Reference

**Frontend Port**: 3000  
**Blockchain RPC**: 8545  
**Chain ID**: 31337  

**Key Files**:
- Entry: `app/page.tsx`
- Context: `contexts/Web3Context.tsx`
- Contracts: `contracts/*.sol`
- Deployment: `scripts/deploy.js`

**Data Storage**:
- On-chain: Account balances, stakes, rewards
- Off-chain: UI state, user preferences
- Generated: ABIs, contract addresses

---

This architecture enables a **fully functional DeFi educational platform** with real blockchain interactions in a safe, local environment! 🏗️
