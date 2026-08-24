import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

export interface LibraryTopic {
    id: string;
    title: string;
    category: 'General Education' | 'Professional Education' | 'Specialization';
    subject: string;
    icon: string;
    keywords: string[];
    summary: string;
    examTip: string;
    distractorTraps: { concept: string; whyIncorrect: string }[];
    references: { title: string; url: string; badge: string }[];
}

export const STE_LIBRARY_TOPICS: LibraryTopic[] = [
    {
        id: 'oop-basics',
        title: 'Object-Oriented Programming (OOP)',
        category: 'Specialization',
        subject: 'Programming Fundamentals',
        icon: '💻',
        keywords: ['Class', 'Object', 'Inheritance', 'Encapsulation', 'Polymorphism'],
        summary: 'OOP organizes code into "objects" that contain both data (attributes) and actions (methods). A Class is like a blueprint, and an Object is the actual thing built from that blueprint.',
        examTip: 'Inheritance = child class gets properties from parent. Encapsulation = hiding data using private/public. These two come out most in board exams.',
        distractorTraps: [
            { concept: 'Class vs Object', whyIncorrect: 'A Class is just the template/blueprint. The Object is the actual instance created from it. Don\'t mix them up.' },
            { concept: 'Overloading vs Overriding', whyIncorrect: 'Overloading = same method name, different parameters (same class). Overriding = rewriting parent method in child class.' },
        ],
        references: [
            { title: 'W3Schools: Java OOP Concepts', url: 'https://www.w3schools.com/java/java_oop.asp', badge: 'W3Schools' },
            { title: 'GeeksforGeeks: OOP Principles', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/', badge: 'GeeksforGeeks' },
        ],
    },
    {
        id: 'database-sql',
        title: 'Databases & SQL Queries',
        category: 'Professional Education',
        subject: 'Database Management Systems',
        icon: '🗄️',
        keywords: ['SELECT', 'JOIN', 'Primary Key', 'Foreign Key', 'Normalization'],
        summary: 'A database stores organized data in tables. SQL (Structured Query Language) is used to retrieve, insert, update, and delete that data. SELECT is the most common command used to read data.',
        examTip: 'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table even if no match exists on the right.',
        distractorTraps: [
            { concept: 'Primary Key vs Foreign Key', whyIncorrect: 'Primary Key uniquely identifies each row in its own table. Foreign Key is a field that points to the Primary Key in another table.' },
            { concept: 'WHERE vs HAVING', whyIncorrect: 'WHERE filters rows before grouping. HAVING filters groups after GROUP BY is applied.' },
        ],
        references: [
            { title: 'W3Schools SQL Tutorial', url: 'https://www.w3schools.com/sql/', badge: 'W3Schools' },
            { title: 'SQLZoo - Interactive SQL Practice', url: 'https://sqlzoo.net/', badge: 'SQLZoo' },
        ],
    },
    {
        id: 'networking-basics',
        title: 'Computer Networking Fundamentals',
        category: 'Specialization',
        subject: 'Computer Networks',
        icon: '🌐',
        keywords: ['IP Address', 'TCP/IP', 'OSI Model', 'Router', 'DNS', 'HTTP'],
        summary: 'Networks connect computers together to share data. Every device on a network has an IP address (its home address). Protocols like TCP/IP are the rules that define how data travels between computers.',
        examTip: 'OSI Model has 7 layers: Physical → Data Link → Network → Transport → Session → Presentation → Application. Remember: "Please Do Not Throw Sausage Pizza Away".',
        distractorTraps: [
            { concept: 'Router vs Switch', whyIncorrect: 'A Switch connects devices within the same local network (LAN). A Router connects different networks and directs traffic between them.' },
            { concept: 'TCP vs UDP', whyIncorrect: 'TCP is reliable — it guarantees delivery and order. UDP is faster but has no delivery guarantee (used in video streaming, gaming).' },
        ],
        references: [
            { title: 'Cisco Networking Academy', url: 'https://www.netacad.com/', badge: 'Cisco' },
            { title: 'GeeksforGeeks: OSI Model', url: 'https://www.geeksforgeeks.org/layers-osi-model/', badge: 'GeeksforGeeks' },
        ],
    },
    {
        id: 'web-development',
        title: 'Web Development: HTML, CSS & JavaScript',
        category: 'General Education',
        subject: 'Web Technologies',
        icon: '🕸️',
        keywords: ['HTML', 'CSS', 'JavaScript', 'DOM', 'Frontend', 'Backend'],
        summary: 'HTML builds the structure of a webpage (headings, paragraphs, buttons). CSS styles it (colors, fonts, layout). JavaScript makes it interactive (clicking, animations, data fetching).',
        examTip: 'HTML = skeleton, CSS = clothing/style, JavaScript = muscles/behavior. Always know which layer is responsible for what.',
        distractorTraps: [
            { concept: 'Frontend vs Backend', whyIncorrect: 'Frontend runs in the browser (HTML/CSS/JS). Backend runs on the server (PHP, Node.js, Python) and handles database logic.' },
            { concept: 'id vs class in CSS', whyIncorrect: 'id (#name) must be unique — only one element per page. class (.name) can be reused on many elements.' },
        ],
        references: [
            { title: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', badge: 'MDN' },
            { title: 'W3Schools Web Tutorials', url: 'https://www.w3schools.com/', badge: 'W3Schools' },
        ],
    },
];

interface TopicLibraryProps {
    onBack?: () => void;
    onStartTopicDrill?: (topicId: string) => void;
    onOpenFlashcards?: () => void;
    initialTopicId?: string | null;
}

export function TopicLibrary({ onBack, onStartTopicDrill, onOpenFlashcards, initialTopicId }: TopicLibraryProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'All' | 'General Education' | 'Professional Education' | 'Specialization'>('All');
    const [activeTopic, setActiveTopic] = useState<LibraryTopic | null>(
        initialTopicId ? STE_LIBRARY_TOPICS.find((t) => t.id === initialTopicId) || null : null
    );
    const [activeTab, setActiveTab] = useState<'overview' | 'traps' | 'links'>('overview');

    const filteredTopics = STE_LIBRARY_TOPICS.filter((t) => {
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        const matchesSearch =
            searchQuery.trim() === '' ||
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col items-center justify-between w-full h-full min-h-[760px] px-4 py-5 flex-1 max-w-md mx-auto select-none relative">
                
                {/* 1. Top Bar with Flashcard Switcher */}
                <div className="w-full flex items-center justify-between border-b border-indigo-500/20 pb-3">
                    <div className="flex items-center gap-2">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/15 transition-all text-sm cursor-pointer"
                                title="Back"
                            >
                                ‹
                            </button>
                        )}
                        <div>
                            <h1 className="font-cinzel text-base sm:text-lg font-bold text-amber-400 tracking-wider leading-tight">
                                STE KNOWLEDGE CODEX
                            </h1>
                            <p className="text-[10px] text-purple-300/80 font-mono">
                                HIGH-YIELD CURRICULUM TOPICS
                            </p>
                        </div>
                    </div>

                    {onOpenFlashcards && (
                        <button
                            type="button"
                            onClick={onOpenFlashcards}
                            className="px-2.5 py-1 rounded-xl bg-purple-900/60 border border-purple-400/50 hover:bg-purple-800 text-purple-200 text-[11px] font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                            title="Switch to Flashcards"
                        >
                            <span>🃏</span>
                            <span>FLASHCARDS</span>
                        </button>
                    )}
                </div>

                {/* 2. Main List View or Topic Codex Reader */}
                {!activeTopic ? (
                    <div className="w-full flex-1 flex flex-col py-3 overflow-y-auto">

                        {/* Search Input */}
                        <div className="relative mb-3">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search concept or keyword..."
                                className="w-full py-2.5 pl-9 pr-8 rounded-xl border border-indigo-500/30 bg-[#0c0e24]/90 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-jakarta"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                                🔍
                            </span>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Category Segmented Controls */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 shrink-0">
                            {(['All', 'General Education', 'Professional Education', 'Specialization'] as const).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] border border-purple-300/40'
                                            : 'bg-[#0c0e24]/70 border border-white/10 text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    {cat === 'All' ? '✨ All Topics' : cat}
                                </button>
                            ))}
                        </div>

                        {/* Topic Cards List */}
                        <div className="space-y-2.5 overflow-y-auto pr-0.5 mt-1">
                            {filteredTopics.map((topic) => (
                                <div
                                    key={topic.id}
                                    onClick={() => {
                                        setActiveTopic(topic);
                                        setActiveTab('overview');
                                    }}
                                    className="p-3.5 rounded-2xl border border-indigo-500/25 bg-[#0c0e24]/85 hover:border-purple-400 hover:bg-[#131638] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.4)] flex items-start gap-3 group"
                                >
                                    {/* Topic Icon Crest */}
                                    <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-400/30 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                                        {topic.icon}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-1 mb-0.5">
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-purple-300/90 truncate">
                                                {topic.subject}
                                            </span>
                                            <span className="text-[9px] font-mono text-amber-400/80 shrink-0">
                                                ★ High Yield
                                            </span>
                                        </div>

                                        <h3 className="font-jakarta text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-1">
                                            {topic.title}
                                        </h3>

                                        <p className="font-jakarta text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                                            {topic.summary}
                                        </p>

                                        {/* Keyword Chips */}
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {topic.keywords.slice(0, 3).map((kw, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                                                >
                                                    #{kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <span className="text-zinc-500 group-hover:text-purple-300 text-xs self-center transition-colors">
                                        ›
                                    </span>
                                </div>
                            ))}

                            {filteredTopics.length === 0 && (
                                <div className="text-center py-12 text-zinc-400 text-xs">
                                    No library topics match your search.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* 3. Deep Topic Codex View (Chunked, clean UI/UX) */
                    <div className="w-full flex-1 flex flex-col py-2 overflow-y-auto space-y-3 pr-0.5">

                        {/* Header with quick back and category tag */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setActiveTopic(null)}
                                className="text-xs font-mono text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
                            >
                                ‹ ALL TOPICS
                            </button>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-400/30">
                                {activeTopic.category}
                            </span>
                        </div>

                        {/* Title Header */}
                        <div className="flex items-start gap-3 bg-[#0c0e24]/90 border border-indigo-500/30 p-3 rounded-2xl">
                            <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-400/40 flex items-center justify-center text-xl shrink-0">
                                {activeTopic.icon}
                            </div>
                            <div>
                                <h2 className="font-jakarta text-sm sm:text-base font-bold text-white leading-tight">
                                    {activeTopic.title}
                                </h2>
                                <p className="text-[11px] text-purple-300 font-mono mt-0.5">
                                    {activeTopic.subject}
                                </p>
                            </div>
                        </div>

                        {/* Tab Segmented Switcher for clean UX (Overview / Distractor Traps / Links) */}
                        <div className="flex rounded-xl bg-[#090b1c] border border-white/10 p-1">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'overview'
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                📖 Concept
                            </button>
                            <button
                                onClick={() => setActiveTab('traps')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'traps'
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                ⚠️ Traps
                            </button>
                            <button
                                onClick={() => setActiveTab('links')}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'links'
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                🔗 References
                            </button>
                        </div>

                        {/* Tab Content 1: Overview */}
                        {activeTab === 'overview' && (
                            <div className="space-y-2.5 animate-in fade-in duration-200">
                                <div className="p-3.5 rounded-2xl border border-indigo-500/25 bg-[#0c0e24]/90">
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                                        CORE SUMMARY
                                    </h4>
                                    <p className="font-jakarta text-xs text-zinc-200 leading-relaxed">
                                        {activeTopic.summary}
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-2xl border border-purple-500/25 bg-purple-950/25">
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                                        🎯 BOARD EXAM STRATEGY
                                    </h4>
                                    <p className="font-jakarta text-xs text-zinc-300 leading-relaxed">
                                        {activeTopic.examTip}
                                    </p>
                                </div>

                                {/* Keywords */}
                                <div className="p-3 rounded-2xl border border-white/10 bg-black/30">
                                    <div className="text-[10px] font-mono text-zinc-400 uppercase mb-1.5">
                                        Trigger Keywords:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeTopic.keywords.map((kw, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-semibold"
                                            >
                                                #{kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab Content 2: Distractor Traps ("Bakit Mali") */}
                        {activeTab === 'traps' && (
                            <div className="space-y-2 animate-in fade-in duration-200">
                                <div className="text-[11px] text-zinc-300 font-medium px-1">
                                    Common mistake traps on the board exam:
                                </div>
                                {activeTopic.distractorTraps.map((trap, i) => (
                                    <div key={i} className="p-3 rounded-2xl border border-rose-500/30 bg-[#160d1e]/90 space-y-1">
                                        <div className="text-xs font-bold text-rose-200 flex items-center gap-1.5">
                                            <span>✕</span>
                                            <span>{trap.concept}</span>
                                        </div>
                                        <div className="text-[11px] text-zinc-300 leading-relaxed pl-4">
                                            <span className="text-amber-300 font-semibold">Bakit Mali:</span> {trap.whyIncorrect}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tab Content 3: References & Legitimate Links */}
                        {activeTab === 'links' && (
                            <div className="space-y-2 animate-in fade-in duration-200">
                                <div className="text-[11px] text-zinc-300 font-medium px-1">
                                    Curriculum references and syllabus sources:
                                </div>
                                {activeTopic.references.map((ref, i) => (
                                    <a
                                        key={i}
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-2xl bg-[#0c0e24]/90 hover:bg-purple-950/40 border border-indigo-500/30 text-xs text-zinc-200 hover:text-white transition-all flex items-center justify-between group"
                                    >
                                        <span className="truncate pr-2 font-medium group-hover:text-purple-200">
                                            {ref.title}
                                        </span>
                                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-400/30 uppercase shrink-0">
                                            {ref.badge}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Action: Launch Quick Drill on this Topic */}
                        {onStartTopicDrill && (
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => onStartTopicDrill(activeTopic.id)}
                                    className="w-full py-3.5 px-4 rounded-2xl font-cinzel text-xs font-bold tracking-wider text-white uppercase bg-gradient-to-r from-purple-700 to-indigo-600 border border-purple-300/40 shadow-lg hover:shadow-purple-500/50 active:scale-[0.985] transition-all cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>PRACTICE DRILL ON THIS TOPIC</span>
                                    <span className="text-amber-300">✦</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ClassroomBackground>
    );
}
