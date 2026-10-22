import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  RotateCcw,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const logoSrc = new URL("../assets/logo.png", import.meta.url).href;
const aiProLogoSrc = new URL("../assets/AIPROlogo.png", import.meta.url).href;
const splashSrc = new URL("../assets/new.png", import.meta.url).href;

type Year = 1 | 2 | 3 | 4;
type LetterGrade = "A" | "B" | "C" | "D" | "E" | "F" | "";
type Screen = "splash" | "welcome" | "year" | "grades" | "results";

const GRADE_POINTS: Record<Exclude<LetterGrade, "">, number> = {
  A: 4.00,
  B: 3.00,
  C: 2.00,
  D: 1.00,
  E: 0.50,
  F: 0,
};

const GRADE_RANGES: Record<Exclude<LetterGrade, "">, string> = {
  A: "75 – 100",
  B: "65 – 74",
  C: "50 – 64",
  D: "40 – 49",
  E: "30 – 39",
  F: "0 – 29",
};

const GRADE_COLORS: Record<Exclude<LetterGrade, "">, string> = {
  A: "#4ADE80",
  B: "#60A5FA",
  C: "#A78BFA",
  D: "#FCD34D",
  E: "#FB923C",
  F: "#F87171",
};

const VALID_GRADES: LetterGrade[] = ["A", "B", "C", "D", "E", "F"];

function getClassification(gpa: number): { label: string; color: string; description: string } {
  if (gpa >= 4.29) return { label: "First Class Honors", color: "#4ADE80", description: "Distinction" };
  if (gpa >= 3.99) return { label: "Second Class First Division", color: "#60A5FA", description: "Credit" };
  if (gpa >= 3.59) return { label: "Second Class Second Division", color: "#A78BFA", description: "Credit" };
  if (gpa >= 3.00) return { label: "Third Class", color: "#FCD34D", description: "Pass" };
  return { label: "Fail", color: "#F87171", description: "Below Pass" };
}

function getModuleCount(year: Year): number {
  return year === 4 ? 2 : 7;
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onNext}
      className="flex flex-col items-center justify-center min-h-full px-6 py-12 text-center cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xs mb-6"
      >
        <img
          src={splashSrc}
          alt="Students using the Acss Grade Point Calculator"
          style={{ width: "100%", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}
        />
      </motion.div>

      <motion.img
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        src={logoSrc}
        alt="Acss logo"
        style={{ width: 64, height: "auto", borderRadius: 12, marginBottom: 12 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        style={{ color: "#FFFFFF", fontSize: 26, fontWeight: 800, marginBottom: 6 }}
      >
        Grade Point Calculator
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        style={{ color: "#E0F2FE", fontSize: 13, maxWidth: 260, lineHeight: 1.5 }}
      >
        Tap anywhere to continue
      </motion.p>
    </motion.div>
  );
}

// ─── Welcome Screen ───────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-full px-6 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-lg"
        style={{ background: "linear-gradient(135deg, #1D4ED8, #3B82F6)" }}
      >
        <img
          src={logoSrc}
          alt="acss logo"
          className="w-20 h-20 object-contain"
          style={{ display: "block" }}
        />

      </motion.div>

      <h1 className="text-white mb-3" style={{ fontSize: 30, fontWeight: 800 }}>
        Grade Point
      </h1>
      <h1 className="text-white mb-3" style={{ fontSize: 30, fontWeight: 800 }}>
        Calculator
      </h1>

      <p style={{ color: "#FFFFFF", fontSize: 15, lineHeight: 1.6, maxWidth: 280 }}>
        Calculate your GPA by entering letter grades for each module across your academic year.
      </p>

      <div className="mt-8 w-full max-w-xs space-y-3">
        {[
          { grade: "A", range: "75 – 100", pts: 4 },
          { grade: "B", range: "65 – 74", pts: 3 },
          { grade: "C", range: "50 – 64", pts: 2 },
        ].map((item, i) => (
          <motion.div
            key={item.grade}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 18 }}>{item.grade}</span>
            <span style={{ color: "#FFFFFF", fontSize: 13 }}>{item.range} marks</span>
            <span style={{ color: "#BAE6FD", fontWeight: 600, fontSize: 13 }}>{item.pts} pts</span>
          </motion.div>
        ))}
        <div
          className="text-center py-1"
          style={{ color: "#FFFFFF", fontSize: 12 }}
        >
          + D (1.00pt) · E (0.50pt) · F (0pts)
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={onNext}
        className="mt-8 w-full max-w-xs flex items-center justify-center gap-2 rounded-2xl py-4 shadow-lg"
        style={{ background: "#FFFFFF", color: "#1D4ED8", fontWeight: 700, fontSize: 16, transition: "all 0.2s ease" }}
      >
        Get Started <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );
}

