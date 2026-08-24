import React from 'react';
import { ClassroomBackground } from './ClassroomBackground';

interface WelcomeScreenProps {
    onEnterAcademy?: () => void;
    onExistingAccount?: () => void;
}

export function WelcomeScreen({ onEnterAcademy, onExistingAccount }: WelcomeScreenProps) {
    return (
        <ClassroomBackground variant="classroom">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[720px] px-5 py-6 flex-1 max-w-md mx-auto">
                {/* Top Branding Section with Curved Subtitle */}
                <div className="flex flex-col items-center w-full pt-2">
                    {/* Glowing TALON Header */}
                    <h1 
                        className="font-cinzel text-4xl sm:text-5xl font-bold tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-100 to-purple-200 drop-shadow-[0_0_20px_rgba(168,85,247,0.75)] select-none pl-2 text-center"
                    >
                        TALON
                    </h1>

                    {/* Arched "Learn . Battle . Evolve" Subtitle */}
                    <div className="relative w-72 h-10 mt-1 select-none pointer-events-none">
                        <svg viewBox="0 0 280 40" className="w-full h-full overflow-visible">
                            <defs>
                                <path id="curve-path" d="M 15,35 Q 140,5 265,35" fill="transparent" />
                            </defs>
                            <text className="font-cinzel text-[13px] font-semibold tracking-[0.22em] fill-indigo-100 drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]">
                                <textPath href="#curve-path" startOffset="50%" textAnchor="middle">
                                    Learn • Battle • Evolve
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Center Mascot: 3D Owl Character */}
                <div className="relative flex items-center justify-center my-auto py-2">
                    {/* Magic Radial Aura behind Owl */}
                    <div className="absolute w-56 h-56 bg-gradient-to-tr from-purple-600/30 via-indigo-500/25 to-cyan-400/20 rounded-full blur-2xl -z-10 animate-pulse-glow" />
                    
                    {/* Subtle magic runic ring behind owl */}
                    <div className="absolute w-64 h-64 border border-indigo-400/20 rounded-full -z-10 animate-arcane-spin pointer-events-none" />

                    {/* Owl Image with floating hover animation */}
                    <div className="relative animate-float group cursor-pointer" onClick={onEnterAcademy}>
                        <img
                            src="/assets/img/OWL.png"
                            alt="Talon Academy Owl Mascot"
                            className="w-56 sm:w-64 max-h-[300px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] filter transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Sparkle on book/smartphone */}
                        <div className="absolute top-1/2 right-4 w-2 h-2 bg-cyan-300 rounded-full blur-[1px] animate-ping pointer-events-none" />
                    </div>
                </div>

                {/* Bottom Card & Action Buttons (Matches Figma Screen 2) */}
                <div className="w-full flex flex-col gap-3.5 pb-2">
                    {/* Glassmorphic Description Card */}
                    <div className="w-full rounded-2xl border border-indigo-500/25 bg-[#090b1c]/85 backdrop-blur-md px-5 py-4 text-center shadow-[0_0_25px_rgba(0,0,0,0.7),inset_0_0_15px_rgba(99,102,241,0.1)]">
                        <h2 className="font-cinzel text-sm sm:text-base font-bold tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-purple-100 to-indigo-200 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                            PREPARE FOR THE ULTIMATE TRIAL
                        </h2>
                        <p className="font-sans text-xs sm:text-[13px] text-zinc-300/85 mt-2 leading-relaxed font-normal">
                            Join future educators on a legendary quest to conquer the board exams.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2.5 w-full">
                        {/* Enter Academy (Primary Purple Gradient) */}
                        <button
                            type="button"
                            onClick={onEnterAcademy}
                            className="w-full relative overflow-hidden rounded-2xl py-3.5 px-6 font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] text-white uppercase bg-gradient-to-r from-[#6b21a8] via-[#7e22ce] to-[#9333ea] border border-purple-300/40 shadow-[0_0_20px_rgba(147,51,234,0.45)] hover:shadow-[0_0_30px_rgba(168,85,247,0.75)] hover:scale-[1.015] active:scale-[0.985] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                        >
                            <span className="relative z-10">ENTER THE ACADEMY</span>
                            {/* Shimmer sweep effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 pointer-events-none" />
                        </button>

                        {/* I Already Have an Account (Secondary Outline) */}
                        <button
                            type="button"
                            onClick={onExistingAccount}
                            className="w-full rounded-2xl py-3.5 px-6 font-cinzel text-xs sm:text-sm font-bold tracking-[0.16em] text-zinc-200 uppercase bg-[#080a18]/70 border border-indigo-400/40 hover:bg-white/10 hover:border-purple-300/70 hover:text-white shadow-[0_0_12px_rgba(0,0,0,0.5)] active:scale-[0.985] transition-all duration-200 cursor-pointer text-center"
                        >
                            I ALREADY HAVE AN ACCOUNT
                        </button>
                    </div>
                </div>
            </div>
        </ClassroomBackground>
    );
}
