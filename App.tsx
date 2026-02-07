import React, { useState, useEffect } from "react";
import { PRACTICE_CHAPTERS } from "./data/chapter/chapters";
import { Youtube, Linkedin, Facebook, MessageCircle } from "lucide-react";
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
  Award,
} from "lucide-react";
import { Question, Chapter, QuizState, ViewState, AIConfig } from "./types";

const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
  disabled?: boolean;
}> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyle =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300",
    secondary:
      "bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm",
    ghost: "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    soft: "bg-transparent text-indigo-600 hover:bg-indigo-50",
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
}> = ({ children, className = "", onClick, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 
        ${
          hoverable
            ? "cursor-pointer hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-300"
            : ""
        } 
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
      <div onClick={onHome} className="flex items-center gap-2 cursor-pointer">
        <img
          src="/assets/logo.png"
          alt="AIXam Logo"
          className="w-8 h-8 object-contain"
        />
        <span className="font-bold text-base">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            <span className="text-2xl align-baseline">T</span>
            est
          </span>
          <span className="text-slate-800">ology</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <span
          onClick={onHome}
          className={`cursor-pointer ${
            currentView === "HOME"
              ? "text-indigo-600 font-medium"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          Home
        </span>

        <span
          onClick={onChapters}
          className={`cursor-pointer ${
            currentView === "CHAPTERS"
              ? "text-indigo-600 font-medium"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          Chapters
        </span>

        {/*<span
          onClick={onGenerate}
          className="cursor-not-allowed text-slate-400"
          title="Coming Soon"
        >
          Generate Questions
        </span>*/}
      </nav>

      {/* Avatar */}
      <img
        src="/assets/omar.jpg"
        className="w-8 h-8 rounded-full object-cover border"
      />
    </div>
  </header>
);
const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand صغير */}
        <div className="text-sm font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Test
          </span>
          <span className="text-slate-800">ology</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://youtube.com/@testologygeeks?si=G00dkV08idhW44vD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-red-600 transition"
          >
            <Youtube className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/omar-zidan-%F0%9F%8D%89-56b851108"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-600 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="https://www.facebook.com/groups/750516570186092"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-700 transition"
          >
            <Facebook className="w-5 h-5" />
          </a>

          <a
            href="https://chat.whatsapp.com/HpPYIO30HFc0q1wn5J9HQJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-green-600 transition"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

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
const Celebration = () => {
  const emojis = ["🎉", "🎈"];

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* 🎆 FIREWORKS */}
      {[...Array(8)].map((_, i) => (
        <span
          key={`fw-${i}`}
          className="firework"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            animationDelay: `${Math.random() * 1.5}s`,
          }}
        />
      ))}

      {/* 🎉 FLOATING EMOJIS */}
      {[...Array(40)].map((_, i) => (
        <span
          key={`emoji-${i}`}
          className="celebration-emoji"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1.5}s`,
            fontSize: `${24 + Math.random() * 22}px`,
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </span>
      ))}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>("HOME");
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  const [quizState, setQuizState] = useState<QuizState>({
    answers: [],
    isSubmitted: false,
    score: 0,
  });

  const [aiConfig, setAiConfig] = useState<AIConfig>({
    isLoading: false,
    error: null,
  });

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

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
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [view]);

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BrainCircuit":
        return <BrainCircuit className="w-6 h-6" />;
      case "MessageSquareText":
        return <MessageSquareText className="w-6 h-6" />;
      case "Network":
        return <Network className="w-6 h-6" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6" />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  const startChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    setCurrentQuestions(chapter.questions);
    setQuizState({
      answers: new Array(chapter.questions.length).fill(null),
      isSubmitted: false,
      score: 0,
    });
    setView("QUIZ");
  };
  const startChapterExam = (chapter: Chapter) => {
    if (!chapter.exam) return;

    setActiveChapter(chapter.exam);
    setCurrentQuestions(chapter.exam.questions);

    setQuizState({
      answers: new Array(chapter.exam.questions.length).fill(null),
      isSubmitted: false,
      score: 0,
    });

    setTimeLeft(EXAM_DURATION);
    setView("QUIZ");
  };

  const handleGenerateAI = async () => {
    setAiConfig({ isLoading: true, error: null });
    try {
      // Simulate selecting a random topic or comprehensive
      const questions = await generateQuestions(
        "General Generative AI Concepts for Certification"
      );
      const generatedChapter: Chapter = {
        id: "ai-generated",
        title: "AI Generated Practice",
        description: "Custom questions generated by Gemini just for you.",
        icon: "Sparkles",
        questions: questions,
      };
      startChapter(generatedChapter);
    } catch (err) {
      setAiConfig({
        isLoading: false,
        error: "Failed to generate questions. Please try again.",
      });
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

    const percentage = (score / currentQuestions.length) * 100;
    const isExam = activeChapter?.id.includes("exam");

    setQuizState({ ...quizState, isSubmitted: true, score });
    setView("RESULTS");

    // ✅ لفوق فورًا بعد السبمت
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });

    // 🎆 Celebration
    if (percentage >= 80) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
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
            <div
              className="
 absolute -top-10 left-1/2
  -translate-x-1/2 translate-x-9
  bg-white/95 backdrop-blur
  px-6 py-3 rounded-2xl
  shadow-lg
  text-slate-900
  font-semibold
  animate-float
"
            >
              <div className="text-sm tracking-wide">Hi👋</div>
              <div className="text-xs font-bold tracking-wider text-slate-700">
                I'm Za'atar
              </div>
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
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/backGround.png')",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-6 pt-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* ================= LEFT ================= */}
          <div className="space-y-6 mt-6">
            <h2 className="text-4xl font-bold text-slate-900">
              Choose a Chapter
            </h2>

            <p className="text-slate-500 mb-6">
              Select a chapter to start practicing.
            </p>
            {PRACTICE_CHAPTERS.map((chapter, index) => (
              <div
                key={chapter.id}
                onClick={() => {
                  setActiveChapter(chapter);
                  setView("CHAPTER_OPTIONS");
                }}
                className={`
      px-6 py-5 rounded-2xl backdrop-blur-md
      cursor-pointer transition-all duration-300 w-full
      ${
        index === 1
          ? "bg-[#FFF4D6]"
          : index === 2
          ? "bg-[#EAF6FF]"
          : index === 3
          ? "bg-[#FFEAEA]"
          : index === 4
          ? "bg-[#F3EDFF]"
          : "bg-white/90"
      }
      hover:scale-[1.02]
    `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow">
                    <Bot className="w-5 h-5 text-indigo-600" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {chapter.title}
                    </h4>
                    <span className="text-sm text-slate-500">
                      Click to choose mode
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Generate AI */}
            {/*<button
              onClick={handleGenerateAI}
              disabled={aiConfig.isLoading}
              className="
              mt-6 w-full
              flex items-center justify-center gap-3
              bg-green-500 hover:bg-green-600
              text-white py-5 rounded-2xl
              font-semibold transition
            "
            >
              <Sparkles className="w-5 h-5" />
              {aiConfig.isLoading ? "Generating..." : "Generate AI Questions"}
            </button>*/}
          </div>

          {/* ================= RIGHT (ROBOT SAME AS HOME) ================= */}
          <div className="relative flex justify-center">
            {/* Glow */}
            <div className="absolute w-[720px] h-[720px] bg-indigo-200/40 rounded-full blur-3xl" />

            <img
              src="/assets/robot.png"
              alt="AI Robot"
              className="w-[920px] max-w-none animate-float drop-shadow-2xl relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );

  const renderChapterOptions = () => {
    if (!activeChapter) return null;

    return (
      <section
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/backGround.png')",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
          <h2 className="text-4xl font-bold text-slate-900 mb-3 text-center">
            {activeChapter.title}
          </h2>

          <p className="text-slate-500 text-center mb-16">
            Choose how you want to start this chapter
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Practice Card */}
            <Card
              hoverable
              onClick={() => startChapter(activeChapter)}
              className="text-center py-16"
            >
              <Bot className="w-12 h-12 text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Practice Mode</h3>
              <p className="text-slate-500 mb-8">
                Learn step by step with practice questions.
              </p>

              <Button className="w-full justify-center">Start Practice</Button>
            </Card>

            {/* Exam Card */}
            {activeChapter.exam && (
              <Card
                hoverable
                onClick={() => startChapterExam(activeChapter)}
                className="text-center py-16"
              >
                <Award className="w-12 h-12 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-3">Exam Mode</h3>
                <p className="text-slate-500 mb-8">
                  Simulate the real certification exam.
                </p>

                <Button className="w-full justify-center">Start Exam</Button>
              </Card>
            )}
          </div>
        </div>
      </section>
    );
  };

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
      ${
        selected
          ? "border-indigo-600 bg-indigo-50 shadow"
          : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
      }
    `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
          w-5 h-5 rounded-full border flex items-center justify-center
          ${selected ? "border-indigo-600 bg-indigo-600" : "border-slate-400"}
        `}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>

        <span className="text-slate-700 text-sm">{text}</span>
      </div>
    </div>
  );
  {
    activeChapter?.id.includes("exam") && timeLeft !== null && (
      <div className="mb-6 flex justify-center">
        <div className="px-6 py-3 rounded-full bg-red-50 text-red-700 font-bold text-sm shadow">
          ⏱️ Time Left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>
    );
  }

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
            <h4 className="font-semibold text-indigo-700">{title}</h4>

            {isFinalExam && (
              <span
                className="
              px-3 py-1 rounded-full
              bg-red-50 text-red-700
              text-xs font-bold
            "
              >
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
  {
    /* ===== FINAL EXAM TIMER ===== */
  }
  {
    activeChapter?.id.includes("exam") && timeLeft !== null && (
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
    );
  }
  {
    /* ===== END TIMER ===== */
  }
  /* ================= FIXED EXAM TIMER (LEFT) ================= */
  const ExamTimer = ({
    timeLeft,
    totalTime,
  }: {
    timeLeft: number;
    totalTime: number;
  }) => {
    const radius = 44;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / totalTime;
    const offset = circumference * (1 - progress);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    // 🎨 color logic
    const strokeColor =
      progress > 0.5
        ? "#22c55e" // green
        : progress > 0.25
        ? "#facc15" // yellow
        : "#ef4444"; // red

    return (
      <div className="fixed left-6 top-28 z-50">
        <div className="bg-white rounded-2xl shadow-xl px-6 py-6 w-[140px] h-[160px] flex flex-col items-center justify-center">
          {/* Circle */}
          <svg width="110" height="110">
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke={strokeColor}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Time text (جوه البوكس) */}
          <div className="absolute text-center">
            <div className="text-lg font-bold text-slate-800">
              {minutes}:{seconds}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ================= QUIZ RENDER ================= */
  const renderQuiz = () => {
    const isFinalExam = activeChapter?.id.includes("exam") ?? false;

    return (
      <section
        className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{ backgroundImage: "url('/assets/backGround.png')" }}
      >
        {/* ===== FIXED TIMER (EXAM ONLY) ===== */}
        {isFinalExam && timeLeft !== null && (
          <ExamTimer timeLeft={timeLeft} totalTime={EXAM_DURATION} />
        )}

        {/* ===== FLOATING HALF ROBOT ===== */}
        <img
          src="/assets/halfRobot.png"
          alt="AI Robot"
          className="absolute right-8 top-20 w-40 z-20 pointer-events-none"
        />

        <div className="max-w-4xl mx-auto px-6 pt-14 pb-32 space-y-10">
          {/* ===== TOP INFO ===== */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="font-bold text-lg text-indigo-600">
                {activeChapter?.title}
              </h2>
              <p className="text-sm text-slate-500">
                {isFinalExam ? "Exam Mode" : "Practice Mode"}
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-500">
              {quizState.answers.filter((a) => a !== null).length} /{" "}
              {currentQuestions.length}
            </span>
          </div>

          {/* ===== QUESTIONS ===== */}
          {currentQuestions.map((q, qIdx) => (
            <div
              key={q.id}
              className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400">
                  Q{qIdx + 1}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-semibold">
                  {q.kLevel}
                </span>
              </div>

              <h3 className="font-semibold text-slate-800 mb-6">{q.text}</h3>

              <div className="space-y-3">
                {q.options.map((opt, oIdx) => {
                  const selected = quizState.answers[qIdx] === oIdx;

                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleAnswerSelect(qIdx, oIdx)}
                      className={`
                      flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
                      border transition
                      ${
                        selected
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }
                    `}
                    >
                      <div
                        className={`
                        w-4 h-4 rounded-full border flex items-center justify-center
                        ${
                          selected
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-slate-400"
                        }
                      `}
                      >
                        {selected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>

                      <span className="text-sm text-slate-700">{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ===== SUBMIT ===== */}
          <div className="flex justify-end pt-6">
            <Button
              className="px-14 rounded-full"
              disabled={quizState.answers.includes(null)}
              onClick={handleSubmit}
            >
              Submit
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    );
  };
  const handleRetry = () => {
    setQuizState({
      answers: new Array(currentQuestions.length).fill(null),
      isSubmitted: false,
      score: 0,
    });

    if (activeChapter?.id.includes("exam")) {
      setTimeLeft(EXAM_DURATION);
    }

    setView("QUIZ");
  };

  const renderResults = () => {
    const percentage = Math.round(
      (quizState.score / currentQuestions.length) * 100
    );
    const showCelebration = percentage >= 80;

    const isPassing = percentage >= 70;

    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
          {/* ===== Score Box ===== */}
          <div className="relative bg-indigo-900 rounded-3xl p-10 text-white text-center mb-14 overflow-hidden">
            <img
              src="/assets/halfRobot.png"
              className="absolute right-8 top-6 w-28 opacity-90"
            />

            <div className="relative z-10">
              <div className="text-4xl font-bold mb-2">{percentage}%</div>
              <p className="text-indigo-200 mb-6">
                You scored {quizState.score} out of {currentQuestions.length}
              </p>

              <div className="flex justify-center gap-4">
                <Button variant="secondary" onClick={handleRetry}>
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </Button>
                <Button onClick={() => setView("CHAPTERS")}>
                  Back to Chapters
                </Button>
              </div>
            </div>
          </div>

          {/* ===== Answer Review ===== */}
          <h3 className="text-2xl font-bold mb-6">Answer Review</h3>

          <div className="space-y-6">
            {currentQuestions.map((q, qIdx) => {
              const userAnswer = quizState.answers[qIdx];
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl p-6 border-l-4 shadow-sm
                  ${isCorrect ? "border-green-300" : "border-red-300"}
                `}
                >
                  <h4 className="font-semibold mb-3">{q.text}</h4>

                  {!isCorrect && (
                    <div className="text-sm mb-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg w-fit">
                      Your Answer: {q.options[userAnswer ?? 0]}
                    </div>
                  )}

                  <div className="text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg w-fit mb-3">
                    Correct Answer: {q.options[q.correctIndex]}
                  </div>

                  <p className="text-sm text-slate-600">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
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

      {showCelebration && <Celebration />}
      <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {view === "HOME" && renderHome()}
        {view === "CHAPTERS" && renderChapters()}
        {view === "CHAPTER_OPTIONS" && renderChapterOptions()}
        {view === "QUIZ" && renderQuiz()}
        {view === "RESULTS" && renderResults()}
      </main>
      <Footer />
    </div>
  );
}
