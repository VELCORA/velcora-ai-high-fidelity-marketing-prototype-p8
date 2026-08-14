import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle,
  Plus,
  Trash2,
  Sparkles,
  Shield,
  Clock,
  Compass,
  Zap,
} from 'lucide-react';
import { ambientAudio } from '../utils/audio';
import { useToast } from './Toast';

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export const FocusStation: React.FC<{
  onSelectVideo?: (idx: number) => void;
  activeVideoIndex?: number;
}> = ({ onSelectVideo, activeVideoIndex = 0 }) => {
  const { showToast } = useToast();
  const [sessionDuration, setSessionDuration] = useState<number>(25 * 60); // in seconds
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [focusStreak, setFocusStreak] = useState<number>(3);
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: '1', text: 'Define web scraper schema and data targets', completed: true },
    { id: '2', text: 'Execute high-speed intelligence extraction on TechCrunch', completed: false },
    { id: '3', text: 'Deploy automated webhook pipeline for competitor tracking', completed: false },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setFocusStreak((s) => s + 1);
            showToast('Flow block completed! Focus streak increased.', 'success');
            return sessionDuration;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, sessionDuration, showToast]);

  const handleStartPause = () => {
    if (!isRunning) {
      setIsRunning(true);
      if (!isAudioOn) {
        const playing = ambientAudio.toggle();
        setIsAudioOn(playing);
      }
      showToast('Focus session started — Distraction shielding active', 'info');
    } else {
      setIsRunning(false);
      showToast('Session paused', 'info');
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(sessionDuration);
    showToast('Timer reset', 'info');
  };

  const handleSelectPreset = (minutes: number) => {
    setIsRunning(false);
    setSessionDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    showToast(`Set session to ${minutes} minutes`, 'info');
  };

  const handleToggleAudio = () => {
    const playing = ambientAudio.toggle();
    setIsAudioOn(playing);
    showToast(playing ? 'Ambient audio resonance active' : 'Ambient audio muted', 'info');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks((prev) => [...prev, { id: Math.random().toString(36).substring(2, 9), text: newTaskInput.trim(), completed: false }]);
    setNewTaskInput('');
    showToast('Task added to deep work queue', 'success');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPct = ((sessionDuration - timeLeft) / sessionDuration) * 100;

  return (
    <section id="focus-station" className="relative w-full py-20 px-4 sm:px-8 md:px-14 bg-[#03060a] text-white z-20 font-sans-ui border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass border border-white/15 text-xs text-sky-300 mb-3.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Cognitive Presence & Deep Work Engine</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-white tracking-tight">
            Intentional Flow & Distraction Shield
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Eliminate cognitive clutter. Pair high-speed data automation with unbroken deep work blocks and procedural soundscapes.
          </p>
        </div>

        {/* Focus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Timer & Soundscape (7 cols) */}
          <div className="lg:col-span-7 liquid-glass border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
            <div>
              {/* Presets & Audio bar */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  {[
                    { label: '25m Pomodoro', mins: 25 },
                    { label: '45m Flow Block', mins: 45 },
                    { label: '90m Deep Sprint', mins: 90 },
                  ].map((preset) => (
                    <button
                      key={preset.mins}
                      onClick={() => handleSelectPreset(preset.mins)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        sessionDuration === preset.mins * 60
                          ? 'bg-white text-black font-semibold shadow-md'
                          : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleToggleAudio}
                  className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAudioOn
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                  }`}
                >
                  {isAudioOn ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isAudioOn ? 'Soundscape Active' : 'Soundscape Muted'}</span>
                </button>
              </div>

              {/* Huge Timer Display */}
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <span className="font-serif italic text-7xl sm:text-9xl text-white tracking-tight drop-shadow-2xl">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-1000 ease-out"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <div className="mt-3 text-xs text-white/50 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Distraction Shield Active • Streak: {focusStreak} Sessions</span>
                </div>
              </div>
            </div>

            {/* Timer Control Buttons */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-4">
              <button
                onClick={handleStartPause}
                className={`px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xl ${
                  isRunning
                    ? 'bg-amber-400 text-black hover:bg-amber-300'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isRunning ? 'Pause Flow' : 'Begin Deep Work'}</span>
              </button>

              <button
                onClick={handleReset}
                title="Reset Session"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Deep Work Task Queue (5 cols) */}
          <div className="lg:col-span-5 liquid-glass border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300" />
                  Active Session Objectives
                </span>
                <span className="text-xs text-white/50">
                  {tasks.filter((t) => t.completed).length} / {tasks.length} Done
                </span>
              </div>

              {/* Task List */}
              <div className="mt-4 space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      task.completed
                        ? 'bg-white/5 border-white/5 text-white/40'
                        : 'bg-white/10 border-white/15 text-white/90 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                        task.completed ? 'bg-emerald-400 text-black' : 'border border-white/40'
                      }`}>
                        {task.completed && <CheckCircle className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-xs sm:text-sm leading-snug ${task.completed ? 'line-through' : ''}`}>
                        {task.text}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                      className="text-white/30 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Task Input */}
            <form onSubmit={handleAddTask} className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Add session goal..."
                className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
