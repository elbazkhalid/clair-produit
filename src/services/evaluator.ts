import { ProductData, ProductEvaluation, CosmeticIngredient, AdditiveInfo } from '../types/product';

// Known additives database for food risk & halal check
const KNOWN_ADDITIVES: Record<string, { name: string; risk: 'safe' | 'moderate' | 'hazard'; fr: string; ar: string; halal: boolean }> = {
  'e120': { name: 'E120 (Carmin / Cochenille)', risk: 'moderate', fr: 'Colorant rouge issu d’insectes broyés (Cochenille)', ar: 'ملون أحمر مستخلص من حشرات القرمز', halal: false },
  'e441': { name: 'E441 (Gélatine)', risk: 'moderate', fr: 'Gélifiant souvent d’origine porcine', ar: 'جيلاتين غالباً من أصل خنزيري', halal: false },
  'e471': { name: 'E471 (Mono et diglycérides d’acides gras)', risk: 'moderate', fr: 'Émulsifiant pouvant provenir de graisses animales ou végétales', ar: 'مستحلب قد يكون من دهون حيوانية أو نباتية', halal: true },
  'e250': { name: 'E250 (Nitrite de sodium)', risk: 'hazard', fr: 'Conservateur de charcuterie classé cancérogène probable', ar: 'مادة حافظة للحوم المصنعة مصنفة كمسرطنة محتملة', halal: true },
  'e150d': { name: 'E150d (Caramel au sulfite d’ammonium)', risk: 'moderate', fr: 'Colorant synthétique contenant des résidus potentiellement toxiques', ar: 'ملون كراميل صناعي قد يحتوي على شوائب سامة', halal: true },
  'e951': { name: 'E951 (Aspartame)', risk: 'hazard', fr: 'Édulcorant intense classé cancérogène possible par le CIRC', ar: 'محلي اصطناعي مكثف صُنّف كمسرطن محتمل من منظمة الصحة', halal: true },
  'e621': { name: 'E621 (Glutamate monosodique)', risk: 'moderate', fr: 'Exhausteur de goût pouvant provoquer maux de tête chez les personnes sensibles', ar: 'معزز نكهة قد يسبب صداعاً وتحسساً لبعض الأفراد', halal: true },
  'e330': { name: 'E330 (Acide citrique)', risk: 'safe', fr: 'Régulateur d’acidité naturel inoffensif', ar: 'منظم حموضة طبيعي وغير ضار', halal: true },
  'e300': { name: 'E300 (Acide ascorbique / Vitamine C)', risk: 'safe', fr: 'Antioxydant naturel bénéfique', ar: 'مضاد أكسدة طبيعي مفيد (فيتامين سي)', halal: true },
  'e322': { name: 'E322 (Lécithines)', risk: 'safe', fr: 'Émulsifiant extrait de soja ou tournesol', ar: 'مستحلب نباتي طبيعي آمن', halal: true },
  'e440': { name: 'E440 (Pectines)', risk: 'safe', fr: 'Gélifiant végétal naturel issu de fruits', ar: 'مادة رابطة نباتية مستخلصة من الفواكه', halal: true }
};

