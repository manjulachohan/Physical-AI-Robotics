// src/services/section-service.ts
// Section listing and retrieval services based on API contract

import { TextbookSection } from '../types/textbook';
import { apiClient } from './api-client';

export class SectionService {
  /**
   * Get all sections within a specific chapter
   */
  async getSections(chapterId: string): Promise<TextbookSection[]> {
    try {
      return await apiClient.getSections({ chapterId });
    } catch (error) {
      console.error(`Error fetching sections for chapter ${chapterId}:`, error);
      throw error;
    }
  }

  /**
   * Get a specific section by ID
   */
  async getSection(sectionId: string): Promise<TextbookSection> {
    try {
      return await apiClient.getSection(sectionId);
    } catch (error) {
      console.error(`Error fetching section ${sectionId}:`, error);
      throw error;
    }
  }

  /**
   * Search sections by title or content
   */
  async searchSections(query: string): Promise<TextbookSection[]> {
    try {
      const result = await apiClient.searchContent(query, { type: 'section' });
      // Filter only sections from results
      return result.results.filter((item) => 'chapterId' in item && 'content' in item) as TextbookSection[];
    } catch (error) {
      console.error('Error searching sections:', error);
      throw error;
    }
  }
}

export const sectionService = new SectionService();