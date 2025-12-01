# ディレクトリルール

このドキュメントはプロジェクトのディレクトリ構成に関するルールを定義する。

## src/components

### src/components/primitive

再利用性の高い原始的なコンポーネントを配置する。
shadcn/ui のコンポーネントはここに格納する。
すべてのファイルに `'use client'` を付与する。

#### 許容する責務

- UIロジック（見た目や操作に関する処理）
- UIの内部状態管理（`useState`）
- フォーカス、ホバー、アニメーション等のUI制御

#### 許容しない責務

- ビジネスロジック
- API通信
- グローバルステートの操作

### src/components/patterns

複数の primitive を組み合わせたコンポーネントを配置する。
UIの構造や体験を組み立てる役割を担う。
すべてのファイルに `'use client'` を付与する。

#### 許容する責務

- primitive 間のUI連携ロジック
- ローカルな状態管理（モーダル開閉等）
- `useController` によるフォーム制御

#### 許容しない責務

- ビジネスロジック（ドメインルール、API呼び出し、権限制御等）
- グローバルステートの変更
- データ処理・マッピングロジック

## app ディレクトリ

### 基本方針

`_components/` および `_features/` は、兄弟の `page.tsx`・`layout.tsx` 等のスコープに限定する。
セグメントごとにスコープを区切り、責務の境界を明確にする。

### app/\*\*/\_components

当該スコープ内で再利用性の高いコンポーネントを配置する。
すべてのファイルに `'use client'` を付与し、`index.ts` に集約する。

### app/\*\*/\_features

当該スコープ専用のコンポーネントを配置する。再利用を前提としない。

#### 命名規則

- サーバーコンポーネント: `*.tsx`
- クライアントコンポーネント: `*.client.tsx`

#### バレルファイルの禁止

`_features/` 内では `index.ts` を作成しない。
サーバーコンポーネントとクライアントコンポーネントを同一のバレルファイルから export すると Next.js でエラーが発生するため。

### 構成例

```
app/
├── _features/                          # ルートの layout.tsx, page.tsx 専用
│   ├── Header.tsx
│   └── Footer.tsx
├── layout.tsx
├── page.tsx
└── (authenticated)/
    ├── _components/                    # 当該グループ内で再利用するコンポーネント
    ├── _features/                      # layout.tsx, page.tsx 専用
    ├── layout.tsx
    ├── page.tsx
    └── posts/
        ├── _features/                  # posts セグメント専用
        │   └── PostList/
        │       ├── PostList.tsx
        │       └── PostList.client.tsx
        └── page.tsx
```

### サーバー/クライアント分離パターン

データの取得・流し込みが必要な場合はサーバーコンポーネントとクライアントコンポーネントを分離する。

```
_features/
└── Example/
    ├── Example.tsx          # サーバーコンポーネント（データ取得・流し込み）
    └── Example.client.tsx   # クライアントコンポーネント（インタラクション）
```

データの流し込みが不要な場合は単一ファイルで構成してよい。
ファイル数が少ない場合はディレクトリを作成せずフラットに配置してもよい。

```
_features/
├── Hoge.tsx
├── Hoge.client.tsx
├── Piyo.tsx
└── Piyo.client.tsx
```
