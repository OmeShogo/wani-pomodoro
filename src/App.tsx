import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { PomodoroTimer } from '@/components/PomodoroTimer'
import { Button } from '@/components/ui/Button'

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景動画 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 mix-blend-multiply dark:mix-blend-screen dark:invert"
      >
        <source src="/images/croc-swimming.mp4" type="video/mp4" />
      </video>

      {/* 背景オーバーレイ */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-sky-200/60 via-sky-100/40 to-emerald-100/50 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80 transition-colors duration-500" />

      {/* 装飾 - 太陽/月 */}
      <div className="fixed top-6 right-8 z-[2] pointer-events-none">
        <img
          src={isDark ? '/images/moon.png' : '/images/sun.png'}
          alt={isDark ? '月' : '太陽'}
          className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg animate-float-slow transition-opacity duration-500"
        />
      </div>

      {/* 装飾 - 花（左下） */}
      <div className="fixed bottom-4 left-4 z-[2] pointer-events-none opacity-80">
        <img
          src="/images/flower-pink.png"
          alt=""
          className="w-14 h-14 sm:w-18 sm:h-18 drop-shadow-md animate-sway"
        />
      </div>

      {/* 装飾 - 花（右下） */}
      <div className="fixed bottom-8 right-4 z-[2] pointer-events-none opacity-80">
        <img
          src="/images/flower-yellow.png"
          alt=""
          className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-md animate-sway"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* 装飾 - 花（左上） */}
      <div className="fixed top-20 left-6 z-[2] pointer-events-none opacity-70">
        <img
          src="/images/flower-blue.png"
          alt=""
          className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-md animate-sway"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-[3] min-h-screen flex flex-col items-center p-4 pt-6">
        {/* ダークモード切替ボタン */}
        <div className="fixed top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? 'ライトモードに切替' : 'ダークモードに切替'}
            className="rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-lg hover:shadow-xl border border-white/30 dark:border-slate-600/30"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </Button>
        </div>

        {/* タイトル */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight flex items-center gap-2 drop-shadow-md">
          <img src="/images/croc-friendly.png" alt="ワニ" className="w-10 h-10 sm:w-12 sm:h-12" />
          <span className="bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-300 dark:to-teal-200 bg-clip-text text-transparent">
            ワニポモドーロ
          </span>
        </h1>

        <PomodoroTimer />

        {/* フッター */}
        <p className="mt-8 text-xs text-slate-600/80 dark:text-slate-300/60 drop-shadow-sm">
          ワニと一緒に集中しよう
        </p>
      </div>
    </div>
  )
}

export default App
