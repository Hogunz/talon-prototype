import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

interface DashboardLandingProps {
    onOpenBattle?: () => void;
    onResumeReview?: () => void;
    onOpenLibrary?: () => void;
    onOpenFlashcards?: () => void;
    onOpenPortal?: () => void;
}

interface DrillQuestion {
    id: number;
    stem: string;
    choices: { key: string; text: string }[];
    correct: string;
    rationale: string;
}

interface SubjectDrillConfig {
    name: string;
    shortLabel: string;
    weight: string;
    boardWeight: number; // decimal weight for predicted rating calc
    baseCorrect: number;
    baseTotal: number;
    peerPercentile: number;
    status: 'passing' | 'at-risk' | 'top';
    weakSubtopic: string;
    accentColor: string;
    barColor: string;
    questions: DrillQuestion[];
}

const SUBJECT_DRILLS: Record<string, SubjectDrillConfig> = {
    web: {
        name: 'Web Technologies',
        shortLabel: 'Web Dev',
        weight: '20% Board Exam Weight',
        boardWeight: 0.20,
        baseCorrect: 42,
        baseTotal: 50,
        peerPercentile: 82,
        status: 'passing',
        weakSubtopic: 'DOM Event Propagation (Bubbling/Capturing)',
        accentColor: 'border-indigo-500/40',
        barColor: 'from-emerald-400 to-green-300',
        questions: [
            {
                id: 1,
                stem: 'Which CSS property makes a flex container wrap its children onto multiple rows?',
                choices: [
                    { key: 'A', text: 'flex-direction: wrap' },
                    { key: 'B', text: 'flex-wrap: wrap' },
                    { key: 'C', text: 'align-items: wrap' },
                    { key: 'D', text: 'overflow: flex-wrap' },
                ],
                correct: 'B',
                rationale: '✓ flex-wrap: wrap allows flex items to flow onto the next line. flex-direction controls the axis, not wrapping.',
            },
            {
                id: 2,
                stem: 'In JavaScript, what does event.stopPropagation() do?',
                choices: [
                    { key: 'A', text: 'Prevents the default browser action (e.g., form submit)' },
                    { key: 'B', text: 'Stops the event from bubbling up to parent elements' },
                    { key: 'C', text: 'Removes all event listeners from the element' },
                    { key: 'D', text: 'Delays the event by 500ms' },
                ],
                correct: 'B',
                rationale: '✓ stopPropagation() stops bubbling. To block default actions (like link navigation), use preventDefault() instead.',
            },
            {
                id: 3,
                stem: 'What is the correct HTTP method for updating an existing resource in a REST API?',
                choices: [
                    { key: 'A', text: 'GET' },
                    { key: 'B', text: 'POST' },
                    { key: 'C', text: 'PUT / PATCH' },
                    { key: 'D', text: 'DELETE' },
                ],
                correct: 'C',
                rationale: '✓ PUT replaces the whole resource; PATCH partially updates it. GET retrieves, POST creates, DELETE removes.',
            },
        ],
    },
    sql: {
        name: 'Database Management & SQL',
        shortLabel: 'SQL/DBMS',
        weight: '40% Board Exam Weight (High-Impact)',
        boardWeight: 0.40,
        baseCorrect: 68,
        baseTotal: 100,
        peerPercentile: 46,
        status: 'at-risk',
        weakSubtopic: 'GROUP BY vs HAVING Clause Filtering',
        accentColor: 'border-rose-500/50',
        barColor: 'from-rose-500 to-amber-400',
        questions: [
            {
                id: 1,
                stem: 'Which SQL clause filters rows AFTER they have been grouped by GROUP BY?',
                choices: [
                    { key: 'A', text: 'WHERE' },
                    { key: 'B', text: 'HAVING' },
                    { key: 'C', text: 'FILTER' },
                    { key: 'D', text: 'ORDER BY' },
                ],
                correct: 'B',
                rationale: '✓ HAVING filters groups after aggregation. WHERE filters individual rows BEFORE grouping — a common board exam trap.',
            },
            {
                id: 2,
                stem: 'What does the SQL JOIN type INNER JOIN return?',
                choices: [
                    { key: 'A', text: 'All rows from the left table, even if no match in right' },
                    { key: 'B', text: 'All rows from both tables, filling NULLs where no match' },
                    { key: 'C', text: 'Only rows where a match exists in BOTH tables' },
                    { key: 'D', text: 'A Cartesian product of both tables' },
                ],
                correct: 'C',
                rationale: '✓ INNER JOIN = intersection. LEFT JOIN keeps all left rows. CROSS JOIN = Cartesian product. FULL JOIN = union with NULLs.',
            },
            {
                id: 3,
                stem: 'Which database normal form eliminates transitive dependencies?',
                choices: [
                    { key: 'A', text: '1NF — First Normal Form' },
                    { key: 'B', text: '2NF — Second Normal Form' },
                    { key: 'C', text: '3NF — Third Normal Form' },
                    { key: 'D', text: 'BCNF — Boyce-Codd Normal Form' },
                ],
                correct: 'C',
                rationale: '✓ 3NF removes transitive dependencies (non-key → non-key). 2NF removes partial dependencies. BCNF handles overlapping candidate keys.',
            },
        ],
    },
    oop: {
        name: 'Object-Oriented Programming',
        shortLabel: 'OOP Core',
        weight: '40% Board Exam Weight (High-Impact)',
        boardWeight: 0.40,
        baseCorrect: 92,
        baseTotal: 100,
        peerPercentile: 94,
        status: 'top',
        weakSubtopic: 'Interface vs Abstract Class Rules',
        accentColor: 'border-indigo-500/30',
        barColor: 'from-amber-400 to-yellow-300',
        questions: [
            {
                id: 1,
                stem: 'In Java/C#, which keyword allows a child class to provide its own version of a parent method?',
                choices: [
                    { key: 'A', text: 'overload' },
                    { key: 'B', text: 'override' },
                    { key: 'C', text: 'extend' },
                    { key: 'D', text: 'abstract' },
                ],
                correct: 'B',
                rationale: '✓ override replaces a parent method in a subclass (runtime polymorphism). overload means same name, different parameters (compile-time).',
            },
            {
                id: 2,
                stem: 'What OOP principle does "private" fields with public getters/setters implement?',
                choices: [
                    { key: 'A', text: 'Inheritance' },
                    { key: 'B', text: 'Polymorphism' },
                    { key: 'C', text: 'Encapsulation' },
                    { key: 'D', text: 'Abstraction' },
                ],
                correct: 'C',
                rationale: '✓ Encapsulation bundles data and restricts direct access. Abstraction hides implementation. These are related but distinct OOP pillars.',
            },
            {
                id: 3,
                stem: 'An interface in Java/C# differs from an abstract class because:',
                choices: [
                    { key: 'A', text: 'Interfaces can have constructors; abstract classes cannot' },
                    { key: 'B', text: 'A class can implement multiple interfaces but extend only one abstract class' },
                    { key: 'C', text: 'Abstract classes cannot have any implemented methods' },
                    { key: 'D', text: 'Interfaces support private fields by default' },
                ],
                correct: 'B',
                rationale: '✓ Java/C# support multiple interface implementation but single inheritance. Abstract classes CAN have concrete methods (default implementations).',
            },
        ],
    },
};

