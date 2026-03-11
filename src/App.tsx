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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-water/10 dark:to-water/5 flex flex-col items-center p-4 pt-6 transition-colors duration-500">
      {/* ダークモード切替ボタン */}
      <div className="fixed top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label={isDark ? 'ライトモードに切替' : 'ダークモードに切替'}
          className="rounded-full bg-card/80 backdrop-blur-sm shadow-md hover:shadow-lg"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* タイトル */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 tracking-tight flex items-center gap-2">
        <span>🐊</span>
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          ワニポモドーロ
        </span>
      </h1>

      <PomodoroTimer />

      {/* フッター */}
      <p className="mt-8 text-xs text-muted-foreground/60">
        ワニと一緒に集中しよう
      </p>
    </div>
  )
}

export default App
