import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { MAX_DURATION, MIN_DURATION } from '@/constants'

interface TimeSettingsProps {
  /** 作業時間（秒） */
  workDuration: number
  /** 休憩時間（秒） */
  breakDuration: number
  /** タイマー実行中かどうか */
  isRunning: boolean
  /** 作業時間を変更するコールバック */
  onWorkDurationChange: (seconds: number) => void
  /** 休憩時間を変更するコールバック */
  onBreakDurationChange: (seconds: number) => void
}

/** 分と秒を秒数に変換する */
function toSeconds(minutes: number, seconds: number): number {
  return Math.max(MIN_DURATION, Math.min(MAX_DURATION, minutes * 60 + seconds))
}

/** 時間入力コンポーネント */
function TimeInput({
  label,
  emoji,
  minutes,
  seconds,
  disabled,
  onMinutesChange,
  onSecondsChange,
}: {
  label: string
  emoji: string
  minutes: number
  seconds: number
  disabled: boolean
  onMinutesChange: (value: number) => void
  onSecondsChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col items-center gap-2 bg-card backdrop-blur-sm rounded-2xl p-4 shadow-md border border-border/50">
      <span className="text-sm font-bold text-card-foreground flex items-center gap-1.5">
        <span>{emoji}</span>
        {label}
      </span>
      <div className="flex items-center gap-1">
        <input
          type="number"
          min={0}
          max={99}
          value={minutes}
          onChange={(e) => onMinutesChange(Number(e.target.value))}
          disabled={disabled}
          aria-label={`${label}（分）`}
          className={cn(
            'w-14 h-10 text-center text-lg font-mono font-bold rounded-xl border-2 border-border bg-background text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        />
        <span className="text-muted-foreground font-mono text-lg font-bold">:</span>
        <input
          type="number"
          min={0}
          max={59}
          value={seconds}
          onChange={(e) => onSecondsChange(Number(e.target.value))}
          disabled={disabled}
          aria-label={`${label}（秒）`}
          className={cn(
            'w-14 h-10 text-center text-lg font-mono font-bold rounded-xl border-2 border-border bg-background text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        />
      </div>
    </div>
  )
}

/** 時間設定コンポーネント */
export function TimeSettings({
  workDuration,
  breakDuration,
  isRunning,
  onWorkDurationChange,
  onBreakDurationChange,
}: TimeSettingsProps) {
  const workMinutes = Math.floor(workDuration / 60)
  const workSeconds = workDuration % 60
  const breakMinutes = Math.floor(breakDuration / 60)
  const breakSeconds = breakDuration % 60

  const handleWorkMinutesChange = useCallback(
    (mins: number) => onWorkDurationChange(toSeconds(mins, workSeconds)),
    [onWorkDurationChange, workSeconds]
  )
  const handleWorkSecondsChange = useCallback(
    (secs: number) => onWorkDurationChange(toSeconds(workMinutes, secs)),
    [onWorkDurationChange, workMinutes]
  )
  const handleBreakMinutesChange = useCallback(
    (mins: number) => onBreakDurationChange(toSeconds(mins, breakSeconds)),
    [onBreakDurationChange, breakSeconds]
  )
  const handleBreakSecondsChange = useCallback(
    (secs: number) => onBreakDurationChange(toSeconds(breakMinutes, secs)),
    [onBreakDurationChange, breakMinutes]
  )

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      <TimeInput
        label="作業時間"
        emoji="🐊"
        minutes={workMinutes}
        seconds={workSeconds}
        disabled={isRunning}
        onMinutesChange={handleWorkMinutesChange}
        onSecondsChange={handleWorkSecondsChange}
      />
      <TimeInput
        label="休憩時間"
        emoji="💤"
        minutes={breakMinutes}
        seconds={breakSeconds}
        disabled={isRunning}
        onMinutesChange={handleBreakMinutesChange}
        onSecondsChange={handleBreakSecondsChange}
      />
    </div>
  )
}
