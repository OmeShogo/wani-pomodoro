import { cn } from '@/lib/utils'
import type { TimerMode } from '@/types'

interface CrocodileSceneProps {
  /** 実行中かどうか */
  isRunning: boolean
  /** 現在のモード */
  mode: TimerMode
}

/** 水辺のワニのイラストシーン */
export function CrocodileScene({ isRunning, mode }: CrocodileSceneProps) {
  const isBreak = mode === 'break'

  return (
    <div className="relative w-full max-w-lg h-48 sm:h-56 overflow-hidden">
      {/* 空の背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-transparent dark:from-sky-900 dark:via-sky-950 dark:to-transparent" />

      {/* 太陽/月 */}
      <div className="absolute top-3 right-8">
        <div className={cn(
          'w-10 h-10 rounded-full',
          'bg-yellow-300 dark:bg-yellow-100',
          'shadow-[0_0_20px_rgba(250,204,21,0.4)] dark:shadow-[0_0_20px_rgba(250,204,21,0.2)]'
        )} />
      </div>

      {/* 雲 */}
      <div className="absolute top-5 left-6 opacity-60">
        <svg width="60" height="24" viewBox="0 0 60 24">
          <ellipse cx="20" cy="16" rx="16" ry="8" className="fill-white dark:fill-gray-600" />
          <ellipse cx="35" cy="12" rx="14" ry="10" className="fill-white dark:fill-gray-600" />
          <ellipse cx="48" cy="16" rx="12" ry="7" className="fill-white dark:fill-gray-600" />
        </svg>
      </div>

      {/* 葦/草 - 左側 */}
      <div className="absolute bottom-16 left-4">
        <svg width="30" height="60" viewBox="0 0 30 60">
          <path d="M8 60 Q6 30 4 10 Q3 5 6 0" strokeWidth="2" fill="none" className="stroke-green-600 dark:stroke-green-700" />
          <path d="M15 60 Q14 35 12 15 Q11 8 14 2" strokeWidth="2" fill="none" className="stroke-green-500 dark:stroke-green-600" />
          <path d="M22 60 Q20 40 18 20 Q17 12 20 5" strokeWidth="2" fill="none" className="stroke-green-600 dark:stroke-green-700" />
          <ellipse cx="4" cy="8" rx="3" ry="5" className="fill-green-700 dark:fill-green-800" />
          <ellipse cx="12" cy="10" rx="3" ry="6" className="fill-green-600 dark:fill-green-700" />
        </svg>
      </div>

      {/* 葦/草 - 右側 */}
      <div className="absolute bottom-16 right-6">
        <svg width="24" height="50" viewBox="0 0 24 50">
          <path d="M6 50 Q5 25 3 8 Q2 4 5 0" strokeWidth="2" fill="none" className="stroke-green-600 dark:stroke-green-700" />
          <path d="M14 50 Q13 30 11 12 Q10 6 13 2" strokeWidth="2" fill="none" className="stroke-green-500 dark:stroke-green-600" />
          <ellipse cx="3" cy="6" rx="3" ry="4" className="fill-green-700 dark:fill-green-800" />
        </svg>
      </div>

      {/* ワニ本体 */}
      <div className={cn(
        'absolute bottom-12 left-1/2 -translate-x-1/2',
        isRunning ? 'animate-float' : ''
      )}>
        <svg width="200" height="80" viewBox="0 0 200 80">
          {/* 尻尾 */}
          <g className={cn(isRunning && 'animate-tail-wag')} style={{ transformOrigin: '30px 45px' }}>
            <path
              d="M30 40 Q10 35 2 42 Q0 45 5 48 Q15 50 30 48"
              className="fill-croc dark:fill-croc"
            />
            {/* 尻尾のトゲ */}
            <path d="M10 38 L8 33 L14 37" className="fill-croc-light dark:fill-croc-light" />
            <path d="M18 37 L17 32 L22 36" className="fill-croc-light dark:fill-croc-light" />
          </g>

          {/* 胴体 */}
          <ellipse cx="80" cy="42" rx="55" ry="22" className="fill-croc dark:fill-croc" />
          {/* お腹 */}
          <ellipse cx="80" cy="50" rx="40" ry="12" className="fill-croc-belly dark:fill-croc-belly" />

          {/* 背中のトゲ */}
          <path d="M45 22 L48 15 L52 22" className="fill-croc-light dark:fill-croc-light" />
          <path d="M56 20 L60 12 L64 20" className="fill-croc-light dark:fill-croc-light" />
          <path d="M68 19 L72 10 L76 19" className="fill-croc-light dark:fill-croc-light" />
          <path d="M80 20 L84 12 L88 20" className="fill-croc-light dark:fill-croc-light" />
          <path d="M92 22 L95 15 L98 22" className="fill-croc-light dark:fill-croc-light" />

          {/* 前足 */}
          <g>
            <path d="M105 55 Q108 65 102 70 Q100 71 98 70 Q96 68 100 62 Q97 60 95 55" className="fill-croc dark:fill-croc" />
          </g>
          {/* 後足 */}
          <g>
            <path d="M55 55 Q58 65 52 70 Q50 71 48 70 Q46 68 50 62 Q47 60 45 55" className="fill-croc dark:fill-croc" />
          </g>

          {/* 頭部 */}
          <ellipse cx="140" cy="38" rx="28" ry="18" className="fill-croc dark:fill-croc" />
          {/* 口 - 上あご */}
          <path
            d={isBreak
              ? "M140 42 Q160 38 185 40 Q188 41 185 44 Q165 42 140 45"
              : "M140 42 Q160 40 185 38 Q188 39 185 42 Q165 41 140 44"
            }
            className="fill-croc-light dark:fill-croc-light"
          />
          {/* 口 - 下あご */}
          <path
            d={isBreak
              ? "M140 46 Q160 48 182 46 Q184 47 182 48 Q160 52 140 48"
              : "M140 44 Q160 43 182 42 Q184 43 182 44 Q160 44 140 46"
            }
            className="fill-croc dark:fill-croc"
          />

          {/* 歯（作業中は口を閉じているので見えにくい） */}
          {isBreak && (
            <g>
              <path d="M158 44 L160 47 L162 44" className="fill-white" />
              <path d="M168 43 L170 46 L172 43" className="fill-white" />
              <path d="M178 43 L179 46 L180 43" className="fill-white" />
            </g>
          )}

          {/* 鼻の穴 */}
          <circle cx="182" cy="36" r="2" className="fill-croc-light dark:fill-croc-light opacity-60" />
          <circle cx="178" cy="35" r="2" className="fill-croc-light dark:fill-croc-light opacity-60" />

          {/* 目 */}
          <g>
            {/* 目の土台（出目） */}
            <ellipse cx="148" cy="28" rx="8" ry="7" className="fill-croc-light dark:fill-croc-light" />
            {/* 白目 */}
            <ellipse cx="148" cy="28" rx="6" ry="5" className="fill-white dark:fill-gray-200" />
            {/* 黒目 */}
            <g className="animate-blink" style={{ transformOrigin: '148px 28px' }}>
              <ellipse cx="150" cy="28" rx="3" ry="4" className="fill-gray-900 dark:fill-gray-900" />
              {/* 目のハイライト */}
              <circle cx="151" cy="26" r="1" className="fill-white" />
            </g>
          </g>

          {/* 休憩中のZzz */}
          {isBreak && !isRunning && (
            <g className="opacity-60">
              <text x="155" y="15" fontSize="10" fontWeight="bold" className="fill-foreground">Z</text>
              <text x="165" y="8" fontSize="8" fontWeight="bold" className="fill-foreground opacity-70">z</text>
              <text x="172" y="3" fontSize="6" fontWeight="bold" className="fill-foreground opacity-50">z</text>
            </g>
          )}
        </svg>
      </div>

      {/* 水面 */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        {/* 水面の波1 */}
        <svg
          className="absolute top-0 w-[200%] h-8 animate-wave opacity-80"
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
        >
          <path
            d="M0 16 Q50 8 100 16 T200 16 T300 16 T400 16 T500 16 T600 16 T700 16 T800 16 T900 16 T1000 16 T1100 16 T1200 16 V32 H0 Z"
            className="fill-water/60 dark:fill-water/40"
          />
        </svg>
        {/* 水面の波2 */}
        <svg
          className="absolute top-2 w-[200%] h-8 animate-wave-reverse opacity-60"
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
        >
          <path
            d="M0 16 Q50 24 100 16 T200 16 T300 16 T400 16 T500 16 T600 16 T700 16 T800 16 T900 16 T1000 16 T1100 16 T1200 16 V32 H0 Z"
            className="fill-water/50 dark:fill-water/30"
          />
        </svg>
        {/* 水の本体 */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-water/40 dark:bg-water/20" />

        {/* 泡 */}
        {isRunning && (
          <>
            <div className="absolute bottom-3 left-[20%] w-2 h-2 rounded-full bg-white/40 animate-bubble" />
            <div className="absolute bottom-4 left-[45%] w-1.5 h-1.5 rounded-full bg-white/30 animate-bubble" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-2 left-[70%] w-2.5 h-2.5 rounded-full bg-white/35 animate-bubble" style={{ animationDelay: '2s' }} />
          </>
        )}
      </div>

      {/* 蓮の葉 */}
      <div className="absolute bottom-6 left-[15%]">
        <svg width="28" height="20" viewBox="0 0 28 20">
          <ellipse cx="14" cy="12" rx="13" ry="8" className="fill-green-500/70 dark:fill-green-700/70" />
          <path d="M14 4 L14 12" strokeWidth="1" className="stroke-green-700/50 dark:stroke-green-500/50" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-[20%]">
        <svg width="22" height="16" viewBox="0 0 22 16">
          <ellipse cx="11" cy="10" rx="10" ry="6" className="fill-green-500/60 dark:fill-green-700/60" />
          <path d="M11 4 L11 10" strokeWidth="1" className="stroke-green-700/50 dark:stroke-green-500/50" />
          {/* 小さな花 */}
          <circle cx="11" cy="3" r="3" className="fill-pink-300/80 dark:fill-pink-400/60" />
          <circle cx="11" cy="3" r="1.5" className="fill-yellow-300/80 dark:fill-yellow-400/60" />
        </svg>
      </div>
    </div>
  )
}
