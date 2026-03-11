import { useState, useEffect, useRef, useCallback } from 'react'
import type { TimerMode, UseTimerReturn } from '@/types'
import {
  DEFAULT_WORK_DURATION,
  DEFAULT_BREAK_DURATION,
  TIMER_INTERVAL_MS,
  NOTIFICATION_FREQUENCY,
  NOTIFICATION_DURATION,
  NOTIFICATION_REPEAT,
} from '@/constants'

/** 通知音を再生する */
function playNotificationSound(): void {
  try {
    const audioContext = new AudioContext()

    for (let i = 0; i < NOTIFICATION_REPEAT; i++) {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = NOTIFICATION_FREQUENCY
      oscillator.type = 'sine'

      const startTime = audioContext.currentTime + i * (NOTIFICATION_DURATION + 0.1)
      gainNode.gain.setValueAtTime(0.3, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + NOTIFICATION_DURATION)

      oscillator.start(startTime)
      oscillator.stop(startTime + NOTIFICATION_DURATION)
    }
  } catch {
    // Web Audio APIが利用できない環境では何もしない
  }
}

/** ポモドーロタイマーのカスタムフック */
export function useTimer(): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<TimerMode>('work')
  const [workDuration, setWorkDurationState] = useState(DEFAULT_WORK_DURATION)
  const [breakDuration, setBreakDurationState] = useState(DEFAULT_BREAK_DURATION)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /** モード切替時の処理 */
  const switchMode = useCallback((currentMode: TimerMode) => {
    const nextMode: TimerMode = currentMode === 'work' ? 'break' : 'work'
    setMode(nextMode)
    setTimeLeft(nextMode === 'work' ? workDuration : breakDuration)
    playNotificationSound()
  }, [workDuration, breakDuration])

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          switchMode(mode)
          return 0
        }
        return prev - 1
      })
    }, TIMER_INTERVAL_MS)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, mode, switchMode])

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setMode('work')
    setTimeLeft(workDuration)
  }, [workDuration])

  const setWorkDuration = useCallback((seconds: number) => {
    if (isRunning) return
    setWorkDurationState(seconds)
    if (mode === 'work') {
      setTimeLeft(seconds)
    }
  }, [isRunning, mode])

  const setBreakDuration = useCallback((seconds: number) => {
    if (isRunning) return
    setBreakDurationState(seconds)
    if (mode === 'break') {
      setTimeLeft(seconds)
    }
  }, [isRunning, mode])

  return {
    timeLeft,
    isRunning,
    mode,
    workDuration,
    breakDuration,
    toggleTimer,
    resetTimer,
    setWorkDuration,
    setBreakDuration,
  }
}