const MOTIVATIONAL_QUOTES = [
    '"Real QBank Analytics: You have completed 244 of 500 board items (48.8% QBank Coverage)."',
    '"Official Licensure Cutoff: 75.0%. Your current predicted rating is 78.4% (Passing Zone)."',
    '"Target Weakness: Drill 15 more SQL items today to bring your DBMS score above the 75% threshold."',
    '"Spaced Repetition Alert: 12 flashcards are due for active recall review today."',
];

// ── Mini Drill Modal ──────────────────────────────────────────────────────────
interface MiniDrillModalProps {
    subjectKey: string;
    config: SubjectDrillConfig;
    liveCorrect: number;
    liveTotal: number;
    onAnswered: (wasCorrect: boolean) => void;
    onClose: () => void;
}

function MiniDrillModal({ subjectKey, config, liveCorrect, liveTotal, onAnswered, onClose }: MiniDrillModalProps) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [drillDone, setDrillDone] = useState(false);
    const [sessionCorrect, setSessionCorrect] = useState(0);

    const question = config.questions[questionIndex];
    const livePercent = liveTotal > 0 ? ((liveCorrect / liveTotal) * 100).toFixed(1) : '0.0';
    const isPassing = parseFloat(livePercent) >= 75;

    const handleChoiceSelect = (key: string) => {
        if (showResult) return;
        setSelected(key);
        setShowResult(true);
        const correct = key === question.correct;
        if (correct) {
            setSessionCorrect((p) => p + 1);
        }
        onAnswered(correct);
    };

    const handleNext = () => {
        if (questionIndex < config.questions.length - 1) {
            setQuestionIndex((p) => p + 1);
            setSelected(null);
            setShowResult(false);
        } else {
            setDrillDone(true);
        }
    };

    const statusLabel =
        config.status === 'at-risk' ? '⚠️ At-Risk' :
        config.status === 'top' ? '★ Topnotcher' : '✓ Passing';

    const barColorClass = config.barColor;

    return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
            <div className="w-full max-w-sm bg-[#0c0e24] border-2 border-purple-500/50 rounded-3xl shadow-2xl overflow-hidden">

                {/* ── Header: Live Score Card ─────────────────────────── */}
                <div className="px-4 pt-4 pb-3 border-b border-white/10 flex items-center justify-between gap-3">
                    <div className="flex-1">
                        <div className="text-[9px] font-mono text-purple-300 uppercase tracking-widest">{config.weight}</div>
                        <div className="font-cinzel text-sm font-bold text-white leading-tight">{config.name}</div>
                        <div className="text-[10px] font-mono text-zinc-400 mt-0.5">Weak area: {config.weakSubtopic}</div>
                    </div>

                    {/* Live animated score pill */}
                    <div className="flex flex-col items-center shrink-0">
                        <div className={`font-jakarta text-2xl font-extrabold transition-all duration-500 ${isPassing ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {livePercent}%
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400">{liveCorrect}/{liveTotal}</div>
                        <div className={`text-[9px] font-mono font-bold mt-0.5 ${isPassing ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {statusLabel}
                        </div>
                    </div>
                </div>

                {/* ── Live progress bar ───────────────────────────────── */}
                <div className="h-1.5 bg-[#181b36] w-full">
                    <div
                        className={`h-full bg-gradient-to-r ${barColorClass} transition-all duration-700`}
                        style={{ width: `${livePercent}%` }}
                    />
                </div>

                {/* ── Drill Content ───────────────────────────────────── */}
                {!drillDone ? (
                    <div className="p-4 space-y-3">
                        {/* Progress indicator */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                            <span>LIVE DRILL — Q {questionIndex + 1} of {config.questions.length}</span>
                            <span className="text-purple-300">Answer to update score →</span>
                        </div>

                        {/* Question stem */}
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                            <p className="font-jakarta text-xs text-zinc-100 leading-relaxed">{question.stem}</p>
                        </div>

                        {/* Choices */}
                        <div className="space-y-2">
                            {question.choices.map((c) => {
                                const isSelected = selected === c.key;
                                const isCorrect = c.key === question.correct;
                                let style = 'border-white/10 bg-white/5 text-zinc-200 hover:border-purple-400 hover:bg-white/10';
                                if (showResult && isCorrect) {
                                    style = 'border-emerald-400 bg-emerald-950/60 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.3)]';
                                } else if (showResult && isSelected && !isCorrect) {
                                    style = 'border-rose-500 bg-rose-950/60 text-rose-300';
                                }

                                return (
                                    <button
                                        key={c.key}
                                        onClick={() => handleChoiceSelect(c.key)}
                                        disabled={showResult}
                                        className={`w-full flex items-center gap-2.5 text-left rounded-xl border px-3 py-2.5 transition-all duration-200 cursor-pointer active:scale-[0.98] ${style}`}
                                    >
                                        <span className="shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                                            {c.key}
                                        </span>
                                        <span className="text-xs font-jakarta">{c.text}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Rationale reveal */}
                        {showResult && (
                            <div className={`rounded-xl p-2.5 text-[11px] font-jakarta leading-relaxed border ${
                                selected === question.correct
                                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                            }`}>
                                {selected === question.correct ? '✅ Correct! ' : '❌ Incorrect. '}
                                {question.rationale}
                            </div>
                        )}

                        {/* Next / Skip button */}
                        {showResult && (
                            <button
                                onClick={handleNext}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-cinzel text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
                            >
                                {questionIndex < config.questions.length - 1 ? 'NEXT QUESTION →' : 'SEE RESULTS'}
                            </button>
                        )}
                    </div>
                ) : (
                    /* ── Results Screen ──────────────────────────────── */
                    <div className="p-5 space-y-4 text-center">
                        <div className="text-3xl">
                            {sessionCorrect === config.questions.length ? '🏆' : sessionCorrect >= 2 ? '📈' : '📉'}
                        </div>
                        <div>
                            <div className="font-cinzel text-base font-bold text-white">
                                {sessionCorrect} / {config.questions.length} Correct This Session
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                                Your {config.shortLabel} QBank accuracy is now:
                            </div>
                            <div className={`font-jakarta text-3xl font-extrabold mt-1 transition-all duration-700 ${isPassing ? 'text-emerald-300' : 'text-rose-300'}`}>
                                {livePercent}%
                            </div>
                            <div className={`text-xs font-mono mt-1 ${isPassing ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {isPassing ? `✓ Above the 75% licensure cutoff` : `⚠️ Still below 75.0% cutoff — keep drilling!`}
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl font-cinzel text-xs font-bold text-[#121422] uppercase bg-gradient-to-b from-[#f7c844] via-[#f3b738] to-[#e69f1a] cursor-pointer shadow-md active:scale-95 transition-all"
                        >
                            ← BACK TO DASHBOARD
                        </button>
                    </div>
                )}

                {/* Close button (top-right) */}
                {!drillDone && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/10 text-zinc-300 hover:text-white flex items-center justify-center text-[10px] cursor-pointer"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export function DashboardLanding({
    onOpenBattle,
    onResumeReview,
    onOpenLibrary,
    onOpenFlashcards,
    onOpenPortal,
}: DashboardLandingProps) {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<'rewards' | 'cards' | 'battle' | 'leaderboard' | 'profile'>('battle');
    const [isMascotBouncing, setIsMascotBouncing] = useState(false);
    const [activeDrillKey, setActiveDrillKey] = useState<string | null>(null);

    // Live mutable scores — starts at baseline, updates as user drills
    const [scores, setScores] = useState<Record<string, { correct: number; total: number }>>({
        web: { correct: 42, total: 50 },
        sql: { correct: 68, total: 100 },
        oop: { correct: 92, total: 100 },
    });

    // Predicted board rating recalculated from live scores
    const computedRating =
        (scores.web.correct / scores.web.total) * 100 * SUBJECT_DRILLS.web.boardWeight +
        (scores.sql.correct / scores.sql.total) * 100 * SUBJECT_DRILLS.sql.boardWeight +
        (scores.oop.correct / scores.oop.total) * 100 * SUBJECT_DRILLS.oop.boardWeight;

    const totalQbankItems = 500;
    const completedQbankItems = scores.web.total + scores.sql.total + scores.oop.total - 250 + 244;

    const handleAnswer = (key: string, wasCorrect: boolean) => {
        setScores((prev) => ({
            ...prev,
            [key]: {
                correct: prev[key].correct + (wasCorrect ? 1 : 0),
                total: prev[key].total + 1,
            },
        }));
    };

    const handleCycleQuote = () => {
        setIsMascotBouncing(true);
        setTimeout(() => setIsMascotBouncing(false), 300);
        setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    };

    const getPercent = (key: string) => {
        const s = scores[key];
        return ((s.correct / s.total) * 100).toFixed(1);
    };

    const getStatus = (key: string) => parseFloat(getPercent(key)) >= 75;

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[780px] px-4 pt-3 pb-2 flex-1 max-w-md mx-auto select-none relative">

                {/* 1. TOP CARD: Live Predicted Board Rating */}
                <div className="w-full rounded-2xl border-2 border-purple-500/50 bg-[#0c0e24]/90 backdrop-blur-md p-3.5 shadow-[0_0_20px_rgba(124,58,237,0.25)] flex items-center gap-3.5">
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
                        <span className="text-[9px] font-sans font-bold text-amber-400 tracking-wider uppercase mt-0.5">Level 10</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-sans font-bold text-purple-300 tracking-wide flex items-center gap-1">
                                <span>🎯</span> PREDICTED BOARD RATING
                            </span>
                            <span className={`font-sans font-extrabold text-sm transition-colors duration-500 ${computedRating >= 75 ? 'text-amber-300' : 'text-rose-300'}`}>
                                {computedRating.toFixed(1)}%
                            </span>
                        </div>

                        <div className="w-full h-2.5 rounded-full bg-[#161a36] border border-white/15 p-[1px] overflow-hidden shadow-inner">
                            <div
                                className={`h-full rounded-full transition-all duration-700 shadow-[0_0_8px_#f59e0b] ${
                                    computedRating >= 75
                                        ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300'
                                        : 'bg-gradient-to-r from-rose-600 to-amber-500'
                                }`}
                                style={{ width: `${Math.min(computedRating, 100)}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mt-1">
                            <span>QBank: {completedQbankItems}/{totalQbankItems} items taken</span>
                            <span className={`font-bold ${computedRating >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {computedRating >= 75 ? 'Cutoff: 75.0% ✓ Safe' : 'Cutoff: 75.0% ⚠️ At Risk'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. SPEECH BUBBLE & MASCOT */}
                <div className="w-full flex flex-col items-center my-auto py-1 relative">
                    <div
                        onClick={handleCycleQuote}
                        className="w-full max-w-[340px] relative rounded-2xl border-2 border-purple-500/70 bg-[#0a0c20]/95 backdrop-blur-md px-4 py-2.5 shadow-[0_0_20px_rgba(124,58,237,0.35)] cursor-pointer hover:border-purple-400 transition-all text-center group"
                    >
                        <p className="font-jakarta text-[11px] sm:text-xs font-medium text-zinc-100 leading-snug">
                            {MOTIVATIONAL_QUOTES[quoteIndex]}
                        </p>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0a0c20] border-r-2 border-b-2 border-purple-500/70 rotate-45" />
                    </div>

                    <div
                        onClick={handleCycleQuote}
                        className={`relative mt-2.5 cursor-pointer transition-transform duration-200 ${isMascotBouncing ? 'scale-105' : 'hover:scale-[1.02]'}`}
                    >
                        <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-2xl -z-10 animate-pulse-glow" />
                        <img
                            src="/assets/img/OWL.png"
                            alt="Owl Mascot Professor"
                            className="w-40 sm:w-48 max-h-[210px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] animate-float"
                        />
                    </div>
                </div>

                {/* 3. DAILY QBANK QUOTA */}
                <div className="w-full rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-[#0c0e24]/90 to-purple-950/30 px-3.5 py-2 my-1 flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">🔥</span>
                        <div>
                            <div className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">Daily QBank Quota</div>
                            <div className="text-xs font-bold text-white">18 / 30 Unique Items Answered Today</div>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold">
                        5-Day Streak 🔥
                    </span>
                </div>

                {/* 4. BOARD EXAM ACCURACY MATRIX — Live updating cards */}
                <div className="w-full space-y-1 my-1">
                    <div className="flex items-center justify-between px-1 text-[10px] font-mono text-zinc-400">
                        <span>BOARD EXAM ACCURACY MATRIX</span>
                        <span className="text-purple-300 animate-pulse">▶ Tap to drill &amp; update score</span>
                    </div>

                    <div className="w-full grid grid-cols-3 gap-2">
                        {(['web', 'sql', 'oop'] as const).map((key) => {
                            const cfg = SUBJECT_DRILLS[key];
                            const pct = parseFloat(getPercent(key));
                            const passing = pct >= 75;

                            return (
                                <div
                                    key={key}
                                    onClick={() => setActiveDrillKey(key)}
                                    className={`rounded-2xl border-2 p-2.5 flex flex-col justify-between cursor-pointer transition-all group active:scale-95 ${
                                        passing
                                            ? 'border-indigo-500/30 bg-[#0c0e24]/90 hover:border-purple-400'
                                            : 'border-rose-500/50 bg-[#160d1e]/90 hover:border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                                    }`}
                                >
                                    <div className={`flex items-center justify-between text-[10px] font-sans font-semibold ${passing ? 'text-purple-200' : 'text-rose-300'}`}>
                                        <span className="truncate">{cfg.shortLabel}</span>
                                        <span className="text-[8px] font-mono text-zinc-400">{cfg.boardWeight * 100}% Wt.</span>
                                    </div>

                                    <div className="my-0.5">
                                        <span className={`font-jakarta text-xl font-extrabold transition-all duration-500 ${passing ? 'text-white group-hover:text-amber-300' : 'text-rose-200 group-hover:text-white'}`}>
                                            {getPercent(key)}%
                                        </span>
                                    </div>

                                    <div className={`text-[9px] font-mono flex items-center justify-between ${passing ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        <span>{scores[key].correct}/{scores[key].total}</span>
                                        <span className="font-bold">{passing ? '✓' : '⚠️'}</span>
                                    </div>

                                    <div className="w-full h-1.5 rounded-full bg-[#181b36] overflow-hidden mt-1">
                                        <div
                                            className={`h-full bg-gradient-to-r ${cfg.barColor} rounded-full transition-all duration-700`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 5. CRITICAL AT-RISK REMEDIATION */}
                <div className="w-full rounded-2xl border-2 border-rose-500/50 bg-[#141230]/90 backdrop-blur-md p-3.5 my-1 shadow-[0_0_20px_rgba(244,63,94,0.2)] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-sans font-bold text-rose-300 flex items-center gap-1">
                            <span>⚠️</span> Critical Weakness Remediation
                        </span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40">
                            SQL HAVING &amp; Joins
                        </span>
                    </div>

                    <p className="font-jakarta text-xs text-zinc-300 leading-snug">
                        SQL accuracy is <strong className={getStatus('sql') ? 'text-emerald-300' : 'text-rose-300'}>{getPercent('sql')}%</strong>
                        {getStatus('sql') ? ' — now above the 75% threshold! Keep it up.' : ' — below the 75% passing mark. Tap SQL/DBMS card to drill.'}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-0.5">
                        <button
                            type="button"
                            onClick={() => setActiveDrillKey('sql')}
                            className="py-2.5 px-3 rounded-xl border border-rose-400/50 bg-gradient-to-r from-rose-700 to-purple-700 hover:from-rose-600 hover:to-purple-600 text-white font-jakarta text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                            <span>▶</span>
                            <span>REMEDIATE Q-BANK</span>
                        </button>

                        <button
                            type="button"
                            onClick={onOpenFlashcards ?? onOpenLibrary}
                            className="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-purple-200 font-jakarta text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                            <span>🃏</span>
                            <span>12 DUE CARDS</span>
                        </button>
                    </div>
                </div>

                {/* 6. BOTTOM NAV DOCK */}
                <div className="w-full relative mt-2 pt-1">
                    <div className="w-full rounded-2xl border-2 border-purple-500/40 bg-[#161234]/95 backdrop-blur-md px-3 py-2 flex items-center justify-between shadow-[0_0_25px_rgba(0,0,0,0.8)]">
                        <button onClick={() => setActiveTab('rewards')} className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${activeTab === 'rewards' ? 'text-amber-300 scale-110 drop-shadow-[0_0_8px_#f59e0b]' : 'text-zinc-400 hover:text-zinc-200'}`} title="Rewards & Licensure Certificate">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
                        </button>

                        <button onClick={() => { setActiveTab('cards'); if (onOpenLibrary) onOpenLibrary(); }} className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${activeTab === 'cards' ? 'text-purple-300 scale-110 drop-shadow-[0_0_8px_#c084fc]' : 'text-zinc-400 hover:text-zinc-200'}`} title="Topic Codex & Active Recall">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><rect width="14" height="18" x="5" y="3" rx="2" /><path d="M3 7v12a2 2 0 0 0 2 2h12" /></svg>
                        </button>

                        <div className="w-14" />

                        <button onClick={() => setActiveTab('leaderboard')} className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${activeTab === 'leaderboard' ? 'text-amber-300 scale-110 drop-shadow-[0_0_8px_#f59e0b]' : 'text-zinc-400 hover:text-zinc-200'}`} title="Board Percentile Rankings">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M6 9H2v12h4V9z" /><path d="M14 4h-4v17h4V4z" /><path d="M22 13h-4v8h4v-8z" /></svg>
                        </button>

                        <button onClick={() => { setActiveTab('profile'); if (onOpenPortal) onOpenPortal(); }} className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${activeTab === 'profile' ? 'text-purple-300 scale-110 drop-shadow-[0_0_8px_#c084fc]' : 'text-zinc-400 hover:text-zinc-200'}`} title="Institutional Portal">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={onOpenBattle}
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-b from-[#3b0764] via-[#2e1065] to-[#1e1b4b] border-2 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.7)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all"
                        title="Enter Battle Arena"
                    >
                        <div className="relative w-8 h-8 flex items-center justify-center text-white">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full absolute inset-0 rotate-45 opacity-75"><path d="M14.5 17.5 3 6V3h3l11.5 11.5" /><path d="m13 19 6-6" /></svg>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full absolute inset-0 -rotate-45 opacity-75"><path d="M14.5 17.5 3 6V3h3l11.5 11.5" /><path d="m13 19 6-6" /></svg>
                            <div className="z-10 w-4 h-4 rounded-full bg-purple-900 border border-purple-300 flex items-center justify-center text-[8px] font-bold">🦉</div>
                        </div>
                    </button>
                </div>
            </div>

            {/* 7. LIVE MINI-DRILL MODAL */}
            {activeDrillKey && (
                <MiniDrillModal
                    subjectKey={activeDrillKey}
                    config={SUBJECT_DRILLS[activeDrillKey]}
                    liveCorrect={scores[activeDrillKey].correct}
                    liveTotal={scores[activeDrillKey].total}
                    onAnswered={(wasCorrect) => handleAnswer(activeDrillKey, wasCorrect)}
                    onClose={() => setActiveDrillKey(null)}
                />
            )}
        </ClassroomBackground>
    );
}
