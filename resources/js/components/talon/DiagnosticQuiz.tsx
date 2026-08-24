import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

interface Question {
    id: number;
    category: 'GENERAL EDUCATION' | 'PROFESSIONAL EDUCATION' | 'SPECIALIZATION';
    topicId: string;
    questionParts: { text: string; highlight?: boolean }[];
    options: { key: string; text: string }[];
    correctKey: string;
    rationalization: {
        whyCorrect: string;
        whyOthersIncorrect: string;
        reference: string;
    };
}

const FORMATIVE_QUESTIONS: Question[] = [
    {
        id: 1,
        category: 'GENERAL EDUCATION',
        topicId: 'inquiry-science',
        questionParts: [
            { text: 'In School of Teacher Education science subjects, ' },
            { text: 'inquiry-based', highlight: true },
            { text: ' learning is integrated. Which teaching strategy prioritizes ' },
            { text: 'student-led', highlight: true },
            { text: ' question formulation and ' },
            { text: 'hypothesis testing', highlight: true },
            { text: ' above direct lecture formats?' },
        ],
        options: [
            { key: 'A', text: 'Punishment' },
            { key: 'B', text: 'Punishment' },
            { key: 'C', text: 'Punishment' },
            { key: 'D', text: 'Punishment' },
        ],
        correctKey: 'A',
        rationalization: {
            whyCorrect: 'Inquiry-based learning empowers learners to formulate their own investigative questions and perform hypothesis tests.',
            whyOthersIncorrect: 'Expository lectures transmit facts directly without hypothesis experimentation; behavioral punishment is not an instructional strategy.',
            reference: 'DepEd Science Curriculum Guide & CHED CMO No. 75',
        },
    },
    {
        id: 2,
        category: 'PROFESSIONAL EDUCATION',
        topicId: 'blooms-taxonomy',
        questionParts: [
            { text: 'In School of Teacher Education science subjects, ' },
            { text: 'inquiry-based', highlight: true },
            { text: ' learning is integrated. Which teaching strategy prioritizes ' },
            { text: 'student-led', highlight: true },
            { text: ' question formulation and ' },
            { text: 'hypothesis testing', highlight: true },
            { text: ' above direct lecture formats?' },
        ],
        options: [
            { key: 'A', text: 'Punishment' },
            { key: 'B', text: 'Punishment' },
            { key: 'C', text: 'Punishment' },
            { key: 'D', text: 'Punishment' },
        ],
        correctKey: 'B',
        rationalization: {
            whyCorrect: 'Inquiry pedagogy activates Higher-Order Thinking Skills (HOTS) including Analyzing and Evaluating in Bloom’s revised hierarchy.',
            whyOthersIncorrect: 'Direct instruction focuses largely on lower-level recall and comprehension rather than inductive synthesis.',
            reference: 'Anderson & Krathwohl Bloom’s Revised Taxonomy Framework',
        },
    },
    {
        id: 3,
        category: 'SPECIALIZATION',
        topicId: 'piaget-development',
        questionParts: [
            { text: 'In School of Teacher Education science subjects, ' },
            { text: 'inquiry-based', highlight: true },
            { text: ' learning is integrated. Which teaching strategy prioritizes ' },
            { text: 'student-led', highlight: true },
            { text: ' question formulation and ' },
            { text: 'hypothesis testing', highlight: true },
            { text: ' above direct lecture formats?' },
        ],
        options: [
            { key: 'A', text: 'Punishment' },
            { key: 'B', text: 'Punishment' },
            { key: 'C', text: 'Punishment' },
            { key: 'D', text: 'Punishment' },
        ],
        correctKey: 'C',
        rationalization: {
            whyCorrect: 'Formal Operational thought (Piaget) enables hypothetical-deductive reasoning, which serves as the psychological basis for scientific inquiry.',
            whyOthersIncorrect: 'Rote drills bypass cognitive schema assimilation and accommodation.',
            reference: 'Piaget Cognitive Development & Constructivist Pedagogy',
        },
    },
];

interface DiagnosticQuizProps {
    onClose: () => void;
    onViewTopicInLibrary?: (topicId: string) => void;
}