// Known cosmetic ingredients risk dictionary
const COSMETIC_KNOWN_INCI: Record<string, { risk: 'clean' | 'low' | 'moderate' | 'hazard'; labelFr: string; labelAr: string; descFr: string; descAr: string }> = {
  'paraben': { risk: 'hazard', labelFr: 'Parabène (Perturbateur endocrinien)', labelAr: 'بارابين (ملوث هرموني)', descFr: 'Conservateur interférant avec le système hormonal', descAr: 'مادة حافظة تتدخل في الغدد الصماء' },
  'butylparaben': { risk: 'hazard', labelFr: 'Butylparaben', labelAr: 'بوتيل بارابين', descFr: 'Perturbateur endocrinien avéré', descAr: 'ملوث هرموني مثبت علمياً' },
  'propylparaben': { risk: 'hazard', labelFr: 'Propylparaben', labelAr: 'بروبيل بارابين', descFr: 'Perturbateur endocrinien suspecté', descAr: 'ملوث هرموني مشبوه' },
  'phenoxyethanol': { risk: 'moderate', labelFr: 'Phénoxyéthanol', labelAr: 'فينوكسي إيثانول', descFr: 'Conservateur toxique pour le foie et le sang à haute dose', descAr: 'مادة حافظة تسبب إجهاداً للكبد والحساسية' },
  'sodium lauryl sulfate': { risk: 'moderate', labelFr: 'Sodium Lauryl Sulfate (SLS)', labelAr: 'كبريتات لوريل الصوديوم (SLS)', descFr: 'Tensioactif très décapant et irritant pour la barrière cutanée', descAr: 'مادة منظفة قاسية قد تجفف وتهيج الجلد' },
  'sodium laureth sulfate': { risk: 'low', labelFr: 'Sodium Laureth Sulfate (SLES)', labelAr: 'كبريتات لوريث الصوديوم (SLES)', descFr: 'Tensioactif éthoxylé, risque potentiel de traces de 1,4-dioxane', descAr: 'منظف رغوي معالج قد يحمل شوائب طفيفة' },
  'bht': { risk: 'hazard', labelFr: 'BHT (Butylhydroxytoluène)', labelAr: 'مضاد الأكسدة BHT', descFr: 'Antioxydant de synthèse suspecté d’être un perturbateur endocrinien', descAr: 'مضاد أكسدة صناعي مشتبه بتأثيره الهرموني' },
  'paraffinum liquidum': { risk: 'moderate', labelFr: 'Huile minérale (Pétrochimie)', labelAr: 'زيت معدني مشتق من البترول', descFr: 'Agent occlusif dérivé du pétrole, peu biodégradable', descAr: 'مشتق بترولي عازل للمسام وغير صديق للبيئة' },
  'cera microcristallina': { risk: 'moderate', labelFr: 'Cire microcristalline', labelAr: 'شمع البترول الميكروي', descFr: 'Dérivé pétrochimique occlusif', descAr: 'شمع مشتق من النفط' },
  'dimethicone': { risk: 'low', labelFr: 'Silicone (Diméthicone)', labelAr: 'سيليكون (دايميثيكون)', descFr: 'Procure un toucher soyeux mais forme un film occlusif non biodégradable', descAr: 'يمنح نعومة مصطنعة للشعر والبشرة ولا يتحلل بسهولة' },
  'cyclopentasiloxane': { risk: 'hazard', labelFr: 'Silicone volatil (D5)', labelAr: 'سيليكون طيار D5', descFr: 'Perturbateur endocrinien et toxique pour l’environnement aquatique', descAr: 'ملوث هرموني وضار جداً بالبيئة المائية' },
  'fragrance': { risk: 'low', labelFr: 'Parfum synthétique', labelAr: 'عطور صناعية', descFr: 'Mélange non détaillé pouvant contenir des allergènes', descAr: 'خلطة عطرية قد تحفز الحساسية لبعض أنواع البشرة' },
  'parfum': { risk: 'low', labelFr: 'Parfum', labelAr: 'عطر', descFr: 'Peut masquer divers composés parfumants', descAr: 'قد يحمل مسببات حساسية عطرية' },
  'limonene': { risk: 'low', labelFr: 'Limonène (Allergène parfum)', labelAr: 'ليمونين (مسبب حساسية عطري)', descFr: 'Allergène courant issu des agrumes', descAr: 'مركب عطري طبيعي قد يثير حساسية طفيفة' },
  'linalool': { risk: 'low', labelFr: 'Linalol (Allergène parfum)', labelAr: 'لينالول (مسبب حساسية عطري)', descFr: 'Composé terpénique allergisant potentiel', descAr: 'مركب عطري قد يسبب حساسية للمتحسسين' },
  'aloe barbadensis': { risk: 'clean', labelFr: 'Aloe Vera Bio / Naturel', labelAr: 'ألوفيرا طبيعية', descFr: 'Actif apaisant, hydratant et régénérant exceptionnel', descAr: 'مستخلص نباتي مهدئ ومرطب ومجدد للبشرة' },
  'argania spinosa': { risk: 'clean', labelFr: 'Huile d’Argan du Maroc', labelAr: 'زيت الأركان المغربي النقي', descFr: 'Trésor cosmétique marocain riche en acides gras essentiels et vitamine E', descAr: 'كنز مغربي أصيل غني بفيتامين هـ ومضادات الأكسدة' },
  'glycerin': { risk: 'clean', labelFr: 'Glycérine végétale', labelAr: 'جلسرين نباتي', descFr: 'Humectant naturel très doux pour la peau', descAr: 'مرطب طبيعي نقي وخفيف على الجلد' },
  'olea europaea': { risk: 'clean', labelFr: 'Huile d’olive', labelAr: 'زيت الزيتون', descFr: 'Émollient naturel nourrissant et protecteur', descAr: 'مرطب ومغذي غني بالأحماض المفيدة' },
  'butyrospermum parkii': { risk: 'clean', labelFr: 'Beurre de Karité', labelAr: 'زبدة الشيا النقية', descFr: 'Nourrit et répare la barrière cutanée sans risque', descAr: 'ترميم وتغذية عميقة لحاجز البشرة' },
  'tocopherol': { risk: 'clean', labelFr: 'Vitamine E', labelAr: 'فيتامين E الطبيعي', descFr: 'Antioxydant naturel protecteur de la peau', descAr: 'مضاد أكسدة طبيعي يحمي الخلايا' }
};

