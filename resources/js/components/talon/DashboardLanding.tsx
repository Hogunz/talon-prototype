import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

interface DashboardLandingProps {
    onOpenBattle?: () => void;
    onResumeReview?: () => void;
    onOpenLibrary?: () => void;
}

const MOTIVATIONAL_QUOTES = [
    "“Monthly Certificate unlocks after completing 10 drills. Keep it up!”",
    "“The mind is not a vessel to be filled, but a fire to be kindled!”",
    "“Your Programming 01 mastery is rising. Next milestone at 80%!”",
    "“Take a short 5-minute break to recharge your focus energy.”",
];

export function DashboardLanding({ onOpenBattle, onResumeReview, onOpenLibrary }: DashboardLandingProps) {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<'rewards' | 'cards' | 'battle' | 'leaderboard' | 'profile'>('battle');
    const [isMascotBouncing, setIsMascotBouncing] = useState(false);

    const handleCycleQuote = () => {
        setIsMascotBouncing(true);
        setTimeout(() => setIsMascotBouncing(false), 300);
        setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    };

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[780px] px-4 pt-3 pb-2 flex-1 max-w-md mx-auto select-none relative">
                
                {/* 1. TOP CARD: Player Rank & XP Banner (Exact Figma Match) */}
                <div className="w-full rounded-2xl border-2 border-purple-500/50 bg-[#0c0e24]/90 backdrop-blur-md p-3.5 shadow-[0_0_20px_rgba(124,58,237,0.25)] flex items-center gap-3.5">
                    {/* Owl Avatar / Level Crest */}
                    <div className="flex flex-col items-center shrink-0">
                        <div className="w-11 h-11 rounded-full border border-purple-400/40 bg-purple-950/40 flex items-center justify-center p-1.5 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                            <svg viewBox="0 0 40 40" className="w-full h-full text-zinc-100 fill-none stroke-current" strokeWidth="2">
                                <circle cx="20" cy="20" r="17" strokeWidth="1.5" />
                                <circle cx="15" cy="18" r="4" fill="currentColor" />
                                <circle cx="25" cy="18" r="4" fill="currentColor" />
                                <polygon points="20,22 17,27 23,27" fill="currentColor" stroke="none" />
                                <path d="M10,12 Q20,16 30,12" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <span className="text-[9px] font-sans font-bold text-zinc-300 tracking-wider uppercase mt-0.5">
                            Level 10
                        </span>
                    </div>

                    {/* Rank Name & XP Progress Bar */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="font-sans font-bold text-purple-300 tracking-wide">
                                RANK: Owlsheeshable
                            </span>
                            <span className="font-sans font-semibold text-zinc-200">
                                2400/3000 XP
                            </span>
                        </div>

                        {/* XP Progress Bar with Golden Fill */}
                        <div className="w-full h-2.5 rounded-full bg-[#161a36] border border-white/15 p-[1px] overflow-hidden shadow-inner">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_8px_#f59e0b] transition-all duration-500"
                                style={{ width: '80%' }}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. SPEECH BUBBLE & 3D MASCOT SECTION */}
                <div className="w-full flex flex-col items-center my-auto py-1 relative">
                    
                    {/* Motivational Speech Bubble */}
                    <div 
                        onClick={handleCycleQuote}
                        className="w-full max-w-[340px] relative rounded-2xl border-2 border-purple-500/70 bg-[#0a0c20]/95 backdrop-blur-md px-4 py-2.5 shadow-[0_0_20px_rgba(124,58,237,0.35)] cursor-pointer hover:border-purple-400 transition-all text-center group"
                    >
                        <p className="font-jakarta text-[11px] sm:text-xs font-medium text-zinc-100 leading-snug">
                            {MOTIVATIONAL_QUOTES[quoteIndex]}
                        </p>

                        {/* Diamond Pointer pointing to Owl's cap */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0a0c20] border-r-2 border-b-2 border-purple-500/70 rotate-45" />
                    </div>

                    {/* 3D Owl Mascot */}
                    <div 
                        onClick={handleCycleQuote}
                        className={`relative mt-3 cursor-pointer transition-transform duration-200 ${
                            isMascotBouncing ? 'scale-105' : 'hover:scale-[1.02]'
                        }`}
                    >
                        {/* Soft underglow aura */}
                        <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-2xl -z-10 animate-pulse-glow" />
                        
                        <img
                            src="/assets/img/OWL.png"
                            alt="Owl Mascot Professor"
                            className="w-48 sm:w-56 max-h-[260px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] animate-float"
                        />
                    </div>
                </div>

                {/* 3. MIDDLE ANALYTICS ROW: Consistency, Well-being, Weather (Exact Figma Match) */}
                <div className="w-full grid grid-cols-12 gap-2.5 my-1">
                    
                    {/* Consistency Card (5 cols) */}
                    <div className="col-span-5 rounded-2xl border-2 border-purple-500/40 bg-[#0c0e24]/90 p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold text-purple-200">
                            <span className="text-xs">⏱</span>
                            <span>Consistency</span>
                        </div>

                        <div className="my-1 flex items-baseline gap-1">
                            <span className="font-jakarta text-2xl font-bold text-white tracking-tight">
                                8.3
                            </span>
                            <span className="text-[10px] font-medium text-zinc-400">
                                hrs/wk
                            </span>
                        </div>

                        {/* Consistency mini progress bar */}
                        <div className="w-full h-1.5 rounded-full bg-[#181b36] overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-300 rounded-full" style={{ width: '70%' }} />
                        </div>
                    </div>

                    {/* Well-being Card (4 cols) */}
                    <div className="col-span-4 rounded-2xl border-2 border-purple-500/40 bg-[#0c0e24]/90 p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-1 text-[11px] font-sans font-semibold text-purple-200">
                            <span className="text-xs">💡</span>
                            <span>Well-being</span>
                        </div>

                        <div className="my-1">
                            <span className="font-jakarta text-2xl font-bold text-white tracking-tight">
                                72%
                            </span>
                        </div>

                        {/* Well-being mini progress bar (golden) */}
                        <div className="w-full h-1.5 rounded-full bg-[#181b36] overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_6px_#f59e0b] rounded-full" style={{ width: '72%' }} />
                        </div>
                    </div>

                    {/* Weather Card (3 cols) */}
                    <div className="col-span-3 rounded-2xl border-2 border-purple-500/40 bg-[#0c0e24]/90 p-2 flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        {/* Cloud with Rain Icon */}
                        <div className="w-6 h-6 text-zinc-200 mb-0.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                                <path d="M8 19v2" />
                                <path d="M12 17v4" />
                                <path d="M16 19v2" />
                            </svg>
                        </div>

                        <span className="font-jakarta text-sm font-bold text-white leading-tight">
                            24°<span className="text-[10px]">c</span>
                        </span>
                        <span className="text-[8px] font-medium text-zinc-400 tracking-tight leading-none mt-0.5">
                            Heavy Rains
                        </span>
                    </div>
                </div>

                {/* 4. CRITICAL WEAKNESS ACTION CARD (Exact Figma Match) */}
                <div className="w-full rounded-2xl border-2 border-purple-500/50 bg-[#141230]/90 backdrop-blur-md p-3.5 my-1.5 shadow-[0_0_20px_rgba(124,58,237,0.25)] flex flex-col gap-2">
                    <span className="text-[11px] font-sans font-semibold text-purple-300">
                        Critical Weakness
                    </span>

                    <h3 className="font-jakarta text-lg font-bold text-white tracking-wide -mt-1">
                        Programming 01
                    </h3>

                    {/* Golden Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#1e1c42] overflow-hidden">
                        <div 
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_8px_#f59e0b]"
                            style={{ width: '62%' }}
                        />
                    </div>

                    {/* Resume Review Button */}
                    <button
                        type="button"
                        onClick={onResumeReview}
                        className="w-full mt-1 py-2.5 px-4 rounded-xl border border-purple-400/50 bg-purple-900/30 hover:bg-purple-800/50 text-white font-jakarta text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    >
                        <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] text-white">
                            ▶
                        </span>
                        <span>Resume Review</span>
                    </button>
                </div>

                {/* 5. BOTTOM NAVIGATION DOCK (Exact Figma Match) */}
                <div className="w-full relative mt-3 pt-2">
                    {/* Bottom Nav Bar Background */}
                    <div className="w-full rounded-2xl border-2 border-purple-500/40 bg-[#161234]/95 backdrop-blur-md px-3 py-2 flex items-center justify-between shadow-[0_0_25px_rgba(0,0,0,0.8)]">
                        
                        {/* Tab 1: Rewards / Ribbon */}
                        <button
                            onClick={() => setActiveTab('rewards')}
                            className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                                activeTab === 'rewards' ? 'text-amber-300 scale-110 drop-shadow-[0_0_8px_#f59e0b]' : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                            title="Rewards & Achievements"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                <circle cx="12" cy="8" r="6" />
                                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                            </svg>
                        </button>

                        {/* Tab 2: Deck / Flashcards / Library */}
                        <button
                            onClick={() => {
                                setActiveTab('cards');
                                if (onOpenLibrary) onOpenLibrary();
                            }}
                            className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                                activeTab === 'cards' ? 'text-purple-300 scale-110 drop-shadow-[0_0_8px_#c084fc]' : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                            title="STE Topic Library & Flashcards"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                <rect width="14" height="18" x="5" y="3" rx="2" />
                                <path d="M3 7v12a2 2 0 0 0 2 2h12" />
                            </svg>
                        </button>

                        {/* Spacer for center elevated action button */}
                        <div className="w-14" />

                        {/* Tab 4: Podium / Leaderboard */}
                        <button
                            onClick={() => setActiveTab('leaderboard')}
                            className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                                activeTab === 'leaderboard' ? 'text-amber-300 scale-110 drop-shadow-[0_0_8px_#f59e0b]' : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                            title="Leaderboard Rankings"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                <path d="M6 9H2v12h4V9z" />
                                <path d="M14 4h-4v17h4V4z" />
                                <path d="M22 13h-4v8h4v-8z" />
                            </svg>
                        </button>

                        {/* Tab 5: Profile */}
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                                activeTab === 'profile' ? 'text-purple-300 scale-110 drop-shadow-[0_0_8px_#c084fc]' : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                            title="Scholar Profile"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>
                    </div>

                    {/* Elevated Center Hero Battle Crest */}
                    <button
                        type="button"
                        onClick={onOpenBattle}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-b from-[#3b0764] via-[#2e1065] to-[#1e1b4b] border-2 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.7)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group"
                        title="Enter Battle Arena"
                    >
                        {/* Crossed Swords with Owl Crest */}
                        <div className="relative w-8 h-8 flex items-center justify-center text-white">
                            {/* Sword 1 */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full absolute inset-0 rotate-45 opacity-75">
                                <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
                                <path d="m13 19 6-6" />
                            </svg>
                            {/* Sword 2 */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full absolute inset-0 -rotate-45 opacity-75">
                                <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
                                <path d="m13 19 6-6" />
                            </svg>
                            {/* Mini Owl Icon in Center */}
                            <div className="z-10 w-4 h-4 rounded-full bg-purple-900 border border-purple-300 flex items-center justify-center text-[8px] font-bold">
                                🦉
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </ClassroomBackground>
    );
}
