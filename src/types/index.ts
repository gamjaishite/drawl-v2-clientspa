export interface ProfileData {
    avatar: null | string;
    bio: null | string;
    blocked: boolean;
    blockedUntil: null | string;
    cover: null | string;
    createdAt: string;
    followerCount: number;
    followingCount: number;
    id: string;
    updatedAt: string;
    username: string;
    verified: boolean;
    isFollowing: boolean;
  }
  
export interface PostData {
  userId: string;
  uuid: string;
  content: string;
  likeCount: number;
  catalogTitle: string,
  catalogDescription: string,
  catalogPoster?: string,
  createdAt:string,
  username:string,
  avatar:string,
  verified: boolean
}

export interface ThreadData {
  content: string;
  username: string;
  avatar?: string;
  verified: boolean;
  userId: string;
}