export interface IBlog {
  title: string;
  reading_time: string;
  meta_title: string;
  meta_description: string;
  og_description: string;
  og_image: string;
  feature_image: string;
  updated_at: Date;
  html: string;
}

export interface IBlogs {
  tags: string;
  publishedDate: Date;
  updatedAt: Date;
  title: string;
  thumbnail: string;
  description: string;
  blogUrl: string;
  readingTime: string;
}

export interface IPagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: number;
  prev: number;
}

export interface IBlogsPagination {
  blogs: Array<IBlogs>;
  pagination: IPagination;
}

export default IBlog;