/**
 * Evaluates food products rigorously based on Nutri-Score, NOVA, Additives & Nutrition
 */
export function evaluateFoodProduct(product: Partial<ProductData>): ProductEvaluation {
  const hasNutriscore = !!product.nutriscoreGrade && product.nutriscoreGrade !== 'unknown';
  const hasIngredients = (product.ingredientsList && product.ingredientsList.length > 0) || (product.ingredientsText && product.ingredientsText.trim().length > 10);
  const hasNutriments = !!product.nutriments && (product.nutriments.sugars !== undefined || product.nutriments.fat !== undefined || product.nutriments.energyKcal !== undefined);

  // If essential data is missing, we must NOT invent data
  if (!hasNutriscore && !hasIngredients && !hasNutriments) {
    return {
      status: 'insufficient',
      scoreOutOf100: null,
      labelFr: 'Informations insuffisantes pour évaluer ce produit',
      labelAr: 'معلومات غير كافية لتقييم هذا المنتج',
      color: '#94a3b8',
      summaryFr: 'Ce produit ne dispose pas de données nutritionnelles ou de liste d’ingrédients complètes.',
      summaryAr: 'لا تتوفر في قاعدة البيانات معلومات غذائية أو قائمة مكونات كافية لحساب تقييم دقيق.',
      criteria: [
        {
          titleFr: 'Données manquantes',
          titleAr: 'بيانات غير متوفرة',
          descriptionFr: 'Aucun tableau nutritionnel ou liste d’ingrédients détaillée n’a été transmise pour ce produit.',
          descriptionAr: 'لم يتم تزويد قاعدة البيانات بالجدول الغذائي أو المكونات الكاملة.',
          type: 'neutral'
        }
      ]
    };
  }

  // Calculate score base on Nutri-Score (60%), NOVA (25%), and Additives (15%)
  let baseScore = 60;
  const criteria: ProductEvaluation['criteria'] = [];

  // 1. Nutri-Score impact
  if (product.nutriscoreGrade) {
    switch (product.nutriscoreGrade.toLowerCase()) {
      case 'a':
        baseScore += 30;
        criteria.push({
          titleFr: 'Nutri-Score A (Excellente qualité)',
          titleAr: 'نوتري سكور A (جودة ممتازة)',
          descriptionFr: 'Composition nutritionnelle très favorable (faible en sucre, sel et graisses saturées).',
          descriptionAr: 'تركيبة غذائية ممتازة ومثالية (قليلة السكر والملح والدهون المشبعة).',
          type: 'positive'
        });
        break;
      case 'b':
        baseScore += 18;
        criteria.push({
          titleFr: 'Nutri-Score B (Bonne qualité)',
          titleAr: 'نوتري سكور B (جودة جيدة)',
          descriptionFr: 'Bon équilibre global, à privilégier au quotidien.',
          descriptionAr: 'توازن غذائي جيد ينصح به يومياً.',
          type: 'positive'
        });
        break;
      case 'c':
        baseScore += 0;
        criteria.push({
          titleFr: 'Nutri-Score C (Qualité moyenne)',
          titleAr: 'نوتري سكور C (جودة متوسطة)',
          descriptionFr: 'Qualité nutritionnelle moyenne, à consommer de façon équilibrée.',
          descriptionAr: 'جودة غذائية متوسطة، ينصح بتناولها باعتدال.',
          type: 'neutral'
        });
        break;
      case 'd':
        baseScore -= 18;
        criteria.push({
          titleFr: 'Nutri-Score D (À limiter)',
          titleAr: 'نوتري سكور D (يُنصح بالتقليل منه)',
          descriptionFr: 'Teneur élevée en sucres, sel ou matières grasses saturées.',
          descriptionAr: 'نسبة مرتفعة من السكريات أو الدهون أو الأملاح.',
          type: 'warning'
        });
        break;
      case 'e':
        baseScore -= 32;
        criteria.push({
          titleFr: 'Nutri-Score E (Très mauvaise qualité nutritionnelle)',
          titleAr: 'نوتري سكور E (قيمة غذائية سيئة)',
          descriptionFr: 'Très forte concentration calorique, sucres rapides ou mauvaises graisses.',
          descriptionAr: 'سعرات حرارية فارغة وكثافة عالية من السكر والدهون الضارة.',
          type: 'negative'
        });
        break;
    }
  }

  // 2. NOVA ultra-processing impact
  if (product.novaGroup) {
    if (product.novaGroup === 1) {
      baseScore += 10;
      criteria.push({
        titleFr: 'Aliment non transformé ou minimalement transformé (NOVA 1)',
        titleAr: 'غذاء غير معالج أو معالج بالحد الأدنى (NOVA 1)',
        descriptionFr: 'Produit naturel préservant ses nutriments d’origine, sans synthèse chimique.',
        descriptionAr: 'منتج طبيعي يحتفظ بمغذياته الأصلية دون إضافات مصنعة.',
        type: 'positive'
      });
    } else if (product.novaGroup === 4) {
      baseScore -= 15;
      criteria.push({
        titleFr: 'Aliment ultra-transformé (NOVA 4)',
        titleAr: 'غذاء فائق المعالجة صناعياً (NOVA 4)',
        descriptionFr: 'Subit de nombreux processus industriels avec additifs et texturants.',
        descriptionAr: 'يخضع لعمليات تصنيع كيميائية متعددة مع مواد تكثيف ونكهات صناعية.',
        type: 'negative'
      });
    }
  }

  // 3. Additives impact
  const additives = product.additives || [];
  const hazardousAdditives = additives.filter(a => a.risk === 'hazard');
  const moderateAdditives = additives.filter(a => a.risk === 'moderate');

  if (hazardousAdditives.length > 0) {
    baseScore -= hazardousAdditives.length * 12;
    criteria.push({
      titleFr: `${hazardousAdditives.length} additif(s) controversé(s) ou dangereux`,
      titleAr: `${hazardousAdditives.length} مادة مضافة مثيرة للجدل أو مقلقة`,
      descriptionFr: hazardousAdditives.map(a => a.name).join(', '),
      descriptionAr: hazardousAdditives.map(a => a.name).join(', '),
      type: 'negative'
    });
  } else if (moderateAdditives.length > 0) {
    baseScore -= moderateAdditives.length * 4;
    criteria.push({
      titleFr: `${moderateAdditives.length} additif(s) à modérer`,
      titleAr: `${moderateAdditives.length} مادة مضافة متوسطة التأثير`,
      descriptionFr: moderateAdditives.map(a => a.name).join(', '),
      descriptionAr: moderateAdditives.map(a => a.name).join(', '),
      type: 'warning'
    });
  } else if (additives.length === 0 && hasIngredients) {
    baseScore += 5;
    criteria.push({
      titleFr: 'Aucun additif détecté',
      titleAr: 'خالي تماماً من المواد المضافة',
      descriptionFr: 'Recette saine sans agents conservateurs ni colorants artificiels.',
      descriptionAr: 'وصفة نقية بدون مواد حافظة أو ملونات كيميائية.',
      type: 'positive'
    });
  }

  // 4. Sugar check
  if (product.nutriments?.sugars !== undefined) {
    if (product.nutriments.sugars > 20) {
      baseScore -= 10;
      criteria.push({
        titleFr: `Taux de sucre très élevé (${product.nutriments.sugars}g / 100g)`,
        titleAr: `نسبة سكر مرتفعة جداً (${product.nutriments.sugars}غ / 100غ)`,
        descriptionFr: 'Dépasse largement le seuil recommandé pour la santé cardiovasculaire et le diabète.',
        descriptionAr: 'تتجاوز الحد الموصى به لصحة القلب وتجنب السكري.',
        type: 'negative'
      });
    } else if (product.nutriments.sugars < 4) {
      criteria.push({
        titleFr: 'Faible en sucre',
        titleAr: 'قليل السكر',
        descriptionFr: 'Excellente maîtrise des sucres simples.',
        descriptionAr: 'محتوى منخفض جداً من السكريات البسيطة.',
        type: 'positive'
      });
    }
  }

  const finalScore = Math.max(5, Math.min(100, Math.round(baseScore)));

  let labelFr = 'Moyen';
  let labelAr = 'متوسط';
  let color = '#f59e0b';

  if (finalScore >= 75) {
    labelFr = 'Excellent';
    labelAr = 'ممتاز';
    color = '#10b981';
  } else if (finalScore >= 55) {
    labelFr = 'Bon';
    labelAr = 'جيد';
    color = '#84cc16';
  } else if (finalScore >= 40) {
    labelFr = 'Médiocre';
    labelAr = 'متوسط إلى ضعيف';
    color = '#f59e0b';
  } else {
    labelFr = 'Mauvais pour la santé';
    labelAr = 'سيء للصحة';
    color = '#ef4444';
  }

  return {
    status: 'sufficient',
    scoreOutOf100: finalScore,
    labelFr,
    labelAr,
    color,
    summaryFr: `Note globale basée sur la qualité nutritionnelle (Nutri-Score), le niveau de transformation (NOVA) et la sécurité des additifs.`,
    summaryAr: `تقييم علمي محسوب بناءً على الجودة الغذائية (نوتري سكور) ومستوى المعالجة الصناعية وسلامة الإضافات.`,
    criteria
  };
}

