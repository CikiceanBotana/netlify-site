const fs = require('fs');
const glob = require('glob');
const frontMatter = require('front-matter');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Read all markdown files in content/menu
glob('content/menu/*.md', (err, files) => {
    if (err) {
        console.error('Error reading menu files:', err);
        return;
    }

    // Parse each file and extract the front matter
    const menuItems = files.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        const data = frontMatter(content);
        return data.attributes;
    });

    // Write the combined data to a JSON file
    fs.writeFileSync(path.join(publicDir, 'menu-items.json'), JSON.stringify(menuItems, null, 2));
});
