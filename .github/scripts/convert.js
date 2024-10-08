const fs = require('fs-extra');
const path = require('path');

// Function to convert RST syntax to Markdown
function convertRstToMarkdown(rstContent) {
  let mdContent = rstContent;

  // Convert headings (e.g. ======= to # Heading)
  mdContent = mdContent.replace(/^([A-Za-z0-9 ]+)\n=+/gm, '# $1');

  // Convert references (:ref:`Node3D<class_Node3D>` to [Node3D](#class_Node3D))
  mdContent = mdContent.replace(/:ref:`([^<]+)<([^>]+)>`/g, '[$1](#$2)');

  // Convert links (`__` to [link](url))
  mdContent = mdContent.replace(/`([^<]+) <([^>]+)>`__/g, '[$1]($2)');

  // Convert properties tables (you may need to adjust depending on your table structure)
  mdContent = mdContent.replace(/\+[-]+\+[-]+\+[-]+\+\n(\|[^+]+\|)\n\+[-]+\+[-]+\+[-]+\+/g, (match, row) => {
    const headers = row.replace(/\|/g, '|').split('|').map(header => header.trim()).join(' | ');
    return `| ${headers} |\n| --- | --- |`;
  });

  return mdContent;
}

// Function to find and convert all RST files in a directory
async function processRstFiles(directory) {
  const files = await fs.readdir(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      // Recursively process directories
      await processRstFiles(filePath);
    } else if (path.extname(file) === '.rst') {
      const rstContent = await fs.readFile(filePath, 'utf8');
      const mdContent = convertRstToMarkdown(rstContent);

      // Write the Markdown file
      const outputMdFilePath = filePath.replace('.rst', '.md');
      await fs.writeFile(outputMdFilePath, mdContent);
      console.log(`Converted: ${filePath} -> ${outputMdFilePath}`);
    }
  }
}

// Start processing from the root directory
processRstFiles('./').catch(console.error);