/**
 * Evaluates cosmetic products according to INCI toxicology, endocrine disruptors, allergens & irritants
 */
export function evaluateCosmeticProduct(product: Partial<ProductData>): ProductEvaluation {
  const ingredientsText = product.ingredientsText || '';
  const ingredientsList = product.ingredientsList || [];

  if (!ingredientsText && ingredientsList.length === 0) {
    return {
      status: 'insufficient',
      scoreOutOf100: null,
      labelFr: 'Informations insuffisantes pour évaluer ce produit',
      labelAr: 'معلومات غير كافية لتقييم هذا المنتج',
      color: '#94a3b8',
      summaryFr: 'La liste officielle INCI des ingrédients n’est pas fournie pour ce produit cosmétique.',
      summaryAr: 'قائمة المكونات الرسمية (INCI) غير متوفرة في قاعدة البيانات لهذا المستحضر.',
      criteria: [
        {
          titleFr: 'Composition INCI non renseignée',
          titleAr: 'مكونات INCI غير مدرجة',
          descriptionFr: 'Impossible d’analyser les composants chimiques sans la liste d’ingrédients officielle.',
          descriptionAr: 'لا يمكن تحليل المركبات الكيميائية بدون قائمة المكونات المعتمدة.',
          type: 'neutral'
        }
      ]
    };
  }

  // Parse INCI tokens
  const fullText = (ingredientsText + ' ' + ingredientsList.join(' ')).toLowerCase();

  let cleanCount = 0;
  let lowCount = 0;
  let moderateCount = 0;
  let hazardCount = 0;
  const analyzedIngredients: CosmeticIngredient[] = [];
  const criteria: ProductEvaluation['criteria'] = [];

  for (const [key, meta] of Object.entries(COSMETIC_KNOWN_INCI)) {
    if (fullText.includes(key)) {
      if (meta.risk === 'hazard') hazardCount++;
      else if (meta.risk === 'moderate') moderateCount++;
      else if (meta.risk === 'low') lowCount++;
      else cleanCount++;

      analyzedIngredients.push({
        name: meta.labelFr,
        risk: meta.risk,
        riskLabelFr: meta.labelFr,
        riskLabelAr: meta.labelAr,
        detailsFr: meta.descFr,
        detailsAr: meta.descAr
      });
    }
  }

  // Calculate Cosmetic score out of 100
  let score = 85;

  if (hazardCount > 0) {
    score -= hazardCount * 30;
    criteria.push({
      titleFr: `${hazardCount} ingrédient(s) à risque élevé ou perturbateur(s) endocrinien(s)`,
      titleAr: `${hazardCount} مكون(ات) عالي الخطورة أو مشتبه في تأثيره الهرموني`,
      descriptionFr: 'Présence de substances controversées pour la santé hormonale ou cellulaire.',
      descriptionAr: 'وجود مركبات كيميائية مثيرة للجدل الصحي أو مسببة للاضطراب الهرموني.',
      type: 'negative'
    });
  }

  if (moderateCount > 0) {
    score -= moderateCount * 12;
    criteria.push({
      titleFr: `${moderateCount} ingrédient(s) à risque modéré ou irritant(s)`,
      titleAr: `${moderateCount} مكون(ات) متوسط الخطورة أو مهيج للبشرة`,
      descriptionFr: 'Tensioactifs décapants, huiles minérales occlusives ou conservateurs sensibilisants.',
      descriptionAr: 'منظفات قوية أو مشتقات بترولية أو مواد حافظة قد ترهق الجلد.',
      type: 'warning'
    });
  }

  if (cleanCount > 0) {
    score += Math.min(15, cleanCount * 5);
    criteria.push({
      titleFr: `${cleanCount} actif(s) naturel(s) ou noble(s) identifié(s)`,
      titleAr: `${cleanCount} مكون(ات) طبيعي فعال وآمن تماماً`,
      descriptionFr: 'Huiles végétales pures, antioxydants naturels ou agents apaisants reconnus.',
      descriptionAr: 'زيوت نباتية نقية ومضادات أكسدة طبيعية تغذي البشرة.',
      type: 'positive'
    });
  }

  if (hazardCount === 0 && moderateCount === 0 && cleanCount > 0) {
    score = Math.max(score, 90);
  }

  const finalScore = Math.max(10, Math.min(100, Math.round(score)));

  let labelFr = 'Bon';
  let labelAr = 'جيد';
  let color = '#84cc16';

  if (finalScore >= 80) {
    labelFr = 'Excellent & Sain';
    labelAr = 'ممتاز وآمن';
    color = '#10b981';
  } else if (finalScore >= 60) {
    labelFr = 'Acceptable';
    labelAr = 'مقبول';
    color = '#eab308';
  } else if (finalScore >= 40) {
    labelFr = 'Médiocre';
    labelAr = 'متوسط الخطورة';
    color = '#f97316';
  } else {
    labelFr = 'À risque (Ingrédients controversés)';
    labelAr = 'عالي الخطورة (مكونات مشبوهة)';
    color = '#ef4444';
  }

  return {
    status: 'sufficient',
    scoreOutOf100: finalScore,
    labelFr,
    labelAr,
    color,
    summaryFr: `Évaluation toxicologique basée sur la nomenclature internationale INCI, le risque d’irritation et la présence de perturbateurs endocriniens.`,
    summaryAr: `تقييم بيولوجي لسلامة مستحضرات التجميل بناءً على المعايير الدولية لسلامة البشرة وخلوها من الملوثات.`,
    criteria
  };
}