export function DiagnosticQuiz({ onClose, onViewTopicInLibrary }: DiagnosticQuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [isComplete, setIsComplete] = useState(false);
    const [showRationalization, setShowRationalization] = useState(false);
    const [showFullReviewModal, setShowFullReviewModal] = useState(false);

    const currentQuestion = FORMATIVE_QUESTIONS[currentIndex];
    const totalQuestions = FORMATIVE_QUESTIONS.length;
    const currentSelected = selectedAnswers[currentQuestion.id];

    const handleSelectOption = (key: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: key,
        }));
    };

    const handleNextQuestion = () => {
        setShowRationalization(false);
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // Show Diagnostic Completion Screen with Score & Evaluation
            setIsComplete(true);
        }
    };

    // Calculate score
    const score = FORMATIVE_QUESTIONS.reduce((acc, q) => {
        return selectedAnswers[q.id] === q.correctKey ? acc + 1 : acc;
    }, 0);

    const percentage = Math.round((score / totalQuestions) * 100);
    const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[760px] px-4 py-5 flex-1 max-w-md mx-auto select-none relative">
                
                {/* 1. Top Section: Formative Progress Bar (when in question mode) */}
                {!isComplete ? (
                    <div className="w-full flex flex-col gap-2 pt-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all text-xs cursor-pointer"
                                    title="Exit formative test"
                                >
                                    ✕
                                </button>
                                <h1 className="font-cinzel text-lg sm:text-xl font-normal text-zinc-100 tracking-wide">
                                    Formative Progress
                                </h1>
                            </div>
                            <span className="font-sans text-sm sm:text-base font-normal text-zinc-200">
                                {currentIndex + 1} of {totalQuestions}
                            </span>
                        </div>

                        {/* Progress Bar Container with Golden Fill */}
                        <div className="w-full h-3 rounded-full bg-[#0d1022] border border-white/20 p-[1.5px] overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-[#eab308] via-[#f59e0b] to-[#facc15] shadow-[0_0_10px_rgba(245,158,11,0.7)] transition-all duration-300 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    /* Top bar for Completion Screen */
                    <div className="w-full flex items-center justify-between border-b border-indigo-500/20 pb-2.5">
                        <div className="flex items-center gap-2">
                            <span className="font-cinzel text-base font-bold text-amber-400 tracking-wider">
                                ACADEMY DIAGNOSTIC EVALUATION
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-300 uppercase px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-400/40">
                            Verified
                        </span>
                    </div>
                )}

                {/* 2. Main Body: Questions vs Detailed Results Screen */}
                {!isComplete ? (
                    <div className="w-full flex flex-col my-auto py-3">
                        
                        {/* Category Heading & Rationalization Toggle */}
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-jakarta text-xs sm:text-[13px] font-extrabold tracking-[0.2em] text-zinc-100 uppercase">
                                {currentQuestion.category}
                            </h2>

                            {/* Rationalization Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowRationalization((prev) => !prev)}
                                className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                                    showRationalization
                                        ? 'bg-purple-600/50 border-purple-300 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                                        : 'bg-white/5 border-white/10 text-purple-300 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <span>{showRationalization ? '📖 HIDE RATIONALE' : '💡 RATIONALIZATION'}</span>
                            </button>
                        </div>

                        {/* Question Description with Highlighted Keywords */}
                        <div className="mb-6">
                            <p className="font-jakarta text-sm sm:text-[15px] font-normal text-zinc-100 leading-relaxed">
                                {currentQuestion.questionParts.map((part, idx) => (
                                    <span
                                        key={idx}
                                        className={
                                            part.highlight
                                                ? 'text-[#f6c243] font-bold drop-shadow-[0_0_8px_rgba(246,194,67,0.3)]'
                                                : ''
                                        }
                                    >
                                        {part.text}
                                    </span>
                                ))}
                            </p>
                        </div>

                        {/* Expandable Rationalization Drawer */}
                        {showRationalization && (
                            <div className="mb-4 p-3.5 rounded-2xl border border-purple-500/40 bg-[#0e1128]/95 backdrop-blur-md shadow-xl animate-in fade-in zoom-in-95 duration-200 text-xs space-y-2">
                                <div>
                                    <span className="font-bold text-emerald-300 mr-1">✓ Bakit Tama:</span>
                                    <span className="text-zinc-200">{currentQuestion.rationalization.whyCorrect}</span>
                                </div>
                                <div className="pt-1 border-t border-white/5">
                                    <span className="font-bold text-rose-300 mr-1">✕ Bakit Mali ang Iba:</span>
                                    <span className="text-zinc-300">{currentQuestion.rationalization.whyOthersIncorrect}</span>
                                </div>
                                <div className="pt-1 flex items-center justify-between text-[10px] text-purple-300/80 font-mono">
                                    <span>📚 {currentQuestion.rationalization.reference}</span>
                                    {onViewTopicInLibrary && (
                                        <button
                                            type="button"
                                            onClick={() => onViewTopicInLibrary(currentQuestion.topicId)}
                                            className="text-amber-300 hover:text-white underline underline-offset-2 font-bold cursor-pointer"
                                        >
                                            OPEN IN LIBRARY ➔
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Options List (A, B, C, D) */}
                        <div className="space-y-2.5">
                            {currentQuestion.options.map((opt) => {
                                const isSelected = currentSelected === opt.key;
                                return (
                                    <button
                                        key={opt.key}
                                        type="button"
                                        onClick={() => handleSelectOption(opt.key)}
                                        className={`w-full py-3.5 px-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all duration-200 cursor-pointer ${
                                            isSelected
                                                ? 'border-purple-400 bg-[#161a38] text-white shadow-[0_0_18px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/50'
                                                : 'border-[#262e49] bg-[#0c1022]/80 text-zinc-100 hover:border-purple-400/60 hover:bg-[#121630]'
                                        }`}
                                    >
                                        {/* Letter Circle Badge */}
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-jakarta font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                                            isSelected
                                                ? 'bg-purple-600 text-white shadow-[0_0_8px_rgba(168,85,247,0.7)]'
                                                : 'bg-[#4b4e64]/50 text-zinc-300 border border-white/10'
                                        }`}>
                                            {opt.key}
                                        </span>

                                        {/* Option Text */}
                                        <span className="font-jakarta text-sm sm:text-base font-normal tracking-wide">
                                            {opt.text}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    /* 3. DIAGNOSTIC COMPLETED SCREEN WITH SCORE & NEXT STEPS */
                    <div className="w-full flex-1 flex flex-col items-center justify-between py-3 overflow-y-auto">
                        
                        {/* Mascot & Celebration Header */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-2">
                                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl -z-10 animate-pulse-glow" />
                                <img
                                    src="/assets/img/OWL.png"
                                    alt="Owl Professor"
                                    className="w-32 sm:w-36 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] animate-float"
                                />
                                <div className="absolute -top-2 right-1 text-2xl animate-bounce">
                                    🌟
                                </div>
                            </div>

                            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-400 tracking-wider">
                                DIAGNOSTIC COMPLETED!
                            </h2>
                            <p className="font-jakarta text-xs text-purple-200/90 mt-1 max-w-xs leading-relaxed">
                                {score >= 2
                                    ? "Outstanding performance, Future Teacher! Your diagnostic mastery has unlocked the Academy Hub."
                                    : "Great baseline effort! Your individualized study matrix has been configured."}
                            </p>
                        </div>

                        {/* Score & Rewards Summary Card */}
                        <div className="w-full rounded-2xl border-2 border-purple-500/40 bg-[#0c0e24]/90 p-3.5 my-2 shadow-[0_0_20px_rgba(124,58,237,0.25)] space-y-3">
                            
                            {/* Score & XP Row */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                                <div>
                                    <div className="text-[10px] font-mono uppercase text-purple-300/80 tracking-wider">
                                        TOTAL SCORE
                                    </div>
                                    <div className="text-2xl font-extrabold text-white font-jakarta">
                                        {score} <span className="text-sm font-normal text-zinc-400">/ {totalQuestions} Correct</span>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 border border-amber-400/50 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                                        +300 XP GAINED ✦
                                    </span>
                                    <div className="text-[10px] font-mono text-purple-300 mt-1">
                                        {percentage}% Mastery
                                    </div>
                                </div>
                            </div>

                            {/* Subject Competency Breakdown */}
                            <div className="space-y-1.5 pt-0.5">
                                <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                                    COMPETENCY MATRIX BREAKDOWN
                                </div>

                                <div className="grid grid-cols-3 gap-1.5 text-center">
                                    <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-400/20">
                                        <div className="text-[9px] text-zinc-400 uppercase truncate">Gen Ed</div>
                                        <div className="text-xs font-bold text-emerald-300">
                                            {selectedAnswers[1] === 'A' ? '1/1 ✓' : '0/1 ✕'}
                                        </div>
                                    </div>

                                    <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-400/20">
                                        <div className="text-[9px] text-zinc-400 uppercase truncate">Prof Ed</div>
                                        <div className="text-xs font-bold text-emerald-300">
                                            {selectedAnswers[2] === 'B' ? '1/1 ✓' : '0/1 ✕'}
                                        </div>
                                    </div>

                                    <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-400/20">
                                        <div className="text-[9px] text-zinc-400 uppercase truncate">Major</div>
                                        <div className="text-xs font-bold text-emerald-300">
                                            {selectedAnswers[3] === 'C' ? '1/1 ✓' : '0/1 ✕'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Identified Focus Area */}
                            <div className="p-2.5 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-zinc-200">
                                    <span>🎯</span>
                                    <span>Identified Focus: <strong className="text-amber-300">Programming 01</strong></span>
                                </div>
                                <span className="text-[10px] font-mono text-amber-400 font-semibold">Priority 1</span>
                            </div>
                        </div>

                        {/* Actions Section */}
                        <div className="w-full flex flex-col gap-2 pt-1">
                            {/* Primary Action: Go to Main Landing Hub */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full py-3.5 px-6 rounded-2xl font-jakarta font-bold text-xs sm:text-sm tracking-wider text-[#121422] uppercase bg-gradient-to-b from-[#f7c844] via-[#f3b738] to-[#e69f1a] shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] active:scale-[0.985] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>ENTER ACADEMY HUB</span>
                                <span>➔</span>
                            </button>

                            {/* Secondary Action: Review Item Rationalizations */}
                            <button
                                type="button"
                                onClick={() => setShowFullReviewModal(true)}
                                className="w-full py-2.5 px-4 rounded-xl font-cinzel text-xs font-semibold tracking-wider text-purple-200 bg-purple-950/40 border border-purple-400/40 hover:bg-purple-900/50 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                                <span>📖 REVIEW ITEM RATIONALIZATIONS</span>
                            </button>

                            {/* Retake Diagnostic */}
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedAnswers({});
                                    setCurrentIndex(0);
                                    setIsComplete(false);
                                    setShowRationalization(false);
                                }}
                                className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer py-1"
                            >
                                ↻ Retake Diagnostic Trial
                            </button>
                        </div>
                    </div>
                )}

                {/* Bottom Action Button: NEXT QUESTION (when in questions mode) */}
                {!isComplete && (
                    <div className="w-full pt-3 pb-1">
                        <button
                            type="button"
                            onClick={handleNextQuestion}
                            className="w-full py-4 px-6 rounded-2xl font-jakarta font-bold text-xs sm:text-sm tracking-wider text-[#121422] uppercase bg-gradient-to-b from-[#f7c844] via-[#f3b738] to-[#e69f1a] shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] active:scale-[0.985] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                        >
                            <span>
                                {currentIndex < totalQuestions - 1 ? 'NEXT QUESTION' : 'COMPLETE TEST & VIEW RESULTS ✦'}
                            </span>
                        </button>
                    </div>
                )}

                {/* 4. Full Rationalizations Review Modal */}
                {showFullReviewModal && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                        <div className="w-full max-w-md max-h-[85vh] bg-[#0c0e24] border-2 border-purple-500/50 rounded-3xl p-5 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            
                            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                                <h3 className="font-cinzel text-sm font-bold text-amber-300 tracking-wider">
                                    ITEM RATIONALIZATION MATRIX
                                </h3>
                                <button
                                    onClick={() => setShowFullReviewModal(false)}
                                    className="w-7 h-7 rounded-lg bg-white/10 text-zinc-300 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
                                {FORMATIVE_QUESTIONS.map((q, idx) => {
                                    const userAns = selectedAnswers[q.id];
                                    const isCorrect = userAns === q.correctKey;
                                    return (
                                        <div key={q.id} className="p-3.5 rounded-2xl border border-indigo-500/30 bg-[#070918]/90 space-y-2">
                                            <div className="flex items-center justify-between text-[10px] font-mono">
                                                <span className="text-purple-300 uppercase font-bold">Item {idx + 1} • {q.category}</span>
                                                <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                                    {isCorrect ? '✓ Correct' : '✕ Needs Review'}
                                                </span>
                                            </div>

                                            <p className="text-xs text-zinc-200 leading-snug">
                                                {q.questionParts.map((p, i) => p.text).join('')}
                                            </p>

                                            <div className="text-[11px] p-2.5 rounded-xl bg-purple-950/30 border border-purple-400/20 space-y-1">
                                                <div>
                                                    <span className="text-emerald-300 font-semibold">Bakit Tama ({q.correctKey}): </span>
                                                    <span className="text-zinc-300">{q.rationalization.whyCorrect}</span>
                                                </div>
                                                <div className="text-[10px] text-purple-300/70 pt-0.5">
                                                    📚 {q.rationalization.reference}
                                                </div>
                                            </div>

                                            {onViewTopicInLibrary && (
                                                <button
                                                    onClick={() => {
                                                        setShowFullReviewModal(false);
                                                        onViewTopicInLibrary(q.topicId);
                                                    }}
                                                    className="w-full text-[10px] font-mono py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 transition-all cursor-pointer"
                                                >
                                                    Open {q.category} Notes in Codex ➔
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setShowFullReviewModal(false)}
                                className="w-full mt-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-cinzel text-xs font-bold tracking-wider cursor-pointer"
                            >
                                CLOSE REVIEW
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ClassroomBackground>
    );
}
