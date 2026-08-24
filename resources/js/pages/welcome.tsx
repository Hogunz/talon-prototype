import { Head, Link, usePage } from '@inertiajs/react';
import React, { useCallback, useState } from 'react';
import { BattleMode } from '@/components/talon/BattleMode';
import { DashboardLanding } from '@/components/talon/DashboardLanding';
import { DiagnosticQuiz } from '@/components/talon/DiagnosticQuiz';
import { FlashcardDeck } from '@/components/talon/FlashcardDeck';
import { FormativeTestScreen } from '@/components/talon/FormativeTestScreen';
import { PrototypeControls, ScreenId } from '@/components/talon/PrototypeControls';
import { SplashScreen } from '@/components/talon/SplashScreen';
import { TopicLibrary } from '@/components/talon/TopicLibrary';
import { WelcomeScreen } from '@/components/talon/WelcomeScreen';
import { login } from '@/routes';

// Web Audio API Sound Synthesizer for magical SFX without external dependencies
function playMagicSfx(type: 'click' | 'advance' | 'chime' | 'success') {
    try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const now = ctx.currentTime;

        if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'advance') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'chime' || type === 'success') {
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.06);
                gain.gain.setValueAtTime(0.1, now + i * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.06);
                osc.stop(now + i * 0.06 + 0.25);
            });
        }
    } catch {
        // AudioContext not allowed before user gesture or unsupported
    }
}

