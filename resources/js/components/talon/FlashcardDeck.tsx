import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

export interface FlashcardItem {
    id: string;
    category: 'General Education' | 'Professional Education' | 'Specialization';
    triggerTerm: string;
    subtext: string;
    definition: string;
    examTrap: string;
    keyRule: string;
}

export const SAMPLE_FLASHCARDS: FlashcardItem[] = [
    {
        id: 'fc-1',
        category: 'Specialization',
        triggerTerm: 'What is a Class vs Object?',
        subtext: 'Object-Oriented Programming',
        definition: 'A CLASS is a blueprint or template that defines properties and behaviors. An OBJECT is a real instance created from that class.\n\nExample: "Car" is the class. Your specific red Honda Civic is the object.',
        examTrap: 'Don\'t say a Class "is" an object. A class CREATES objects. Think: Class = cookie cutter, Object = the actual cookie.',
        keyRule: 'new ClassName() = creating an object. You can make unlimited objects from one class.',
    },
    {
        id: 'fc-2',
        category: 'Specialization',
        triggerTerm: 'Inheritance in OOP',
        subtext: 'Object-Oriented Programming',
        definition: 'Inheritance lets a child class REUSE the properties and methods of a parent class, plus add its own unique features.\n\nExample: Animal (parent) → Dog (child). Dog automatically gets eat() and sleep() from Animal, and adds bark().',
        examTrap: 'The child class doesn\'t copy the parent — it EXTENDS it. The parent still exists independently.',
        keyRule: 'Keyword: extends (Java/JavaScript), : (C#). Child inherits everything public/protected from the parent.',
    },
    {
        id: 'fc-3',
        category: 'Professional Education',
        triggerTerm: 'PRIMARY KEY vs FOREIGN KEY',
        subtext: 'Database Management Systems (SQL)',
        definition: 'PRIMARY KEY: Uniquely identifies each row in its own table. No duplicates, no nulls.\n\nFOREIGN KEY: A column that references the Primary Key of ANOTHER table — used to link two tables together.',
        examTrap: 'A table can only have ONE Primary Key (though it can span multiple columns). A table can have MANY Foreign Keys.',
        keyRule: 'If you see "links two tables" or "references another table" → that\'s a Foreign Key.',
    },
    {
        id: 'fc-4',
        category: 'Professional Education',
        triggerTerm: 'SQL: WHERE vs HAVING',
        subtext: 'Database Management Systems (SQL)',
        definition: 'WHERE filters individual rows BEFORE any grouping happens.\n\nHAVING filters groups AFTER a GROUP BY is applied.\n\nExample: WHERE salary > 5000 (filter rows). HAVING COUNT(*) > 3 (filter groups with more than 3 members).',
        examTrap: 'You CANNOT use WHERE with aggregate functions like COUNT(), SUM(), AVG(). Use HAVING instead.',
        keyRule: 'WHERE = filter rows first. HAVING = filter groups after. HAVING always appears after GROUP BY.',
    },
    {
        id: 'fc-5',
        category: 'General Education',
        triggerTerm: 'HTML vs CSS vs JavaScript',
        subtext: 'Web Development Basics',
        definition: 'HTML = Structure (headings, paragraphs, buttons, images)\nCSS = Styling (colors, fonts, spacing, layout)\nJavaScript = Behavior (clicks, animations, fetching data)\n\nThink of a house: HTML is the walls & rooms, CSS is the paint & furniture, JS is the electricity.',
        examTrap: 'CSS cannot make things "happen" on click — that\'s JavaScript. HTML cannot control colors — that\'s CSS.',
        keyRule: 'Separation of concerns: keep structure, style, and behavior in their own files for cleaner code.',
    },
    {
        id: 'fc-6',
        category: 'Specialization',
        triggerTerm: 'TCP vs UDP',
        subtext: 'Computer Networking',
        definition: 'TCP (Transmission Control Protocol): Reliable, ensures all data arrives in order. Slower due to handshaking and error-checking.\n\nUDP (User Datagram Protocol): Fast, no guarantee of delivery or order. Used when speed matters more than accuracy.',
        examTrap: 'Video calls and online games use UDP (speed over reliability). File downloads and emails use TCP (accuracy required).',
        keyRule: 'TCP = Trustworthy but slow. UDP = Unreliable but ultra-fast.',
    },
];


