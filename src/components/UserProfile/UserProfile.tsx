// src/components/UserProfile/UserProfile.tsx
// UserProfile component implementation

import React, { useState, useEffect } from 'react';
import { UserProfile as UserProfileType } from '../../types/user';
import { apiClient } from '../../services/api-client';

interface UserProfileProps {
  userId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userProfile = await apiClient.getUserProfile();
        setProfile(userProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {profile.name || 'Not provided'}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Education Level:</strong> {profile.educationLevel || 'Not specified'}</p>
        <p><strong>Background:</strong> {profile.background || 'Not provided'}</p>
        <p><strong>Interests:</strong> {profile.interests?.join(', ') || 'Not specified'}</p>
        <p><strong>Learning Goals:</strong> {profile.learningGoals?.join(', ') || 'Not specified'}</p>
      </div>
    </div>
  );
};

export default UserProfile;