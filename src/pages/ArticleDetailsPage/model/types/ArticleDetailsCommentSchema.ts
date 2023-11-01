import { EntityState } from '@reduxjs/toolkit';
import type { Comment } from '@/entities/Comment/model/types/comment';

export interface ArticleDetailsCommentSchema extends EntityState<Comment>{
    isLoading?: boolean;
    error?: string;
}
