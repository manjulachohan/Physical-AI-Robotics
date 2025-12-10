// src/types/textbook.ts
// TypeScript interfaces matching the data model entities

import { PersonalizationSettings } from './user';

export interface TextbookChapter {
  id: string;
  title: string;
  number: number;
  slug: string;
  description?: string;
  learningObjectives: string[];
  prerequisites?: string[];
  sections: SectionRef[];
  metadata?: Record<string, any>;
  status: 'draft' | 'review' | 'published' | 'archived';
}

export interface TextbookSection {
  id: string;
  title: string;
  number: number;
  slug: string;
  content: string; // In MDX format
  learningObjectives?: string[];
  chapterId: string;
  metadata?: Record<string, any>;
  status: 'draft' | 'review' | 'published' | 'archived';
}

export interface SectionRef {
  id: string;
  title: string;
  number: number;
  slug: string;
  status: 'draft' | 'review' | 'published' | 'archived';
}

export interface ContentContributor {
  id: string;
  name: string;
  email: string;
  role: 'author' | 'reviewer' | 'editor' | 'admin';
  specialtyAreas?: string[];
  affiliation?: string;
  bio?: string;
  contributions?: string[]; // Array of Chapter/Section IDs
  status: 'active' | 'inactive' | 'suspended';
}

export interface MDXDocument {
  id: string;
  formatType: 'chapter' | 'section' | 'page';
  content: string;
  components?: string[];
  metadata?: Record<string, any>;
  lastModified: Date;
  version: string;
}