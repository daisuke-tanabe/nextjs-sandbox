// microCMS共通のメタデータ
type CmsMetadata = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// 記事
export type Post = CmsMetadata & {
  title: string;
  content: string;
  description?: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
};

// microCMS リスト形式のレスポンス
export type CmsListResult<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// 記事一覧
export type CmsGetPostsResult = CmsListResult<Post>;

// 記事詳細
export type CmsGetPostResult = Post;
