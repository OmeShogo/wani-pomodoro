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

  return (
    <div className="relative flex items-center justify-center">
      {/* 円形プログレスバー */}
      <svg
        className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 -rotate-90"
        viewBox="0 0 240 240"
      >
        {/* 背景の装飾円 */}
        <circle
          cx="120"
          cy="120"
          r="115"
          fill="none"
          strokeWidth="2"
          className="stroke-water/20 dark:stroke-water/10"
        />
        {/* 背景の円 */}
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          strokeWidth="10"
          className="stroke-muted/50"
        />
        {/* プログレスの円 */}
        <circle
          cx="120"
          cy="120"
          r="110"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={cn(
            'transition-all duration-1000 ease-linear',
            mode === 'work' ? 'stroke-primary' : 'stroke-success'
          )}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
        {/* 水滴の装飾 */}
        <circle
          cx="120"
          cy="10"
          r="4"
          className={cn(
            'transition-all duration-1000',
            mode === 'work' ? 'fill-primary/60' : 'fill-success/60'
          )}
          style={{
            transform: `rotate(${360 * (1 - progress)}deg)`,
            transformOrigin: '120px 120px',
          }}
        />
      </svg>

      {/* 中央のテキスト */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            'text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-1',
            mode === 'work' ? 'text-primary' : 'text-success'
          )}
        >
          {mode === 'work' ? '作業' : '休憩'}
        </span>
        <span
          className={cn(
            'text-5xl sm:text-6xl font-mono font-bold tabular-nums text-foreground drop-shadow-sm'
          )}
        >
          {formatTime(timeLeft)}
        </span>
        {isRunning && (
          <span className="mt-2 text-xs text-muted-foreground animate-pulse tracking-wider">
            {mode === 'work' ? 'がんばって!' : 'のんびり~'}
          </span>
        )}
      </div>
    </div>
  )
}
