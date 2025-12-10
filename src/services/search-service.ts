// src/services/search-service.ts
// Search functionality across textbook content based on API contract

import { TextbookChapter, TextbookSection } from '../types/textbook';
import { apiClient } from './api-client';

export interface SearchResults {
  chapters: TextbookChapter[];
  sections: TextbookSection[];
  total: number;
}

export class SearchService {
  /**
   * Search across all textbook content (chapters and sections)
   */
  async search(query: string, limit?: number): Promise<SearchResults> {
    try {
      const result = await apiClient.searchContent(query, { limit, type: 'all' });
      
      const chapters: TextbookChapter[] = [];
      const sections: TextbookSection[] = [];
      
      result.results.forEach(item => {
        if ('sections' in item && 'number' in item) {
          // This is a chapter
          chapters.push(item as TextbookChapter);
        } else if ('chapterId' in item && 'content' in item) {
          // This is a section
          sections.push(item as TextbookSection);
        }
      });
      
      return {
        chapters,
        sections,
        total: result.total
      };
    } catch (error) {
      console.error('Error performing search:', error);
      throw error;
    }
  }

  /**
   * Search only chapters
   */
  async searchChapters(query: string, limit?: number): Promise<SearchResults> {
    try {
      const result = await apiClient.searchContent(query, { limit, type: 'chapter' });
      
      const chapters = result.results.filter(item => 
        'sections' in item && 'number' in item
      ) as TextbookChapter[];
      
      return {
        chapters,
        sections: [],
        total: result.total
      };
    } catch (error) {
      console.error('Error searching chapters:', error);
      throw error;
    }
  }

  /**
   * Search only sections
   */
  async searchSections(query: string, limit?: number): Promise<SearchResults> {
    try {
      const result = await apiClient.searchContent(query, { limit, type: 'section' });
      
      const sections = result.results.filter(item => 
        'chapterId' in item && 'content' in item
      ) as TextbookSection[];
      
      return {
        chapters: [],
        sections,
        total: result.total
      };
    } catch (error) {
      console.error('Error searching sections:', error);
      throw error;
    }
  }
}

export const searchService = new SearchService();