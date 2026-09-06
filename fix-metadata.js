const fs = require('fs');
const glob = require('glob'); // use standard node techniques if glob is not installed

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = require('path').join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir('./src/app', (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Convert `export const metadata: Metadata = buildPageMetadata({ ... });`
    // to `export async function generateMetadata(): Promise<Metadata> { return await buildPageMetadata({ ... }); }`
    const constMetadataRegex = /export const metadata:\s*Metadata\s*=\s*buildPageMetadata\(([\s\S]*?)\);/g;
    if (constMetadataRegex.test(content)) {
        content = content.replace(constMetadataRegex, (match, p1) => {
            return `export async function generateMetadata(): Promise<Metadata> { return await buildPageMetadata(${p1}); }`;
        });
        changed = true;
    }

    // 2. Convert `export function generateMetadata(...): Metadata { ... return buildPageMetadata(...); }`
    // to `export async function generateMetadata(...): Promise<Metadata> { ... return await buildPageMetadata(...); }`
    const funcMetadataRegex = /export function generateMetadata\((.*?)\):\s*Metadata\s*{([\s\S]*?)return buildPageMetadata\(([\s\S]*?)\);?\s*}/g;
    if (funcMetadataRegex.test(content)) {
        content = content.replace(funcMetadataRegex, (match, p1, p2, p3) => {
            return `export async function generateMetadata(${p1}): Promise<Metadata> {${p2}return await buildPageMetadata(${p3});\n}`;
        });
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
});
