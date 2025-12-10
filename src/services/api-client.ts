// src/services/api-client.ts
// API client implementation based on textbook-api.yaml contract

import { TextbookChapter, TextbookSection } from '../types/textbook';
import { UserProfile, PersonalizationSettings } from '../types/user';

const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin + '/api/v1' 
  : process.env.API_BASE_URL || 'https://my-textbook.pages.dev/api/v1';

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // Chapter-related endpoints
  async getChapters(params?: { part?: string; status?: string }): Promise<TextbookChapter[]> {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    const queryString = queryParams.toString();
    const endpoint = `/chapters${queryString ? `?${queryString}` : ''}`;
    
    return this.request<TextbookChapter[]>(endpoint);
  }

  async getChapter(chapterId: string): Promise<TextbookChapter> {
    return this.request<TextbookChapter>(`/chapters/${chapterId}`);
  }

  // Section-related endpoints
  async getSections(params: { chapterId: string }): Promise<TextbookSection[]> {
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    const endpoint = `/sections?${queryString}`;
    
    return this.request<TextbookSection[]>(endpoint);
  }

  async getSection(sectionId: string): Promise<TextbookSection> {
    return this.request<TextbookSection>(`/sections/${sectionId}`);
  }

  // User profile endpoints
  async getUserProfile(): Promise<UserProfile> {
    return this.request<UserProfile>('/users/profile');
  }

  async updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Search endpoints
  async searchContent(query: string, params?: { limit?: number; type?: string }) {
    const searchParams = { q: query, ...params };
    const queryParams = new URLSearchParams(searchParams as Record<string, string>);
    const queryString = queryParams.toString();
    const endpoint = `/content/search?${queryString}`;
    
    return this.request<{
      results: (TextbookChapter | TextbookSection)[];
      total: number;
    }>(endpoint);
  }

  // Chatbot endpoints
  async interactWithChatbot(
    query: string,
    context?: string,
    userId?: string
  ) {
    return this.request<{
      response: string;
      sources: string[];
    }>('/interactions/chat', {
      method: 'POST',
      body: JSON.stringify({ query, context, userId }),
    });
  }

  // Personalization endpoints
  async getPersonalization(): Promise<{
    recommendedChapters: TextbookChapter[];
    suggestedSections: TextbookSection[];
  }> {
    return this.request<{
      recommendedChapters: TextbookChapter[];
      suggestedSections: TextbookSection[];
    }>('/content/personalization');
  }

  async updatePersonalization(preferences: PersonalizationSettings): Promise<{
    preferences: PersonalizationSettings;
  }> {
    return this.request<{ preferences: PersonalizationSettings }>(
      '/content/personalization',
      {
        method: 'POST',
        body: JSON.stringify({ preferences }),
      }
    );
  }

  // Translation endpoints
  async translateContent(
    contentId: string,
    targetLanguage: string,
    userId?: string
  ): Promise<{
    translatedContent: string;
    language: string;
    originalContentId: string;
  }> {
    return this.request<{
      translatedContent: string;
      language: string;
      originalContentId: string;
    }>('/content/translation', {
      method: 'POST',
      body: JSON.stringify({ contentId, targetLanguage, userId }),
    });
  }
}

export const apiClient = new ApiClient();
export default ApiClient;