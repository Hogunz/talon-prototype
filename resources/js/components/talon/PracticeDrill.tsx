import React, { useState } from 'react';
import { ClassroomBackground } from './ClassroomBackground';

// ─── Types ────────────────────────────────────────────────────────────────────
interface DrillQuestion {
    id: number;
    stem: string;
    options: { key: string; text: string }[];
    correctKey: string;
    whyCorrect: string;
    whyWrong: string;
    boardTrap?: string;
}

interface TopicDrillBank {
    topicId: string;
    topicLabel: string;
    subject: string;
    accentColor: string;
    questions: DrillQuestion[];
}

// ─── Per-Topic QBank (distinct from Formative Test) ───────────────────────────
const DRILL_BANKS: TopicDrillBank[] = [
    // ── WEB DEVELOPMENT ───────────────────────────────────────────────────────
    {
        topicId: 'web-development',
        topicLabel: 'Web Technologies',
        subject: 'HTML / CSS / JavaScript',
        accentColor: 'from-indigo-500 to-purple-600',
        questions: [
            {
                id: 1,
                stem: 'A web page element has `position: absolute`. Where is it positioned relative to?',
                options: [
                    { key: 'A', text: 'The browser viewport, always' },
                    { key: 'B', text: 'The nearest ancestor with a non-static position' },
                    { key: 'C', text: 'The body element, always' },
                    { key: 'D', text: 'The next sibling element in the DOM' },
                ],
                correctKey: 'B',
                whyCorrect: '`position: absolute` removes the element from normal flow and anchors it to the closest positioned ancestor (relative/absolute/fixed/sticky). If none exists, it uses the <html> element.',
                whyWrong: 'Option A describes `position: fixed`. Option C is a common misconception. Option D is incorrect — siblings have no positional authority.',
                boardTrap: 'Board trap: Always check what parent has a non-static position before predicting where an absolutely positioned child will land.',
            },
            {
                id: 2,
                stem: 'Which HTTP status code means the requested resource has permanently moved to a new URL?',
                options: [
                    { key: 'A', text: '200 OK' },
                    { key: 'B', text: '301 Moved Permanently' },
                    { key: 'C', text: '302 Found (Temporary Redirect)' },
                    { key: 'D', text: '404 Not Found' },
                ],
                correctKey: 'B',
                whyCorrect: '301 Moved Permanently signals that a resource has a new permanent URL. Browsers and search engines cache this redirect.',
                whyWrong: '302 is a temporary redirect (resource may return). 200 is success. 404 means the resource does not exist at that URL.',
                boardTrap: 'Distinguish 301 (permanent, SEO juice transferred) from 302 (temporary, SEO juice stays at old URL).',
            },
            {
                id: 3,
                stem: 'In CSS, which specificity value is HIGHEST and overrides all others?',
                options: [
                    { key: 'A', text: 'A class selector (.btn)' },
                    { key: 'B', text: 'An element selector (div)' },
                    { key: 'C', text: 'An ID selector (#header)' },
                    { key: 'D', text: 'An inline style attribute (style="...")' },
                ],
                correctKey: 'D',
                whyCorrect: 'Specificity order (lowest to highest): element → class → ID → inline style → !important. Inline styles always win over external or embedded CSS.',
                whyWrong: 'ID (#) beats class (.) and element, but inline style beats all three. !important overrides inline too, but is not a selector.',
                boardTrap: 'Specificity chain: 0,0,0,1 (element) < 0,0,1,0 (class) < 0,1,0,0 (ID) < 1,0,0,0 (inline). Memorize this order.',
            },
            {
                id: 4,
                stem: 'What is the purpose of the `async` attribute on a `<script>` tag in HTML?',
                options: [
                    { key: 'A', text: 'Loads and executes the script after the entire HTML document is parsed' },
                    { key: 'B', text: 'Loads the script in parallel, executes as soon as it is downloaded (may block parsing)' },
                    { key: 'C', text: 'Prevents the script from running until the user clicks a button' },
                    { key: 'D', text: 'Makes the script run in a web worker thread' },
                ],
                correctKey: 'B',
                whyCorrect: '`async` downloads the script in parallel with HTML parsing, but executes it immediately when downloaded — which may interrupt parsing. Use `defer` if execution order matters.',
                whyWrong: 'Option A describes `defer`. Options C and D do not exist as `async` behaviors.',
                boardTrap: 'async = parallel download + immediate exec (unpredictable order). defer = parallel download + exec after HTML parsed (in order).',
            },
            {
                id: 5,
                stem: 'Which JavaScript array method creates a NEW array containing only elements that pass a test function?',
                options: [
                    { key: 'A', text: '.forEach()' },
                    { key: 'B', text: '.map()' },
                    { key: 'C', text: '.filter()' },
                    { key: 'D', text: '.reduce()' },
                ],
                correctKey: 'C',
                whyCorrect: '.filter() returns a new array with only the elements where the callback returns true. It does not mutate the original array.',
                whyWrong: '.forEach() runs a function on each item but returns undefined. .map() transforms each item. .reduce() condenses to a single value.',
            },
        ],
    },

    // ── DATABASE MANAGEMENT & SQL ──────────────────────────────────────────────
    {
        topicId: 'database-sql',
        topicLabel: 'Database Management & SQL',
        subject: 'SQL / Relational DBMS / Normalization',
        accentColor: 'from-rose-500 to-amber-600',
        questions: [
            {
                id: 1,
                stem: 'In a relational database, what does a FOREIGN KEY enforce?',
                options: [
                    { key: 'A', text: 'That all values in a column are unique' },
                    { key: 'B', text: 'That a column value must exist as a PRIMARY KEY in another (referenced) table' },
                    { key: 'C', text: 'That the column cannot contain NULL values' },
                    { key: 'D', text: 'That the column auto-increments with each new record' },
                ],
                correctKey: 'B',
                whyCorrect: 'A FOREIGN KEY enforces referential integrity — it guarantees that the value in one table exists as a valid primary key in another table, preventing orphaned records.',
                whyWrong: 'UNIQUE constraint ensures uniqueness (A). NOT NULL prevents nulls (C). AUTO_INCREMENT handles auto-incrementing (D).',
                boardTrap: 'Referential integrity = FOREIGN KEY. A FK can be NULL unless also constrained with NOT NULL.',
            },
            {
                id: 2,
                stem: 'What is the result of an INNER JOIN between Table A (5 rows) and Table B (4 rows) when only 3 rows match?',
                options: [
                    { key: 'A', text: '9 rows (5 + 4)' },
                    { key: 'B', text: '20 rows (5 × 4 Cartesian)' },
                    { key: 'C', text: '3 rows (only matching rows)' },
                    { key: 'D', text: '5 rows (all rows from Table A)' },
                ],
                correctKey: 'C',
                whyCorrect: 'INNER JOIN returns only the rows where the join condition is satisfied in BOTH tables. Non-matching rows are excluded.',
                whyWrong: 'LEFT JOIN would give 5 rows (D). CROSS JOIN gives 20 rows (B). UNION (not a JOIN) gives 9 rows (A).',
                boardTrap: 'INNER JOIN = intersection. LEFT JOIN = all left + matching right. RIGHT JOIN = all right + matching left. FULL JOIN = all rows both sides.',
            },
            {
                id: 3,
                stem: 'Which SQL command is used to permanently remove a table and all its data from the database?',
                options: [
                    { key: 'A', text: 'DELETE FROM table_name' },
                    { key: 'B', text: 'TRUNCATE TABLE table_name' },
                    { key: 'C', text: 'DROP TABLE table_name' },
                    { key: 'D', text: 'REMOVE TABLE table_name' },
                ],
                correctKey: 'C',
                whyCorrect: 'DROP TABLE removes the entire table structure and all its data permanently. It is a DDL (Data Definition Language) command and is not easily reversible.',
                whyWrong: 'DELETE removes rows but keeps the table (DML). TRUNCATE removes all rows but keeps the table structure (DDL but table survives). REMOVE TABLE is not valid SQL.',
                boardTrap: 'DELETE (removes rows, logged, can rollback) vs TRUNCATE (removes all rows fast, minimal log) vs DROP (removes the entire table).',
            },
            {
                id: 4,
                stem: 'A table is in 2NF but has a non-key column that depends on another non-key column. What normal form is violated?',
                options: [
                    { key: 'A', text: '1NF' },
                    { key: 'B', text: '2NF' },
                    { key: 'C', text: '3NF' },
                    { key: 'D', text: 'BCNF' },
                ],
                correctKey: 'C',
                whyCorrect: '3NF requires that no non-key attribute depends on another non-key attribute (no transitive dependency). The scenario described is a transitive dependency, violating 3NF.',
                whyWrong: '1NF deals with atomic values. 2NF deals with partial dependencies on composite keys. BCNF is stricter than 3NF (every determinant is a candidate key).',
                boardTrap: '2NF: no partial dependency. 3NF: no transitive dependency. This exact scenario (non-key → non-key) is the most common 3NF board question.',
            },
            {
                id: 5,
                stem: 'What does the SQL aggregate function COUNT(column_name) count versus COUNT(*)?',
                options: [
                    { key: 'A', text: 'COUNT(col) and COUNT(*) always return the same value' },
                    { key: 'B', text: 'COUNT(col) counts non-NULL values in that column; COUNT(*) counts all rows including NULLs' },
                    { key: 'C', text: 'COUNT(*) counts only distinct values; COUNT(col) counts all rows' },
                    { key: 'D', text: 'COUNT(col) counts rows with unique values; COUNT(*) counts duplicate rows' },
                ],
                correctKey: 'B',
                whyCorrect: 'COUNT(column) ignores NULL values in that column. COUNT(*) counts every row regardless of NULL. This distinction matters when columns have optional (nullable) data.',
                whyWrong: 'They can return different values when NULLs are present (A is wrong). C and D are incorrect descriptions of COUNT behavior.',
            },
        ],
    },

    // ── OBJECT-ORIENTED PROGRAMMING ───────────────────────────────────────────
    {
        topicId: 'oop-basics',
        topicLabel: 'Object-Oriented Programming',
        subject: 'OOP Core / Design Patterns / SOLID',
        accentColor: 'from-amber-500 to-yellow-500',
        questions: [
            {
                id: 1,
                stem: 'Which OOP concept allows a single method name to behave differently depending on which object calls it?',
                options: [
                    { key: 'A', text: 'Encapsulation' },
                    { key: 'B', text: 'Inheritance' },
                    { key: 'C', text: 'Polymorphism' },
                    { key: 'D', text: 'Abstraction' },
                ],
                correctKey: 'C',
                whyCorrect: 'Polymorphism ("many forms") lets the same method name produce different behavior based on the object type. Examples: method overriding (runtime) and method overloading (compile-time).',
                whyWrong: 'Encapsulation hides data (private fields). Inheritance passes properties to subclasses. Abstraction hides implementation complexity. These are related but distinct pillars.',
                boardTrap: 'Runtime polymorphism = method overriding (different classes, same method name). Compile-time polymorphism = method overloading (same class, same name, different params).',
            },
            {
                id: 2,
                stem: 'In Java/C#, a class that CANNOT be instantiated directly and may contain both abstract and concrete methods is called:',
                options: [
                    { key: 'A', text: 'An Interface' },
                    { key: 'B', text: 'An Abstract Class' },
                    { key: 'C', text: 'A Static Class' },
                    { key: 'D', text: 'A Sealed/Final Class' },
                ],
                correctKey: 'B',
                whyCorrect: 'An abstract class cannot be instantiated directly — it must be subclassed. It can have both abstract methods (no implementation) and concrete methods (with implementation).',
                whyWrong: 'An Interface (traditionally) only contains method signatures — no concrete implementations. Static classes are for utility methods. Sealed/Final classes CANNOT be subclassed.',
                boardTrap: 'Key distinction: Abstract class = partial implementation, single inheritance. Interface = contract only, multiple implementation supported.',
            },
            {
                id: 3,
                stem: 'What SOLID principle states that a class should have only ONE reason to change?',
                options: [
                    { key: 'A', text: 'Open/Closed Principle' },
                    { key: 'B', text: 'Liskov Substitution Principle' },
                    { key: 'C', text: 'Single Responsibility Principle' },
                    { key: 'D', text: 'Dependency Inversion Principle' },
                ],
                correctKey: 'C',
                whyCorrect: 'The Single Responsibility Principle (SRP) states that a class should do only one thing and have only one reason to change. This makes the code easier to maintain and test.',
                whyWrong: 'Open/Closed: open for extension, closed for modification. Liskov: subclasses must be substitutable for parent. Dependency Inversion: depend on abstractions, not concretions.',
                boardTrap: 'Acronym SOLID = Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
            },
            {
                id: 4,
                stem: 'In a class hierarchy, `super()` in a child class constructor is used to:',
                options: [
                    { key: 'A', text: 'Create a new instance of the parent class' },
                    { key: 'B', text: 'Call the parent class\'s constructor to initialize inherited fields' },
                    { key: 'C', text: 'Override the parent method with the child method' },
                    { key: 'D', text: 'Make the child class final (cannot be extended further)' },
                ],
                correctKey: 'B',
                whyCorrect: 'super() calls the parent class constructor. This is necessary to properly initialize fields defined in the parent. Java requires super() to be the first statement in a child constructor.',
                whyWrong: 'super() does not create a new object (A). Overriding is done by re-defining the method with the @Override annotation (C). Final is a class-level keyword (D).',
            },
            {
                id: 5,
                stem: 'Which design pattern ensures that only ONE instance of a class is created throughout the application lifecycle?',
                options: [
                    { key: 'A', text: 'Factory Pattern' },
                    { key: 'B', text: 'Observer Pattern' },
                    { key: 'C', text: 'Singleton Pattern' },
                    { key: 'D', text: 'Decorator Pattern' },
                ],
                correctKey: 'C',
                whyCorrect: 'The Singleton pattern restricts instantiation of a class to a single object. It is commonly used for database connections, configuration managers, and logging services.',
                whyWrong: 'Factory creates objects without specifying exact class. Observer defines one-to-many event dependencies. Decorator adds behavior to objects dynamically without changing their class.',
                boardTrap: 'Singleton is often asked with threading — you must make getInstance() thread-safe (double-checked locking) in multi-threaded environments.',
            },
        ],
    },

    // ── NETWORKING ────────────────────────────────────────────────────────────
    {
        topicId: 'networking',
        topicLabel: 'Computer Networking',
        subject: 'OSI Model / TCP/IP / Protocols',
        accentColor: 'from-cyan-500 to-blue-600',
        questions: [
            {
                id: 1,
                stem: 'At which OSI layer does a ROUTER primarily operate?',
                options: [
                    { key: 'A', text: 'Layer 1 — Physical' },
                    { key: 'B', text: 'Layer 2 — Data Link' },
                    { key: 'C', text: 'Layer 3 — Network' },
                    { key: 'D', text: 'Layer 4 — Transport' },
                ],
                correctKey: 'C',
                whyCorrect: 'Routers operate at Layer 3 (Network layer) and use IP addresses to forward packets between different networks. They make routing decisions based on IP routing tables.',
                whyWrong: 'Layer 1 (Physical) = hubs and cables. Layer 2 (Data Link) = switches and MAC addresses. Layer 4 (Transport) = TCP/UDP ports.',
                boardTrap: 'Device-layer mapping: Hub → L1, Switch → L2, Router → L3, Gateway → L3–L7.',
            },
            {
                id: 2,
                stem: 'What is the key difference between TCP and UDP?',
                options: [
                    { key: 'A', text: 'TCP is faster; UDP is more reliable' },
                    { key: 'B', text: 'TCP guarantees ordered, reliable delivery; UDP is faster but connectionless with no delivery guarantee' },
                    { key: 'C', text: 'UDP is used only for file transfers; TCP is for streaming video' },
                    { key: 'D', text: 'There is no difference — they both use IP and deliver packets in order' },
                ],
                correctKey: 'B',
                whyCorrect: 'TCP (Transmission Control Protocol) uses a 3-way handshake, ensures ordered delivery, and retransmits lost packets. UDP (User Datagram Protocol) is connectionless — faster but no guarantee.',
                whyWrong: 'TCP is more reliable, not faster (A is reversed). UDP is ideal for streaming video/gaming; TCP for file transfers (C is reversed). D is completely incorrect.',
                boardTrap: 'Use TCP for: web browsing (HTTP), email, file transfer (FTP). Use UDP for: live streaming, DNS queries, online gaming, VoIP.',
            },
            {
                id: 3,
                stem: 'Which IP address class supports the LARGEST number of host addresses per network?',
                options: [
                    { key: 'A', text: 'Class A (1.0.0.0 – 126.255.255.255)' },
                    { key: 'B', text: 'Class B (128.0.0.0 – 191.255.255.255)' },
                    { key: 'C', text: 'Class C (192.0.0.0 – 223.255.255.255)' },
                    { key: 'D', text: 'Class D (224.0.0.0 – 239.255.255.255)' },
                ],
                correctKey: 'A',
                whyCorrect: 'Class A uses 8 bits for the network and 24 bits for hosts → up to 16,777,214 hosts per network. It supports the fewest networks but the most hosts each.',
                whyWrong: 'Class B: 16-bit host field (~65,534 hosts). Class C: 8-bit host field (254 hosts). Class D is reserved for multicast — not for general host assignment.',
                boardTrap: 'Trade-off: Class A = few networks, many hosts. Class C = many networks, few hosts. Subnet mask: A=/8, B=/16, C=/24.',
            },
        ],
    },
];

