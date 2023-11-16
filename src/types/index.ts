export interface ProfileData {
  avatar: null | string
  bio: null | string
  blocked: boolean
  blockedUntil: null | string
  cover: null | string
  createdAt: string
  followerCount: number
  followingCount: number
  id: string
  updatedAt: string
  username: string
  verified: boolean
  followingId?: string | null
  role: 'ADMIN' | 'BASIC'
}

export interface PostData {
  userId: string
  uuid: string
  content: string
  likeCount: number
  catalogTitle: string
  catalogDescription: string
  catalogPoster?: string
  createdAt: string
  username: string
  avatar: string
  verified: boolean
  role: string
}

export interface ThreadData {
  content: string
  username: string
  avatar?: string
  verified: boolean
  userId: string
  role: string
  createdAt: string
}

export interface VerificationRequestData {
  createdAt: string
  id: string
  status: string
  updatedAt: string
  userId: string
  uuid: string
}

export interface ReportUserData {
  content: string
  createdAt: string
  id: string
  reportedId: string
  reporterId: string
  updatedAt: string
  uuid: string
}

export interface CatalogRequestData {
  id: number
  uuid: string
  title: string
  description: string
  poster?: string | null
  trailer?: string | null
  category: 'ANIME' | 'DRAMA'
}
