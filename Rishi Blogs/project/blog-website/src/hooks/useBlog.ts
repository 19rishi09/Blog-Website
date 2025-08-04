import { useState, useEffect } from 'react';
import { BlogPost, Comment, User } from '../types';

// Mock data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Development',
    content: `React has revolutionized the way we build user interfaces, offering a component-based architecture that promotes reusability and maintainability. In this comprehensive guide, we'll explore the fundamental concepts of React development, from setting up your first project to understanding the component lifecycle.

    The journey begins with understanding JSX, React's syntax extension that allows you to write HTML-like code within JavaScript. This powerful feature enables developers to create dynamic and interactive user interfaces with ease. We'll cover how to create functional and class components, manage state effectively, and handle user interactions.

    One of React's greatest strengths is its virtual DOM implementation, which optimizes rendering performance by minimizing direct manipulation of the actual DOM. This results in faster, more responsive applications that can handle complex state changes without sacrificing user experience.

    Throughout this article, we'll build practical examples that demonstrate best practices in React development, including proper component organization, state management patterns, and effective use of React hooks. Whether you're a beginner or looking to strengthen your React skills, this guide will provide valuable insights and practical knowledge.`,
    excerpt: 'React has revolutionized the way we build user interfaces, offering a component-based architecture that promotes reusability and maintainability.',
    author: {
      id: '2',
      username: 'johndoe',
      email: 'john@example.com',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    tags: ['React', 'JavaScript', 'Web Development'],
    likes: 24,
    isLiked: false
  },
  {
    id: '2',
    title: 'The Future of Web Development: Trends to Watch',
    content: `The web development landscape is constantly evolving, with new technologies and methodologies emerging to address the growing demands of modern applications. As we look toward the future, several key trends are shaping how we build and deploy web applications.

    Progressive Web Applications (PWAs) continue to gain traction, offering native app-like experiences through web technologies. These applications combine the best of web and mobile apps, providing offline functionality, push notifications, and seamless performance across devices.

    The rise of edge computing is transforming how we think about application architecture and deployment. By processing data closer to users, edge computing reduces latency and improves performance, making it ideal for real-time applications and global-scale services.

    WebAssembly (WASM) is opening new possibilities for web applications, allowing developers to run high-performance code in browsers. This technology enables complex applications that were previously limited to native platforms to run efficiently on the web.`,
    excerpt: 'The web development landscape is constantly evolving, with new technologies and methodologies emerging to address the growing demands of modern applications.',
    author: {
      id: '3',
      username: 'sarah.tech',
      email: 'sarah@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
    tags: ['Web Development', 'Technology', 'Future Trends'],
    likes: 18,
    isLiked: true
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Great article! Really helped me understand React hooks better.',
    author: {
      id: '4',
      username: 'developer123',
      email: 'dev@example.com',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    postId: '1',
    createdAt: '2024-01-15T12:00:00Z',
    likes: 5,
    isLiked: false
  },
  {
    id: '2',
    content: 'The section on virtual DOM was particularly insightful. Thanks for sharing!',
    author: {
      id: '5',
      username: 'webdev_pro',
      email: 'pro@example.com',
      avatar: 'https://images.pexels.com/photos/1580271/pexels-photo-1580271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    postId: '1',
    createdAt: '2024-01-15T13:30:00Z',
    likes: 3,
    isLiked: true
  }
];

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPosts(mockPosts);
      setComments(mockComments);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addPost = (title: string, content: string, tags: string[], user: User) => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: content.substring(0, 150) + '...',
      author: user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags,
      likes: 0,
      isLiked: false
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const addComment = (postId: string, content: string, user: User) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: user,
      postId,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    setComments(prev => [...prev, newComment]);
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  const getCommentsForPost = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  return {
    posts: filteredPosts,
    comments,
    loading,
    searchTerm,
    setSearchTerm,
    addPost,
    addComment,
    toggleLike,
    toggleCommentLike,
    getCommentsForPost
  };
};