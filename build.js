const fs = require('fs');
const glob = require('glob');
const frontMatter = require('front-matter');

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
    fs.writeFileSync('public/menu-items.json', JSON.stringify(menuItems, null, 2));
});
