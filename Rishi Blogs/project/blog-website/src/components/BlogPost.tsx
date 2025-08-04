import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Calendar, Tag } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';

interface BlogPostProps {
  post: BlogPostType;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  showComments?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ 
  post, 
  onLike, 
  onComment, 
  showComments = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy link to clipboard. Please copy the URL manually.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: post.title,
            text: post.excerpt,
            url: window.location.href
          });
        } catch (shareError: any) {
          if (shareError.name === 'AbortError') {
            // User cancelled the share dialog
            console.log('Share cancelled by user');
          } else if (shareError.name === 'NotAllowedError') {
            alert('Sharing not allowed. Copying link to clipboard instead.');
            await copyLinkToClipboard();
          } else {
            alert('Sharing failed. Copying link to clipboard instead.');
            await copyLinkToClipboard();
          }
        }
      } else {
        await copyLinkToClipboard();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('An unexpected error occurred while sharing.');
    } finally {
      setIsSharing(false);
    }
  };

  const shouldShowReadMore = post.content.length > 300;
  const displayContent = isExpanded ? post.content : post.excerpt;

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-3 mb-4">
          <img
            className="h-10 w-10 rounded-full"
            src={post.author.avatar}
            alt={post.author.username}
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">{post.author.username}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {post.title}
        </h2>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {displayContent}
          </p>
        </div>
        
        {shouldShowReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex items-center flex-wrap gap-2">
            <Tag className="h-3 w-3 text-gray-400" />
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 transition-colors ${
                post.isLiked
                  ? 'text-red-600 hover:text-red-700'
                  : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            
            <button
              onClick={() => onComment(post.id)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Comment</span>
            </button>
          </div>
          
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors disabled:opacity-50"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;