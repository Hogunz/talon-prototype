import React from 'react';

interface ClassroomBackgroundProps {
    variant?: 'classroom' | 'dark-mystic' | 'quiz';
    children?: React.ReactNode;
}

export function ClassroomBackground({ variant = 'classroom', children }: ClassroomBackgroundProps) {
    return (
        <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#070814] text-white select-none flex flex-col items-center justify-between">
            {/* Ambient Background Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c20] via-[#090b1c] to-[#04050d] pointer-events-none" />

            {variant === 'classroom' && (
                <>
                    {/* Atmospheric Lighting Cones / Radial Glows */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
                    <div className="absolute bottom-10 left-6 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-20 right-6 w-56 h-56 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Classroom Blackboard & Arcane Graphics */}
                    <div className="absolute top-8 inset-x-4 max-w-lg mx-auto opacity-70 pointer-events-none transition-all duration-700">
                        {/* Chalkboard Frame */}
                        <div className="relative border-4 border-[#32231b] rounded-lg bg-[#0e1726]/80 p-4 shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-[2px]">
                            {/* Chalkboard Inner Trim */}
                            <div className="relative border border-[#23354a]/60 rounded p-4 min-h-[220px] flex flex-col items-center justify-between overflow-hidden">
                                
                                {/* Magic Circle Left Top */}
                                <div className="absolute -top-6 -left-6 w-32 h-32 opacity-30 animate-arcane-spin">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                                        <polygon points="50,10 85,75 15,75" fill="none" stroke="currentColor" strokeWidth="1" />
                                        <polygon points="50,90 85,25 15,25" fill="none" stroke="currentColor" strokeWidth="1" />
                                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" />
                                    </svg>
                                </div>

                                {/* Chalkboard Arcane Theory Title */}
                                <div className="z-10 text-center my-auto flex flex-col items-center">
                                    <div className="text-[10px] tracking-[0.25em] text-cyan-300/60 uppercase font-sans mb-1">
                                        Advanced Curriculum
                                    </div>
                                    <div className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-cyan-200/90 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] flex items-center gap-2">
                                        <span className="text-sm opacity-60">✦</span>
                                        ARCANE THEORY
                                        <span className="text-sm opacity-60">✦</span>
                                    </div>
                                    <div className="text-[9px] font-mono tracking-widest text-indigo-300/50 mt-1">
                                        FORMULAS • TRANSMUTATION • PEDAGOGY
                                    </div>
                                </div>

                                {/* Magic Circle Right */}
                                <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-25 animate-arcane-spin-reverse">
                                    <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-400">
                                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
                                        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                                        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 50 50)" />
                                        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.8" />
                                    </svg>
                                </div>

                                {/* Chalk Runes & Diagrams on board */}
                                <div className="absolute left-3 top-3 text-[8px] font-mono text-cyan-300/40 leading-tight">
                                    ∮ Ψ(x) dx = 1<br />
                                    ∇ × E = -∂B/∂t
                                </div>
                                <div className="absolute right-3 bottom-3 text-[8px] font-mono text-cyan-300/40 text-right leading-tight">
                                    Bloom's Taxonomy α<br />
                                    Piaget Stage IV ⟶
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Window light beam overlay from top left */}
                    <div 
                        className="absolute -top-10 -left-10 w-80 h-96 opacity-15 pointer-events-none"
                        style={{
                            background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.4) 0%, rgba(99, 102, 241, 0.1) 45%, transparent 75%)',
                            clipPath: 'polygon(0 0, 100% 0, 40% 100%, 0% 80%)'
                        }}
                    />

                    {/* Cute glowing classroom shadow creature in the corner */}
                    <div className="absolute top-[32%] left-[10%] opacity-40 pointer-events-none scale-75 animate-bounce" style={{ animationDuration: '4s' }}>
                        <div className="w-10 h-8 bg-black/60 rounded-full relative flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]">
                            <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full mx-1 shadow-[0_0_4px_#34d399]" />
                            <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full mx-1 shadow-[0_0_4px_#34d399]" />
                        </div>
                    </div>
                </>
            )}

            {variant === 'dark-mystic' && (
                <>
                    {/* Deep mystical night glow centered behind the mascot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-purple-500/15 rounded-full blur-[60px] pointer-events-none" />

                    {/* Subtle Arcane Circle Geometry in the background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] opacity-15 pointer-events-none animate-arcane-spin">
                        <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-300">
                            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" />
                            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <polygon points="100,15 174,142 26,142" fill="none" stroke="currentColor" strokeWidth="0.75" />
                            <polygon points="100,185 174,58 26,58" fill="none" stroke="currentColor" strokeWidth="0.75" />
                            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>
                </>
            )}

            {/* Ambient Floating Dust / Sparkles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <span className="absolute top-1/4 left-[20%] w-1 h-1 bg-cyan-300/80 rounded-full shadow-[0_0_6px_#67e8f9] animate-ping" style={{ animationDuration: '3s' }} />
                <span className="absolute top-1/3 right-[18%] w-1 h-1 bg-purple-300/80 rounded-full shadow-[0_0_6px_#d8b4fe] animate-pulse" style={{ animationDuration: '4s' }} />
                <span className="absolute bottom-1/3 left-[28%] w-1.5 h-1.5 bg-amber-300/70 rounded-full shadow-[0_0_8px_#fde047] animate-pulse" style={{ animationDuration: '2.5s' }} />
                <span className="absolute bottom-1/4 right-[25%] w-1 h-1 bg-indigo-300/60 rounded-full shadow-[0_0_6px_#a5b4fc] animate-ping" style={{ animationDuration: '5s' }} />
            </div>

            {/* Vignette Overlay for cinematic mobile focus */}
            <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(3,4,9,0.95)] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col flex-1">
                {children}
            </div>
        </div>
    );
}
