type Content = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
};

export type CmsGetPostsResult = {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
};
