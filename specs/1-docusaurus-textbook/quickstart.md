# Quickstart Guide: Docusaurus Textbook for Physical AI & Humanoid Robotics

## Overview
This guide provides a quick introduction to setting up, developing, and contributing to the Docusaurus-based textbook for Physical AI & Humanoid Robotics.

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git for version control
- A GitHub account for contributing

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/my-textbook.git
cd my-textbook
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Local Development Server
```bash
npm run start
# or
yarn start
```
This will start a local development server at `http://localhost:3000` with hot reloading.

### 4. Build for Production
```bash
npm run build
# or
yarn build
```
This generates a static website in the `build/` directory.

### 5. Deploy to GitHub Pages
```bash
npm run deploy
# or
yarn deploy
```
This builds the site and pushes it to the `gh-pages` branch for GitHub Pages hosting.

## Project Structure
```
my-textbook/
├── docs/                 # Textbook content (MD/MDX files)
│   ├── preface/          # Preface content
│   ├── part-i/           # Part I chapters
│   ├── part-ii/          # Part II chapters
│   └── appendices/       # Appendix materials
├── src/                  # Custom React components
│   ├── components/       # Reusable components
│   ├── pages/            # Standalone pages
│   └── css/              # Custom styles
├── static/               # Static assets (images, files)
├── docusaurus.config.js  # Docusaurus configuration
├── sidebars.js           # Navigation sidebar configuration
└── package.json          # Project dependencies and scripts
```

## Adding New Content

### 1. Create a New Chapter
1. Create a new directory in `docs/` (e.g., `docs/part-i/new-chapter/`)
2. Add your MDX content files in that directory
3. Update `sidebars.js` to include your new content in the navigation

### 2. Create a New Section within a Chapter
1. Add a new MDX file in the appropriate chapter directory
2. Use proper frontmatter to specify metadata:
   ```md
   ---
   title: Your Section Title
   sidebar_position: 1
   description: Brief description of the section
   ---
   ```

### 3. Using Interactive Components
The textbook supports interactive elements like:
- Personalization components
- Translation components (Urdu support)
- RAG chatbot components
- Code playgrounds
- Diagrams and visualizations

Example of embedding an interactive component:
```mdx
import {InteractiveComponent} from '@site/src/components/InteractiveComponent';

<InteractiveComponent />
```

## Configuration

### Docusaurus Configuration
The `docusaurus.config.js` file contains:
- Site metadata (title, tagline, URL)
- Theme configuration
- Plugin settings
- Deployment configuration for GitHub Pages

### Sidebar Configuration
The `sidebars.js` file defines the navigation structure of the textbook, organizing content hierarchically from parts to chapters to sections.

## Content Guidelines

### Writing Content
- Write in MDX format to support both Markdown and React components
- Follow the pedagogical progression from foundational to advanced concepts
- Include learning objectives at the beginning of each chapter
- Add exercises and assessment tools where appropriate
- Address ethical considerations relevant to Physical AI and Humanoid Robotics

### Formatting Standards
- Use consistent headings (H1 for chapter titles, H2 for sections, etc.)
- Include alt text for all images
- Use relative links for internal navigation
- Follow accessibility best practices

## Development Workflow

### 1. Feature Branch Creation
```bash
git checkout -b feature/descriptive-feature-name
```

### 2. Content Development
1. Create or update MDX files
2. Test locally to ensure proper rendering
3. Add appropriate metadata in frontmatter

### 3. Pull Request Process
1. Commit your changes with descriptive commit messages
2. Push to your feature branch
3. Create a pull request to the main branch
4. Ensure all checks pass before merging

## Testing

### Running Tests
```bash
npm run test
# or
yarn test
```
This runs unit tests for custom components and any other test suites.

### End-to-End Testing
```bash
npm run e2e
# or
yarn e2e
```
This runs end-to-end tests to verify the functionality of the textbook site.

## Deployment
The site is automatically deployed to GitHub Pages when changes are merged to the main branch. You can also manually deploy using:
```bash
npm run deploy
# or
yarn deploy
```

## Troubleshooting

### Common Issues
- **Content not showing**: Check that your MDX file is properly linked in `sidebars.js`
- **Components not rendering**: Verify import statements and component paths
- **Build errors**: Check console output for specific error messages
- **Performance issues**: Optimize images and limit heavy computations in components

### Getting Help
- Check the full documentation in the `specs/` directory
- Create an issue in the GitHub repository
- Reach out to the core contributors