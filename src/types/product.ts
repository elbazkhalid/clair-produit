export type ProductCategory = 'all' | 'food' | 'cosmetics';

export type Language = 'fr' | 'ar';

export interface NutrientLevel {
  value: number | null;
  unit: string;
  level?: 'low' | 'moderate' | 'high';
}

export interface AdditiveInfo {
  id: string;
  name: string;
  risk: 'safe' | 'moderate' | 'hazard' | 'unknown';
  descriptionFr: string;
  descriptionAr: string;
  isVegetarian?: boolean;
  isHalal?: boolean; // false if porcine or alcohol derived
}

export interface CosmeticIngredient {
  name: string;
  risk: 'clean' | 'low' | 'moderate' | 'hazard';
  riskLabelFr: string;
  riskLabelAr: string;
  detailsFr?: string;
  detailsAr?: string;
  functionFr?: string;
  functionAr?: string;
}

export interface ProductEvaluation {
  status: 'sufficient' | 'insufficient';
  scoreOutOf100: number | null;
  labelFr: string;
  labelAr: string;
  color: string; // hex or tailwind class
  summaryFr: string;
  summaryAr: string;
  criteria: Array<{
    titleFr: string;
    titleAr: string;
    descriptionFr: string;
    descriptionAr: string;
    type: 'positive' | 'warning' | 'negative' | 'neutral';
  }>;
}

export interface ProductData {
  barcode: string;
  name: string;
  nameAr?: string;
  brand: string;
  category: 'food' | 'cosmetics';
  imageUrl?: string;
  ingredientsText?: string;
  ingredientsTextAr?: string;
  ingredientsList?: string[];
  
  // Food specific
  nutriscoreGrade?: 'a' | 'b' | 'c' | 'd' | 'e' | 'unknown';
  nutriscoreScore?: number;
  novaGroup?: 1 | 2 | 3 | 4 | null;
  ecoscoreGrade?: 'a' | 'b' | 'c' | 'd' | 'e' | 'unknown';
  nutriments?: {
    energyKcal?: number;
    fat?: number;
    saturatedFat?: number;
    sugars?: number;
    salt?: number;
    fiber?: number;
    proteins?: number;
    sodium?: number;
  };
  allergens?: string[];
  traces?: string[];
  additives?: AdditiveInfo[];
  isHalalWarning?: {
    hasPorkDerivatives: boolean;
    hasAlcohol: boolean;
    hasInsectsCarmine: boolean;
    detailsFr: string;
    detailsAr: string;
  };

  // Cosmetics specific
  cosmeticEvaluation?: {
    cleanIngredientsCount: number;
    lowRiskCount: number;
    moderateRiskCount: number;
    hazardousCount: number;
    hasEndocrineDisruptor: boolean;
    hasAllergens: boolean;
    hasMicroplastics: boolean;
    ingredients: CosmeticIngredient[];
  };

  evaluation: ProductEvaluation;
  source: 'openfoodfacts' | 'openbeautyfacts' | 'local_morocco';
  sourceUrl?: string;
  quantity?: string;
  origin?: string;
  labels?: string[];
}

export interface ScanHistoryItem {
  id: string;
  barcode: string;
  product: ProductData;
  scannedAt: number;
  isFavorite?: boolean;
}
