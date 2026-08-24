import React, { useState, useEffect, useRef } from 'react';

interface BattleQuestion {
    id: number;
    questionParts: { text: string; highlight?: boolean }[];
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
    correctKey: 'A' | 'B' | 'C' | 'D';
}

const BATTLE_QUESTIONS: BattleQuestion[] = [
    {
        id: 1,
        questionParts: [
            { text: 'In OOP, ' },
            { text: 'Inheritance', highlight: true },
            { text: ' allows a child class to ' },
            { text: 'reuse', highlight: true },
            { text: ' properties from the parent. What keyword is used in Java?' },
        ],
        options: [
            { key: 'A', text: 'extends' },
            { key: 'B', text: 'implements' },
            { key: 'C', text: 'override' },
            { key: 'D', text: 'import' },
        ],
        correctKey: 'A',
    },
    {
        id: 2,
        questionParts: [
            { text: 'Which SQL clause filters ' },
            { text: 'grouped records', highlight: true },
            { text: ' after a ' },
            { text: 'GROUP BY', highlight: true },
            { text: ' is applied?' },
        ],
        options: [
            { key: 'A', text: 'WHERE' },
            { key: 'B', text: 'FILTER' },
            { key: 'C', text: 'HAVING' },
            { key: 'D', text: 'ORDER BY' },
        ],
        correctKey: 'C',
    },
    {
        id: 3,
        questionParts: [
            { text: 'In computer networking, ' },
            { text: 'TCP', highlight: true },
            { text: ' is preferred over ' },
            { text: 'UDP', highlight: true },
            { text: ' when which factor is most important?' },
        ],
        options: [
            { key: 'A', text: 'Speed' },
            { key: 'B', text: 'Low latency' },
            { key: 'C', text: 'Reliability' },
            { key: 'D', text: 'Broadcasting' },
        ],
        correctKey: 'C',
    },
];

type AnswerState = 'idle' | 'correct' | 'wrong';

interface BattleModeProps {
    onBack?: () => void;
    onVictory?: () => void;
    onDefeat?: () => void;
}

