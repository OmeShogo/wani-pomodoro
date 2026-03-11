import { useTimer } from '@/hooks/useTimer'
import { TimerDisplay } from './TimerDisplay'
import { TimerControls } from './TimerControls'
import { TimeSettings } from './TimeSettings'
import { CrocodileScene } from './CrocodileScene'

/** ポモドーロタイマーのメインコンポーネント */
export function PomodoroTimer() {
  const {
    timeLeft,
    isRunning,
    mode,
    workDuration,
    breakDuration,
    toggleTimer,
    resetTimer,
    setWorkDuration,
    setBreakDuration,
  } = useTimer()

  const totalDuration = mode === 'work' ? workDuration : breakDuration

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      {/* ワニのイラストシーン */}
      <CrocodileScene isRunning={isRunning} mode={mode} />

      {/* タイマー表示 */}
      <div className="-mt-4">
        <TimerDisplay
          timeLeft={timeLeft}
          totalDuration={totalDuration}
          mode={mode}
          isRunning={isRunning}
        />
      </div>

      {/* 操作ボタン */}
      <TimerControls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
      />

      {/* 時間設定 */}
      <TimeSettings
        workDuration={workDuration}
        breakDuration={breakDuration}
        isRunning={isRunning}
        onWorkDurationChange={setWorkDuration}
        onBreakDurationChange={setBreakDuration}
      />
    </div>
  )
}
