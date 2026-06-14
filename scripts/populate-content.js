import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../src/content');
const collections = ['servizi', 'settori', 'soluzioni', 'confronti'];

// Funzione helper per generare il corpo dell'articolo in base alla tipologia
function generateContent(collection, title, description) {
  let content = `\n\n`;

  if (collection === 'servizi') {
    content += `## L'Importanza Strategica: ${title}\n\n`;
    content += `Nel panorama IT odierno, le PMI italiane hanno bisogno di soluzioni robuste, scalabili e sicure. Il servizio di **${title}** offerto da KriptyLab non è un prodotto standardizzato, ma un'architettura ingegnerizzata su misura per il tuo business.\n\n`;
    content += `### Il Nostro Approccio Tecnico\n\n`;
    content += `Noi di KriptyLab crediamo nell'approccio *Bare Metal* e "Zero Fuffa". Non siamo un'agenzia intermediaria, ma un team di architetti software. Per il servizio di ${title}, garantiamo:\n\n`;
    content += `- **Performance Estreme**: Ottimizzazione del codice e architettura server-side per garantire latenza minima.\n`;
    content += `- **Sicurezza by-design**: Applicazione rigorosa dei protocolli di cybersecurity fin dalla fase di progettazione.\n`;
    content += `- **Controllo Totale**: Sviluppo di infrastrutture cloud-agnostic o server on-premise per darti la proprietà esclusiva dei tuoi dati.\n\n`;
    content += `### Perché KriptyLab?\n\n`;
    content += `${description}\n\n`;
    content += `Contattaci per una consulenza diretta con un nostro Software Architect e scopri come possiamo integrare **${title}** nel tuo ecosistema IT aziendale.`;
  } 
  
  else if (collection === 'settori') {
    content += `## Soluzioni IT Esclusive per: ${title}\n\n`;
    content += `Ogni settore industriale ha sfide uniche. Nel settore **${title}**, un'infrastruttura IT rigida o vulnerabile può compromettere interi processi aziendali. KriptyLab progetta ecosistemi digitali che si adattano perfettamente a queste esigenze.\n\n`;
    content += `### Le Nostre Soluzioni Specifiche\n\n`;
    content += `Sviluppiamo software gestionale, integraimo server AI locali e blindiamo le reti aziendali tenendo conto dei requisiti normativi e operativi di ${title}.\n\n`;
    content += `1. **Digitalizzazione dei Processi**: ${description}\n`;
    content += `2. **Conformità e Privacy**: Gestione dei dati tramite server on-premise per evitare l'invio di informazioni sensibili a terze parti esterne (GDPR compliance rigorosa).\n`;
    content += `3. **Scalabilità**: Architetture progettate per crescere insieme all'azienda, senza i colli di bottiglia tipici dei software monolitici commerciali.\n\n`;
    content += `Scopri come il nostro team di ingegneri può rivoluzionare l'infrastruttura IT per ${title}.`;
  } 
  
  else if (collection === 'confronti') {
    content += `## Analisi Tecnica: ${title}\n\n`;
    content += `Quando si progetta un'architettura IT o si definisce una strategia aziendale, il bivio **${title}** rappresenta una delle decisioni più critiche per CTO e imprenditori.\n\n`;
    content += `### Valutazione KriptyLab\n\n`;
    content += `${description}\n\n`;
    content += `### Tabella Comparativa Veloce\n\n`;
    content += `| Parametro | Opzione 1 | Opzione 2 |\n`;
    content += `|-----------|-----------|-----------|\n`;
    content += `| **Controllo Dati** | Elevato | Dipendente dal Vendor |\n`;
    content += `| **Costi a lungo termine** | Ammortizzati | Canoni Ricorrenti (SaaS) |\n`;
    content += `| **Personalizzazione** | Totale | Limitata alle API |\n\n`;
    content += `### Il Nostro Verdetto\n\n`;
    content += `Non esiste una "silver bullet" nel software. Noi di KriptyLab analizziamo il tuo caso d'uso specifico per consigliarti e implementare la scelta tecnologica perfetta, scrivendo il codice necessario o configurando le infrastrutture server adatte.`;
  } 
  
  else {
    content += `## Approfondimento su ${title}\n\n`;
    content += `${description}\n\n`;
    content += `KriptyLab è specializzata nello sviluppo di questa e altre soluzioni avanzate, portando vera ingegneria del software all'interno della tua PMI. Affidati a sviluppatori esperti, non ad agenzie generaliste.\n\n`;
    content += `### I Vantaggi\n\n`;
    content += `- Architettura software solida.\n- Sicurezza proattiva e monitoraggio.\n- Intelligenza Artificiale integrata on-premise per la massima privacy.`;
  }

  return content;
}

// Esecuzione dello script
collections.forEach(collection => {
  const collectionDir = path.join(contentDir, collection);
  if (!fs.existsSync(collectionDir)) return;

  const files = fs.readdirSync(collectionDir).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    const filePath = path.join(collectionDir, file);
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    // Estraiamo il frontmatter
    const frontmatterRegex = /---\n([\s\S]*?)\n---/;
    const match = fileContent.match(frontmatterRegex);

    if (match) {
      const frontmatter = match[1];
      
      // Parsiamo banalmente title e description dal yaml per non installare librerie
      const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
      const descMatch = frontmatter.match(/description:\s*["']?([^"'\n]+)["']?/);
      
      const title = titleMatch ? titleMatch[1] : 'Servizio IT';
      const description = descMatch ? descMatch[1] : 'Sviluppo avanzato per PMI.';

      const newContent = generateContent(collection, title, description);
      
      // Riassembliamo il file mantenendo il frontmatter intatto e sostituendo il resto
      const newFileContent = `---\n${frontmatter}\n---${newContent}`;
      
      fs.writeFileSync(filePath, newFileContent, 'utf-8');
      console.log(`Aggiornato contenuto: ${collection}/${file}`);
    }
  });
});

console.log("\nPopolamento Programmatico (AEO/GEO) completato con successo su tutti i file Markdown.");