/**
 * Checks for Halal, Pork derivatives, Alcohol and Carmine E120
 */
export function checkHalalCompliance(ingredientsText: string, additives: AdditiveInfo[] = []) {
  const text = (ingredientsText || '').toLowerCase();
  
  const porkKeywords = ['porc', 'gélatine de porc', 'graisse de porc', 'lard', 'saindoux', 'bacon', 'pork', 'porcine'];
  const alcoholKeywords = ['alcool', 'alcohol', 'vin', 'wine', 'rhum', 'liqueur', 'éthanol', 'ethanol', 'bière', 'beer'];
  const carmineKeywords = ['e120', 'carmin', 'cochenille', 'carmine', 'cochineal'];

  const hasPork = porkKeywords.some(w => text.includes(w));
  const hasAlcohol = alcoholKeywords.some(w => text.includes(w));
  const hasCarmine = carmineKeywords.some(w => text.includes(w)) || additives.some(a => a.id.toLowerCase() === 'e120');

  let detailsFr = '';
  let detailsAr = '';

  if (hasPork) {
    detailsFr = 'Attention : contient des ingrédients ou dérivés d’origine porcine (porc / gélatine).';
    detailsAr = 'تنبيه هام: يحتوي على مشتقات لحم أو جيلاتين الخنزير المحرم.';
  } else if (hasAlcohol) {
    detailsFr = 'Attention : présence d’alcool ou d’arômes alcoolisés identifiés.';
    detailsAr = 'تنبيه: يحتوي على كحول أو نكهات تحتوي على الكحول.';
  } else if (hasCarmine) {
    detailsFr = 'Contient le colorant E120 (Carmin de cochenille). Selon l’avis de certains comités de surveillance halal, ce colorant provient d’insectes.';
    detailsAr = 'يحتوي على الملون E120 المستخلص من حشرة القرمز، ويخضع لاختلاف فقهي حول حكم استهلاك الحشرات.';
  } else {
    detailsFr = 'Aucun ingrédient d’origine porcine ou alcoolique détecté.';
    detailsAr = 'لم يتم رصد أي مشتقات خنزيرية أو كحولية في قائمة المكونات المذكورة.';
  }

  return {
    hasPorkDerivatives: hasPork,
    hasAlcohol: hasAlcohol,
    hasInsectsCarmine: hasCarmine,
    detailsFr,
    detailsAr
  };
}

export function parseAdditives(additivesTags: string[] = []): AdditiveInfo[] {
  return additivesTags.map(tag => {
    const cleanId = tag.replace('en:', '').toLowerCase();
    const known = KNOWN_ADDITIVES[cleanId];
    if (known) {
      return {
        id: cleanId,
        name: known.name,
        risk: known.risk,
        descriptionFr: known.fr,
        descriptionAr: known.ar,
        isHalal: known.halal
      };
    }
    return {
      id: cleanId,
      name: cleanId.toUpperCase(),
      risk: 'unknown',
      descriptionFr: 'Additif alimentaire répertorié dans la base officielle.',
      descriptionAr: 'مادة مضافة مسجلة رسمياً.',
      isHalal: true
    };
  });
}
