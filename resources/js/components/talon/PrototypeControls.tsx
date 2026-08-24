import React from 'react';

export type ScreenId = 'splash' | 'welcome' | 'formative-1' | 'formative-2' | 'formative-3' | 'quiz' | 'landing' | 'library' | 'flashcards' | 'battle' | 'portal' | 'drill';

interface PrototypeControlsProps {
    currentScreen: ScreenId;
    onSelectScreen: (screen: ScreenId) => void;
    isMobileFrame: boolean;
    onToggleMobileFrame: () => void;
    soundEnabled: boolean;
    onToggleSound: () => void;
}

export function PrototypeControls({
    currentScreen,
    onSelectScreen,
    isMobileFrame,
    onToggleMobileFrame,
    soundEnabled,
    onToggleSound,
}: PrototypeControlsProps) {
    const screens: { id: ScreenId; label: string; figmaIndex: string }[] = [
        { id: 'splash', label: 'Splash Screen', figmaIndex: 'Screen 1' },
        { id: 'welcome', label: 'Academy Entrance', figmaIndex: 'Screen 2' },
        { id: 'formative-1', label: 'Tap Me!', figmaIndex: 'Screen 3' },
        { id: 'formative-2', label: 'Welcome Speech', figmaIndex: 'Screen 4' },
        { id: 'formative-3', label: 'Focus Areas', figmaIndex: 'Screen 5' },
        { id: 'quiz', label: 'Formative Test Questions', figmaIndex: 'Screen 6' },
        { id: 'landing', label: 'Main Landing Hub', figmaIndex: 'Screen 7' },
        { id: 'library', label: 'STE Topic Library', figmaIndex: 'Step 1' },
        { id: 'flashcards', label: 'Flashcard Deck', figmaIndex: 'Step 2' },
        { id: 'battle', label: 'Battle Mode ⚔️', figmaIndex: 'Step 3' },
        { id: 'portal', label: 'Teacher / Dean Portal', figmaIndex: 'Step 4' },
    ];

    return (
        <aside 
            aria-label="Figma Prototype Navigation and Controls"
            className="w-full bg-[#050711]/95 border-b border-indigo-500/20 backdrop-blur-xl px-4 py-3 sticky top-0 z-50 shadow-2xl flex flex-wrap items-center justify-between gap-3 select-none"
        >
            {/* Left: Brand Badge & Screen Selection */}
            <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1 sm:pb-0">
                <div className="flex items-center gap-2 pr-2 border-r border-white/10 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span className="font-cinzel text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-amber-300">
                        TALON FIGMA PROTOTYPE
                    </span>
                </div>

                {/* Screen Tabs */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {screens.map((item) => {
                        const isActive = currentScreen === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelectScreen(item.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                                    isActive
                                        ? 'bg-purple-600/40 border border-purple-400/80 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                                        : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/10'
                                }`}
                            >
                                <span className="text-[10px] font-mono text-purple-300/80 uppercase">
                                    {item.figmaIndex}
                                </span>
                                <span className="font-sans font-semibold">
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Right: Device Mockup & Audio Toggles */}
            <div className="flex items-center gap-2 ml-auto shrink-0">
                {/* Sound Toggle */}
                <button
                    onClick={onToggleSound}
                    className={`p-1.5 px-2.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
                        soundEnabled
                            ? 'border-purple-400/60 bg-purple-900/40 text-purple-200'
                            : 'border-white/10 bg-white/5 text-zinc-500 hover:text-zinc-300'
                    }`}
                    title="Toggle sound effects"
                >
                    <span>{soundEnabled ? '🔊' : '🔇'}</span>
                    <span className="hidden md:inline text-[11px]">SFX {soundEnabled ? 'ON' : 'OFF'}</span>
                </button>

                {/* Mobile Mockup Toggle */}
                <button
                    onClick={onToggleMobileFrame}
                    className={`p-1.5 px-2.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
                        isMobileFrame
                            ? 'border-amber-400/60 bg-amber-950/40 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                            : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                    title="Toggle mobile device frame"
                >
                    <span>{isMobileFrame ? '📱' : '💻'}</span>
                    <span className="hidden sm:inline text-[11px] font-sans font-semibold">
                        {isMobileFrame ? 'Mobile Frame' : 'Fullscreen View'}
                    </span>
                </button>
            </div>
        </aside>
    );
}