// ─── Year Selector ────────────────────────────────────────────────────────────
function YearSelector({
  onSelect,
  onBack,
}: {
  onSelect: (year: Year) => void;
  onBack: () => void;
}) {
  const years = [1, 2, 3, 4] as Year[];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-full px-5 py-8"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={onBack}
        className="flex items-center gap-1 mb-6"
        style={{ color: "#FFFFFF", transition: "all 0.2s ease" }}
      >
        <ArrowLeft size={18} /> Back
      </motion.button>

      <h2 className="text-white mb-1" style={{ fontSize: 24, fontWeight: 800 }}>
        Select Your Year
      </h2>
      <p style={{ color: "#E0F2FE", fontSize: 14, marginBottom: 28 }}>
        Choose your current academic year
      </p>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {years.map((year, i) => (
          <motion.button
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(59,130,246,0.3)" }}
            onClick={() => onSelect(year)}
            className="flex flex-col items-center justify-center rounded-2xl py-8 gap-3 shadow-md"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              minHeight: 140,
              transition: "all 0.2s ease",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(59,130,246,0.3)" }}
            >
              <BookOpen size={22} color="#FFFFFF" />
            </div>
            <span className="text-white" style={{ fontWeight: 800, fontSize: 22 }}>
              Year {year}
            </span>
            <span style={{ color: "#E0F2FE", fontSize: 12, textAlign: "center" }}>
              {year === 4 ? "2 modules" : "7 modules"}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 rounded-xl px-4 py-3 flex items-start gap-3"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <AlertCircle size={16} color="#FFFFFF" style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ color: "#FFFFFF", fontSize: 12, lineHeight: 1.6 }}>
          Year 1–3 students enter grades for 7 modules. Year 4 students enter grades for 2 modules only.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Grade Input Row ───────────────────────────────────────────────────────────
function GradeInputRow({
  index,
  value,
  onChange,
  error,
}: {
  index: number;
  value: LetterGrade;
  onChange: (v: LetterGrade) => void;
  error: string;
}) {
  const handleInput = (raw: string) => {
    const upper = raw.toUpperCase().replace(/[^ABCEF]/g, "") as LetterGrade;
    const last = upper.slice(-1) as LetterGrade;
    onChange(last || "");
  };

  const gradeInfo =
    value && VALID_GRADES.includes(value as Exclude<LetterGrade, "">)
      ? {
          pts: GRADE_POINTS[value as Exclude<LetterGrade, "">],
          range: GRADE_RANGES[value as Exclude<LetterGrade, "">],
          color: GRADE_COLORS[value as Exclude<LetterGrade, "">],
        }
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl px-4 py-3"
      style={{ background: "rgba(255,255,255,0.08)", border: error ? "1px solid #F87171" : "1px solid rgba(255,255,255,0.12)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(59,130,246,0.25)" }}
        >
          <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 12 }}>M{index + 1}</span>
        </div>

        <div className="flex-1">
          <p style={{ color: "#E0F2FE", fontSize: 11, marginBottom: 2 }}>Module {index + 1}</p>
          <input
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="A–F"
            className="w-full bg-transparent outline-none uppercase"
            style={{
              color: gradeInfo ? gradeInfo.color : "#FFFFFF",
              fontWeight: 700,
              fontSize: 20,
              caretColor: "#60A5FA",
            }}
          />
          {error && (
            <p style={{ color: "#F87171", fontSize: 10, marginTop: 2 }}>{error}</p>
          )}
        </div>

        {gradeInfo && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-end gap-1"
          >
            <span
              className="rounded-lg px-2 py-0.5"
              style={{ background: gradeInfo.color + "22", color: gradeInfo.color, fontWeight: 700, fontSize: 13 }}
            >
              {gradeInfo.pts} pts
            </span>
            <span style={{ color: "#E0F2FE", fontSize: 10 }}>{gradeInfo.range}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Grade Input Screen ────────────────────────────────────────────────────────
function GradeInputScreen({
  year,
  onSubmit,
  onBack,
}: {
  year: Year;
  onSubmit: (grades: LetterGrade[]) => void;
  onBack: () => void;
}) {
  const count = getModuleCount(year);
  const [grades, setGrades] = useState<LetterGrade[]>(Array(count).fill(""));
  const [errors, setErrors] = useState<string[]>(Array(count).fill(""));

  const updateGrade = useCallback(
    (i: number, val: LetterGrade) => {
      setGrades((prev) => {
        const next = [...prev];
        next[i] = val;
        return next;
      });
      setErrors((prev) => {
        const next = [...prev];
        next[i] = "";
        return next;
      });
    },
    []
  );

  const handleCalculate = () => {
    const newErrors = grades.map((g) => {
      if (!g) return "Required";
      if (!VALID_GRADES.includes(g as Exclude<LetterGrade, "">)) return "Enter A–F only";
      return "";
    });
    setErrors(newErrors);
    if (newErrors.some((e) => e)) return;
    onSubmit(grades);
  };

  const filledCount = grades.filter((g) => VALID_GRADES.includes(g as Exclude<LetterGrade, "">)).length;
  const addModule = () => {
    setGrades((prev) => [...prev, ""]);
    setErrors((prev) => [...prev, ""]);
  };
  const removeModule = (index: number) => {
    if (grades.length <= count) return;
    setGrades((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-full px-5 py-6"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={onBack}
        className="flex items-center gap-1 mb-5"
        style={{ color: "#FFFFFF", transition: "all 0.2s ease" }}
      >
        <ArrowLeft size={18} /> Back
      </motion.button>

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white" style={{ fontSize: 22, fontWeight: 800 }}>
          Year {year} Grades
        </h2>
        <span
          className="rounded-full px-3 py-1"
          style={{ background: "rgba(59,130,246,0.3)", color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}
        >
          {filledCount}/{grades.length} filled
        </span>
      </div>

      <p style={{ color: "#E0F2FE", fontSize: 13, marginBottom: 20 }}>
        Add or remove modules as needed, then enter grades (A–F)
      </p>

      <div className="flex gap-2 mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={addModule}
          className="rounded-xl px-3 py-2"
          style={{ background: "#3B82F6", color: "#fff", transition: "all 0.2s ease" }}
        >
          + Add Module
        </motion.button>
      </div>

      {/* Progress bar */}
      <div className="rounded-full h-1.5 mb-5" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="h-1.5 rounded-full"
          style={{ background: "#3B82F6" }}
          animate={{ width: `${(filledCount / grades.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pb-4">
        {grades.map((g, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-end mb-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => removeModule(i)}
                style={{ color: "#F87171", transition: "all 0.2s ease" }}
                disabled={grades.length <= count}
              >
                Remove
              </motion.button>
            </div>
            <GradeInputRow
              index={i}
              value={g}
              onChange={(v) => updateGrade(i, v)}
              error={errors[i]}
            />
          </div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={handleCalculate}
        className="mt-5 w-full flex items-center justify-center gap-2 rounded-2xl py-4 shadow-lg"
        style={{
          background: filledCount === grades.length ? "#FFFFFF" : "rgba(255,255,255,0.2)",
          color: filledCount === grades.length ? "#1D4ED8" : "#FFFFFF",
          fontWeight: 700,
          fontSize: 16,
          transition: "all 0.2s ease",
        }}
      >
        <Award size={20} /> Calculate GPA
      </motion.button>
    </motion.div>
  );
}

// ─── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({
  year,
  grades,
  onReset,
}: {
  year: Year;
  grades: LetterGrade[];
  onReset: () => void;
}) {
  const validGrades = grades.filter((g): g is Exclude<LetterGrade, ""> => g !== "");
  const totalPoints = validGrades.reduce((sum, g) => sum + GRADE_POINTS[g], 0);
  const gpa = validGrades.length ? totalPoints / validGrades.length : 0;
  const classification = getClassification(gpa);
  const percentage = (gpa / 4) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-full px-5 py-8"
    >
      <h2 className="text-white mb-1" style={{ fontSize: 24, fontWeight: 800 }}>
        Your Results
      </h2>
      <p style={{ color: "#E0F2FE", fontSize: 13, marginBottom: 24 }}>
        Year {year} · {grades.length} module{grades.length > 1 ? "s" : ""}
      </p>

      {/* GPA Circle */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
          <svg width="160" height="160" style={{ position: "absolute" }}>
            <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
            <motion.circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke={classification.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 68}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - percentage / 100) }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-white" style={{ fontWeight: 900, fontSize: 38, lineHeight: 1 }}>
              {gpa.toFixed(2)}
            </span>
            <span style={{ color: "#E0F2FE", fontSize: 12, marginTop: 4 }}>out of 4.00</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 rounded-2xl px-6 py-3 text-center"
          style={{ background: classification.color + "22", border: `1px solid ${classification.color}44` }}
        >
          <p style={{ color: classification.color, fontWeight: 800, fontSize: 18 }}>
            {classification.label}
          </p>
          <p style={{ color: "#FFFFFF", fontSize: 12 }}>
            {classification.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Grade breakdown */}
      <div className="mb-6">
        <p style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
          Module Breakdown
        </p>
        <div className="grid grid-cols-2 gap-2">
          {grades.map((g, i) => {
            const gradeKey = g as Exclude<LetterGrade, "">;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="rounded-xl px-3 py-2 flex items-center justify-between"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} color={GRADE_COLORS[gradeKey]} />
                  <span style={{ color: "#FFFFFF", fontSize: 12 }}>M{i + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: GRADE_COLORS[gradeKey], fontWeight: 800, fontSize: 16 }}>{g}</span>
                  <span style={{ color: "#E0F2FE", fontSize: 11 }}>{GRADE_POINTS[gradeKey]}pt</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary row */}
      <div
        className="rounded-2xl px-4 py-4 mb-6 flex justify-between items-center"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div className="text-center">
          <p style={{ color: "#E0F2FE", fontSize: 11 }}>Total Points</p>
          <p className="text-white" style={{ fontWeight: 800, fontSize: 20 }}>{totalPoints}</p>
        </div>
        <div className="h-10 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="text-center">
          <p style={{ color: "#E0F2FE", fontSize: 11 }}>Modules</p>
          <p className="text-white" style={{ fontWeight: 800, fontSize: 20 }}>{grades.length}</p>
        </div>
        <div className="h-10 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="text-center">
          <p style={{ color: "#E0F2FE", fontSize: 11 }}>GPA</p>
          <p className="text-white" style={{ fontWeight: 800, fontSize: 20 }}>{gpa.toFixed(2)}</p>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 rounded-2xl py-4"
        style={{ background: "#FFFFFF", color: "#1D4ED8", fontWeight: 700, fontSize: 16, transition: "all 0.2s ease" }}
      >
        <RotateCcw size={18} /> Calculate Again
      </motion.button>
    </motion.div>
  );
}

// ─── Main Calculator ───────────────────────────────────────────────────────────
export function GradeCalculator() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [finalGrades, setFinalGrades] = useState<LetterGrade[]>([]);

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("welcome"), 3500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleYearSelect = (year: Year) => {
    setSelectedYear(year);
    setScreen("grades");
  };

  const handleGradesSubmit = (grades: LetterGrade[]) => {
    setFinalGrades(grades);
    setScreen("results");
  };

  const handleReset = () => {
    setSelectedYear(null);
    setFinalGrades([]);
    setScreen("welcome");
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1E3A8A 0%, #1D4ED8 40%, #2563EB 100%)",
        minHeight: "100vh",
        maxWidth: 430,
        margin: "0 auto",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(59,130,246,0.25)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(96,165,250,0.2)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Header: logo with Acss */}
      {screen !== "splash" && (
        <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
        <img src={aiProLogoSrc} alt="Acss logo" style={{ height: 56, width: "auto", borderRadius: 8 }} />
        <h2 style={{ color: "#FFFFFF", fontSize: 22, fontWeight: 700, margin: 0 }}>Acss</h2>
        </div>
      )}

      {/* Content */}
      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          {screen === "splash" && (
            <SplashScreen key="splash" onNext={() => setScreen("welcome")} />
          )}
          {screen === "welcome" && (
            <WelcomeScreen key="welcome" onNext={() => setScreen("year")} />
          )}
          {screen === "year" && (
            <YearSelector key="year" onSelect={handleYearSelect} onBack={() => setScreen("welcome")} />
          )}
          {screen === "grades" && selectedYear && (
            <GradeInputScreen
              key="grades"
              year={selectedYear}
              onSubmit={handleGradesSubmit}
              onBack={() => setScreen("year")}
            />
          )}
          {screen === "results" && selectedYear && (
            <ResultsScreen
              key="results"
              year={selectedYear}
              grades={finalGrades}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer credit */}
      {screen !== "splash" && (
        <div style={{ padding: "12px 20px", display: "flex", justifyContent: "flex-end", color: "#E0F2FE", fontSize: 12 }}>
          Developed by || Acss President
        </div>
      )}
    </div>
  );
}
