import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

export type UserRole = 'student' | 'teacher' | 'dean';
export type MaterialTarget = 'drill' | 'flashcard' | 'battle' | 'mock';

export interface QuestionItem {
    id: string;
    target: MaterialTarget;
    category: string;
    submittedBy: string;
    submittedDate: string;
    stemOrTerm: string;
    optionsOrFront?: { key: string; text: string }[];
    correctAnswerOrBack: string;
    rationaleOrTrap: string;
    status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_ITEMS: QuestionItem[] = [
    {
        id: 'item-1',
        target: 'drill',
        category: 'Database Management',
        submittedBy: 'Prof. J. Dela Cruz',
        submittedDate: 'Today, 2:15 PM',
        stemOrTerm: 'Which SQL constraint guarantees that all values in a column are distinct and cannot be null?',
        optionsOrFront: [
            { key: 'A', text: 'UNIQUE' },
            { key: 'B', text: 'PRIMARY KEY' },
            { key: 'C', text: 'FOREIGN KEY' },
            { key: 'D', text: 'CHECK' },
        ],
        correctAnswerOrBack: 'B',
        rationaleOrTrap: 'PRIMARY KEY enforces both uniqueness and NOT NULL constraints simultaneously.',
        status: 'pending',
    },
    {
        id: 'item-2',
        target: 'flashcard',
        category: 'Object-Oriented Programming',
        submittedBy: 'Engr. M. Santos',
        submittedDate: 'Yesterday, 4:40 PM',
        stemOrTerm: 'Encapsulation vs Abstraction',
        correctAnswerOrBack: 'Encapsulation bundles data with methods and restricts direct access (private variables). Abstraction hides internal implementation details and only exposes essential interfaces.',
        rationaleOrTrap: 'Watch out: Encapsulation is about data protection (private), while Abstraction is about hiding complexity (interfaces).',
        status: 'pending',
    },
    {
        id: 'item-3',
        target: 'battle',
        category: 'Web Technologies',
        submittedBy: 'Prof. A. Reyes',
        submittedDate: 'Aug 24, 10:30 AM',
        stemOrTerm: 'Which JavaScript method attaches an event listener to a button without overwriting existing listeners?',
        optionsOrFront: [
            { key: 'A', text: 'addEventListener()' },
            { key: 'B', text: 'onclick =' },
            { key: 'C', text: 'attachEvent()' },
            { key: 'D', text: 'triggerEvent()' },
        ],
        correctAnswerOrBack: 'A',
        rationaleOrTrap: 'addEventListener allows multiple handlers on a single element without overwriting.',
        status: 'approved',
    },
];

interface MultiRolePortalProps {
    currentRole: UserRole;
    onSelectRole: (role: UserRole) => void;
    onBack?: () => void;
    onLaunchStudentHub?: () => void;
}

export function MultiRolePortal({
    currentRole,
    onSelectRole,
    onBack,
    onLaunchStudentHub,
}: MultiRolePortalProps) {
    const [items, setItems] = useState<QuestionItem[]>(INITIAL_ITEMS);
    const [teacherViewMode, setTeacherViewMode] = useState<'analytics' | 'create' | 'submissions'>('analytics');
    const [deanViewMode, setDeanViewMode] = useState<'approvals' | 'cohort' | 'analytics'>('approvals');
    
    // Create form state
    const [materialTarget, setMaterialTarget] = useState<MaterialTarget>('drill');
    const [category, setCategory] = useState('Database Management');
    const [stemOrTerm, setStemOrTerm] = useState('');
    const [optA, setOptA] = useState('');
    const [optB, setOptB] = useState('');
    const [optC, setOptC] = useState('');
    const [optD, setOptD] = useState('');
    const [correctKey, setCorrectKey] = useState('A');
    const [flashcardBack, setFlashcardBack] = useState('');
    const [rationale, setRationale] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const pendingCount = items.filter((i) => i.status === 'pending').length;

    const handleApprove = (id: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item)));
    };

    const handleReject = (id: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item)));
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!stemOrTerm.trim()) return;

        const newItem: QuestionItem = {
            id: `item-${Date.now()}`,
            target: materialTarget,
            category,
            submittedBy: 'Prof. Faculty (You)',
            submittedDate: 'Just now',
            stemOrTerm,
            optionsOrFront: materialTarget !== 'flashcard' ? [
                { key: 'A', text: optA || 'Option A' },
                { key: 'B', text: optB || 'Option B' },
                { key: 'C', text: optC || 'Option C' },
                { key: 'D', text: optD || 'Option D' },
            ] : undefined,
            correctAnswerOrBack: materialTarget === 'flashcard' ? flashcardBack : correctKey,
            rationaleOrTrap: rationale || 'Curriculum aligned explanation.',
            status: 'pending',
        };

        setItems([newItem, ...items]);
        setStemOrTerm('');
        setOptA('');
        setOptB('');
        setOptC('');
        setOptD('');
        setFlashcardBack('');
        setRationale('');
        setShowSuccessToast(true);
        setTimeout(() => {
            setShowSuccessToast(false);
            setTeacherViewMode('submissions');
        }, 1200);
    };

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[780px] px-4 py-4 flex-1 max-w-md mx-auto select-none relative">
                
                {/* 1. Top Header & Unified Role Switcher */}
                <div className="w-full flex flex-col gap-2.5 border-b border-indigo-500/20 pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white text-sm cursor-pointer"
                                    title="Back"
                                >
                                    ‹
                                </button>
                            )}
                            <div>
                                <h1 className="font-cinzel text-base sm:text-lg font-bold text-amber-400 tracking-wider leading-tight">
                                    ACADEMY PORTAL
                                </h1>
                                <p className="text-[10px] text-purple-300/80 font-mono">
                                    {currentRole === 'teacher' ? 'FACULTY REVIEW WORKBENCH' : currentRole === 'dean' ? 'DEAN ACADEMIC MANAGEMENT' : 'STUDENT REVIEW HUB'}
                                </p>
                            </div>
                        </div>

                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-200 uppercase">
                            {currentRole}
                        </span>
                    </div>

                    {/* Role Switcher Pills */}
                    <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#080918] border border-white/10">
                        <button
                            type="button"
                            onClick={() => {
                                onSelectRole('student');
                                if (onLaunchStudentHub) onLaunchStudentHub();
                            }}
                            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                currentRole === 'student'
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-300/40'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            <span>🎓</span>
                            <span>Student</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onSelectRole('teacher')}
                            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                currentRole === 'teacher'
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-300/40'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            <span>👨‍🏫</span>
                            <span>Teacher</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => onSelectRole('dean')}
                            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${
                                currentRole === 'dean'
                                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md border border-amber-300/50'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            <span>🏛️</span>
                            <span>Dean</span>
                            {pendingCount > 0 && (
                                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* 2. MAIN ROLE CONTENT AREA */}
                <div className="w-full flex-1 flex flex-col py-2.5 overflow-y-auto space-y-3 pr-0.5">
                    
                    {/* ════════════════════════════════════════════════════════════ */}
                    {/* TEACHER WORKBENCH                                            */}
                    {/* ════════════════════════════════════════════════════════════ */}
                    {currentRole === 'teacher' && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            
                            {/* Teacher Sub-Navigation Tabs */}
                            <div className="flex rounded-xl bg-[#090b1c] border border-white/10 p-1">
                                <button
                                    type="button"
                                    onClick={() => setTeacherViewMode('analytics')}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        teacherViewMode === 'analytics' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    📊 Class Telemetry
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTeacherViewMode('create')}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        teacherViewMode === 'create' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    ✍️ Create Material
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTeacherViewMode('submissions')}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        teacherViewMode === 'submissions' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    📋 Submissions
                                </button>
                            </div>

                            {/* View 1: Class Performance & Weakness Telemetry */}
                            {teacherViewMode === 'analytics' && (
                                <div className="space-y-3 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="p-3 rounded-2xl border border-indigo-500/30 bg-[#0c0e24]/90 text-center">
                                            <div className="text-[10px] font-mono text-zinc-400 uppercase">Reviewees</div>
                                            <div className="text-xl font-bold text-white mt-0.5">128</div>
                                            <div className="text-[9px] text-emerald-400 font-mono">94% Active</div>
                                        </div>
                                        <div className="p-3 rounded-2xl border border-indigo-500/30 bg-[#0c0e24]/90 text-center">
                                            <div className="text-[10px] font-mono text-zinc-400 uppercase">Avg Score</div>
                                            <div className="text-xl font-bold text-amber-300 mt-0.5">76.4%</div>
                                            <div className="text-[9px] text-zinc-400 font-mono">+3.2% vs last wk</div>
                                        </div>
                                        <div className="p-3 rounded-2xl border border-rose-500/40 bg-[#160d1e]/90 text-center">
                                            <div className="text-[10px] font-mono text-rose-300 uppercase">Top Trap</div>
                                            <div className="text-xs font-bold text-rose-200 mt-1 line-clamp-1">SQL HAVING</div>
                                            <div className="text-[9px] text-rose-400 font-mono">42% Error Rate</div>
                                        </div>
                                    </div>

                                    {/* Actionable Prompt for Teacher */}
                                    <div className="p-3.5 rounded-2xl border border-purple-500/40 bg-[#110e28] flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-bold text-white">42% of students failed SQL HAVING</div>
                                            <div className="text-[10px] text-purple-300 mt-0.5">Create a reinforcement drill or flashcard to help them.</div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCategory('Database Management');
                                                setTeacherViewMode('create');
                                            }}
                                            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shrink-0 ml-2 shadow-sm"
                                        >
                                            + Draft Drill
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* View 2: Step-by-Step Question & Flashcard Authoring UX */}
                            {teacherViewMode === 'create' && (
                                <form onSubmit={handleCreateSubmit} className="space-y-3 animate-in fade-in duration-200">
                                    
                                    {showSuccessToast && (
                                        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold text-center">
                                            ✓ Material Submitted! Sent to Dean for verification.
                                        </div>
                                    )}

                                    {/* STEP 1: Select Target Destination */}
                                    <div className="p-3.5 rounded-2xl border border-indigo-500/30 bg-[#0c0e24]/90 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                                                <span>🎯</span> 1. Where will this material be deployed?
                                            </label>
                                            <span className="text-[9px] font-mono text-purple-300">Target Module</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => setMaterialTarget('drill')}
                                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                                    materialTarget === 'drill'
                                                        ? 'border-purple-400 bg-purple-950/60 text-white shadow-sm'
                                                        : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                                                }`}
                                            >
                                                <div className="text-xs font-bold flex items-center gap-1">
                                                    <span>⚡</span> Practice Drill Bank
                                                </div>
                                                <div className="text-[10px] text-zinc-400 mt-0.5">4-Choice Multiple Choice</div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setMaterialTarget('flashcard')}
                                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                                    materialTarget === 'flashcard'
                                                        ? 'border-purple-400 bg-purple-950/60 text-white shadow-sm'
                                                        : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                                                }`}
                                            >
                                                <div className="text-xs font-bold flex items-center gap-1">
                                                    <span>🃏</span> Flashcard Deck
                                                </div>
                                                <div className="text-[10px] text-zinc-400 mt-0.5">Active Recall Flip Card</div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* STEP 2: Subject & Category */}
                                    <div className="p-3.5 rounded-2xl border border-indigo-500/30 bg-[#0c0e24]/90 space-y-2">
                                        <label className="text-xs font-bold text-white flex items-center gap-1.5">
                                            <span>📚</span> 2. Select Subject & Topic Area
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full p-2.5 rounded-xl bg-[#121636] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                                        >
                                            <option value="Database Management">Database Management (SQL, Joins, Normalization)</option>
                                            <option value="Object-Oriented Programming">Object-Oriented Programming (OOP, Classes, Inheritance)</option>
                                            <option value="Web Technologies">Web Technologies (HTML, CSS, JavaScript, DOM)</option>
                                            <option value="Computer Networking">Computer Networking (TCP/IP, OSI Layers, Routers)</option>
                                        </select>
                                    </div>

                                    {/* STEP 3: Content Input (Switches dynamically based on Target) */}
                                    <div className="p-3.5 rounded-2xl border border-indigo-500/30 bg-[#0c0e24]/90 space-y-3">
                                        <label className="text-xs font-bold text-white flex items-center gap-1.5">
                                            <span>✍️</span> 3. Author Content & Rationale
                                        </label>

                                        {materialTarget === 'drill' ? (
                                            /* Multiple Choice Fields */
                                            <div className="space-y-2.5">
                                                <div>
                                                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Question Stem</span>
                                                    <textarea
                                                        rows={2}
                                                        value={stemOrTerm}
                                                        onChange={(e) => setStemOrTerm(e.target.value)}
                                                        placeholder="e.g. Which SQL clause is used to filter aggregated results after GROUP BY?"
                                                        className="w-full mt-1 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                                                        required
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <span className="text-[10px] font-mono text-zinc-400">Choice A</span>
                                                        <input
                                                            type="text"
                                                            value={optA}
                                                            onChange={(e) => setOptA(e.target.value)}
                                                            placeholder="WHERE"
                                                            className="w-full mt-0.5 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-mono text-zinc-400">Choice B</span>
                                                        <input
                                                            type="text"
                                                            value={optB}
                                                            onChange={(e) => setOptB(e.target.value)}
                                                            placeholder="HAVING"
                                                            className="w-full mt-0.5 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-mono text-zinc-400">Choice C</span>
                                                        <input
                                                            type="text"
                                                            value={optC}
                                                            onChange={(e) => setOptC(e.target.value)}
                                                            placeholder="ORDER BY"
                                                            className="w-full mt-0.5 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-mono text-zinc-400">Choice D</span>
                                                        <input
                                                            type="text"
                                                            value={optD}
                                                            onChange={(e) => setOptD(e.target.value)}
                                                            placeholder="GROUP BY"
                                                            className="w-full mt-0.5 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 pt-1">
                                                    <span className="text-[11px] font-bold text-emerald-300 shrink-0">Correct Key:</span>
                                                    {(['A', 'B', 'C', 'D'] as const).map((k) => (
                                                        <button
                                                            key={k}
                                                            type="button"
                                                            onClick={() => setCorrectKey(k)}
                                                            className={`w-8 h-8 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                                                                correctKey === k
                                                                    ? 'bg-emerald-500 text-white shadow-md'
                                                                    : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                                                            }`}
                                                        >
                                                            {k}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div>
                                                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Rationalization ("Bakit Tama / Bakit Mali")</span>
                                                    <input
                                                        type="text"
                                                        value={rationale}
                                                        onChange={(e) => setRationale(e.target.value)}
                                                        placeholder="HAVING filters aggregate groups; WHERE filters individual rows."
                                                        className="w-full mt-1 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            /* Flashcard Fields */
                                            <div className="space-y-2.5">
                                                <div>
                                                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Card Front: Trigger Term / Question</span>
                                                    <input
                                                        type="text"
                                                        value={stemOrTerm}
                                                        onChange={(e) => setStemOrTerm(e.target.value)}
                                                        placeholder="e.g. PRIMARY KEY vs FOREIGN KEY"
                                                        className="w-full mt-1 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Card Back: Rule & Definition</span>
                                                    <textarea
                                                        rows={2}
                                                        value={flashcardBack}
                                                        onChange={(e) => setFlashcardBack(e.target.value)}
                                                        placeholder="Primary Key uniquely identifies rows in its own table. Foreign Key links to another table."
                                                        className="w-full mt-1 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <span className="text-[10px] font-mono text-zinc-400 uppercase">⚠️ Board Exam Trap to Watch Out For</span>
                                                    <input
                                                        type="text"
                                                        value={rationale}
                                                        onChange={(e) => setRationale(e.target.value)}
                                                        placeholder="A table has 1 Primary Key but can have multiple Foreign Keys."
                                                        className="w-full mt-1 p-2 rounded-xl bg-[#121636] border border-white/10 text-xs text-white"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Action */}
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-2xl font-cinzel text-xs font-bold tracking-wider text-white bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 border border-purple-300/40 shadow-lg cursor-pointer transition-all active:scale-95"
                                    >
                                        SUBMIT FOR DEAN APPROVAL ➔
                                    </button>
                                </form>
                            )}

                            {/* View 3: Submission History & Status */}
                            {teacherViewMode === 'submissions' && (
                                <div className="space-y-2.5 animate-in fade-in duration-200">
                                    <div className="text-xs font-bold text-zinc-300 px-1">
                                        Your Authored Questions & Status:
                                    </div>

                                    {items.map((item) => (
                                        <div key={item.id} className="p-3 rounded-2xl border border-white/10 bg-[#0c0e24]/90 space-y-1.5">
                                            <div className="flex items-center justify-between text-[10px] font-mono">
                                                <span className="px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 uppercase font-bold">
                                                    {item.target === 'flashcard' ? '🃏 Flashcard' : '⚡ Practice Drill'}
                                                </span>
                                                <span className={`font-bold uppercase ${
                                                    item.status === 'approved' ? 'text-emerald-400' : item.status === 'rejected' ? 'text-rose-400' : 'text-amber-400'
                                                }`}>
                                                    {item.status === 'approved' ? '✓ Live in Student Bank' : item.status === 'rejected' ? '✕ Needs Revision' : '⏳ Pending Dean Approval'}
                                                </span>
                                            </div>

                                            <div className="text-xs font-bold text-white line-clamp-2">
                                                {item.stemOrTerm}
                                            </div>
                                            <div className="text-[10px] text-zinc-400">
                                                Category: {item.category} • Submitted: {item.submittedDate}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ════════════════════════════════════════════════════════════ */}
                    {/* DEAN PORTAL (Academic Approvals & Alpha Cohort)              */}
                    {/* ════════════════════════════════════════════════════════════ */}
                    {currentRole === 'dean' && (
                        <div className="space-y-3 animate-in fade-in duration-200">
                            
                            {/* Dean Top Metrics */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-3 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 to-[#0c0e24]/90 text-center">
                                    <div className="text-[10px] font-mono text-amber-300 uppercase">Predicted Pass</div>
                                    <div className="text-xl font-extrabold text-white mt-0.5">88.4%</div>
                                    <div className="text-[9px] text-emerald-400 font-mono">Target: 85%+</div>
                                </div>
                                <div className="p-3 rounded-2xl border border-indigo-500/30 bg-[#0c0e24]/90 text-center">
                                    <div className="text-[10px] font-mono text-purple-300 uppercase">Pending Queue</div>
                                    <div className="text-xl font-extrabold text-amber-300 mt-0.5">{pendingCount}</div>
                                    <div className="text-[9px] text-zinc-400 font-mono">Needs review</div>
                                </div>
                                <div className="p-3 rounded-2xl border border-purple-500/40 bg-[#0c0e24]/90 text-center">
                                    <div className="text-[10px] font-mono text-purple-300 uppercase">Alpha Cohort</div>
                                    <div className="text-xl font-extrabold text-purple-200 mt-0.5">24</div>
                                    <div className="text-[9px] text-purple-300 font-mono">Top scorers</div>
                                </div>
                            </div>

                            {/* Sub-Tabs */}
                            <div className="flex rounded-xl bg-[#080918] border border-white/10 p-1">
                                <button
                                    type="button"
                                    onClick={() => setDeanViewMode('approvals')}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        deanViewMode === 'approvals' ? 'bg-amber-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    📝 Review Queue ({pendingCount})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeanViewMode('cohort')}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        deanViewMode === 'cohort' ? 'bg-amber-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    👑 Alpha Cohort
                                </button>
                            </div>

                            {/* Approvals Queue */}
                            {deanViewMode === 'approvals' && (
                                <div className="space-y-2.5">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`p-3.5 rounded-2xl border transition-all ${
                                                item.status === 'approved'
                                                    ? 'border-emerald-500/40 bg-emerald-950/20'
                                                    : item.status === 'rejected'
                                                    ? 'border-rose-500/40 bg-rose-950/20 opacity-60'
                                                    : 'border-amber-500/40 bg-[#0c0e24]/95 shadow-md'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                                                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase">
                                                    {item.target === 'flashcard' ? '🃏 Flashcard' : '⚡ Practice Drill'} • {item.category}
                                                </span>
                                                <span className="text-zinc-400">{item.submittedBy}</span>
                                            </div>

                                            <p className="font-jakarta text-xs text-white font-semibold leading-snug my-2">
                                                {item.stemOrTerm}
                                            </p>

                                            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[11px] space-y-1 mb-2.5">
                                                <div>
                                                    <span className="text-emerald-300 font-bold">Answer / Rule: </span>
                                                    <span className="text-zinc-200">{item.correctAnswerOrBack}</span>
                                                </div>
                                                {item.rationaleOrTrap && (
                                                    <div className="text-[10px] text-zinc-400">
                                                        <span className="text-purple-300 font-bold">Trap Rationale: </span>
                                                        {item.rationaleOrTrap}
                                                    </div>
                                                )}
                                            </div>

                                            {item.status === 'pending' ? (
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReject(item.id)}
                                                        className="py-2 px-3 rounded-xl border border-rose-500/40 bg-rose-950/30 hover:bg-rose-900/50 text-rose-200 font-jakarta text-xs font-bold transition-all cursor-pointer"
                                                    >
                                                        ✕ REJECT
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleApprove(item.id)}
                                                        className="py-2 px-3 rounded-xl border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 font-jakarta text-xs font-bold transition-all cursor-pointer shadow-sm"
                                                    >
                                                        ✓ APPROVE TO BANK
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center py-1 text-xs font-mono font-bold">
                                                    {item.status === 'approved' ? (
                                                        <span className="text-emerald-400">✓ APPROVED & PUBLISHED TO STUDENT APP</span>
                                                    ) : (
                                                        <span className="text-rose-400">✕ REJECTED</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Alpha Cohort List */}
                            {deanViewMode === 'cohort' && (
                                <div className="space-y-2">
                                    {[
                                        { name: 'Alex Rivera', score: '98%', streak: '14 Days', rank: 'Top 1 Alpha' },
                                        { name: 'Sarah Chen', score: '95%', streak: '12 Days', rank: 'Top 2 Alpha' },
                                        { name: 'Miguel Bautista', score: '93%', streak: '9 Days', rank: 'Top 3 Alpha' },
                                    ].map((s, i) => (
                                        <div key={i} className="p-3 rounded-2xl border border-white/10 bg-[#0c0e24]/90 flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold text-xs flex items-center justify-center">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-white">{s.name}</div>
                                                    <div className="text-[10px] font-mono text-purple-300">{s.rank}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-emerald-400">{s.score}</div>
                                                <div className="text-[10px] font-mono text-zinc-400">{s.streak} 🔥</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* 3. Bottom Action */}
                <div className="w-full pt-2 border-t border-white/5 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => {
                            onSelectRole('student');
                            if (onLaunchStudentHub) onLaunchStudentHub();
                        }}
                        className="w-full py-3 rounded-2xl font-cinzel text-xs font-bold tracking-wider text-[#121422] uppercase bg-gradient-to-b from-[#f7c844] via-[#f3b738] to-[#e69f1a] shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <span>LAUNCH STUDENT REVIEW HUB</span>
                        <span>➔</span>
                    </button>
                </div>
            </div>
        </ClassroomBackground>
    );
}
