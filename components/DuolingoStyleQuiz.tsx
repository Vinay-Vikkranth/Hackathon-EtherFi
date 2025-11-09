'use client';

import { useState, useEffect } from 'react';
import { X, Flame, Star, CheckCircle, XCircle } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';

// Add keyframe animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px) rotate(-5deg); }
      75% { transform: translateX(10px) rotate(5deg); }
    }
    @keyframes shake-slow {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    @keyframes flicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    @keyframes flame {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(1.2); }
    }
    @keyframes tear {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(20px); opacity: 0; }
    }
    @keyframes blink-left {
      0%, 90%, 100% { transform: scaleY(1); }
      95% { transform: scaleY(0.1); }
    }
    @keyframes blink-right {
      0%, 88%, 100% { transform: scaleY(1); }
      93% { transform: scaleY(0.1); }
    }
    @keyframes look {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(4px); }
    }
    @keyframes bubble-1 {
      0% { opacity: 0; transform: translateY(0) scale(0); }
      50% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-20px) scale(1); }
    }
    @keyframes bubble-2 {
      0% { opacity: 0; transform: translateY(0) scale(0); }
      50% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-30px) scale(1); }
    }
    @keyframes bubble-3 {
      0% { opacity: 0; transform: translateY(0) scale(0); }
      50% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-40px) scale(1); }
    }
    @keyframes fire-particle {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-100px) scale(0); opacity: 0; }
    }
    @keyframes fade-in {
      0% { opacity: 0; transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-float { animation: float 2s ease-in-out infinite; }
    .animate-shake { animation: shake 0.5s ease-in-out; }
    .animate-shake-slow { animation: shake-slow 1s ease-in-out infinite; }
    .animate-flicker { animation: flicker 0.2s ease-in-out infinite; }
    .animate-flame { animation: flame 0.3s ease-in-out infinite; }
    .animate-tear { animation: tear 1.5s ease-in-out infinite; }
    .animate-blink-left { animation: blink-left 4s ease-in-out infinite; }
    .animate-blink-right { animation: blink-right 4s ease-in-out infinite; }
    .animate-look { animation: look 3s ease-in-out infinite; }
    .animate-bubble-1 { animation: bubble-1 2s ease-in-out infinite; }
    .animate-bubble-2 { animation: bubble-2 2s ease-in-out infinite 0.3s; }
    .animate-bubble-3 { animation: bubble-3 2s ease-in-out infinite 0.6s; }
    .animate-fire-particle { animation: fire-particle 1.5s ease-out infinite; }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
  `;
  document.head.appendChild(style);
}

type QuestionType = 'mcq' | 'match' | 'fillblank' | 'imageMatch';

interface BaseQuestion {
  id: number;
  type: QuestionType;
  prompt: string;
  correctFeedback: string;
  incorrectFeedback: string;
}

interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctIndex: number;
}

interface MatchQuestion extends BaseQuestion {
  type: 'match';
  pairs: { left: string; right: string }[];
}

interface FillBlankQuestion extends BaseQuestion {
  type: 'fillblank';
  sentence: string;
  blank: string;
  options: string[];
  correctOption: string;
}

interface ImageMatchQuestion extends BaseQuestion {
  type: 'imageMatch';
  options: { emoji: string; text: string; isCorrect: boolean }[];
}

type Question = MCQQuestion | MatchQuestion | FillBlankQuestion | ImageMatchQuestion;

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'mcq',
    prompt: 'What does eETH stand for?',
    options: [
      'Electronic Ethereum',
      'Liquid staked ETH',
      'Extra ETH',
      'Enhanced Ethereum'
    ],
    correctIndex: 1,
    correctFeedback: 'Perfect! eETH (ether.fi ETH) is a liquid staking token that represents your staked ETH position. Unlike traditional staking where your ETH is locked, eETH remains liquid and tradeable while still earning staking rewards. It\'s a 1:1 representation of your staked ETH plus accumulated rewards.',
    incorrectFeedback: 'Not quite! eETH is liquid staked ETH - it represents your staked position while allowing you to use it in DeFi. Traditional staking locks your ETH, but liquid staking gives you flexibility!'
  },
  {
    id: 2,
    type: 'imageMatch',
    prompt: 'Which represents staking?',
    options: [
      { emoji: '🏦', text: 'Bank', isCorrect: false },
      { emoji: '💎', text: 'Staking', isCorrect: true },
      { emoji: '🍕', text: 'Pizza', isCorrect: false },
      { emoji: '🚗', text: 'Car', isCorrect: false }
    ],
    correctFeedback: 'Yes! The diamond 💎 represents staking because it symbolizes something valuable being held securely. When you stake ETH, you\'re locking up valuable assets to help secure the Ethereum network, earning rewards in return - just like how diamonds are precious and secured.',
    incorrectFeedback: 'Think about what represents something valuable being held securely. Staking is about securing valuable assets (ETH) to earn rewards!'
  },
  {
    id: 3,
    type: 'fillblank',
    prompt: 'Complete the sentence:',
    sentence: 'Liquid staking allows you to earn _____ while keeping your assets liquid.',
    blank: 'rewards',
    options: ['penalties', 'rewards', 'fees', 'tokens'],
    correctOption: 'rewards',
    correctFeedback: 'Excellent! Liquid staking is revolutionary because it solves the liquidity problem. You earn staking rewards (typically 3-5% APR) from helping secure the network, while your eETH tokens remain liquid - meaning you can trade, lend, or use them in DeFi protocols. It\'s the best of both worlds!',
    incorrectFeedback: 'Not quite! Think about the benefit you get from staking - it\'s not a cost, it\'s a benefit! Liquid staking lets you earn passive income while maintaining flexibility.'
  },
  {
    id: 4,
    type: 'match',
    prompt: 'Match the concepts:',
    pairs: [
      { left: 'eETH', right: 'Liquid staked ETH' },
      { left: 'weETH', right: 'Wrapped eETH' },
      { left: 'APR', right: 'Annual reward rate' }
    ],
    correctFeedback: 'Amazing! You\'ve got the key terms down! eETH is your liquid staked position, weETH is a wrapped version that auto-compounds rewards by changing its value ratio, and APR (Annual Percentage Rate) tells you how much you\'ll earn yearly. Understanding these terms is crucial for navigating DeFi!',
    incorrectFeedback: 'Keep trying! These are fundamental DeFi terms. eETH = your staked position, weETH = wrapped version, APR = your yearly earning rate.'
  },
  {
    id: 5,
    type: 'mcq',
    prompt: 'What happens when you wrap eETH to weETH?',
    options: [
      'You lose your rewards',
      'The ratio changes as rewards accumulate',
      'You pay a fee',
      'Nothing changes'
    ],
    correctIndex: 1,
    correctFeedback: 'Correct! weETH is a rebasing token that uses a different reward mechanism. Instead of your balance increasing (like eETH), the exchange ratio between weETH and ETH increases over time. For example, 1 weETH might equal 1.05 ETH today and 1.06 ETH next month. This makes it easier to integrate with DeFi protocols that don\'t support rebasing tokens.',
    incorrectFeedback: 'Think about how weETH handles rewards differently. Instead of getting more tokens, the value of each token increases through a changing exchange ratio - this is called a rebasing mechanism.'
  },
  {
    id: 6,
    type: 'imageMatch',
    prompt: 'Which emoji best represents DeFi yields?',
    options: [
      { emoji: '📈', text: 'Growth', isCorrect: true },
      { emoji: '📉', text: 'Loss', isCorrect: false },
      { emoji: '🎮', text: 'Gaming', isCorrect: false },
      { emoji: '🍔', text: 'Food', isCorrect: false }
    ],
    correctFeedback: 'Yes! The growth chart 📈 perfectly represents DeFi yields! In DeFi, yields are the returns you earn from various activities like staking, lending, or providing liquidity. The upward trending chart symbolizes how your assets can grow over time through these passive income strategies. DeFi yields can range from 3-20% APR depending on the strategy and risk level.',
    incorrectFeedback: 'Think about positive financial outcomes! Yields are about growth and earning returns on your crypto assets.'
  },
  {
    id: 7,
    type: 'fillblank',
    prompt: 'Fill in the blank:',
    sentence: 'EigenLayer restaking lets you earn _____ rewards on the same ETH.',
    blank: 'additional',
    options: ['reduced', 'additional', 'zero', 'negative'],
    correctOption: 'additional',
    correctFeedback: 'Perfect! Restaking is like double-dipping your rewards! Your ETH is already earning staking rewards (~4% APR), but by restaking it through EigenLayer, you can also earn additional rewards by helping secure other networks and protocols. This can potentially increase your total APR to 6-8% or more, all from the same initial ETH!',
    incorrectFeedback: 'Think about what makes restaking valuable! The key benefit is earning MORE rewards on top of your base staking rewards - it\'s about maximizing your yield!'
  },
  {
    id: 8,
    type: 'match',
    prompt: 'Match the risk levels:',
    pairs: [
      { left: 'Audited protocols', right: 'Lower risk' },
      { left: '500% APR promise', right: 'High risk' },
      { left: 'Established platforms', right: 'Safer choice' }
    ],
    correctFeedback: 'Great job! You understand DeFi risk assessment! Audited protocols have been reviewed by security experts (lower risk), unrealistic APR promises like 500% are usually scams or extremely risky (high risk), and established platforms with track records are generally safer. Always DYOR (Do Your Own Research) and never invest more than you can afford to lose!',
    incorrectFeedback: 'Review what makes protocols safe or risky. Key factors: security audits, realistic returns (be wary of anything >50% APR), and platform reputation. If it sounds too good to be true, it probably is!'
  },
  {
    id: 9,
    type: 'mcq',
    prompt: 'What is the main benefit of loyalty points?',
    options: [
      'Pay for gas fees',
      'Trade on exchanges',
      'Future airdrops and rewards',
      'Buy NFTs'
    ],
    correctIndex: 2,
    correctFeedback: 'Exactly! Loyalty points are DeFi\'s way of rewarding early adopters and active users. Protocols track your activity through points, which often convert to token airdrops when the project launches. Historical airdrops have been worth thousands of dollars! Points incentivize you to use the protocol early and stay engaged. It\'s like a frequent flyer program for DeFi!',
    incorrectFeedback: 'Think about long-term user rewards! Loyalty points don\'t have immediate utility - they\'re a promise of future rewards, typically in the form of token airdrops when the protocol launches its governance token.'
  },
  {
    id: 10,
    type: 'imageMatch',
    prompt: 'Which represents gas fees?',
    options: [
      { emoji: '⛽', text: 'Gas', isCorrect: true },
      { emoji: '💧', text: 'Water', isCorrect: false },
      { emoji: '🔥', text: 'Fire', isCorrect: false },
      { emoji: '❄️', text: 'Ice', isCorrect: false }
    ],
    correctFeedback: 'Correct! Gas fees ⛽ are the "fuel" that powers blockchain transactions. Just like your car needs gas to run, Ethereum needs computational resources to process your transactions. You pay gas fees to validators/miners who process your transaction. These fees vary based on network congestion - higher demand = higher fees. Layer 2 solutions can reduce gas costs by 10-100x!',
    incorrectFeedback: 'Think about what powers blockchain transactions! Gas is the computational fuel needed to execute operations on Ethereum. The name comes from the analogy that transactions need "fuel" to run!'
  }
];

interface Props {
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function DuolingoStyleQuiz({ onComplete, onClose }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [mascotState, setMascotState] = useState<'idle' | 'thinking' | 'correct' | 'wrong' | 'fire' | 'crying'>('idle');
  const [mascotMessage, setMascotMessage] = useState('Hey there! Ready to learn?');
  const [showMessage, setShowMessage] = useState(true);
  const { earnBadge } = useLearning();

  const question = QUESTIONS[currentQuestion];
  const progress = (completedQuestions / QUESTIONS.length) * 100;

  const encouragementMessages = {
    thinking: ['Hmm... let me think!', 'Take your time!', 'You got this!'],
    correct: ['Amazing!', 'You nailed it!', 'Brilliant!', 'Perfect!', "You're a star!"],
    wrong: ['Oops! Try again!', 'So close!', 'Keep going!', "Don't give up!", 'Almost there!'],
    fire: ['ON FIRE! 🔥', "You're unstoppable!", "Incredible streak!", 'Blazing through!'],
    crying: ['Oh no! 😢', "It's okay!", "We'll do better!"],
    idle: ['Ready when you are!', "Let's learn!", 'Pick an answer!', "You've got this!"]
  };

  useEffect(() => {
    if (selectedAnswer !== null && !showFeedback) {
      setMascotState('thinking');
      const messages = encouragementMessages.thinking;
      setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    } else if (!showFeedback) {
      setMascotState('idle');
      const messages = encouragementMessages.idle;
      setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    }
  }, [selectedAnswer, showFeedback]);

  const checkAnswer = () => {
    let correct = false;

    if (question.type === 'mcq') {
      correct = selectedAnswer === question.correctIndex;
    } else if (question.type === 'fillblank') {
      correct = selectedAnswer === question.correctOption;
    } else if (question.type === 'imageMatch') {
      correct = question.options[selectedAnswer]?.isCorrect;
    } else if (question.type === 'match') {
      const correctPairs = question.pairs.every(pair => 
        matchedPairs[pair.left] === pair.right
      );
      correct = correctPairs && Object.keys(matchedPairs).length === question.pairs.length;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      
      if ((streak + 1) % 3 === 0) {
        setShowCelebration(true);
        setMascotState('fire');
        const messages = encouragementMessages.fire;
        setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
        setTimeout(() => setShowCelebration(false), 2000);
      } else {
        setMascotState('correct');
        const messages = encouragementMessages.correct;
        setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
      }
    } else {
      setStreak(0);
      setHearts(prev => Math.max(0, prev - 1));
      
      if (hearts <= 1) {
        setMascotState('crying');
        const messages = encouragementMessages.crying;
        setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
        setTimeout(() => {
          onComplete(score);
        }, 2000);
      } else {
        setMascotState('wrong');
        const messages = encouragementMessages.wrong;
        setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
      }
    }
  };

  const handleNext = () => {
    setCompletedQuestions(prev => prev + 1);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setMatchedPairs({});
      setShowFeedback(false);
      setMascotState('idle');
      setMascotMessage("Let's keep going!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 4000);
    } else {
      if (score >= 50) {
        earnBadge('quiz_master');
      }
      onComplete(score);
    }
  };

  const handleMatchPair = (left: string, right: string) => {
    setMatchedPairs(prev => ({ ...prev, [left]: right }));
  };

  if (hearts === 0) {
    return (
      <div className="fixed inset-0 z-[1002] bg-gradient-to-b from-dark-900 to-black flex items-center justify-center">
        <div className="bg-dark-800 border-2 border-primary-500/30 rounded-3xl p-8 max-w-md text-center shadow-2xl backdrop-blur-md">
          <div className="text-8xl mb-4">😢</div>
          <h2 className="text-3xl font-black text-white mb-2">Out of Hearts!</h2>
          <p className="text-gray-400 mb-6">Don't worry! Learning takes practice!</p>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 text-white py-6 px-6 rounded-2xl mb-6 backdrop-blur-sm">
            <div className="text-sm text-gray-400">Your Score</div>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{score}</div>
            <div className="text-sm text-gray-400 mt-1">points</div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-green-500/50 transition-all mb-3"
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 bg-dark-700 border-2 border-dark-600 text-gray-300 font-bold rounded-xl hover:bg-dark-600 hover:border-primary-500/30 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1002] bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      {showCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-9xl mb-4">🔥</div>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500" 
                 style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}>
              {streak} STREAK!
            </div>
            <div className="text-2xl text-yellow-400 font-bold mt-2">You're on fire!</div>
          </div>
        </div>
      )}

      <div className="bg-dark-800/80 backdrop-blur-md border-b-2 border-primary-500/30 p-4 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-700 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex-1 mx-6">
              <div className="h-4 bg-dark-700 rounded-full overflow-hidden border-2 border-dark-600">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-500 shadow-lg"
                  style={{ width: `${progress}%`, boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-3xl transition-all transform hover:scale-110">
                  {i < hearts ? '❤️' : '🖤'}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="font-bold text-orange-300">{streak} streak</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-purple-300">{score} points</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 pt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            {/* Animated 3D Mascot */}
            <div className="relative inline-block mb-6">
              <div className={`relative w-40 h-40 transition-all duration-500 ${
                mascotState === 'fire' ? 'animate-pulse scale-110' : 
                mascotState === 'correct' ? 'animate-bounce' :
                mascotState === 'wrong' ? 'animate-shake' :
                mascotState === 'crying' ? 'animate-shake-slow' :
                mascotState === 'thinking' ? 'animate-float' : 'animate-float'
              }`}>
                {/* Shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/30 rounded-full blur-xl"></div>
                
                {/* Body */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  mascotState === 'fire' ? 'bg-gradient-to-br from-orange-400 via-red-500 to-purple-600' :
                  mascotState === 'correct' ? 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600' :
                  mascotState === 'wrong' ? 'bg-gradient-to-br from-red-400 via-pink-500 to-purple-600' :
                  mascotState === 'crying' ? 'bg-gradient-to-br from-blue-300 via-blue-400 to-indigo-500' :
                  'bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600'
                }`} style={{
                  boxShadow: mascotState === 'fire' ? '0 0 60px rgba(251,146,60,0.8), inset 0 0 40px rgba(255,255,255,0.3)' :
                             mascotState === 'correct' ? '0 0 40px rgba(52,211,153,0.6), inset 0 0 40px rgba(255,255,255,0.3)' :
                             mascotState === 'wrong' ? '0 0 40px rgba(244,114,182,0.6), inset 0 0 40px rgba(255,255,255,0.3)' :
                             '0 0 40px rgba(168,85,247,0.6), inset 0 0 40px rgba(255,255,255,0.3)'
                }}>
                  {/* Shine effect */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/40 rounded-full blur-2xl"></div>
                </div>

                {/* Eyes */}
                <div className="absolute top-12 left-0 right-0 flex justify-center gap-6">
                  {mascotState === 'fire' ? (
                    <>
                      <div className="relative">
                        <div className="w-8 h-10 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-full animate-flicker" 
                             style={{ boxShadow: '0 0 20px rgba(251,146,60,1)' }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-orange-400 rounded-full animate-flame"></div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-8 h-10 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-full animate-flicker" 
                             style={{ boxShadow: '0 0 20px rgba(251,146,60,1)', animationDelay: '0.1s' }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-orange-400 rounded-full animate-flame"></div>
                        </div>
                      </div>
                    </>
                  ) : mascotState === 'crying' ? (
                    <>
                      <div className="relative">
                        <div className="w-6 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full">
                          <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full"></div>
                        </div>
                        {/* Tears */}
                        <div className="absolute top-8 left-2 w-2 h-4 bg-blue-400 rounded-full animate-tear" 
                             style={{ boxShadow: '0 0 10px rgba(96,165,250,0.8)' }}></div>
                      </div>
                      <div className="relative">
                        <div className="w-6 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full">
                          <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full"></div>
                        </div>
                        <div className="absolute top-8 left-2 w-2 h-4 bg-blue-400 rounded-full animate-tear" 
                             style={{ animationDelay: '0.3s', boxShadow: '0 0 10px rgba(96,165,250,0.8)' }}></div>
                      </div>
                    </>
                  ) : mascotState === 'thinking' ? (
                    <>
                      <div className="w-5 h-9 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full animate-blink-left">
                        <div className="absolute top-2 left-1 w-2 h-2 bg-white/70 rounded-full animate-look"></div>
                      </div>
                      <div className="w-5 h-9 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full animate-blink-right">
                        <div className="absolute top-2 left-1 w-2 h-2 bg-white/70 rounded-full animate-look"></div>
                      </div>
                    </>
                  ) : mascotState === 'correct' ? (
                    <>
                      <div className="w-6 h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full transform rotate-12"></div>
                      <div className="w-6 h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full transform -rotate-12"></div>
                    </>
                  ) : mascotState === 'wrong' ? (
                    <>
                      <div className="w-8 h-8 bg-gray-900 rounded-full">
                        <div className="w-1 h-6 bg-gray-800 absolute top-1 left-3.5 transform rotate-45"></div>
                        <div className="w-1 h-6 bg-gray-800 absolute top-1 left-3.5 transform -rotate-45"></div>
                      </div>
                      <div className="w-8 h-8 bg-gray-900 rounded-full">
                        <div className="w-1 h-6 bg-gray-800 absolute top-1 left-3.5 transform rotate-45"></div>
                        <div className="w-1 h-6 bg-gray-800 absolute top-1 left-3.5 transform -rotate-45"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full">
                        <div className="absolute top-2 left-1.5 w-3 h-3 bg-white/80 rounded-full">
                          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="w-6 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full">
                        <div className="absolute top-2 left-1.5 w-3 h-3 bg-white/80 rounded-full">
                          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Mouth */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                  {mascotState === 'correct' ? (
                    <div className="w-16 h-8 border-b-4 border-gray-900 rounded-b-full"></div>
                  ) : mascotState === 'wrong' || mascotState === 'crying' ? (
                    <div className="w-16 h-8 border-t-4 border-gray-900 rounded-t-full"></div>
                  ) : mascotState === 'thinking' ? (
                    <div className="w-12 h-3 bg-gray-900 rounded-full"></div>
                  ) : mascotState === 'fire' ? (
                    <div className="w-16 h-8 border-b-4 border-orange-900 rounded-b-full">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-12 h-4 border-b-3 border-gray-900 rounded-b-full"></div>
                  )}
                </div>

                {/* Thinking bubbles */}
                {mascotState === 'thinking' && (
                  <div className="absolute -right-8 -top-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-white/80 rounded-full animate-bubble-1"></div>
                      <div className="w-4 h-4 bg-white/80 rounded-full absolute -right-4 -top-4 animate-bubble-2"></div>
                      <div className="w-6 h-6 bg-white/90 rounded-full absolute -right-10 -top-10 animate-bubble-3 flex items-center justify-center text-xs">
                        💭
                      </div>
                    </div>
                  </div>
                )}

                {/* Fire particles */}
                {mascotState === 'fire' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-orange-500 rounded-full animate-fire-particle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.2}s`,
                          boxShadow: '0 0 10px rgba(251,146,60,1)'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Speech Bubble - Directly below mascot */}
            {showMessage && (
              <div className="relative mt-2 animate-fade-in">
                <div className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 inline-block ${
                  mascotState === 'fire' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                  mascotState === 'correct' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                  mascotState === 'wrong' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                  mascotState === 'crying' ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white' :
                  'bg-white text-gray-800'
                }`} style={{
                  boxShadow: mascotState === 'fire' ? '0 0 30px rgba(251,146,60,0.6)' :
                             mascotState === 'correct' ? '0 0 30px rgba(52,211,153,0.6)' :
                             '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                  {mascotMessage}
                  {/* Tail pointing up to mouth */}
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 ${
                    mascotState === 'fire' ? 'bg-orange-500' :
                    mascotState === 'correct' ? 'bg-green-500' :
                    mascotState === 'wrong' ? 'bg-red-500' :
                    mascotState === 'crying' ? 'bg-blue-400' :
                    'bg-white'
                  }`}></div>
                </div>
              </div>
            )}

            <div className="text-2xl font-bold text-white mb-2 mt-4">{question.prompt}</div>
          </div>

          {question.type === 'mcq' && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && setSelectedAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-5 text-left text-lg font-semibold rounded-xl border-2 transition-all ${
                    showFeedback
                      ? index === question.correctIndex
                        ? 'bg-green-500/20 border-green-500 text-green-300 shadow-lg shadow-green-500/50'
                        : selectedAnswer === index
                        ? 'bg-red-500/20 border-red-500 text-red-300 shadow-lg shadow-red-500/50'
                        : 'bg-dark-700/50 border-dark-600 text-gray-500 opacity-50'
                      : selectedAnswer === index
                      ? 'bg-primary-500/30 border-primary-400 text-white shadow-xl shadow-primary-500/50 scale-105'
                      : 'bg-dark-700 border-dark-600 text-gray-300 hover:border-primary-500/50 hover:bg-dark-600 hover:shadow-lg'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === 'imageMatch' && (
            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && setSelectedAnswer(index)}
                  disabled={showFeedback}
                  className={`p-8 rounded-2xl border-3 transition-all ${
                    showFeedback
                      ? option.isCorrect
                        ? 'bg-green-500/20 border-green-500 shadow-2xl shadow-green-500/50'
                        : selectedAnswer === index
                        ? 'bg-red-500/20 border-red-500 shadow-2xl shadow-red-500/50'
                        : 'bg-dark-700/50 border-dark-600 opacity-50'
                      : selectedAnswer === index
                      ? 'bg-primary-500/30 border-primary-400 shadow-2xl shadow-primary-500/50 scale-105'
                      : 'bg-dark-700 border-dark-600 hover:border-primary-500/50 hover:bg-dark-600 hover:shadow-xl'
                  }`}
                >
                  <div className="text-7xl mb-3">{option.emoji}</div>
                  <div className="font-bold text-white">{option.text}</div>
                </button>
              ))}
            </div>
          )}

          {question.type === 'fillblank' && (
            <div className="space-y-6">
              <div className="bg-dark-700/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-500/30 text-center shadow-xl">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {question.sentence.split('_____')[0]}
                  <span className="inline-block mx-2 px-6 py-3 bg-gradient-to-r from-primary-500/30 to-purple-500/30 border-2 border-primary-400 rounded-xl font-bold text-primary-300 shadow-lg">
                    {selectedAnswer || '_____'}
                  </span>
                  {question.sentence.split('_____')[1]}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showFeedback && setSelectedAnswer(option)}
                    disabled={showFeedback}
                    className={`p-4 text-lg font-semibold rounded-xl border-2 transition-all ${
                      showFeedback
                        ? option === question.correctOption
                          ? 'bg-green-500/20 border-green-500 text-green-300 shadow-lg shadow-green-500/50'
                          : selectedAnswer === option
                          ? 'bg-red-500/20 border-red-500 text-red-300 shadow-lg shadow-red-500/50'
                          : 'bg-dark-700/50 border-dark-600 text-gray-500 opacity-50'
                        : selectedAnswer === option
                        ? 'bg-primary-500/30 border-primary-400 text-white shadow-xl shadow-primary-500/50'
                        : 'bg-dark-700 border-dark-600 text-gray-300 hover:border-primary-500/50 hover:bg-dark-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {question.type === 'match' && (
            <div className="space-y-4">
              <div className="bg-primary-500/10 backdrop-blur-sm rounded-xl p-4 border-2 border-primary-500/30 mb-6">
                <p className="text-sm text-primary-300 font-semibold">
                  💡 Tap a term on the left, then tap its match on the right!
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  {question.pairs.map((pair, index) => (
                    <button
                      key={`left-${index}`}
                      onClick={() => {
                        if (!showFeedback) {
                          const temp = { ...matchedPairs };
                          if (temp[pair.left]) delete temp[pair.left];
                          else setMatchedPairs({ ...temp, [pair.left]: '' });
                        }
                      }}
                      disabled={showFeedback}
                      className={`w-full p-4 text-left font-bold rounded-xl border-2 transition-all ${
                        matchedPairs[pair.left]
                          ? 'bg-green-500/20 border-green-500 text-green-300 shadow-lg shadow-green-500/30'
                          : 'bg-dark-700 border-dark-600 text-gray-300 hover:border-primary-500/50 hover:bg-dark-600'
                      }`}
                    >
                      {pair.left}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {question.pairs.map((pair, index) => (
                    <button
                      key={`right-${index}`}
                      onClick={() => {
                        if (!showFeedback) {
                          const selectedLeft = Object.keys(matchedPairs).find(
                            key => matchedPairs[key] === ''
                          );
                          if (selectedLeft) {
                            handleMatchPair(selectedLeft, pair.right);
                          }
                        }
                      }}
                      disabled={showFeedback}
                      className={`w-full p-4 text-left font-bold rounded-xl border-2 transition-all ${
                        Object.values(matchedPairs).includes(pair.right)
                          ? 'bg-green-500/20 border-green-500 text-green-300 shadow-lg shadow-green-500/30'
                          : 'bg-dark-700 border-dark-600 text-gray-300 hover:border-primary-500/50 hover:bg-dark-600'
                      }`}
                    >
                      {pair.right}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-dark-800/90 backdrop-blur-md border-t-2 border-primary-500/30 p-6 shadow-2xl">
        <div className="max-w-2xl mx-auto">
          {showFeedback && (
            <div className={`rounded-xl p-6 mb-4 border-2 ${
              isCorrect 
                ? 'bg-green-500/10 border-green-500/50 shadow-lg shadow-green-500/20' 
                : 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/20'
            }`}>
              <div className="flex items-start gap-4">
                {isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <div className={`text-xl font-black mb-2 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                    {isCorrect ? 'Awesome!' : 'Not quite!'}
                  </div>
                  <div className={`text-base ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                    {isCorrect ? question.correctFeedback : question.incorrectFeedback}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={showFeedback ? handleNext : checkAnswer}
            disabled={
              (question.type === 'mcq' && selectedAnswer === null) ||
              (question.type === 'fillblank' && !selectedAnswer) ||
              (question.type === 'imageMatch' && selectedAnswer === null) ||
              (question.type === 'match' && Object.keys(matchedPairs).length !== question.pairs.length)
            }
            className={`w-full py-5 rounded-xl font-black text-xl transition-all shadow-xl ${
              showFeedback
                ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-primary-500/50'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-2xl hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
            }`}
          >
            {showFeedback ? 'CONTINUE' : 'CHECK'}
          </button>
        </div>
      </div>
    </div>
  );
}
