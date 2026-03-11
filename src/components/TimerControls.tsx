import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from './ui/Button'

interface TimerControlsProps {
  /** 実行中かどうか */
  isRunning: boolean
  /** 開始/停止を切り替えるコールバック */
  onToggle: () => void
  /** リセットするコールバック */
  onReset: () => void
}

/** タイマー操作ボタンコンポーネント */
export function TimerControls({ isRunning, onToggle, onReset }: TimerControlsProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Button
        variant="primary"
        size="lg"
        onClick={onToggle}
        aria-label={isRunning ? '停止' : '開始'}
        className="min-w-28 sm:min-w-32 rounded-full shadow-lg hover:shadow-xl transition-all bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 backdrop-blur-sm"
      >
        {isRunning ? (
          <>
            <Pause className="w-5 h-5 mr-2" />
            停止
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            開始
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={onReset}
        aria-label="リセット"
        className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/40 dark:border-slate-600/40 hover:bg-white/70 dark:hover:bg-slate-700/50"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        リセット
      </Button>
    </div>
  )
}
