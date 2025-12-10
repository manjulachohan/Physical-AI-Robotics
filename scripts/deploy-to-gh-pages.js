const fs = require('fs');
const path = require('path');

// Simple function to copy files recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function deployToDocsFolder() {
  try {
    // Create a temporary directory for publishing
    const tempPublishDir = './temp-docs';
    
    // Remove existing temp directory if it exists
    if (fs.existsSync(tempPublishDir)) {
      fs.rmSync(tempPublishDir, { recursive: true, force: true });
    }
    
    // Copy build contents to temp directory
    if (fs.existsSync('./build')) {
      fs.mkdirSync(tempPublishDir, { recursive: true });
      
      const buildItems = fs.readdirSync('./build');
      for (const item of buildItems) {
        // Skip the locale-specific directories for now, just copy the main content
        if (item !== 'ur') { // Skip the ur locale directory for basic publishing
          const srcPath = path.join('./build', item);
          const destPath = path.join(tempPublishDir, item);
          const stat = fs.lstatSync(srcPath);

          if (stat.isDirectory()) {
            copyRecursiveSync(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }

      console.log('Successfully copied build files to temporary directory!');
      console.log('Now we need to merge these with the docs folder appropriately.');
      
      // Now we'll copy the temp files to docs while preserving docs content
      const docsItems = fs.readdirSync('./docs');
      let hasConflictingFiles = false;
      
      for (const item of docsItems) {
        if (item !== '.nojekyll' && item !== 'front-page.mdx' && !item.startsWith('part-')) {
          // If it's not original documentation content, remove it
          const itemPath = path.join('./docs', item);
          const stat = fs.lstatSync(itemPath);
          
          if (stat.isDirectory()) {
            fs.rmSync(itemPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(itemPath);
          }
        }
      }
      
      // Copy the built files to docs folder
      const tempItems = fs.readdirSync(tempPublishDir);
      for (const item of tempItems) {
        const srcPath = path.join(tempPublishDir, item);
        const destPath = path.join('./docs', item);
        const stat = fs.lstatSync(srcPath);

        if (stat.isDirectory()) {
          copyRecursiveSync(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
      
      // Add .nojekyll file to prevent GitHub Pages from processing with Jekyll
      fs.writeFileSync('./docs/.nojekyll', '');
      
      console.log('Successfully copied build files to docs folder!');
      console.log('You can now commit and push the changes to GitHub');
      
      // Clean up temp directory
      fs.rmSync(tempPublishDir, { recursive: true, force: true });
    } else {
      console.error('Build folder does not exist. Please run "npm run build" first.');
    }
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

deployToDocsFolder();