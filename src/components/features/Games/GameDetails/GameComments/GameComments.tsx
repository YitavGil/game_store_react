// src/components/features/Games/GameDetails/GameComments/GameComments.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addComment } from '../../../../../store/features/comments/commentsSlice';
import styles from './GameComments.module.css';

interface GameCommentsProps {
  gameId: number;
}

interface CommentFormData {
  content: string;
  user: string;
}

export const GameComments: React.FC<GameCommentsProps> = ({ gameId }) => {
  const dispatch = useAppDispatch();
  const { 
    byGameId,
    loading,
    error 
  } = useAppSelector((state) => state.comments);
  
  const [formData, setFormData] = useState<CommentFormData>({
    content: '',
    user: ''
  });
  const [formError, setFormError] = useState<string>('');

  const comments = byGameId[gameId] || [];
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.content.trim() || !formData.user.trim()) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await dispatch(addComment({
        gameId,
        content: formData.content.trim(),
        user: formData.user.trim(),
      })).unwrap();

      // Reset form after successful submission
      setFormData({ content: '', user: '' });
    } catch (err) {
      setFormError('Failed to post comment. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Game Comments</h2>
      
      <div className={styles.commentForm}>
        <h3>Add a Comment</h3>
        <form onSubmit={handleSubmit}>
          {formError && (
            <div className={styles.formError}>{formError}</div>
          )}
          
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Your name"
              value={formData.user}
              onChange={(e) => setFormData(prev => ({ ...prev, user: e.target.value }))}
              className={styles.input}
              maxLength={50}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              placeholder="Share your thoughts about this game..."
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className={styles.textarea}
              required
              rows={4}
              maxLength={1000}
            />
            <div className={styles.charCount}>
              {formData.content.length}/1000
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>

      <div className={styles.commentsContainer}>
        {sortedComments.length > 0 ? (
          <>
            <h3 className={styles.commentsCount}>
              {sortedComments.length} Comment{sortedComments.length !== 1 ? 's' : ''}
            </h3>
            {sortedComments.map(comment => (
              <div key={comment.id} className={styles.commentCard}>
                <div className={styles.commentHeader}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {comment.user.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userDetails}>
                      <span className={styles.userName}>{comment.user}</span>
                      <span className={styles.commentDate}>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.noComments}>
            Be the first to comment on this game!
          </div>
        )}
      </div>
    </div>
  );
};