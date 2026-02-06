import React, { useState, useEffect } from 'react';
import { PRACTICE_CHAPTERS } from "./data/chapter/chapters";
import { 
  BrainCircuit, 
  MessageSquareText, 
  Network, 
  ShieldCheck, 
  Briefcase, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  ArrowRight,
  Bot,
  Layers,
  Award
} from 'lucide-react';
import { Question, Chapter, QuizState, ViewState, AIConfig } from './types';
import { generateQuestions } from './services/geminiService';


const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300",
    secondary: "bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm",
    ghost: "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
  ,
  soft: "bg-transparent text-indigo-600 hover:bg-indigo-50"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}> = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-card bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 
        ${hoverable ? 'cursor-pointer hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-300' : ''} 
        ${className}`}
    >
      {children}
    </div>
  );
};

const Header: React.FC<{
  currentView: ViewState;
  onHome: () => void;
  onChapters: () => void;
  onGenerate: () => void;
}> = ({ currentView, onHome, onChapters, onGenerate }) => (
  <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
      
      <div
  onClick={onHome}
  className="flex items-center gap-2 cursor-pointer"
>
  <img
    src="/assets/logo.png"
    alt="AIXam Logo"
    className="w-8 h-8 object-contain"
  />
  <span className="font-semibold text-base text-slate-800">
    Testology
  </span>
</div>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <span
          onClick={onHome}
          className={`cursor-pointer ${
            currentView === 'HOME'
              ? 'text-indigo-600 font-medium'
              : 'text-slate-500 hover:text-indigo-600'
          }`}
        >
          Home
        </span>

        <span
          onClick={onChapters}
          className={`cursor-pointer ${
            currentView === 'CHAPTERS'
              ? 'text-indigo-600 font-medium'
              : 'text-slate-500 hover:text-indigo-600'
          }`}
        >
          Chapters
        </span>

        <span
          onClick={onGenerate}
          className="cursor-not-allowed text-slate-400"
          title="Coming Soon"
        >
          Generate Questions
        </span>
      </nav>

      {/* Avatar */}
      <img
        src="/assets/omar.jpg"
        className="w-8 h-8 rounded-full object-cover border"
      />
    </div>
  </header>
);

// --- Main App Logic ---

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="px-6 py-4 rounded-2xl bg-white shadow border">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-slate-500">{label}</div>
  </div>
);

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`px-5 py-3 rounded-2xl bg-white shadow text-center text-indigo-600 font-semibold ${className}`}
  >
    {children}
  </div>
);

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  const [quizState, setQuizState] = useState<QuizState>({
    answers: [],
    isSubmitted: false,
    score: 0
  });

  const [aiConfig, setAiConfig] = useState<AIConfig>({
    isLoading: false,
    error: null
  });

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);

  /* ================= TIMER ================= */
  const EXAM_DURATION = 60 * 60; // 60 minutes
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
  if (timeLeft === null) return;

  if (timeLeft <= 0) {
    handleSubmit();
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft(prev => (prev !== null ? prev - 1 : null));
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6" />;
      case 'MessageSquareText': return <MessageSquareText className="w-6 h-6" />;
      case 'Network': return <Network className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  const startChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setCurrentQuestions(chapter.questions);
    setQuizState({
      answers: new Array(chapter.questions.length).fill(null),
      isSubmitted: false,
      score: 0
    });
    setView('QUIZ');
  };
const startChapterExam = (chapter: Chapter) => {
  if (!chapter.exam) return;

  setActiveChapter(chapter.exam);
  setCurrentQuestions(chapter.exam.questions);

  setQuizState({
    answers: new Array(chapter.exam.questions.length).fill(null),
    isSubmitted: false,
    score: 0
  });

  setTimeLeft(EXAM_DURATION);
  setView("QUIZ");
};

  const handleGenerateAI = async () => {
    setAiConfig({ isLoading: true, error: null });
    try {
      // Simulate selecting a random topic or comprehensive
      const questions = await generateQuestions("General Generative AI Concepts for Certification");
      const generatedChapter: Chapter = {
        id: 'ai-generated',
        title: 'AI Generated Practice',
        description: 'Custom questions generated by Gemini just for you.',
        icon: 'Sparkles',
        questions: questions
      };
      startChapter(generatedChapter);
    } catch (err) {
      setAiConfig({ isLoading: false, error: "Failed to generate questions. Please try again." });
    } finally {
      setAiConfig((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizState.isSubmitted) return;
    
    const newAnswers = [...quizState.answers];
    newAnswers[questionIndex] = optionIndex;
    setQuizState({ ...quizState, answers: newAnswers });
  };

  const handleSubmit = () => {
    let score = 0;
    currentQuestions.forEach((q, idx) => {
      if (quizState.answers[idx] === q.correctIndex) {
        score++;
      }
    });
    setQuizState({ ...quizState, isSubmitted: true, score });
    setView('RESULTS');
  };

  const handleRetry = () => {
  setQuizState({
    answers: new Array(currentQuestions.length).fill(null),
    isSubmitted: false,
    score: 0
  });

  if (activeChapter?.id.includes("exam")) {
    setTimeLeft(EXAM_DURATION);
  }

  setView('QUIZ');
};


  // --- Views ---
const renderHome = () => (
  <section className="relative overflow-hidden">
    
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />

    <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-28 items-center">
      
      {/* ================= LEFT ================= */}
      <div className="space-y-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
          ✨ AI-Powered Certification Prep
        </span>

        <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
          Discover Smarter <br />
          Learning With{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            AI
          </span>
        </h1>

        <p className="text-lg text-slate-600 max-w-xl">
          Prepare for your Gen AI certification with chapter-based practice
          and AI-generated questions tailored to your learning journey.
        </p>

        <div className="flex items-center gap-6">
          <Button
            onClick={() => setView("CHAPTERS")}
            className="px-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
</div>
      {/* ================= RIGHT ================= */}
      <div className="relative flex justify-center">
        
        {/* Glow خلف الروبوت */}
        <div className="absolute w-[720px] h-[720px] bg-indigo-200/40 rounded-full blur-3xl" />

        <div className="relative">
          
          {/* Badge فوق */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow text-indigo-600 text-sm font-semibold animate-float">
            Hi <div className="text-xs text-slate-400">I'm Za'atar 👋</div>
          </div>

          {/* ROBOT */}
          <img
            src="/assets/robot.png"
            className="w-[920px] max-w-none animate-float drop-shadow-2xl relative z-10"
            alt="AI Robot"
          />
        </div>
      </div>
    </div>
  </section>
);


 const renderChapters = () => (
  <div className="max-w-7xl mx-auto px-6 pb-24">
    <div className="text-center mb-14 space-y-4">
      <h2 className="text-4xl font-bold text-slate-900">
        Choose a Chapter
      </h2>
      <p className="text-slate-500 text-lg">
        Practice step by step or take a full chapter exam.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PRACTICE_CHAPTERS.map((chapter) => (
        <Card
          key={chapter.id}
          hoverable
          className="flex flex-col h-full relative overflow-hidden"
        >
          {/* Decorative shape */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px]" />

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 relative z-10">
            {getIcon(chapter.icon)}
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">
            {chapter.title}
          </h3>

          <p className="text-slate-500 mb-8 flex-grow relative z-10">
            {chapter.description}
          </p>

          {/* Actions */}
         <div className="flex flex-col gap-3 relative z-10">

 <Button
  variant="soft"
  className="justify-between w-full"
  onClick={() => startChapter(chapter)}
>
  Start Practice
  <ChevronRight className="w-4 h-4" />
</Button>


  <Button
  variant="soft"
  className="justify-between w-full"
  onClick={() => startChapterExam(chapter)}
>
  Start Exam
  <ChevronRight className="w-4 h-4" />
</Button>




</div>

        </Card>
      ))}

      {/* AI Generator */}
      <Card className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white relative overflow-hidden border-none shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              AI Generator
            </h3>

            <p className="text-indigo-100 mb-8">
              Instantly create a unique practice set tailored to random certification topics.
            </p>
          </div>

         <Button
  onClick={handleGenerateAI}
  className="
    bg-white
    !text-indigo-700
    hover:bg-indigo-600
    hover:!text-white
    transition-all
  "
  disabled={aiConfig.isLoading}
>
  {aiConfig.isLoading ? "Generating..." : "Generate Questions"}
</Button>


        </div>
      </Card>
    </div>
  </div>
);

const OptionCard = ({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`
      rounded-2xl border p-4 cursor-pointer transition-all
      ${selected
        ? 'border-indigo-600 bg-indigo-50 shadow'
        : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
      }
    `}
  >
    <div className="flex items-center gap-3">
      <div
        className={`
          w-5 h-5 rounded-full border flex items-center justify-center
          ${selected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'}
        `}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>

      <span className="text-slate-700 text-sm">{text}</span>
    </div>
  </div>
);
{activeChapter?.id.includes("exam") && timeLeft !== null && (
  <div className="mb-6 flex justify-center">
    <div className="px-6 py-3 rounded-full bg-red-50 text-red-700 font-bold text-sm shadow">
      ⏱️ Time Left: {Math.floor(timeLeft / 60)}:
      {(timeLeft % 60).toString().padStart(2, "0")}
    </div>
  </div>
)}

const QuizHeader = ({
  title,
  answered,
  total,
  isFinalExam,
}: {
  title?: string;
  answered: number;
  total: number;
  isFinalExam: boolean;
}) => (
  <Card className="mb-8 bg-indigo-50 border border-indigo-100">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-indigo-700">
            {title}
          </h4>

          {isFinalExam && (
            <span className="
              px-3 py-1 rounded-full
              bg-red-50 text-red-700
              text-xs font-bold
            ">
              Final Mock Exam
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500">
          {isFinalExam ? "Exam Mode" : "Practice Mode"}
        </p>
      </div>

      <Badge>
        {answered} / {total}
      </Badge>
    </div>
  </Card>
);
{/* ===== FINAL EXAM TIMER ===== */}
{activeChapter?.id.includes("exam") && timeLeft !== null && (
  <div className="mb-8">

    <div className="flex justify-between items-center text-sm text-slate-600 mb-2">
      <span className="font-medium">Time Remaining</span>
      <span className="font-bold text-red-600">
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </span>
    </div>

    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-full transition-all duration-1000"
        style={{
          width: `${(timeLeft / EXAM_DURATION) * 100}%`,
          background:
            timeLeft / EXAM_DURATION > 0.5
              ? "linear-gradient(to right, #22c55e, #84cc16)"
              : timeLeft / EXAM_DURATION > 0.25
              ? "linear-gradient(to right, #facc15, #f97316)"
              : "linear-gradient(to right, #ef4444, #b91c1c)",
        }}
      />
    </div>

  </div>
)}
{/* ===== END TIMER ===== */}

const renderQuiz = () => {
  const isFinalExam = activeChapter?.id.includes("exam") ?? false;
  const progress =
    isFinalExam && timeLeft !== null
      ? timeLeft / EXAM_DURATION
      : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">

      {/* ===== FINAL EXAM TIMER ===== */}
      {isFinalExam && timeLeft !== null && (
        <div className="mb-8">

          <div className="flex justify-between items-center text-sm text-slate-600 mb-2">
            <span className="font-medium">Time Remaining</span>
            <span className="font-bold text-red-600">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full transition-all duration-1000 ease-linear"
              style={{
                width: `${progress * 100}%`,
                background:
                  progress > 0.5
                    ? "linear-gradient(to right, #22c55e, #16a34a)" // 🟢 أخضر
                    : progress > 0.25
                    ? "linear-gradient(to right, #facc15, #f59e0b)" // 🟡 أصفر
                    : "linear-gradient(to right, #ef4444, #b91c1c)", // 🔴 أحمر
              }}
            />
          </div>

        </div>
      )}
      {/* ===== END TIMER ===== */}

      <QuizHeader
        title={activeChapter?.title}
        answered={quizState.answers.filter(a => a !== null).length}
        total={currentQuestions.length}
        isFinalExam={isFinalExam}
      />

      <div className="space-y-10">
        {currentQuestions.map((q, qIdx) => (
          <Card key={q.id} className="space-y-6">

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-semibold">
                Q{qIdx + 1}
              </span>

              <span className="
                px-3 py-1 rounded-full
                bg-indigo-50 text-indigo-700
                text-xs font-semibold
              ">
                {q.kLevel}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
              {q.text}
            </h3>

            <div className="grid gap-4">
              {q.options.map((opt, oIdx) => (
                <OptionCard
                  key={oIdx}
                  text={opt}
                  selected={quizState.answers[qIdx] === oIdx}
                  onClick={() => handleAnswerSelect(qIdx, oIdx)}
                />
              ))}
            </div>

          </Card>
        ))}

        <div className="flex justify-end pt-6">
          <Button
            variant="outline"
            className="px-12 justify-between"
            disabled={quizState.answers.includes(null)}
            onClick={handleSubmit}
          >
            Submit Exam
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

  const renderResults = () => {
    const percentage = Math.round((quizState.score / currentQuestions.length) * 100);
    const isPassing = percentage >= 70;
    const isCelebration = percentage >= 80;
    return (
      
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {/* Score Card */}
        <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white text-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20">
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isPassing ? 'Great job!' : 'Keep practicing!'}
            </h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-lg mx-auto">
              You scored {quizState.score} out of {currentQuestions.length}. 
              {isPassing ? " You're on track for certification!" : " Review the incorrect answers below to improve."}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" onClick={handleRetry}>
                <RotateCcw className="w-4 h-4" /> Retry Quiz
              </Button>
              <Button 
                variant="primary" 
                className="bg-indigo-500 hover:bg-indigo-400 border-none text-white shadow-none"
                onClick={() => setView('CHAPTERS')}
              >
                Back to Chapters
              </Button>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Answer Review</h3>
          
          {currentQuestions.map((q, qIdx) => {
            const userAnswer = quizState.answers[qIdx];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <Card key={q.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`mt-1 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? <CheckCircle2 /> : <XCircle />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">{q.text}</h4>
                    {!isCorrect && (
                      <div className="flex flex-col gap-2 mb-4">
                         <div className="text-sm bg-red-50 text-red-700 px-3 py-2 rounded-lg inline-block w-fit">
                            <span className="font-bold mr-1">Your Answer:</span>
                            {userAnswer !== null ? q.options[userAnswer] : 'Skipped'}
                         </div>
                      </div>
                    )}
                    <div className="text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg inline-block w-fit">
                      <span className="font-bold mr-1">Correct Answer:</span>
                      {q.options[q.correctIndex]}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    <span className="font-semibold text-indigo-600 uppercase text-xs tracking-wider block mb-1">Explanation</span>
                    {q.explanation}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header
  currentView={view}
  onHome={() => setView("HOME")}
  onChapters={() => setView("CHAPTERS")}
  onGenerate={() => {
    alert("Generate Questions page coming soon 🚀");
  }}
/>

      
      <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {view === 'HOME' && renderHome()}
        {view === 'CHAPTERS' && renderChapters()}
        {view === 'QUIZ' && renderQuiz()}
        {view === 'RESULTS' && renderResults()}
      </main>
    </div>
  );
}
