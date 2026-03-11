import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PomodoroTimer } from './PomodoroTimer'

describe('PomodoroTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('初期表示が正しいこと', () => {
    render(<PomodoroTimer />)

    // タイマー表示（25:00）が存在すること
    expect(screen.getByText('25:00')).toBeInTheDocument()
    // 作業モードのラベルが存在すること
    expect(screen.getByText('作業')).toBeInTheDocument()
  })

  it('開始ボタンでタイマーが開始すること', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<PomodoroTimer />)

    const startButton = screen.getByRole('button', { name: '開始' })
    await user.click(startButton)

    // 停止ボタンに変わること
    expect(screen.getByRole('button', { name: '停止' })).toBeInTheDocument()
  })

  it('停止ボタンでタイマーが停止すること', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<PomodoroTimer />)

    // 開始
    await user.click(screen.getByRole('button', { name: '開始' }))
    // 停止
    await user.click(screen.getByRole('button', { name: '停止' }))

    // 開始ボタンに戻ること
    expect(screen.getByRole('button', { name: '開始' })).toBeInTheDocument()
  })

  it('リセットボタンでタイマーが初期化されること', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<PomodoroTimer />)

    // 開始して少し進める
    await user.click(screen.getByRole('button', { name: '開始' }))
    vi.advanceTimersByTime(3000)

    // リセット
    await user.click(screen.getByRole('button', { name: 'リセット' }))

    expect(screen.getByText('25:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '開始' })).toBeInTheDocument()
  })

  it('作業時間の分を設定できること', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<PomodoroTimer />)

    // 作業時間の分入力を変更
    const workMinInput = screen.getByLabelText('作業時間（分）')
    await user.clear(workMinInput)
    await user.type(workMinInput, '30')

    expect(screen.getByText('30:00')).toBeInTheDocument()
  })

  it('作業時間の秒を設定できること', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<PomodoroTimer />)

    // 作業時間の秒入力を変更
    const workSecInput = screen.getByLabelText('作業時間（秒）')
    await user.clear(workSecInput)
    await user.type(workSecInput, '30')

    expect(screen.getByText('25:30')).toBeInTheDocument()
  })

  it('休憩時間の分を設定できること', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<PomodoroTimer />)

    const breakMinInput = screen.getByLabelText('休憩時間（分）')
    await user.clear(breakMinInput)
    await user.type(breakMinInput, '10')

    // 休憩時間はタイマー表示には反映されない（作業モードのため）
    // 入力値が正しいことを確認
    expect(breakMinInput).toHaveValue(10)
  })
})
