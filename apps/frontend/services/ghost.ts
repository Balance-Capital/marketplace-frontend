import GhostContentAPI from '@tryghost/content-api'
import IBlog, { IBlogs, IBlogsPagination } from '../interfaces/blog'

export const CmsGhostApi = new GhostContentAPI({
  url: process.env.GHOST_CONTENT_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v3.0'
})

export const getBlogs = async (limit, page): Promise<IBlogsPagination> => {
  const ghostBlogs = await CmsGhostApi.posts.browse({
    limit,
    page,
    include: 'tags'
  })
  const mapPosts: Array<IBlogs> = ghostBlogs.map((post) => ({
    tags: post.tags.map((obj) => ` ${obj.name}`),
    publishedDate: post.published_at,
    updatedAt: post.updated_at,
    title: post.title,
    thumbnail: post.feature_image,
    description: post.custom_excerpt || post.excerpt,
    blogUrl: post.slug,
    readingTime: post.reading_time
  }))
  const { pagination } = ghostBlogs.meta || {
    pagination: {
      page: 1,
      limit: 6,
      pages: 2,
      total: 10,
      next: 2,
      prev: null
    }
  }
  const out: IBlogsPagination = {
    blogs: mapPosts,
    pagination: pagination
  }
  return out
}

export const getBlog = (postSlug): IBlog => {
  return CmsGhostApi.posts.read({
    slug: postSlug,
    include: 'tags'
  })
}

export default Object.freeze([getBlogs,getBlog])
