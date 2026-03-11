import type { TimerMode } from '@/types'
import { cn } from '@/lib/utils'

interface TimerDisplayProps {
  /** 残り時間（秒） */
  timeLeft: number
  /** タイマーの全体時間（秒） */
  totalDuration: number
  /** 現在のモード */
  mode: TimerMode
  /** 実行中かどうか */
  isRunning: boolean
}

/** 秒数をMM:SS形式にフォーマットする */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/** 円形プログレス付きタイマー表示コンポーネント */
export function TimerDisplay({ timeLeft, totalDuration, mode, isRunning }: TimerDisplayProps) {
  const progress = totalDuration > 0 ? timeLeft / totalDuration : 1
  const circumference = 2 * Math.PI * 110
  const strokeDashoffset = circumference * (1 - progress)

  const isWork = mode === 'work'

  return (
    <div className="relative flex items-center justify-center">
      {/* 円形プログレスバー */}
      <svg
        className="w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 -rotate-90"
        viewBox="0 0 240 240"
      >
        {/* 背景のグロー */}
        <circle
          cx="120"
          cy="120"
          r="115"
          fill="none"
          strokeWidth="2"
          className={cn(
            'transition-colors duration-500',
            isWork ? 'stroke-emerald-400/20' : 'stroke-amber-400/20'
          )}
        />
        {/* 背景の円 */}
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          strokeWidth="8"
          className="stroke-slate-300/30 dark:stroke-slate-600/30"
        />
        {/* プログレスの円 */}
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={cn(
            'transition-all duration-1000 ease-linear drop-shadow-md',
            isWork ? 'stroke-emerald-500 dark:stroke-emerald-400' : 'stroke-amber-500 dark:stroke-amber-400'
          )}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            filter: `drop-shadow(0 0 6px ${isWork ? '#10b981' : '#f59e0b'}40)`,
          }}
        />
        {/* プログレス先端の光る点 */}
        <circle
          cx="120"
          cy="10"
          r="5"
          className={cn(
            'transition-all duration-1000',
            isWork ? 'fill-emerald-400/80' : 'fill-amber-400/80'
          )}
          style={{
            transform: `rotate(${360 * (1 - progress)}deg)`,
            transformOrigin: '120px 120px',
            filter: `drop-shadow(0 0 4px ${isWork ? '#10b981' : '#f59e0b'})`,
          }}
        />
      </svg>

      {/* 中央のテキスト */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            'text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-1 transition-colors duration-500',
            isWork ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
          )}
        >
          {isWork ? '作業' : '休憩'}
        </span>
        <span className="text-5xl sm:text-6xl font-mono font-bold tabular-nums text-slate-800 dark:text-slate-100 drop-shadow-sm">
          {formatTime(timeLeft)}
        </span>
        {isRunning && (
          <span className={cn(
            'mt-2 text-xs animate-pulse tracking-wider transition-colors duration-500',
            isWork ? 'text-emerald-600/70 dark:text-emerald-400/70' : 'text-amber-600/70 dark:text-amber-400/70'
          )}>
            {isWork ? 'がんばって!' : 'のんびり~'}
          </span>
        )}
      </div>
    </div>
  )
}