// ─── Fallback for unknown topicId ─────────────────────────────────────────────
const FALLBACK_BANK: TopicDrillBank = {
    topicId: 'general',
    topicLabel: 'General IT Review',
    subject: 'Mixed Topics',
    accentColor: 'from-purple-500 to-indigo-600',
    questions: [
        {
            id: 1,
            stem: 'In software development, what does DRY stand for?',
            options: [
                { key: 'A', text: "Don't Repeat Yourself" },
                { key: 'B', text: 'Dynamic Runtime Yield' },
                { key: 'C', text: 'Distributed Resource Yielding' },
                { key: 'D', text: 'Data Retrieval Yield' },
            ],
            correctKey: 'A',
            whyCorrect: "DRY (Don't Repeat Yourself) is a software engineering principle that states every piece of knowledge or logic should have a single, authoritative representation in the system.",
            whyWrong: 'Options B, C, D are fabricated acronyms. DRY is a foundational principle alongside SOLID and KISS (Keep It Simple, Stupid).',
        },
    ],
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface PracticeDrillProps {
    topicId: string | null;
    onBack: () => void;
    onComplete?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function PracticeDrill({ topicId, onBack, onComplete }: PracticeDrillProps) {
    const bank = DRILL_BANKS.find((b) => b.topicId === topicId) ?? FALLBACK_BANK;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showTrap, setShowTrap] = useState(false);
    const [answers, setAnswers] = useState<{ correct: boolean }[]>([]);
    const [isDone, setIsDone] = useState(false);

    const question = bank.questions[currentIndex];
    const totalQuestions = bank.questions.length;
    const correctCount = answers.filter((a) => a.correct).length;
    const progressPct = ((currentIndex) / totalQuestions) * 100;

    const handleChoiceSelect = (key: string) => {
        if (showResult) return;
        setSelectedKey(key);
        setShowResult(true);
        setAnswers((prev) => [...prev, { correct: key === question.correctKey }]);
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((p) => p + 1);
            setSelectedKey(null);
            setShowResult(false);
            setShowTrap(false);
        } else {
            setIsDone(true);
        }
    };

    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passMark = 75;
    const hasPassed = scorePercent >= passMark;

    return (
        <ClassroomBackground variant="dark-mystic">
            <div className="flex flex-col w-full h-full min-h-[780px] max-w-md mx-auto px-4 pt-3 pb-3 select-none">

                {/* ── Header ──────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl cursor-pointer transition-all"
                    >
                        ← Back to Topic
                    </button>
                    <div className="text-right">
                        <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Practice Drill</div>
                        <div className="text-[11px] font-bold text-white truncate max-w-[160px]">{bank.topicLabel}</div>
                    </div>
                </div>

                {/* ── Progress Rail ────────────────────────────────────── */}
                {!isDone && (
                    <div className="mb-3 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span>Question {currentIndex + 1} of {totalQuestions}</span>
                            <span className="text-purple-300">{bank.subject}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#181b36] overflow-hidden">
                            <div
                                className={`h-full rounded-full bg-gradient-to-r ${bank.accentColor} transition-all duration-500`}
                                style={{ width: `${progressPct}%` }}
                            />
                        </div>
                        {/* Per-question dot tracker */}
                        <div className="flex gap-1 justify-center pt-0.5">
                            {bank.questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i < answers.length
                                            ? answers[i].correct
                                                ? 'bg-emerald-400 w-4'
                                                : 'bg-rose-500 w-4'
                                            : i === currentIndex
                                            ? 'bg-purple-400 w-4'
                                            : 'bg-zinc-600 w-2'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Question Body ────────────────────────────────────── */}
                {!isDone ? (
                    <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-0.5">

                        {/* Subject badge */}
                        <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${bank.accentColor} text-white/90`}>
                                {bank.subject}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">Board-Level Item</span>
                        </div>

                        {/* Question Stem */}
                        <div className="rounded-2xl bg-[#0c0e24]/90 border border-white/10 p-4">
                            <p className="font-jakarta text-sm text-zinc-100 leading-relaxed">{question.stem}</p>
                        </div>

                        {/* Answer Choices */}
                        <div className="space-y-2">
                            {question.options.map((opt) => {
                                const isSelected = selectedKey === opt.key;
                                const isCorrect = opt.key === question.correctKey;
                                let cls = 'border-white/10 bg-white/5 text-zinc-200 hover:border-purple-400 hover:bg-white/8';
                                if (showResult && isCorrect) {
                                    cls = 'border-emerald-400 bg-emerald-950/50 text-emerald-100 shadow-[0_0_14px_rgba(52,211,153,0.25)]';
                                } else if (showResult && isSelected && !isCorrect) {
                                    cls = 'border-rose-500 bg-rose-950/50 text-rose-200';
                                }

                                return (
                                    <button
                                        key={opt.key}
                                        onClick={() => handleChoiceSelect(opt.key)}
                                        disabled={showResult}
                                        className={`w-full flex items-start gap-3 text-left rounded-2xl border-2 px-3.5 py-3 transition-all duration-200 cursor-pointer active:scale-[0.98] ${cls}`}
                                    >
                                        <span className="shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-[11px] font-bold mt-0.5">
                                            {opt.key}
                                        </span>
                                        <span className="font-jakarta text-sm leading-snug">{opt.text}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Rationalization Panel */}
                        {showResult && (
                            <div className={`rounded-2xl p-3.5 border space-y-2 ${
                                selectedKey === question.correctKey
                                    ? 'bg-emerald-950/40 border-emerald-500/40'
                                    : 'bg-rose-950/40 border-rose-500/40'
                            }`}>
                                <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                                    {selectedKey === question.correctKey ? '✅ Correct!' : `❌ Incorrect — Answer is ${question.correctKey}`}
                                </div>
                                <p className="font-jakarta text-xs text-zinc-200 leading-relaxed">
                                    <strong className="text-emerald-300">Why Correct:</strong> {question.whyCorrect}
                                </p>
                                <p className="font-jakarta text-xs text-zinc-400 leading-relaxed">
                                    <strong className="text-rose-300">Why Others are Wrong:</strong> {question.whyWrong}
                                </p>

                                {/* Board Trap (collapsible) */}
                                {question.boardTrap && (
                                    <div>
                                        <button
                                            onClick={() => setShowTrap((p) => !p)}
                                            className="text-[10px] font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                                        >
                                            {showTrap ? '▾' : '▸'} BOARD EXAM TRAP
                                        </button>
                                        {showTrap && (
                                            <p className="font-jakarta text-xs text-amber-200 leading-relaxed mt-1 border-l-2 border-amber-400/50 pl-2">
                                                {question.boardTrap}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Next button */}
                        {showResult && (
                            <button
                                onClick={handleNext}
                                className={`w-full py-3.5 rounded-2xl font-cinzel text-xs font-bold uppercase tracking-widest cursor-pointer active:scale-95 transition-all bg-gradient-to-r ${bank.accentColor} text-white shadow-lg`}
                            >
                                {currentIndex < totalQuestions - 1 ? 'NEXT QUESTION →' : 'SEE MY SCORE →'}
                            </button>
                        )}
                    </div>
                ) : (
                    /* ── Results Screen ──────────────────────────────────── */
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">

                        <div className="text-5xl">
                            {scorePercent === 100 ? '🏆' : hasPassed ? '📈' : '📉'}
                        </div>

                        <div>
                            <div className="font-cinzel text-lg font-bold text-white">Practice Drill Complete</div>
                            <div className="text-sm font-mono text-zinc-400 mt-0.5">{bank.topicLabel}</div>
                        </div>

                        {/* Score Ring */}
                        <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center flex-col ${
                            hasPassed ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]' : 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                        }`}>
                            <span className={`font-jakarta text-3xl font-extrabold ${hasPassed ? 'text-emerald-300' : 'text-rose-300'}`}>
                                {scorePercent}%
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400">{correctCount}/{totalQuestions}</span>
                        </div>

                        <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full ${
                            hasPassed
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                        }`}>
                            {hasPassed
                                ? `✓ Above the ${passMark}% board passing threshold`
                                : `⚠️ Below the ${passMark}% threshold — review the rationales above!`}
                        </div>

                        {/* Per-question breakdown */}
                        <div className="w-full space-y-1.5">
                            {answers.map((a, i) => (
                                <div
                                    key={i}
                                    className={`w-full flex items-center gap-2.5 rounded-xl p-2.5 border text-xs ${
                                        a.correct
                                            ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300'
                                            : 'border-rose-500/30 bg-rose-950/30 text-rose-300'
                                    }`}
                                >
                                    <span className="text-sm">{a.correct ? '✅' : '❌'}</span>
                                    <span className="font-mono text-[10px] text-zinc-400">Q{i + 1}</span>
                                    <span className="font-jakarta text-[10px] truncate">{bank.questions[i].stem.slice(0, 55)}…</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 w-full mt-1">
                            <button
                                onClick={onBack}
                                className="py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-purple-200 font-cinzel text-xs font-bold uppercase cursor-pointer transition-all active:scale-95"
                            >
                                ← Back to Topic
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentIndex(0);
                                    setSelectedKey(null);
                                    setShowResult(false);
                                    setShowTrap(false);
                                    setAnswers([]);
                                    setIsDone(false);
                                }}
                                className={`py-3 rounded-2xl font-cinzel text-xs font-bold uppercase cursor-pointer transition-all active:scale-95 bg-gradient-to-r ${bank.accentColor} text-white`}
                            >
                                🔄 Retry Drill
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ClassroomBackground>
    );
}
