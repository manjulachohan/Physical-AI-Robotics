// src/types/user.ts
// User-related types based on the data model

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  educationLevel?: 'undergraduate' | 'graduate' | 'professional' | 'other';
  background?: string;
  interests?: string[];
  learningGoals?: string[];
  preferences?: PersonalizationSettings;
  progress?: Record<string, any>;
  createdAt: Date;
  lastActive?: Date;
}

export interface UserProfileUpdate {
  name?: string;
  educationLevel?: 'undergraduate' | 'graduate' | 'professional' | 'other';
  background?: string;
  interests?: string[];
  learningGoals?: string[];
  preferences?: PersonalizationSettings;
}

export interface PersonalizationSettings {
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  contentFormat?: 'text' | 'visual' | 'interactive';
  showAdvancedContent?: boolean;
}