export function BattleMode({ onBack, onVictory, onDefeat }: BattleModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
    const [answerState, setAnswerState] = useState<AnswerState>('idle');
    const [playerHp, setPlayerHp] = useState(100);
    const [enemyHp, setEnemyHp] = useState(100);
    const [isPlayerShaking, setIsPlayerShaking] = useState(false);
    const [isEnemyShaking, setIsEnemyShaking] = useState(false);
    const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
    const [battleResult, setBattleResult] = useState<'victory' | 'defeat' | null>(null);
    const [isAdvancing, setIsAdvancing] = useState(false);

    const totalQuestions = BATTLE_QUESTIONS.length;
    const currentQuestion = BATTLE_QUESTIONS[currentIndex];

    const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
        if (answerState !== 'idle' || isAdvancing) return;

        setSelectedKey(key);
        const isCorrect = key === currentQuestion.correctKey;

        if (isCorrect) {
            setAnswerState('correct');
            // Enemy takes damage
            setIsEnemyShaking(true);
            const newEnemyHp = Math.max(0, enemyHp - 34);
            setTimeout(() => {
                setEnemyHp(newEnemyHp);
                setIsEnemyShaking(false);
            }, 400);

            // Auto-advance after showing result
            setTimeout(() => {
                if (currentIndex < totalQuestions - 1) {
                    setIsAdvancing(true);
                    setTimeout(() => {
                        setCurrentIndex((prev) => prev + 1);
                        setSelectedKey(null);
                        setAnswerState('idle');
                        setIsAdvancing(false);
                    }, 300);
                } else {
                    setBattleResult('victory');
                }
            }, 1200);
        } else {
            setAnswerState('wrong');
            // Enemy counter-attacks
            setIsEnemyAttacking(true);
            setTimeout(() => {
                setIsEnemyAttacking(false);
                setIsPlayerShaking(true);
                const newPlayerHp = Math.max(0, playerHp - 34);
                setTimeout(() => {
                    setPlayerHp(newPlayerHp);
                    setIsPlayerShaking(false);
                    if (newPlayerHp <= 0) {
                        setBattleResult('defeat');
                    }
                }, 400);
            }, 600);

            // Allow retry after delay
            setTimeout(() => {
                setSelectedKey(null);
                setAnswerState('idle');
            }, 1500);
        }
    };

    // Result modal action
    const handleRetry = () => {
        setCurrentIndex(0);
        setSelectedKey(null);
        setAnswerState('idle');
        setPlayerHp(100);
        setEnemyHp(100);
        setBattleResult(null);
        setIsAdvancing(false);
    };

    return (
        <div className="flex flex-col w-full h-full min-h-[760px] max-w-md mx-auto relative overflow-hidden select-none">
            
            {/* ── 1. BATTLE ARENA (top half) ────────────────────────── */}
            <div className="relative flex-shrink-0 h-[300px] sm:h-[320px] overflow-hidden">
                
                {/* Arena Background */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-[#1a0a3e] via-[#2d1060] to-[#0d0d1f]"
                    style={{
                        backgroundImage: `
                            radial-gradient(ellipse at 20% 40%, rgba(88,28,235,0.35) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 30%, rgba(139,0,0,0.25) 0%, transparent 55%),
                            radial-gradient(ellipse at 50% 100%, rgba(15,15,40,0.9) 0%, transparent 60%)
                        `,
                    }}
                >
                    {/* Arena floor glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080818] to-transparent" />
                    
                    {/* Decorative crystal shards */}
                    <div className="absolute top-4 left-4 w-2 h-12 bg-purple-400/20 rotate-12 rounded-full" />
                    <div className="absolute top-2 left-8 w-1.5 h-8 bg-purple-300/15 -rotate-6 rounded-full" />
                    <div className="absolute top-6 right-6 w-2 h-14 bg-rose-400/20 -rotate-12 rounded-full" />
                    <div className="absolute top-3 right-12 w-1.5 h-9 bg-red-300/15 rotate-8 rounded-full" />
                    
                    {/* Arcane floor line */}
                    <div className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                </div>

                {/* Back button */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white text-sm cursor-pointer"
                    >
                        ‹
                    </button>
                )}

                {/* Round indicator */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/50 border border-purple-400/40 text-[10px] font-mono text-purple-200 tracking-widest uppercase">
                    Round {currentIndex + 1} / {totalQuestions}
                </div>

                {/* ── PLAYER (left) ── */}
                <div className={`absolute bottom-6 left-4 flex flex-col items-start gap-1 z-10 transition-transform duration-150 ${isPlayerShaking ? 'translate-x-[-8px]' : ''}`}>
                    {/* Player HP Bar */}
                    <div className="mb-1 w-32">
                        <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] font-bold font-mono text-emerald-300 uppercase tracking-wider">You</span>
                            <span className="text-[9px] font-mono text-white">{playerHp} HP</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-500"
                                style={{ width: `${playerHp}%` }}
                            />
                        </div>
                    </div>

                    {/* Player Owl */}
                    <div className="relative">
                        {/* Blue arcane glow beneath player */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-blue-500/30 blur-xl rounded-full" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-cyan-400/20 blur-lg rounded-full" />
                        <img
                            src="/assets/img/OWL.png"
                            alt="Player Owl"
                            className="w-24 sm:w-28 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] relative z-10"
                            style={{ filter: 'drop-shadow(0 0 12px rgba(99,179,237,0.6))' }}
                        />
                    </div>
                </div>

                {/* ── ENEMY (right) ── */}
                <div className={`absolute bottom-6 right-2 flex flex-col items-end gap-1 z-10 transition-transform duration-150 ${isEnemyShaking ? 'translate-x-[8px]' : ''} ${isEnemyAttacking ? 'translate-x-[-12px]' : ''}`}>
                    {/* Enemy HP Bar */}
                    <div className="mb-1 w-32">
                        <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] font-mono text-white">{enemyHp} HP</span>
                            <span className="text-[9px] font-bold font-mono text-rose-300 uppercase tracking-wider">Enemy</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-rose-600 to-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all duration-500 ml-auto"
                                style={{ width: `${enemyHp}%` }}
                            />
                        </div>
                    </div>

                    {/* Enemy Owl (flipped + dark/evil style) */}
                    <div className="relative">
                        {/* Red arcane glow beneath enemy */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-red-600/30 blur-xl rounded-full" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-rose-400/20 blur-lg rounded-full" />
                        <img
                            src="/assets/img/OWL.png"
                            alt="Enemy Owl"
                            className="w-28 sm:w-32 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] relative z-10"
                            style={{
                                transform: 'scaleX(-1)',
                                filter: 'drop-shadow(0 0 14px rgba(239,68,68,0.7)) saturate(0.3) brightness(0.6) sepia(1) hue-rotate(260deg)',
                            }}
                        />
                        {/* Evil aura particles */}
                        <div className="absolute top-2 right-1 text-xs animate-pulse">⚡</div>
                        <div className="absolute top-6 right-0 text-[10px] animate-bounce" style={{ animationDelay: '0.3s' }}>🔮</div>
                    </div>
                </div>

                {/* VS Badge center */}
                <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 z-20">
                    <div className="w-9 h-9 rounded-full bg-black/70 border-2 border-purple-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                        <span className="font-cinzel text-[10px] font-black text-amber-300">VS</span>
                    </div>
                </div>
            </div>

            {/* ── 2. QUESTION PANEL (bottom half) ─────────────────────── */}
            <div className="flex-1 bg-gradient-to-b from-[#0d0f26] to-[#08090f] px-4 pt-4 pb-4 flex flex-col gap-3 relative z-10 border-t-2 border-purple-500/30 shadow-[0_-12px_30px_rgba(0,0,0,0.8)]">
                
                {/* Question Text */}
                <div className="px-1">
                    <p className="font-jakarta text-xs sm:text-sm text-zinc-100 leading-relaxed text-center">
                        {currentQuestion.questionParts.map((part, idx) => (
                            <span
                                key={idx}
                                className={part.highlight ? 'text-amber-400 font-bold drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]' : ''}
                            >
                                {part.text}
                            </span>
                        ))}
                    </p>
                </div>

                {/* ── 2×2 Answer Grid with Center Feedback Circle ── */}
                <div className="relative flex-1 flex items-center">
                    <div className="w-full grid grid-cols-2 gap-2 relative">
                        
                        {currentQuestion.options.map((opt) => {
                            const isSelected = selectedKey === opt.key;
                            const isCorrect = opt.key === currentQuestion.correctKey;

                            let optionStyle = 'border-purple-500/40 bg-[#1a1040]/80 text-zinc-100 hover:border-purple-400 hover:bg-[#1f1450]/90';
                            if (isSelected && answerState === 'correct') {
                                optionStyle = 'border-emerald-400 bg-[#0a2e1a]/90 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.5)]';
                            } else if (isSelected && answerState === 'wrong') {
                                optionStyle = 'border-rose-500 bg-[#2e0a0a]/90 text-rose-200 shadow-[0_0_20px_rgba(239,68,68,0.5)]';
                            } else if (isSelected) {
                                optionStyle = 'border-white/60 bg-[#2a1a5e]/90 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]';
                            }

                            // Add inner padding to leave space for center circle
                            const isLeft = opt.key === 'A' || opt.key === 'B';
                            const innerPad = isLeft ? 'pr-8' : 'pl-8';

                            return (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => handleSelectOption(opt.key)}
                                    disabled={answerState !== 'idle' || isAdvancing}
                                    className={`py-4 px-4 ${innerPad} rounded-2xl border text-left font-jakarta text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 min-h-[68px] flex items-center ${optionStyle}`}
                                >
                                    <span className="leading-snug">
                                        <span className="text-purple-300 font-bold mr-1.5">{opt.key}.</span>
                                        {opt.text}
                                    </span>
                                </button>
                            );
                        })}

                        {/* Center Feedback Circle */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all duration-300 shadow-xl ${
                                answerState === 'correct'
                                    ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.8)] scale-110'
                                    : answerState === 'wrong'
                                    ? 'bg-rose-600 border-rose-400 shadow-[0_0_25px_rgba(239,68,68,0.8)] scale-110'
                                    : 'bg-[#0d0f26] border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                            }`}>
                                {answerState === 'correct' && (
                                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {answerState === 'wrong' && (
                                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                                {answerState === 'idle' && (
                                    <span className="text-purple-400/60 text-lg font-bold">?</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Nav Dock — matching DashboardLanding style */}
                <div className="w-full flex items-end justify-between px-2 pt-2 border-t border-white/5 relative">
                    {/* Rewards */}
                    <button className="p-2 text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                            <circle cx="12" cy="8" r="6" />
                            <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                        </svg>
                    </button>

                    {/* Library */}
                    <button className="p-2 text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                            <rect width="14" height="18" x="5" y="3" rx="2" />
                            <path d="M3 7v12a2 2 0 0 0 2 2h12" />
                        </svg>
                    </button>

                    {/* Center Battle Crest (elevated, active) */}
                    <div className="relative -mt-6">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-b from-purple-700 to-indigo-900 border-2 border-purple-300/60 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.7)] ring-2 ring-purple-500/30">
                            <span className="text-xl">⚔️</span>
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-purple-300 whitespace-nowrap uppercase tracking-wider">
                            Battle
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <button className="p-2 text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                            <path d="M18 20V10M12 20V4M6 20v-6" />
                        </svg>
                    </button>

                    {/* Profile */}
                    <button className="p-2 text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── 3. BATTLE RESULT MODAL ─────────────────────────────── */}
            {battleResult && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-6">
                    <div className="w-full max-w-xs bg-[#0d0f26] border-2 border-purple-500/60 rounded-3xl p-6 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                        
                        <div className="text-5xl mb-3 animate-bounce">
                            {battleResult === 'victory' ? '🏆' : '💀'}
                        </div>

                        <h2 className={`font-cinzel text-2xl font-bold tracking-wider mb-1 ${
                            battleResult === 'victory' ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                            {battleResult === 'victory' ? 'VICTORY!' : 'DEFEATED!'}
                        </h2>

                        <p className="font-jakarta text-xs text-zinc-300 mb-4 leading-relaxed">
                            {battleResult === 'victory'
                                ? 'You defeated the Enemy Owl! Your knowledge conquered the battle arena. +500 XP awarded!'
                                : 'The Enemy Owl overwhelmed you this time. Study your weak topics and challenge again!'}
                        </p>

                        {/* XP / Stats */}
                        <div className="bg-purple-950/50 border border-purple-400/30 rounded-2xl p-3 mb-4 space-y-1.5">
                            <div className="flex justify-between text-xs">
                                <span className="text-zinc-400">Questions Answered</span>
                                <span className="font-bold text-white">{currentIndex + 1} / {totalQuestions}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-zinc-400">Enemy HP Remaining</span>
                                <span className={`font-bold ${enemyHp <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{enemyHp} HP</span>
                            </div>
                            {battleResult === 'victory' && (
                                <div className="flex justify-between text-xs border-t border-white/10 pt-1.5">
                                    <span className="text-amber-300 font-bold">XP Earned</span>
                                    <span className="font-bold text-amber-300">+500 XP ✦</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleRetry}
                                className="w-full py-3 rounded-2xl font-cinzel text-xs font-bold tracking-wider text-[#121422] uppercase bg-gradient-to-b from-[#f7c844] via-[#f3b738] to-[#e69f1a] shadow-lg cursor-pointer active:scale-95 transition-transform"
                            >
                                {battleResult === 'victory' ? '⚔️ BATTLE AGAIN' : '↻ RETRY BATTLE'}
                            </button>
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="w-full py-2.5 rounded-xl font-cinzel text-xs font-semibold tracking-wider text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
                                >
                                    RETURN TO HUB
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
