# 構成ルール

このドキュメントはプロジェクトのディレクトリ構成およびファイル命名に関するルールを定義する。

## コンポーネントの命名規則

src 配下のコンポーネントに適用する。

- コンポーネントを含むディレクトリ: PascalCase（例: `Header/`, `FormGroup/`）
- コンポーネントファイル: PascalCase（例: `Header.tsx`, `FormGroup.tsx`）

## src/components

### src/components/primitives

- 再利用性の高い原始的なコンポーネントを配置する。
- shadcn/ui のコンポーネントはここに格納する。
- すべてのファイルに `'use client'` を付与する。

**理由**: UI の最小単位は server 最適化のメリットがほぼない。

#### 許容する責務

- UIロジック（見た目や操作に関する処理）
- UIの内部状態管理（`useState`）
- フォーカス、ホバー、アニメーション等のUI制御

#### 許容しない責務

- ビジネスロジック
- API通信
- グローバルステートの操作

### src/components/patterns

- 複数の primitives を組み合わせたコンポーネントを配置する。
- UIの構造や体験を組み立てる役割を担う。
- すべてのファイルに `'use client'` を付与する。

**理由**: UI 連携レイヤはインタラクションを前提とする。データ取得は上位の feature や page で行い、patterns は UI に専念する。

#### 許容する責務

- primitives 間のUI連携ロジック
- ローカルな状態管理（モーダル開閉等）
- カスタムフックによる UI 制御

#### 許容しない責務

- ビジネスロジック（ドメインルール、API呼び出し、権限制御等）
- グローバルステートの変更
- データ処理・マッピングロジック

## app ディレクトリ

### 基本方針

`_components/` および `_features/` は、兄弟の `page.tsx`・`layout.tsx` 等のスコープに限定する。
セグメントごとにスコープを区切り、責務の境界を明確にする。

### app/\*\*/\_components

- 当該スコープ内で再利用性の高いコンポーネントを配置する。
- すべてのファイルに `'use client'` を付与し、`index.ts` に集約する。
- 許容する責務・許容しない責務は primitives/patterns と同様（違いはスコープのみ）。

**理由**: primitives/patterns と同様、スコープ内の再利用 UI は client 統一で運用を安定させる。

### app/\*\*/\_features

- 当該スコープ専用のコンポーネントを配置する。
- 再利用を前提としない。

**理由**: RSC の境界管理は feature レイヤで行う。primitives/patterns は UI の世界、\_features はデータ取得と UI を繋ぐ世界として責務を分離する。

#### ファイル命名規則

- サーバーコンポーネント: `*.tsx`
- クライアントコンポーネント: `*.client.tsx`

#### ディレクトリ構成ルール

- feature は必ずディレクトリにまとめる（`_features/` 直下にフラット配置禁止）
- `index.ts` はサーバーコンポーネントのみを export する
- クライアントコンポーネントは親サーバーコンポーネント内で直接 import する
- データ取得が必要な場合: `*.tsx`（server）+ `*.client.tsx`（client）に分離
- 単一ファイルで完結する場合も、ディレクトリにまとめる

### 構成例

```
app/
├── _features/
│   ├── Header/
│   │   ├── Header.tsx           # server（データ不要）
│   │   ├── UserMenu.client.tsx  # client（インタラクション）
│   │   └── index.ts             # Header のみ export
│   └── Footer/
│       ├── Footer.tsx           # 単一ファイルで完結
│       └── index.ts
├── layout.tsx
├── page.tsx
└── posts/
    ├── _components/             # posts スコープで再利用
    │   ├── PostCard.tsx
    │   └── index.ts
    ├── _features/               # posts スコープ専用
    │   └── PostList/
    │       ├── PostList.tsx     # server（データ取得）
    │       ├── PostList.client.tsx
    │       └── index.ts
    ├── page.tsx
    └── [id]/
        └── _features/
            └── PostDetail/
                ├── PostDetail.tsx
                ├── PostDetail.client.tsx
                └── index.ts
```
