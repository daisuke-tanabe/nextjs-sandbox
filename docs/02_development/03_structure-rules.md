# ディレクトリ構成およびファイル命名のルール

このドキュメントはプロジェクトのディレクトリ構成およびファイル命名に関するルールを定義する。

## 設計思想

**「責務境界で UI を育てる」** ことを目的とする。

- いきなり共通化せず、再利用されたタイミングで昇格させる
- 責務が明確な状態で共有する

これにより、早すぎる抽象化（Premature Abstraction）や肥大化したコンポーネント（Fat Component）を防ぐ。

### UI の責務境界（3 レイヤー）

| レイヤー   | 役割                                   | 例                    |
| ---------- | -------------------------------------- | --------------------- |
| primitives | UI 表現（見た目・入力・表示の単位）    | Button, Card, Input   |
| patterns   | UI 体験（UI 同士の連携・操作）         | SearchForm, DataTable |
| features   | アプリ機能（データ取得・ビジネス判断） | PostList, UserProfile |

**features → patterns → primitives** の順でコード品質と実装の重要度が高くなる。primitives に近いほど「軽く・薄く」保つことで、再利用性と保守性を高める。

## 'use client' 早見表

| 層           | 'use client'     |
| ------------ | ---------------- |
| primitives   | 必須             |
| patterns     | 必須             |
| \_components | 必須             |
| \_features   | 状況に応じて分離 |

## 命名規則

src 配下のコンポーネントに適用する。

- ディレクトリ: PascalCase（例: `Header/`, `FormGroup/`）
- ファイル: PascalCase（例: `Header.tsx`, `FormGroup.tsx`）

## src/components

アプリ全体で再利用するコンポーネントを配置する。

**原則**: 最初から `src/components` に配置しない。まず `app/**/_components` でスコープ内の再利用を検証し、複数スコープで必要になった時点で昇格させる。

### primitives

- 再利用性の高い原始的なコンポーネントを配置する
- shadcn/ui のコンポーネントはここに格納する
- ファイルは直下にフラット配置し、`index.ts` で一括 export する
- すべてのファイルに `'use client'` を付与する

**理由**: UI の最小単位は server 最適化のメリットがほぼない。

**補足**: primitives / patterns を server component として実装しない理由:

- RSC / Client の import 制約が UI 再利用の障害になりやすい
- UI 最小単位では server 化によるパフォーマンスメリットが限定的
- Storybook・単体テスト・将来の移植性を考慮すると client 統一の方が安全

#### 許容する責務

- UI ロジック（見た目や操作に関する処理）
- UI の内部状態管理（`useState`）
- フォーカス、ホバー、アニメーション等の UI 制御

#### 許容しない責務

- ビジネスロジック
- API 通信
- グローバルステートの操作
- サーバーコンポーネント（RSC）としての実装

### patterns

- 複数の primitives を組み合わせたコンポーネントを配置する
- UI の構造や体験を組み立てる役割を担う
- ファイルは直下にフラット配置し、`index.ts` で一括 export する
- すべてのファイルに `'use client'` を付与する

**理由**: UI 連携レイヤはインタラクションを前提とする。データ取得は上位の feature や page で行い、patterns は UI に専念する。

#### 許容する責務

- primitives 間の UI 連携ロジック
- ローカルな状態管理（モーダル開閉等）
- カスタムフックによる UI 制御

#### 許容しない責務

- ビジネスロジック（ドメインルール、API 呼び出し、権限制御等）
- グローバルステートの変更
- データ処理・マッピングロジック
- サーバーコンポーネント（RSC）としての実装

### 構成例

```
src/components/
├── primitives/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── index.ts
└── patterns/
    ├── SearchForm.tsx
    ├── DataTable.tsx
    └── index.ts
```

## app ディレクトリ

### \_components

- 当該スコープ内で再利用性の高いコンポーネントを配置する
- `_components/` は兄弟の `page.tsx`・`layout.tsx` 等のスコープに限定する
- すべてのファイルに `'use client'` を付与し、`index.ts` に集約する
- 許容する責務・許容しない責務は primitives/patterns と同様

