import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, '../../Sitemap-Espansa.md');
const CONTENT_DIR = path.join(__dirname, '../src/content');

const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
const lines = content.split('\n');

lines.forEach(line => {
  if (!line.trim().startsWith('|') || line.includes('| URL |') || line.includes('| URL slug |') || line.includes('|---|') || line.includes('|---')) return;
  
  const cols = line.split('|').map(c => c.trim()).filter(Boolean);
  if (cols.length < 2) return;
  
  let url = cols[0];
  url = url.replace(/`([^`]+)`/, '$1').trim();
  
  let title = cols[1];
  let keyword = cols[2] || '';
  
  if (!url.startsWith('/')) {
    url = `/blog/${url}`;
  }
  
  if (url === '/' || url === '/chi-siamo' || url === '/contatti' || url === '/portfolio' || url === '/blog' || url.startsWith('/privacy-policy') || url.startsWith('/cookie-policy') || url.startsWith('/termini-condizioni')) {
    return;
  }
  
  const parts = url.split('/').filter(Boolean);
  if (parts.length === 0) return;
  
  let collection = parts[0];
  let slug = parts.length > 1 ? parts[1] : parts[0];
  
  slug = slug.toLowerCase().replace(/[^a-z0-9-]/gi, ''); // Sanitize slug!
  if (!slug || slug === 'totale') return;

  
  if (parts.length === 1 && collection === 'servizi') {
    slug = 'index';
  } else if (collection === 'per') {
    collection = 'settori';
  }
  
  const colDir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(colDir)) {
    fs.mkdirSync(colDir, { recursive: true });
  }
  
  const filePath = path.join(colDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    let frontmatter = `---\n`;
    frontmatter += `title: "${title.replace(/"/g, '\\"')}"\n`;
    frontmatter += `description: "Scopri di più su ${title.replace(/"/g, '\\"')}."\n`;
    if (keyword && keyword !== 'KD (Est.)' && keyword !== 'GEO score') {
      frontmatter += `keyword: "${keyword}"\n`;
    }
    
    if (collection === 'settori') {
      frontmatter += `sector: "${title.replace("Soluzioni IT per ", "")}"\n`;
      frontmatter += `painPoints:\n  - "Da definire"\n`;
      frontmatter += `solutions:\n  - title: "Soluzione 1"\n    desc: "Descrizione 1"\n`;
    }
    
    if (collection === 'confronti') {
      frontmatter += `topic: "${title}"\n`;
      frontmatter += `nameA: "Opzione A"\n`;
      frontmatter += `nameB: "Opzione B"\n`;
      frontmatter += `geoDefinition: "Definizione per AEO"\n`;
      frontmatter += `comparisonData:\n  - feature: "Caratteristica"\n    itemA: "Valore A"\n    itemB: "Valore B"\n    winner: "Tie"\n`;
      frontmatter += `whenToChooseA:\n  - "Scenario A"\n`;
      frontmatter += `whenToChooseB:\n  - "Scenario B"\n`;
    }
    
    frontmatter += `---\n\n`;
    frontmatter += `Qui inseriremo il contenuto per **${title}**.\n`;
    
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Creato: ${collection}/${slug}.md`);
  }
});
