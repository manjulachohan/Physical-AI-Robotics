// src/services/chapter-service.ts
// Chapter listing and retrieval services based on API contract

import { TextbookChapter } from '../types/textbook';
import { apiClient } from './api-client';

export class ChapterService {
  /**
   * Get all textbook chapters, optionally filtered by part or status
   */
  async getChapters(params?: { part?: string; status?: string }): Promise<TextbookChapter[]> {
    try {
      return await apiClient.getChapters(params);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      throw error;
    }
  }

  /**
   * Get a specific textbook chapter by ID
   */
  async getChapter(chapterId: string): Promise<TextbookChapter> {
    try {
      return await apiClient.getChapter(chapterId);
    } catch (error) {
      console.error(`Error fetching chapter ${chapterId}:`, error);
      throw error;
    }
  }

  /**
   * Search chapters by title or content
   */
  async searchChapters(query: string): Promise<TextbookChapter[]> {
    try {
      const result = await apiClient.searchContent(query, { type: 'chapter' });
      // Filter only chapters from results
      return result.results.filter((item) => 'number' in item && 'sections' in item) as TextbookChapter[];
    } catch (error) {
      console.error('Error searching chapters:', error);
      throw error;
    }
  }

  /**
   * Get chapters recommended for the current user based on personalization
   */
  async getRecommendedChapters(): Promise<TextbookChapter[]> {
    try {
      const personalization = await apiClient.getPersonalization();
      return personalization.recommendedChapters;
    } catch (error) {
      console.error('Error fetching recommended chapters:', error);
      // If personalization fails, return empty array
      return [];
    }
  }
}

export const chapterService = new ChapterService();