// src/services/user-service.ts
// User profile management services based on API contract

import { UserProfile, UserProfileUpdate } from '../types/user';
import { apiClient } from './api-client';

export class UserService {
  /**
   * Get the current user's profile
   */
  async getProfile(): Promise<UserProfile> {
    try {
      return await apiClient.getUserProfile();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  /**
   * Update the user's profile
   */
  async updateProfile(profileData: UserProfileUpdate): Promise<UserProfile> {
    try {
      return await apiClient.updateUserProfile(profileData);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Get user's learning progress
   */
  async getLearningProgress(userId: string) {
    try {
      const profile = await this.getProfile();
      return profile.progress || {};
    } catch (error) {
      console.error('Error fetching learning progress:', error);
      return {};
    }
  }
}

export const userService = new UserService();