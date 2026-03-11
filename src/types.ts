/** タイマーのモード */
export type TimerMode = 'work' | 'break'

/** タイマーの状態 */
export interface TimerState {
  /** 残り時間（秒） */
  timeLeft: number
  /** 実行中かどうか */
  isRunning: boolean
  /** 現在のモード */
  mode: TimerMode
  /** 作業時間（秒） */
  workDuration: number
  /** 休憩時間（秒） */
  breakDuration: number
}

/** タイマーフックの戻り値 */
export interface UseTimerReturn {
  /** 残り時間（秒） */
  timeLeft: number
  /** 実行中かどうか */
  isRunning: boolean
  /** 現在のモード */
  mode: TimerMode
  /** 作業時間（秒） */
  workDuration: number
  /** 休憩時間（秒） */
  breakDuration: number
  /** タイマーの開始/停止を切り替える */
  toggleTimer: () => void
  /** タイマーをリセットする */
  resetTimer: () => void
  /** 作業時間を設定する（秒） */
  setWorkDuration: (seconds: number) => void
  /** 休憩時間を設定する（秒） */
  setBreakDuration: (seconds: number) => void
}
