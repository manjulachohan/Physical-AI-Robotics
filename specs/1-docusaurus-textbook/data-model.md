# Data Model: Docusaurus Textbook for Physical AI & Humanoid Robotics

## Overview
This document specifies the data model for the Docusaurus-based textbook system, capturing the key entities defined in the feature specification and organizing them hierarchically to support the pedagogical goals of the Physical AI & Humanoid Robotics curriculum.

## Core Entities

### 1. Textbook Chapter
- **Description**: A major section of the textbook (e.g., "Introduction to Physical AI", "Humanoid Architecture")
- **Fields**:
  - `id`: (string, required) Unique identifier for the chapter
  - `title`: (string, required) Display title of the chapter
  - `number`: (integer, required) Sequential number in the textbook
  - `slug`: (string, required) URL-friendly identifier
  - `description`: (string, optional) Brief summary of chapter content
  - `learningObjectives`: (array of strings, required) List of learning objectives
  - `prerequisites`: (array of strings, optional) Prerequisites for this chapter
  - `sections`: (array of Section references, required) List of sections in the chapter
  - `metadata`: (object, optional) Additional metadata (author, creation date, etc.)
  - `status`: (enum: draft, review, published, archived, required) Publication status
- **Relationships**:
  - Contains many Sections
  - Belongs to one Textbook
- **Validation Rules**:
  - Title must be 2-200 characters
  - Number must be positive integer
  - ID must be unique across all chapters
  - At least one learning objective required
- **State Transitions**: draft → review → published → archived

### 2. Textbook Section
- **Description**: A subsection within a chapter (e.g., "Fundamental Concepts", "Applications")
- **Fields**:
  - `id`: (string, required) Unique identifier for the section
  - `title`: (string, required) Display title of the section
  - `number`: (integer, required) Sequential number in the parent chapter
  - `slug`: (string, required) URL-friendly identifier
  - `content`: (string, required) The actual content in MDX format
  - `learningObjectives`: (array of strings, optional) Learning objectives specific to this section
  - `chapterId`: (string, required) Reference to parent chapter
  - `metadata`: (object, optional) Additional metadata
  - `status`: (enum: draft, review, published, archived, required) Publication status
- **Relationships**:
  - Belongs to one Chapter
  - Contains many Content Blocks (implicitly via MDX)
- **Validation Rules**:
  - Title must be 2-200 characters
  - Number must be positive integer
  - ID must be unique across all sections
  - Content must be valid MDX format
  - Must have a valid parent chapter ID
- **State Transitions**: draft → review → published → archived

### 3. Content Contributor
- **Description**: An individual authorized to add or modify textbook content
- **Fields**:
  - `id`: (string, required) Unique identifier for the contributor
  - `name`: (string, required) Full name of the contributor
  - `email`: (string, required) Email for communication
  - `role`: (enum: author, reviewer, editor, admin, required) Contributor role
  - `specialtyAreas`: (array of strings, optional) Areas of expertise
  - `affiliation`: (string, optional) Academic or professional affiliation
  - `bio`: (string, optional) Brief biographical information
  - `contributions`: (array of Chapter/Section IDs, optional) Track contributions
  - `status`: (enum: active, inactive, suspended, required) Account status
- **Relationships**:
  - Authors many Chapters and Sections
- **Validation Rules**:
  - Email must be valid format
  - Name must be 2-100 characters
  - Role must be one of the defined values
  - ID must be unique
- **State Transitions**: active ↔ inactive, active → suspended

### 4. User Profile
- **Description**: Information about a student's background and preferences that may affect content personalization
- **Fields**:
  - `id`: (string, required) Unique identifier for the user
  - `name`: (string, optional) User's name
  - `email`: (string, required) User's email
  - `educationLevel`: (enum: undergraduate, graduate, professional, other, optional) Academic level
  - `background`: (string, optional) Technical background information
  - `interests`: (array of strings, optional) Topics of interest
  - `learningGoals`: (array of strings, optional) Goals for using the textbook
  - `preferences`: (object, optional) Personalization settings (language, theme, etc.)
  - `progress`: (object, optional) Tracking progress through content
  - `createdAt`: (date, required) Account creation date
  - `lastActive`: (date, optional) Last time user interacted with the system
- **Relationships**:
  - May have many saved highlights or annotations (future feature)
- **Validation Rules**:
  - Email must be valid format
  - ID must be unique
  - Education level must be one of the defined values
  - CreatedAt must be a valid date
- **State Transitions**: (profile is maintained continuously)

### 5. MDX Document
- **Description**: The format used for textbook content with embedded React components
- **Fields**:
  - `id`: (string, required) Reference to associated Chapter/Section ID
  - `formatType`: (enum: chapter, section, page, required) Document type
  - `content`: (string, required) The MDX content
  - `components`: (array of strings, optional) List of embedded component names
  - `metadata`: (object, optional) Frontmatter metadata
  - `lastModified`: (date, required) Last time content was modified
  - `version`: (string, required) Version identifier for change tracking
- **Relationships**:
  - Associated with one Chapter or Section
- **Validation Rules**:
  - Content must be valid MDX syntax
  - ID must reference valid Chapter/Section
  - Version must follow semantic versioning
- **State Transitions**: (version updates occur independently)

## Relationships and Hierarchies

### Content Hierarchy
- Textbook (root)
  - Part (e.g., Part I, Part II - from claude.md)
    - Chapter
      - Section
        - Content Blocks (within MDX)

### User Permissions
- Content Contributor can create/update/delete associated Chapters/Sections based on their role
- Users can access published content based on their profile preferences
- Administrative users can manage contributor accounts

## Validation Rules Summary
- All IDs must be unique within their entity type
- Email addresses must follow valid format
- Content must be in valid MDX format
- Learning objectives cannot be empty for published content
- Each Chapter must have at least one Section
- Content relationships must be consistent (e.g., valid parent references)

## Future Extensions
- Personalization settings based on User Profile
- Annotation and highlighting capabilities
- Progress tracking and assessment integration
- Translation management for Urdu and other languages
- Integration with RAG chatbot for AI-assisted learning