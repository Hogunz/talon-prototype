import React, { useEffect, useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

interface SplashScreenProps {
    onComplete?: () => void;
    autoAdvance?: boolean;
}

export function SplashScreen({ onComplete, autoAdvance = true }: SplashScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    if (autoAdvance && onComplete) {
                        setTimeout(() => onComplete(), 500);
                    }
                    return 100;
                }
                // Smooth non-linear progress simulation
                const diff = Math.max(1, (100 - prev) * 0.08 + Math.random() * 3);
                return Math.min(100, prev + diff);
            });
        }, 60);

        return () => clearInterval(interval);
    }, [autoAdvance, onComplete]);

    return (
        <ClassroomBackground variant="classroom">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[640px] px-6 py-12 flex-1">
                {/* Top spacer */}
                <div className="w-full h-12" />

                {/* Central Brand & Loader */}
                <div className="w-full max-w-xs flex flex-col items-center my-auto">
                    {/* Glowing TALON Title */}
                    <div className="relative mb-8 text-center">
                        {/* Outer Glow */}
                        <h1 
                            className="font-cinzel text-5xl sm:text-6xl font-bold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)] select-none pl-2"
                        >
                            TALON
                        </h1>
                        {/* Soft underglow halo */}
                        <div className="absolute inset-0 bg-purple-500/20 blur-xl -z-10 rounded-full" />
                    </div>

                    {/* Progress Bar Container (Matches Figma Screen 1) */}
                    <div className="w-full px-2">
                        <div className="relative w-full h-3.5 bg-[#0b0f19]/80 rounded-full p-[2px] border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.8),inset_0_0_8px_rgba(0,0,0,0.9)] backdrop-blur-sm overflow-hidden">
                            {/* White/light track background */}
                            <div className="w-full h-full rounded-full bg-[#1a1f33]/90 relative overflow-hidden flex items-center">
                                
                                {/* Progress Fill */}
                                <div 
                                    className="h-full bg-gradient-to-r from-white via-amber-100 to-white rounded-full transition-all duration-100 relative flex items-center justify-end"
                                    style={{ width: `${Math.max(4, progress)}%` }}
                                >
                                    {/* Glowing Yellow Head/Dot Node at tip */}
                                    <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-200 shadow-[0_0_10px_#f59e0b,0_0_4px_#ffffff] shrink-0 translate-x-0.5 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Subtle loading status line */}
                        <div className="flex justify-between items-center text-[10px] text-purple-300/60 font-mono tracking-widest mt-2 px-1">
                            <span>INITIALIZING ACADEMY</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    </div>

                    {/* Manual skip / enter button if auto-advance is slow */}
                    {progress >= 100 && onComplete && (
                        <button
                            onClick={onComplete}
                            className="mt-6 px-6 py-2 rounded-full border border-purple-400/40 bg-purple-900/30 text-purple-200 text-xs font-semibold tracking-wider hover:bg-purple-800/50 transition-all animate-bounce"
                        >
                            TAP TO ENTER ✦
                        </button>
                    )}
                </div>

                {/* Footer (Matches Figma Screen 1) */}
                <div className="text-center pb-2">
                    <p className="text-xs sm:text-sm font-sans tracking-wide text-zinc-300">
                        Powered By{' '}
                        <span className="font-cinzel font-semibold tracking-widest text-[#a855f7] drop-shadow-[0_0_8px_rgba(168,85,247,0.85)]">
                            ARZATECHNOLOGIES
                        </span>
                    </p>
                </div>
            </div>
        </ClassroomBackground>
    );
}
