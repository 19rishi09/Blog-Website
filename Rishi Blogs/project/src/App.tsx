import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useBlog } from './hooks/useBlog';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import BlogPost from './components/BlogPost';
import CommentSection from './components/CommentSection';
import CreatePost from './components/CreatePost';
import { MessageSquare } from 'lucide-react';

const AppContent: React.FC = () => {
  const { authState } = useAuth();
  const {
    posts,
    loading,
    searchTerm,
    setSearchTerm,
    addPost,
    addComment,
    toggleLike,
    toggleCommentLike,
    getCommentsForPost
  } = useBlog();

  const [currentView, setCurrentView] = useState<'home' | 'create' | 'auth'>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleCreatePost = (title: string, content: string, tags: string[]) => {
    if (authState.user) {
      addPost(title, content, tags, authState.user);
      setCurrentView('home');
    }
  };

  const handleAddComment = (postId: string, content: string) => {
    if (authState.user) {
      addComment(postId, content, authState.user);
    }
  };

  const handleCommentClick = (postId: string) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const handleAuthSuccess = () => {
    setCurrentView('home');
  };

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not authenticated or explicitly viewing auth
  if (!authState.isAuthenticated || currentView === 'auth') {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  // Show create post form
  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <div className="py-8">
          <CreatePost
            user={authState.user!}
            onSubmit={handleCreatePost}
            onCancel={() => setCurrentView('home')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading posts...</p>
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl p-6 mb-8 text-white">
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {authState.user?.username}!
              </h1>
              <p className="text-blue-100">
                Discover amazing content and share your thoughts with the community.
              </p>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm 
                      ? `No posts match your search for "${searchTerm}"`
                      : "Be the first to share something amazing!"
                    }
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setCurrentView('create')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Create Your First Post
                    </button>
                  )}
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id}>
                    <BlogPost
                      post={post}
                      onLike={toggleLike}
                      onComment={handleCommentClick}
                    />
                    
                    {/* Comments Section */}
                    {selectedPostId === post.id && (
                      <div className="mt-4">
                        <CommentSection
                          postId={post.id}
                          comments={getCommentsForPost(post.id)}
                          currentUser={authState.user}
                          onAddComment={handleAddComment}
                          onLikeComment={toggleCommentLike}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;