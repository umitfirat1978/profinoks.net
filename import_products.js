const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\umitf\\Downloads\\Ormel\\Ürün Resimleri';
const destPublicDir = path.join(__dirname, 'frontend', 'public', 'profinoks', 'products');
const destDataFile = path.join(__dirname, 'frontend', 'src', 'data', 'categoryProducts.js');

const categoryMap = {
  '03- Bulaşıkhane Ekipmanları': 'bulasik-makineleri',
  '04- Hazırlık Ekipmanları': 'hazirlik-makineleri',
  '06- İçecek Ekipmanları': 'icecek-makineleri',
  '07- Servis Üniteleri Self Servis - Aşçı Servis': 'self-servis',
  '08- Açık Büfe Servis Hatları': 'acik-bufe',
  '09- Çalışma Tezgahları': 'tezgahlar',
  '10- Taşıma İstifleme Ekipmaları': 'istif-raflari',
  '11- Yardımcı Mutfak Ekipmaları': 'yardimci-mutfak-ekipmanlari',
  '12- Setüstü Otel Ekipmanları': 'setustu-otel-ekipmanlari',
  '13- Çamaşırhane Ekipmanları': 'camasirhane-ekipmanlari',
  '600 Seri Pişiriciler': 'pisiriciler',
  '700 Seri Pişiriciler': 'pisiriciler',
  '900 Seri Pişiriciler': 'pisiriciler',
  'Fast Food Pişiriciler': 'pisiriciler',
  'Klasik Pişiriciler': 'pisiriciler',
  'Hızlı Pişirme Fırınları': 'firinlar',
  'Kombi Buharlı Fırınlar': 'firinlar',
  'Mikrodalga Fırınlar': 'firinlar',
  'Patisserie Fırınlar': 'firinlar',
  'Pizza Fırınlar': 'firinlar',
  'Çok Amaçlı Fırınlar': 'firinlar',
  'Fimak': 'firinlar', // Maybe Fimak implies ovens? Or I can map it to firinlar
  'Buz Makineleri': 'buzdolaplari',
  'Dondurma Makineleri': 'buzdolaplari',
  'Dondurma Reyonları': 'buzdolaplari',
  'Standart Buzdolapları': 'buzdolaplari',
  'Panel Tip Soğuk Odalar': 'soguk-odalar'
};

const allProducts = {};

// Helper to ensure directory exists
function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Ensure the data directory exists
ensureDirSync(path.join(__dirname, 'frontend', 'src', 'data'));

function formatProductName(fileName) {
  // Remove suffixes like "- Hazırlık Ekipmanları" or similar
  let name = fileName.replace(/\s*-\s*[^-]+$/, '');
  // Replace underscores and hyphens with spaces if any
  return name.trim();
}

function processDirectory(currentDir, currentSlug) {
  const items = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(currentDir, item.name);
    
    if (item.isDirectory()) {
      let nextSlug = currentSlug;
      
      // If the top directory matches our map, assign the slug
      if (categoryMap[item.name]) {
        nextSlug = categoryMap[item.name];
      } else if (item.name.toLowerCase().includes('pişirici')) {
        nextSlug = 'pisiriciler';
      } else if (item.name.toLowerCase().includes('fırın')) {
         nextSlug = 'firinlar';
      }

      // Check if it's a "_files" directory which typically contains the product image
      if (item.name.endsWith('_files')) {
          if (!currentSlug) {
              console.warn(`Skipping ${itemPath} because no category slug was determined.`);
              continue;
          }
          const baseName = item.name.replace(/_files$/, '');
          const productName = formatProductName(baseName);
          
          // Find the largest image in this folder
          const subItems = fs.readdirSync(itemPath);
          let largestImg = null;
          let maxSizeBytes = 0;
          
          for (const subItem of subItems) {
              if (subItem.toLowerCase().endsWith('.jpg') || subItem.toLowerCase().endsWith('.png') || subItem.toLowerCase().endsWith('.jpeg')) {
                  const subItemPath = path.join(itemPath, subItem);
                  const stat = fs.statSync(subItemPath);
                  if (stat.size > maxSizeBytes) {
                      maxSizeBytes = stat.size;
                      largestImg = subItemPath;
                  }
              }
          }
          
          if (largestImg) {
              const ext = path.extname(largestImg);
              const targetFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
              const targetDir = path.join(destPublicDir, currentSlug);
              ensureDirSync(targetDir);
              
              const targetPath = path.join(targetDir, targetFileName);
              const relativeImagePath = `/profinoks/products/${currentSlug}/${targetFileName}`;
              
              // Copy image
              fs.copyFileSync(largestImg, targetPath);
              console.log(`Copied image for ${productName} to ${relativeImagePath}`);
              
              // Add to allProducts
              if (!allProducts[currentSlug]) {
                  allProducts[currentSlug] = [];
              }
              
              // Generate ID
              const newItemId = allProducts[currentSlug].length + 1;
              
              allProducts[currentSlug].push({
                  id: newItemId,
                  name_tr: productName,
                  name_en: productName, // Fallback to TR for EN
                  imageUrl: relativeImagePath
              });
          }
      } else {
        // Recurse into normal directories
        processDirectory(itemPath, nextSlug);
      }
    }
  }
}

console.log('Starting product import...');
processDirectory(srcDir, null);

// Also look for products inside the root that might have mapping
// Output to file
const fileContent = `// Auto-generated products data
export const categoryProducts = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(destDataFile, fileContent, 'utf8');
console.log(`Successfully extracted products and generated ${destDataFile}`);
