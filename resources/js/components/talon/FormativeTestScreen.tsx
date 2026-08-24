import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

interface FormativeTestScreenProps {
    initialStep?: number;
    onStartTest?: () => void;
    onBack?: () => void;
}

export function FormativeTestScreen({ initialStep = 1, onStartTest, onBack }: FormativeTestScreenProps) {
    const [step, setStep] = useState<number>(initialStep);
    const [isBouncing, setIsBouncing] = useState(false);

    const handleNext = () => {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 400);
        if (step < 3) {
            setStep((prev) => prev + 1);
        } else {
            // If on step 3 and tapped, trigger test or cycle
            if (onStartTest) {
                onStartTest();
            } else {
                setStep(1);
            }
        }
    };

    const handleStepSelect = (targetStep: number) => {
        setStep(targetStep);
    };

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[720px] px-5 py-6 flex-1 max-w-md mx-auto relative">
                
                {/* Top Header: FORMATIVE TEST (Matches Figma Screen 3, 4, 5) */}
                <div className="w-full flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/15 transition-all text-xs"
                                title="Back to welcome"
                            >
                                ‹
                            </button>
                        )}
                        <h1 className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#eab308] drop-shadow-[0_0_12px_rgba(234,179,8,0.7)] uppercase select-none">
                            FORMATIVE TEST
                        </h1>
                    </div>

                    {/* Step indicator pills */}
                    <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((s) => (
                            <button
                                key={s}
                                onClick={() => handleStepSelect(s)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    step === s
                                        ? 'w-6 bg-purple-400 shadow-[0_0_8px_#c084fc]'
                                        : 'bg-indigo-950 border border-purple-900/60 hover:bg-purple-900'
                                }`}
                                aria-label={`Go to dialogue step ${s}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Main Interactive Stage */}
                <div className="w-full flex flex-col items-center justify-center my-auto relative">
                    
                    {/* Speech Bubble Container with Diamond Pointer (Matches Figma Screens) */}
                    <div 
                        onClick={handleNext}
                        className={`w-full relative rounded-2xl border-2 border-[#7c3aed] bg-[#0c0e24]/95 backdrop-blur-md p-5 shadow-[0_0_25px_rgba(124,58,237,0.4),inset_0_0_20px_rgba(124,58,237,0.15)] cursor-pointer select-none transition-all duration-300 hover:scale-[1.015] hover:border-purple-400 ${
                            isBouncing ? 'scale-95' : 'scale-100'
                        }`}
                    >
                        {/* Step 1: "Tap Me!" (Figma Image 3) */}
                        {step === 1 && (
                            <div className="text-center py-2 animate-in fade-in zoom-in-95 duration-200">
                                <p className="font-jakarta text-xl sm:text-2xl font-extrabold tracking-wide text-purple-300 drop-shadow-[0_0_10px_rgba(216,180,254,0.75)] animate-pulse">
                                    Tap Me!
                                </p>
                                <p className="text-[10px] text-purple-400/60 font-mono tracking-widest mt-1">
                                    [ TAP BUBBLE OR OWL TO CONTINUE ]
                                </p>
                            </div>
                        )}

                        {/* Step 2: Welcome Speech */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <p className="font-jakarta text-sm sm:text-[15px] font-semibold text-purple-100 leading-relaxed drop-shadow-[0_0_6px_rgba(216,180,254,0.3)]">
                                    Welcome, Future Software Engineer! Before enrolling into technical review, let's gauge your baseline with this quick IT diagnostic test.
                                </p>
                            </div>
                        )}

                        {/* Step 3: Focus Areas */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col gap-2">
                                <p className="font-jakarta text-sm sm:text-[15px] font-bold text-purple-100 tracking-wide">
                                    Core IT Focus Areas:
                                </p>
                                <div className="space-y-1.5 pl-1">
                                    <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-purple-200/90 leading-snug">
                                        <span className="text-amber-400 text-xs">◆</span>
                                        <span>Web Technologies (HTML, CSS, JS)</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-purple-200/90 leading-snug">
                                        <span className="text-amber-400 text-xs">◆</span>
                                        <span>Database Management & SQL Queries</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-purple-200/90 leading-snug">
                                        <span className="text-amber-400 text-xs">◆</span>
                                        <span>Object-Oriented Programming (OOP)</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Distinctive Diamond Pointer Tail pointing down toward Owl's Cap */}
                        <div 
                            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0c0e24] border-r-2 border-b-2 border-[#7c3aed] rotate-45 shadow-[3px_3px_8px_rgba(0,0,0,0.6)]"
                        />
                    </div>

                    {/* Center Owl Mascot (Interactive Tap Target) */}
                    <div 
                        onClick={handleNext}
                        className={`relative mt-8 cursor-pointer transition-transform duration-200 select-none group ${
                            isBouncing ? 'scale-105' : 'hover:scale-[1.02]'
                        }`}
                    >
                        {/* Soft ambient aura */}
                        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl -z-10 group-hover:bg-purple-500/35 transition-colors" />
                        
                        {/* 3D Owl mascot image */}
                        <img
                            src="/assets/img/OWL.png"
                            alt="Talon Owl Professor"
                            className="w-64 sm:w-72 max-h-[340px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] animate-float"
                        />

                        {/* Interactive hint on hover */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-950/90 border border-purple-500/50 rounded-full px-3 py-0.5 text-[10px] text-purple-200 font-mono tracking-wider shadow-lg pointer-events-none whitespace-nowrap">
                            ✦ TAP TO ADVANCE
                        </div>
                    </div>
                </div>

                {/* Bottom Action Section */}
                <div className="w-full pt-4 pb-2 flex flex-col gap-2.5">
                    {step === 3 ? (
                        <button
                            type="button"
                            onClick={onStartTest}
                            className="w-full relative overflow-hidden rounded-2xl py-3.5 px-6 font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase bg-gradient-to-r from-[#6b21a8] via-[#7e22ce] to-[#9333ea] border border-purple-300/40 shadow-[0_0_25px_rgba(147,51,234,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                        >
                            <span>START DIAGNOSTIC TEST</span>
                            <span className="text-amber-300">✦</span>
                        </button>
                    ) : (
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                                disabled={step === 1}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 text-zinc-300 font-cinzel text-xs font-semibold tracking-wider hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
                            >
                                PREVIOUS
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep((prev) => Math.min(3, prev + 1))}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-purple-400/40 bg-purple-900/40 text-purple-100 font-cinzel text-xs font-bold tracking-wider hover:bg-purple-800/60 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
                            >
                                NEXT ({step}/3)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </ClassroomBackground>
    );
}
