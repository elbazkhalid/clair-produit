import { ProductData } from '../types/product';
import { MOROCCAN_AND_POPULAR_PRODUCTS } from '../data/moroccanProducts';
import { evaluateFoodProduct, evaluateCosmeticProduct, checkHalalCompliance, parseAdditives } from './evaluator';

const USER_AGENT_HEADER = {
  'User-Agent': 'ClairProduit-Android-Native/1.0 (contact@clairproduit.ma)'
};

/**
 * Normalizes Open Food Facts product JSON to our clean ProductData interface
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOpenFoodFactsProduct(barcode: string, p: any): ProductData {
  const additives = parseAdditives(p.additives_tags || []);
  const ingredientsText = p.ingredients_text_fr || p.ingredients_text || p.ingredients_text_ar || '';
  const halalCheck = checkHalalCompliance(ingredientsText, additives);

  const productData: Partial<ProductData> = {
    barcode,
    name: p.product_name_fr || p.product_name || p.product_name_ar || 'Produit sans nom',
    nameAr: p.product_name_ar,
    brand: p.brands || 'Marque inconnue',
    category: 'food',
    imageUrl: p.image_url || p.image_front_url || p.image_front_small_url,
    quantity: p.quantity,
    origin: p.origins || p.countries || 'Non spécifié',
    labels: (p.labels_tags || []).map((l: string) => l.replace('en:', '').replace(/-/g, ' ')),
    ingredientsText,
    ingredientsList: (p.ingredients || []).map((i: { text?: string }) => i.text || '').filter(Boolean),
    nutriscoreGrade: (p.nutriscore_grade || 'unknown').toLowerCase(),
    nutriscoreScore: p.nutriscore_score,
    novaGroup: p.nova_group || null,
    ecoscoreGrade: (p.ecoscore_grade || 'unknown').toLowerCase(),
    nutriments: {
      energyKcal: p.nutriments?.['energy-kcal_100g'] ?? p.nutriments?.energy_100g ? Math.round((p.nutriments?.energy_100g || 0) / 4.184) : undefined,
      fat: p.nutriments?.fat_100g,
      saturatedFat: p.nutriments?.['saturated-fat_100g'],
      sugars: p.nutriments?.sugars_100g,
      salt: p.nutriments?.salt_100g,
      fiber: p.nutriments?.fiber_100g,
      proteins: p.nutriments?.proteins_100g,
      sodium: p.nutriments?.sodium_100g
    },
    allergens: (p.allergens_tags || []).map((a: string) => a.replace('en:', '').replace(/-/g, ' ')),
    traces: (p.traces_tags || []).map((t: string) => t.replace('en:', '').replace(/-/g, ' ')),
    additives,
    isHalalWarning: halalCheck,
    source: 'openfoodfacts',
    sourceUrl: `https://world.openfoodfacts.org/product/${barcode}`
  };

  productData.evaluation = evaluateFoodProduct(productData);
  return productData as ProductData;
}

/**
 * Normalizes Open Beauty Facts product JSON to our clean ProductData interface
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOpenBeautyFactsProduct(barcode: string, p: any): ProductData {
  const ingredientsText = p.ingredients_text_fr || p.ingredients_text || '';
  const ingredientsList = (p.ingredients || []).map((i: { text?: string }) => i.text || '').filter(Boolean);

  const productData: Partial<ProductData> = {
    barcode,
    name: p.product_name_fr || p.product_name || 'Produit Cosmétique',
    nameAr: p.product_name_ar,
    brand: p.brands || 'Marque cosmétique',
    category: 'cosmetics',
    imageUrl: p.image_url || p.image_front_url,
    quantity: p.quantity,
    origin: p.origins || p.countries || 'Non spécifié',
    labels: (p.labels_tags || []).map((l: string) => l.replace('en:', '').replace(/-/g, ' ')),
    ingredientsText,
    ingredientsList,
    allergens: (p.allergens_tags || []).map((a: string) => a.replace('en:', '').replace(/-/g, ' ')),
    source: 'openbeautyfacts',
    sourceUrl: `https://world.openbeautyfacts.org/product/${barcode}`
  };

  productData.evaluation = evaluateCosmeticProduct(productData);
  return productData as ProductData;
}

/**
 * Fetches product by barcode with automatic fallback between local data, Open Food Facts, and Open Beauty Facts
 */
export async function fetchProductByBarcode(rawBarcode: string): Promise<ProductData | null> {
  const barcode = rawBarcode.trim().replace(/\s+/g, '');
  if (!barcode) return null;

  // 1. Check local catalog first (instant & reliable for showcase and Morocco essentials)
  const localMatch = MOROCCAN_AND_POPULAR_PRODUCTS.find(p => p.barcode === barcode);
  if (localMatch) {
    return localMatch;
  }

  // 2. Query Open Food Facts API v2
  try {
    const offUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
    const response = await fetch(offUrl, {
      headers: USER_AGENT_HEADER
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === 1 && data.product) {
        return mapOpenFoodFactsProduct(barcode, data.product);
      }
    }
  } catch (err) {
    console.warn('Open Food Facts network lookup failed:', err);
  }

  // 3. Fallback to Open Beauty Facts for cosmetics & toiletries
  try {
    const obfUrl = `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json`;
    const response = await fetch(obfUrl, {
      headers: USER_AGENT_HEADER
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === 1 && data.product) {
        return mapOpenBeautyFactsProduct(barcode, data.product);
      }
    }
  } catch (err) {
    console.warn('Open Beauty Facts network lookup failed:', err);
  }

  return null;
}

/**
 * Search products by query string
 */
export async function searchProducts(query: string, category: 'all' | 'food' | 'cosmetics' = 'all'): Promise<ProductData[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: ProductData[] = [];

  // Match in local dataset
  const localMatches = MOROCCAN_AND_POPULAR_PRODUCTS.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(q) || (p.nameAr && p.nameAr.includes(q));
    const brandMatch = p.brand.toLowerCase().includes(q);
    const barcodeMatch = p.barcode.includes(q);
    const catMatch = category === 'all' || p.category === category;
    return (nameMatch || brandMatch || barcodeMatch) && catMatch;
  });
  results.push(...localMatches);

  // Search Open Food Facts
  if (category === 'all' || category === 'food') {
    try {
      const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=12`;
      const res = await fetch(searchUrl, { headers: USER_AGENT_HEADER });
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          for (const item of data.products) {
            if (item.code && !results.some(r => r.barcode === item.code)) {
              results.push(mapOpenFoodFactsProduct(item.code, item));
            }
          }
        }
      }
    } catch (err) {
      console.warn('Open Food Facts search failed:', err);
    }
  }

  // Search Open Beauty Facts
  if (category === 'all' || category === 'cosmetics') {
    try {
      const searchUrl = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=8`;
      const res = await fetch(searchUrl, { headers: USER_AGENT_HEADER });
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          for (const item of data.products) {
            if (item.code && !results.some(r => r.barcode === item.code)) {
              results.push(mapOpenBeautyFactsProduct(item.code, item));
            }
          }
        }
      }
    } catch (err) {
      console.warn('Open Beauty Facts search failed:', err);
    }
  }

  return results;
}
