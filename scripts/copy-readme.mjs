import { copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'README.md');
const destination = join(root, 'packages', 'react-fast-collapsible', 'README.md');

copyFileSync(source, destination);
console.log(`Copied README.md -> ${destination}`);