**理由**: primitives/patterns と同様、スコープ内の再利用 UI は client 統一で運用を安定させる。

### patterns と \_components の使い分け

| 観点       | patterns                     | \_components                           |
| ---------- | ---------------------------- | -------------------------------------- |
| 再利用範囲 | アプリ全体                   | ルート/セグメント内                    |
| 判断基準   | どのページでも同じ意味を持つ | URL 構造・画面文脈に依存する           |
| 昇格可能性 | -                            | 複数スコープで必要になれば patterns へ |

### \_features

- 当該スコープ専用のコンポーネントを配置する
- `_features/` は兄弟の `page.tsx`・`layout.tsx` 等のスコープに限定する
- 当該セグメント配下での再利用は可能

**理由**: RSC の境界管理は feature レイヤで行う。primitives/patterns は UI の世界、\_features はデータ取得と UI を繋ぐ世界として責務を分離する。

#### ファイル命名

- サーバーコンポーネント: `*.tsx`
- クライアントコンポーネント: `*.client.tsx`

#### ディレクトリ構成

- feature は必ずディレクトリにまとめる（`_features/` 直下にフラット配置禁止）
- 単一ファイルで完結する場合も、ディレクトリにまとめる
- `index.ts` は feature のエントリーポイントを export する
  - サーバーコンポーネントがある場合: サーバーコンポーネントを export
  - 純粋なクライアント機能の場合: `*.client.tsx` を export

#### サーバー/クライアント分離

- データ取得が必要な場合: `*.tsx`（server）+ `*.client.tsx`（client）に分離
- クライアントコンポーネントは親サーバーコンポーネント内で直接 import する

**判断基準**: クライアントコンポーネントが hooks や state を使用しない単純な描画のみの場合は、サーバーコンポーネントに統合してもよい。

```tsx
// ✅ 統合OK: hooks/state を使わない単純な描画
export async function PostList() {
  const posts = await fetchPosts();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// ❌ 分離必要: useState, useRouter 等を使用
// PostList.tsx (server) + PostList.client.tsx (client)
```

#### 許容する責務

- API レスポンスを UI 用に整形する最小限のマッピング
- 表示条件の分岐（権限・状態・AB テスト等）
- サーバー側で完結するキャッシュ・fetch 制御
- データ取得とエラーハンドリング

#### 許容しない責務

- ドメインロジック（計算・検証等は別レイヤーへ）
- 複数 feature 間で共有されるロジック

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

## バレルエクスポート規約

| ディレクトリ   | `index.ts`  | 備考                                        |
| -------------- | ----------- | ------------------------------------------- |
| `primitives/`  | ✅ 許可     |                                             |
| `patterns/`    | ✅ 許可     |                                             |
| `_components/` | ✅ 許可     |                                             |
| `_features/`   | ⚠️ 条件付き | ディレクトリ直下は禁止、各 feature 内は許可 |
| `lib/`         | ❌ 禁止     | 各ファイルを直接インポート                  |

**`lib/` でバレルエクスポートを禁止する理由**:

- server / client 混在コードを誤ってまとめやすい
- tree-shaking が効かず依存関係が不透明になりやすい
- RSC 境界違反がビルドエラーではなく実行時エラーになりやすい

## インポートパス規約

| 場所                      | ルール          | 例                                                 |
| ------------------------- | --------------- | -------------------------------------------------- |
| `app/` 配下のモジュール間 | 相対パス        | `import { PostList } from './_features/PostList'`  |
| `src/` 直下のモジュール   | `@/` エイリアス | `import { Button } from '@/components/primitives'` |

**理由**: `app/` 配下で相対パスを使用することで、循環参照を防ぎ、モジュールの依存関係を明確にする。

## 迷ったときの判断ルール

配置先に迷った場合は、以下の基準で判断する。

| 条件                      | 配置先                         |
| ------------------------- | ------------------------------ |
| 再利用されていない        | 昇格しない（ページ専用のまま） |
| ビジネス判断が含まれる    | `_features/`                   |
| UI の具体的表現（見た目） | `primitives/`                  |
| UI の体験（操作・連携）   | `patterns/`                    |
