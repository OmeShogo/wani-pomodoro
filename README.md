# Pomodoro Timer

一画面のポモドーロタイマーアプリケーション。

## 機能

- 作業時間と休憩時間を分・秒単位で設定可能
- タイマーの開始・停止・リセット
- 作業と休憩の自動切替
- 作業・休憩終了時に通知音（Web Audio API）
- 円形プログレスバーによる残り時間の視覚表示
- ダークモード / ライトモード切替
- レスポンシブデザイン

## 技術スタック

| 技術 | バージョン |
|------|-----------|
| React | 19 |
| TypeScript | 5.9 |
| Vite | 7 |
| Tailwind CSS | 4.x |
| Vitest | 4 |
| React Testing Library | 16 |

## ディレクトリ構成

```
src/
├── App.tsx                    # アプリケーションルート（ダークモード管理）
├── constants.ts               # 定数定義
├── types.ts                   # 型定義
├── components/
│   ├── PomodoroTimer.tsx      # タイマー全体のコンテナ
│   ├── PomodoroTimer.test.tsx # コンポーネントテスト
│   ├── TimerDisplay.tsx       # 円形プログレス付きタイマー表示
│   ├── TimerControls.tsx      # 操作ボタン（開始/停止/リセット）
│   ├── TimeSettings.tsx       # 作業・休憩時間の設定入力
│   └── ui/
│       └── Button.tsx         # 汎用ボタン（CVA ベース）
├── hooks/
│   ├── useTimer.ts            # タイマーロジック（カスタムフック）
│   └── useTimer.test.ts       # フックテスト
├── lib/
│   └── utils.ts               # cn() ユーティリティ
└── test/
    └── setup.ts               # テストセットアップ
```

## コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm test

# テスト（ウォッチモード）
npm run test:watch

# Lint
npm run lint
```

## デフォルト設定

| 項目 | 値 |
|------|-----|
| 作業時間 | 25分 |
| 休憩時間 | 5分 |
| 最大設定時間 | 99分59秒 |

## アーキテクチャ

- **状態管理**: `useTimer` カスタムフックにタイマーロジックを集約
- **スタイリング**: Tailwind CSS 4.x + CVA (Class Variance Authority) によるコンポーネントバリアント管理
- **ダークモード**: CSS カスタムプロパティ + `dark` クラスによるテーマ切替
- **通知音**: Web Audio API を使用（外部音声ファイル不要）
- **テスト**: Vitest + React Testing Library による TDD アプローチ