export default function Welcome() {
    const { auth } = usePage().props;
    const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
    const [isMobileFrame, setIsMobileFrame] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const triggerSfx = useCallback((type: 'click' | 'advance' | 'chime' | 'success') => {
        if (soundEnabled) {
            playMagicSfx(type);
        }
    }, [soundEnabled]);

    const handleSelectScreen = (screen: ScreenId) => {
        triggerSfx('click');
        if (screen !== 'library') {
            setSelectedTopicId(null);
        }
        setCurrentScreen(screen);
    };

    const handleSplashComplete = () => {
        triggerSfx('chime');
        setCurrentScreen('welcome');
    };

    const handleEnterAcademy = () => {
        triggerSfx('advance');
        setCurrentScreen('formative-1');
    };

    const handleStartTest = () => {
        triggerSfx('success');
        setCurrentScreen('quiz');
    };

    return (
        <>
            <Head title="TALON - Educational RPG Academy" />

            <div className="min-h-screen bg-[#03040a] text-zinc-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
                {/* Prototype Top Bar with Screen Switcher & Controls */}
                <PrototypeControls
                    currentScreen={currentScreen}
                    onSelectScreen={handleSelectScreen}
                    isMobileFrame={isMobileFrame}
                    onToggleMobileFrame={() => setIsMobileFrame((prev) => !prev)}
                    soundEnabled={soundEnabled}
                    onToggleSound={() => setSoundEnabled((prev) => !prev)}
                />

                {/* Stage Presentation Container */}
                <main className="flex-1 flex flex-col items-center justify-center p-0 sm:p-6 md:p-8 relative overflow-hidden">
                    
                    {/* Atmospheric background for outside of mobile frame */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-[#050711] to-[#020307] pointer-events-none -z-10" />

                    {/* Mobile Phone Mockup Frame or Fullscreen Canvas */}
                    <div 
                        className={`w-full transition-all duration-500 ease-in-out ${
                            isMobileFrame
                                ? 'max-w-[390px] min-h-[780px] h-[844px] rounded-[48px] border-[10px] border-[#181a2e] shadow-[0_0_60px_rgba(124,58,237,0.25),0_25px_50px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col bg-black my-auto ring-1 ring-purple-500/30'
                                : 'w-full min-h-screen flex flex-col'
                        }`}
                    >
                        {/* Mobile Status Bar / Dynamic Island simulation (only in mobile frame mode) */}
                        {isMobileFrame && (
                            <header 
                                aria-label="Simulated Mobile Status Bar"
                                className="w-full bg-[#070814] px-7 pt-3 pb-1 flex items-center justify-between z-40 shrink-0 select-none pointer-events-none"
                            >
                                <span className="text-[11px] font-semibold text-zinc-300">9:41</span>
                                
                                {/* Dynamic Island Pill */}
                                <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-900/60" />
                                </div>

                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-300">
                                    <span>5G</span>
                                    <span>100%</span>
                                </div>
                            </header>
                        )}

                        {/* Active Screen Renderer */}
                        <div className="w-full flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
                            {currentScreen === 'splash' && (
                                <SplashScreen onComplete={handleSplashComplete} />
                            )}

                            {currentScreen === 'welcome' && (
                                <WelcomeScreen
                                    onEnterAcademy={handleEnterAcademy}
                                    onExistingAccount={() => {
                                        triggerSfx('click');
                                        window.location.href = login.url();
                                    }}
                                />
                            )}

                            {currentScreen === 'formative-1' && (
                                <FormativeTestScreen
                                    initialStep={1}
                                    onStartTest={handleStartTest}
                                    onBack={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('welcome');
                                    }}
                                />
                            )}

                            {currentScreen === 'formative-2' && (
                                <FormativeTestScreen
                                    initialStep={2}
                                    onStartTest={handleStartTest}
                                    onBack={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('welcome');
                                    }}
                                />
                            )}

                            {currentScreen === 'formative-3' && (
                                <FormativeTestScreen
                                    initialStep={3}
                                    onStartTest={handleStartTest}
                                    onBack={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('welcome');
                                    }}
                                />
                            )}

                            {currentScreen === 'quiz' && (
                                <DiagnosticQuiz
                                    onClose={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('landing');
                                    }}
                                    onViewTopicInLibrary={(topicId) => {
                                        triggerSfx('click');
                                        setSelectedTopicId(topicId);
                                        setCurrentScreen('library');
                                    }}
                                />
                            )}

                            {currentScreen === 'landing' && (
                                <DashboardLanding
                                    onOpenBattle={() => {
                                        triggerSfx('advance');
                                        setCurrentScreen('battle');
                                    }}
                                    onResumeReview={() => {
                                        triggerSfx('advance');
                                        setCurrentScreen('quiz');
                                    }}
                                    onOpenLibrary={() => {
                                        triggerSfx('click');
                                        setSelectedTopicId(null);
                                        setCurrentScreen('library');
                                    }}
                                />
                            )}

                            {currentScreen === 'library' && (
                                <TopicLibrary
                                    initialTopicId={selectedTopicId}
                                    onBack={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('landing');
                                    }}
                                    onStartTopicDrill={() => {
                                        triggerSfx('advance');
                                        setCurrentScreen('quiz');
                                    }}
                                    onOpenFlashcards={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('flashcards');
                                    }}
                                />
                            )}

                            {currentScreen === 'flashcards' && (
                                <FlashcardDeck
                                    onBack={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('library');
                                    }}
                                    onComplete={() => {
                                        triggerSfx('success');
                                        setCurrentScreen('landing');
                                    }}
                                />
                            )}

                            {currentScreen === 'battle' && (
                                <BattleMode
                                    onBack={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('landing');
                                    }}
                                    onVictory={() => {
                                        triggerSfx('success');
                                        setCurrentScreen('landing');
                                    }}
                                    onDefeat={() => {
                                        triggerSfx('click');
                                        setCurrentScreen('landing');
                                    }}
                                />
                            )}
                        </div>

                        {/* Mobile Home Bar indicator (only in mobile frame mode) */}
                        {isMobileFrame && (
                            <footer 
                                aria-label="Simulated Mobile Navigation Bar"
                                className="w-full bg-[#04050d] py-2 flex justify-center items-center z-40 shrink-0 pointer-events-none"
                            >
                                <div className="w-32 h-1 bg-white/30 rounded-full" />
                            </footer>
                        )}
                    </div>

                    {/* Quick navigation hint under mockup */}
                    {isMobileFrame && (
                        <nav aria-label="Screen Quick Switcher" className="hidden sm:flex items-center gap-2 mt-4 text-xs text-zinc-400 font-mono">
                            <span>✦ Prototype Hint:</span>
                            <span className="text-zinc-500">Tap anywhere on the Owl mascot or speech bubbles to interact and advance!</span>
                        </nav>
                    )}
                </main>
            </div>
        </>
    );
}
