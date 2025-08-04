export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}