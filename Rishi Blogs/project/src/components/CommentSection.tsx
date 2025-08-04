import React, { useState } from 'react';
import { Send, Heart, Calendar } from 'lucide-react';
import { Comment, User } from '../types';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  currentUser: User | null;
  onAddComment: (postId: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  currentUser,
  onAddComment,
  onLikeComment
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setIsSubmitting(true);
    try {
      onAddComment(postId, newComment.trim());
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Comments ({comments.length})
        </h3>

        {/* Add Comment Form */}
        {currentUser ? (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex space-x-3">
              <img
                className="h-8 w-8 rounded-full"
                src={currentUser.avatar}
                alt={currentUser.username}
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">Please sign in to leave a comment.</p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
              <img
                className="h-8 w-8 rounded-full"
                src={comment.author.avatar}
                alt={comment.author.username}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {comment.author.username}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  {comment.content}
                </p>
                <button
                  onClick={() => onLikeComment(comment.id)}
                  className={`flex items-center space-x-1 text-xs transition-colors ${
                    comment.isLiked
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;