interface FlashcardDeckProps {
    onBack?: () => void;
    onComplete?: () => void;
}

export function FlashcardDeck({ onBack, onComplete }: FlashcardDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [masteredIds, setMasteredIds] = useState<string[]>([]);
    const [reviewIds, setReviewIds] = useState<string[]>([]);
    const [isDeckFinished, setIsDeckFinished] = useState(false);

    const currentCard = SAMPLE_FLASHCARDS[currentIndex];
    const totalCards = SAMPLE_FLASHCARDS.length;

    const handleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const handleNext = (wasMastered: boolean) => {
        setIsFlipped(false);
        if (wasMastered) {
            setMasteredIds((prev) => Array.from(new Set([...prev, currentCard.id])));
        } else {
            setReviewIds((prev) => Array.from(new Set([...prev, currentCard.id])));
        }

        if (currentIndex < totalCards - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setIsDeckFinished(true);
        }
    };

    const handleResetDeck = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setMasteredIds([]);
        setReviewIds([]);
        setIsDeckFinished(false);
    };

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[760px] px-4 py-5 flex-1 max-w-md mx-auto select-none relative">
                
                {/* 1. Top Header */}
                <div className="w-full flex items-center justify-between border-b border-indigo-500/20 pb-3">
                    <div className="flex items-center gap-2">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-all text-sm cursor-pointer"
                                title="Back to Codex"
                            >
                                ‹
                            </button>
                        )}
                        <div>
                            <h1 className="font-cinzel text-base sm:text-lg font-bold text-amber-400 tracking-wider leading-tight">
                                HIGH-YIELD FLASHCARDS
                            </h1>
                            <p className="text-[10px] text-purple-300/80 font-mono">
                                BOARD EXAM TRIGGER RECALL
                            </p>
                        </div>
                    </div>

                    {!isDeckFinished && (
                        <span className="text-xs font-mono font-bold text-zinc-300 bg-purple-950/60 border border-purple-400/40 px-2.5 py-1 rounded-full">
                            {currentIndex + 1} / {totalCards}
                        </span>
                    )}
                </div>

                {/* 2. Main Flashcard Canvas */}
                {!isDeckFinished ? (
                    <div className="w-full flex-1 flex flex-col items-center justify-center py-4 my-auto">
                        
                        {/* Daily Drill Goal Progress */}
                        <div className="w-full mb-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
                            <span>DAILY DRILL: {masteredIds.length} Mastered</span>
                            <span className="text-amber-400 font-bold">🎯 Goal: 10 / day</span>
                        </div>

                        {/* 3D Flashcard Container with Flip Animation */}
                        <div
                            onClick={handleFlip}
                            className="w-full h-80 sm:h-96 relative cursor-pointer group"
                            style={{ perspective: '1000px' }}
                        >
                            <div
                                className={`w-full h-full relative rounded-3xl transition-transform duration-500 transform-gpu preserve-3d shadow-[0_0_30px_rgba(124,58,237,0.3)] ${
                                    isFlipped ? 'rotate-y-180' : ''
                                }`}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                }}
                            >
                                {/* FRONT OF FLASHCARD */}
                                <div
                                    className="absolute inset-0 w-full h-full rounded-3xl border-2 border-purple-500/50 bg-gradient-to-b from-[#11142e] via-[#0d0f26] to-[#080918] p-6 flex flex-col justify-between items-center text-center backface-hidden"
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    {/* Category Tag */}
                                    <div className="w-full flex items-center justify-between">
                                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-purple-900/60 text-purple-200 border border-purple-400/30">
                                            {currentCard.category}
                                        </span>
                                        <span className="text-[10px] font-mono text-amber-300">
                                            ★ Key Concept
                                        </span>
                                    </div>

                                    {/* Central Trigger Term */}
                                    <div className="my-auto">
                                        <div className="text-3xl mb-2">⚡</div>
                                        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide leading-snug drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                                            {currentCard.triggerTerm}
                                        </h2>
                                        <p className="font-mono text-xs text-purple-300/80 mt-2">
                                            {currentCard.subtext}
                                        </p>
                                    </div>

                                    {/* Tap to Flip Prompt */}
                                    <div className="text-[11px] font-mono text-zinc-400 group-hover:text-purple-300 transition-colors flex items-center gap-1.5 animate-pulse">
                                        <span>↻</span>
                                        <span>TAP CARD TO REVEAL RATIONALE</span>
                                    </div>
                                </div>

                                {/* BACK OF FLASHCARD */}
                                <div
                                    className="absolute inset-0 w-full h-full rounded-3xl border-2 border-amber-500/50 bg-gradient-to-b from-[#16122c] via-[#0f0e22] to-[#090818] p-5 flex flex-col justify-between text-left backface-hidden"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)',
                                    }}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <span className="font-cinzel text-xs font-bold text-amber-300">
                                            RATIONALE & TRIGGER RULE
                                        </span>
                                        <span className="text-[10px] font-mono text-zinc-400">
                                            ↺ Tap to flip back
                                        </span>
                                    </div>

                                    {/* Definition Body */}
                                    <div className="space-y-2.5 my-auto overflow-y-auto py-1">
                                        <div className="text-xs text-zinc-100 font-jakarta leading-relaxed">
                                            {currentCard.definition}
                                        </div>

                                        {/* Key Rule */}
                                        <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-400/30 text-[11px] text-purple-200">
                                            <span className="font-bold text-amber-300">Rule: </span>
                                            {currentCard.keyRule}
                                        </div>

                                        {/* Exam Trap */}
                                        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-[11px] text-rose-200">
                                            <span className="font-bold text-rose-300">⚠️ Board Exam Trap: </span>
                                            {currentCard.examTrap}
                                        </div>
                                    </div>

                                    <div className="text-[10px] font-mono text-center text-zinc-500">
                                        Self-Assessment: Did you know this?
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Action Buttons: Need Review vs Mastered */}
                        <div className="w-full grid grid-cols-2 gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => handleNext(false)}
                                className="py-3 px-4 rounded-2xl border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 text-rose-200 font-jakarta text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                            >
                                <span>✕</span>
                                <span>NEED REVIEW</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleNext(true)}
                                className="py-3 px-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 font-jakarta text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95"
                            >
                                <span>✓</span>
                                <span>MASTERED (+10 XP)</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* 4. Deck Completed Summary */
                    <div className="w-full flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
                        <div className="text-4xl mb-2 animate-bounce">
                            🏆
                        </div>

                        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-400 tracking-wider">
                            FLASHCARD DECK COMPLETE!
                        </h2>

                        <p className="font-jakarta text-xs text-zinc-300 mt-1 max-w-xs">
                            You reviewed all {totalCards} flashcards for this session. Spaced repetition strengthens board exam recall!
                        </p>

                        {/* Results Summary Box */}
                        <div className="w-full max-w-xs rounded-2xl border border-purple-500/40 bg-[#0c0e24]/90 p-4 my-4 shadow-lg space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <span>✓</span> Mastered:
                                </span>
                                <span className="font-mono font-bold text-white">
                                    {masteredIds.length} / {totalCards}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-rose-400 font-bold flex items-center gap-1">
                                    <span>✕</span> Needs Review:
                                </span>
                                <span className="font-mono font-bold text-white">
                                    {reviewIds.length} / {totalCards}
                                </span>
                            </div>

                            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-xs text-purple-300">
                                <span>Total XP Earned:</span>
                                <span className="font-mono font-bold text-amber-300">
                                    +{masteredIds.length * 10} XP
                                </span>
                            </div>
                        </div>

                        {/* Next Actions */}
                        <div className="w-full max-w-xs flex flex-col gap-2">
                            <button
                                onClick={handleResetDeck}
                                className="w-full py-3 px-4 rounded-xl font-cinzel text-xs font-bold tracking-wider text-white bg-gradient-to-r from-purple-700 to-indigo-600 border border-purple-300/40 shadow-md cursor-pointer"
                            >
                                ↻ RESTART FLASHCARD DECK
                            </button>

                            {onComplete && (
                                <button
                                    onClick={onComplete}
                                    className="w-full py-2.5 px-4 rounded-xl font-cinzel text-xs font-semibold tracking-wider text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
                                >
                                    RETURN TO ACADEMY HUB
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </ClassroomBackground>
    );
}
