import { cn } from '@/lib/utils'
import type { TimerMode } from '@/types'

interface CrocodileSceneProps {
  /** 実行中かどうか */
  isRunning: boolean
  /** 現在のモード */
  mode: TimerMode
}

/** ワニの状態に応じた画像パス */
const CROC_IMAGES: Record<string, string> = {
  idle: '/images/croc-happy.png',
  working: '/images/croc-serious.png',
  break_idle: '/images/croc-sleepy.png',
  break_running: '/images/croc-sleepy.png',
  cheering: '/images/croc-cheering.png',
}

/** ワニの状態を判定する */
function getCrocState(isRunning: boolean, mode: TimerMode): string {
  if (mode === 'break') {
    return isRunning ? 'break_running' : 'break_idle'
  }
  return isRunning ? 'working' : 'idle'
}

/** ワニの状態メッセージ */
function getCrocMessage(isRunning: boolean, mode: TimerMode): string {
  if (mode === 'break') {
    return isRunning ? 'すやすや...' : 'ふぁ〜あ...'
  }
  return isRunning ? 'もくもく集中中!' : 'やるぞ〜!'
}

/** 画像ベースのワニシーンコンポーネント */
export function CrocodileScene({ isRunning, mode }: CrocodileSceneProps) {
  const crocState = getCrocState(isRunning, mode)
  const crocImage = CROC_IMAGES[crocState]
  const message = getCrocMessage(isRunning, mode)
  const isBreak = mode === 'break'

  return (
    <div className="relative flex flex-col items-center">
      {/* 水しぶきエフェクト（タイマー実行中のみ） */}
      {isRunning && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
          <img
            src="/images/water-splash.png"
            alt=""
            className="w-32 h-32 opacity-40 animate-pulse-slow"
          />
        </div>
      )}

      {/* ワニ画像 */}
      <div className={cn(
        'relative z-10 transition-all duration-700',
        isRunning && 'animate-float'
      )}>
        <img
          src={crocImage}
          alt="ワニキャラクター"
          className={cn(
            'w-36 h-36 sm:w-44 sm:h-44 drop-shadow-xl transition-all duration-500',
            isBreak && 'opacity-90 saturate-75'
          )}
        />
      </div>

      {/* ワニのセリフ吹き出し */}
      <div className={cn(
        'mt-1 px-4 py-1.5 rounded-full text-sm font-bold drop-shadow-md transition-all duration-500',
        'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm',
        'border border-white/40 dark:border-slate-600/40',
        isBreak
          ? 'text-amber-600 dark:text-amber-300'
          : 'text-emerald-700 dark:text-emerald-300'
      )}>
        {message}
      </div>
    </div>
  )
}
