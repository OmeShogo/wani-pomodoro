import { renderHook, act } from '@testing-library/react'
import { useTimer } from './useTimer'
import { DEFAULT_WORK_DURATION, DEFAULT_BREAK_DURATION } from '@/constants'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('初期状態が正しいこと', () => {
    const { result } = renderHook(() => useTimer())

    expect(result.current.timeLeft).toBe(DEFAULT_WORK_DURATION)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.mode).toBe('work')
    expect(result.current.workDuration).toBe(DEFAULT_WORK_DURATION)
    expect(result.current.breakDuration).toBe(DEFAULT_BREAK_DURATION)
  })

  it('toggleTimerでタイマーが開始・停止できること', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.toggleTimer()
    })
    expect(result.current.isRunning).toBe(true)

    act(() => {
      result.current.toggleTimer()
    })
    expect(result.current.isRunning).toBe(false)
  })

  it('タイマー実行中に1秒ごとにカウントダウンすること', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.toggleTimer()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.timeLeft).toBe(DEFAULT_WORK_DURATION - 1)

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.timeLeft).toBe(DEFAULT_WORK_DURATION - 3)
  })

  it('リセットで初期状態に戻ること', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.toggleTimer()
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    act(() => {
      result.current.resetTimer()
    })

    expect(result.current.timeLeft).toBe(DEFAULT_WORK_DURATION)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.mode).toBe('work')
  })

  it('作業時間が0になったら休憩モードに切り替わること', () => {
    const { result } = renderHook(() => useTimer())

    // 短い作業時間を設定
    act(() => {
      result.current.setWorkDuration(3)
    })
    act(() => {
      result.current.toggleTimer()
    })

    // 3秒経過
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.mode).toBe('break')
    expect(result.current.timeLeft).toBe(DEFAULT_BREAK_DURATION)
    expect(result.current.isRunning).toBe(true)
  })

  it('休憩時間が0になったら作業モードに切り替わること', () => {
    const { result } = renderHook(() => useTimer())

    // 短い作業・休憩時間を設定
    act(() => {
      result.current.setWorkDuration(1)
      result.current.setBreakDuration(2)
    })
    act(() => {
      result.current.toggleTimer()
    })

    // 作業時間終了
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.mode).toBe('break')

    // 休憩時間終了
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.mode).toBe('work')
    expect(result.current.timeLeft).toBe(1)
    expect(result.current.isRunning).toBe(true)
  })

  it('作業時間を変更できること', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.setWorkDuration(30 * 60)
    })

    expect(result.current.workDuration).toBe(30 * 60)
    expect(result.current.timeLeft).toBe(30 * 60)
  })

  it('休憩時間を変更できること', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.setBreakDuration(10 * 60)
    })

    expect(result.current.breakDuration).toBe(10 * 60)
  })

  it('タイマー実行中は時間設定を変更できないこと', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.toggleTimer()
    })

    act(() => {
      result.current.setWorkDuration(30 * 60)
    })

    // 変更されないことを確認
    expect(result.current.workDuration).toBe(DEFAULT_WORK_DURATION)
  })
})
