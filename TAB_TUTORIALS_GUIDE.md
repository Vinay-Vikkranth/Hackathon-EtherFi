# 📚 Tab-Specific Tutorials Guide

## What's New?

Each tab now has its **own dedicated tutorial** that explains the features specific to that section!

## How It Works

### 🎯 Automatic Tutorials by Tab

1. **eETH Tab Tutorial** (10 steps)
   - Welcome to liquid staking
   - Check your balance
   - Enter stake amount
   - MAX button tip
   - See what you'll receive
   - Click Stake button
   - Learn about rewards
   - Portfolio tab location
   - How to unstake
   - Completion

2. **Portfolio Tab Tutorial** (7 steps) ✨ NEW!
   - Welcome to Portfolio
   - Your eETH balance explained
   - Your weETH balance explained
   - Track your rewards section
   - Original staked amount
   - Claim rewards button
   - Portfolio mastered!

3. **Advanced Tab Tutorial** (2 steps) ✨ NEW!
   - Advanced features intro
   - Coming soon message

### 📍 Separate Tutorial Memory

Each tab remembers if you've seen its tutorial:
- `hasSeenTutorial_eETH`
- `hasSeenTutorial_Portfolio`
- `hasSeenTutorial_Advanced`

So you'll only see each tutorial **once automatically** when you first visit that tab!

### 🔄 How to Use

**Automatic (First Time):**
1. Go to **Portfolio** tab → Tutorial starts automatically after 500ms
2. Go to **eETH** tab → Tutorial starts (if not seen before)
3. Each tab has its own tutorial!

**Manual (Anytime):**
- Click **"📚 Start Tutorial"** button
- Tutorial for the **current active tab** will play
- Great for showing friends or refreshing your memory!

## Tutorial Content

### eETH Tab - Learn Staking Basics
Perfect for beginners learning how to:
- Stake ETH
- Receive eETH tokens
- Earn rewards
- Unstake when ready

### Portfolio Tab - Track Your Investments
Teaches you about:
- Reading your eETH balance (your staking tokens)
- Understanding weETH balance (wrapped tokens)
- Tracking rewards (3.5% APR)
- Finding your original staked amount
- Claiming rewards without unstaking

### Advanced Tab - Future Features
- Brief intro to advanced features
- Coming soon message

## Benefits

✅ **Context-Aware**: Each tutorial matches the tab you're viewing
✅ **Non-Intrusive**: Only shows once per tab automatically
✅ **Replayable**: Click "Start Tutorial" anytime
✅ **Smooth Transitions**: Instant fade effects between steps
✅ **Educational**: Simple language for all ages

## Testing It Out

### Test Scenario 1: Fresh User
1. Open app → eETH tutorial auto-starts
2. Complete or skip it
3. Click **Portfolio** tab → Portfolio tutorial auto-starts!
4. Complete or skip
5. Go back to **eETH** → No tutorial (already seen)

### Test Scenario 2: Manual Restart
1. Click any tab
2. Click **"📚 Start Tutorial"** button
3. Tutorial for that specific tab plays
4. Navigate to different tab
5. Click **"📚 Start Tutorial"** again
6. Different tutorial plays!

### Test Scenario 3: Reset Memory
```javascript
// In browser console
localStorage.clear();
```
Refresh page → All tutorials will play again as "first time"

## Technical Implementation

### Files Modified:
1. **components/TutorialOverlay.tsx**
   - Added `stakingTutorialSteps` array
   - Added `portfolioTutorialSteps` array ✨
   - Added `advancedTutorialSteps` array ✨
   - Added `tutorialsByTab` mapping ✨
   - Added `activeTab` prop
   - Tutorial steps selected based on active tab

2. **components/PortfolioView.tsx**
   - Added `.tutorial-portfolio-info`
   - Added `.tutorial-eeth-balance`
   - Added `.tutorial-weeth-balance`
   - Added `.tutorial-rewards-section`
   - Added `.tutorial-staked-eth`
   - Added `.tutorial-claim-button`

3. **app/page.tsx**
   - Changed tutorial memory to tab-specific
   - Pass `activeTab` to TutorialOverlay
   - Auto-show tutorial when switching tabs
   - Separate localStorage for each tab

### Tutorial Steps Breakdown:

**eETH Tutorial**: 10 steps covering staking flow
**Portfolio Tutorial**: 7 steps covering portfolio management  
**Advanced Tutorial**: 2 steps (placeholder for future)

## User Experience Flow

```
User lands on page
    ↓
eETH tab active → Show eETH tutorial (500ms delay)
    ↓
User completes/skips tutorial
    ↓
localStorage: hasSeenTutorial_eETH = true
    ↓
User clicks Portfolio tab
    ↓
Check localStorage: hasSeenTutorial_Portfolio?
    ↓
    NO → Show Portfolio tutorial (500ms delay)
    YES → Don't show
    ↓
User clicks "Start Tutorial" button
    ↓
Show tutorial for current active tab (regardless of localStorage)
```

## Customization

Want to add more tutorial steps for Portfolio?

Edit `portfolioTutorialSteps` in `TutorialOverlay.tsx`:

```typescript
const portfolioTutorialSteps: TutorialStep[] = [
  {
    id: 'new-step',
    title: 'Step Title',
    description: 'Simple explanation here',
    targetElement: '.css-class-name',
    position: 'bottom',
    arrow: 'top'
  },
  // ... more steps
];
```

Want to change auto-show delay?

Edit line in `app/page.tsx`:
```typescript
setTimeout(() => setShowTutorial(true), 500); // Change 500ms to your preference
```

## Best Practices

✅ **Keep steps short**: 7-10 steps max per tutorial
✅ **Simple language**: Write for everyone
✅ **Logical flow**: Follow natural user journey
✅ **Visual cues**: Use emojis for personality
✅ **Clear CTAs**: "Click here", "Type this", etc.

---

## What Happens Next?

1. **User visits Portfolio**: Gets Portfolio tutorial automatically
2. **User returns to eETH**: No tutorial (already seen)
3. **User wants refresher**: Clicks "Start Tutorial" button
4. **Tutorial plays**: For the current active tab only

Perfect for an educational demo! Each section teaches exactly what's relevant. 🎉
