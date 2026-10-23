import { ProductData } from '../types/product';

export const MOROCCAN_AND_POPULAR_PRODUCTS: ProductData[] = [
  {
    barcode: '6111029000123',
    name: 'Raibi Jamila (Grenadine)',
    nameAr: 'رايبي جميلة بنكهة الرمان',
    brand: 'Centrale Danone',
    category: 'food',
    imageUrl: 'https://images.openfoodfacts.org/images/products/611/102/900/0123/front_fr.4.400.jpg',
    quantity: '170 g',
    origin: 'Maroc / المغرب',
    labels: ['Produit du Maroc', 'Sans conservateur'],
    ingredientsText: 'Lait fermenté pasteurisé, sucre, eau, arôme grenadine, colorants (E120 carmin), ferments lactiques.',
    ingredientsTextAr: 'حليب مخمر مبستر، سكر، ماء، نكهة الرمان، ملونات (E120 كرمين)، خمائر لبنية.',
    ingredientsList: ['Lait fermenté', 'Sucre', 'Eau', 'Arôme grenadine', 'E120', 'Ferments lactiques'],
    nutriscoreGrade: 'c',
    nutriscoreScore: 8,
    novaGroup: 4,
    ecoscoreGrade: 'b',
    nutriments: {
      energyKcal: 76,
      fat: 1.5,
      saturatedFat: 1.0,
      sugars: 12.8,
      salt: 0.1,
      fiber: 0.0,
      proteins: 2.8,
      sodium: 0.04
    },
    allergens: ['Lait / الحليب'],
    traces: [],
    additives: [
      {
        id: 'e120',
        name: 'E120 - Carmin (Acide carminique)',
        risk: 'moderate',
        descriptionFr: 'Colorant rouge issu de la cochenille (insecte). Susceptible d’entraîner des allergies chez les personnes sensibles.',
        descriptionAr: 'ملون أحمر مستخلص من حشرة الدودة القرمزية. قد يسبب حساسية لدى بعض الأشخاص.',
        isHalal: false // Insect origin debate
      }
    ],
    isHalalWarning: {
      hasPorkDerivatives: false,
      hasAlcohol: false,
      hasInsectsCarmine: true,
      detailsFr: 'Présence du colorant E120 (Carmin de cochenille). Selon certaines jurisprudences islamiques, les colorants issus d’insectes font l’objet de divergences.',
      detailsAr: 'يحتوي على الملون E120 المستخلص من حشرة القرمز. يخضع لاختلاف فقهي حول استهلاك مشتقات الحشرات.'
    },
    evaluation: {
      status: 'sufficient',
      scoreOutOf100: 55,
      labelFr: 'Qualité moyenne (À consommer avec modération)',
      labelAr: 'جودة متوسطة (يُستهلك باعتدال)',
      color: '#f59e0b',
      summaryFr: 'Produit laitier emblématique, mais avec une teneur élevée en sucres ajoutés (12,8g/100g) et un aliment ultra-transformé (NOVA 4).',
      summaryAr: 'منتج حليبي شهير ولكنه يحتوي على نسبة سكريات مضافة مرتفعة (12.8 غرام لكل 100 غرام) وهو مصنف ضمن الأغذية فائقة المعالجة.',
      criteria: [
        {
          titleFr: 'Teneur en sucres élevée',
          titleAr: 'نسبة سكريات مرتفعة',
          descriptionFr: 'Contient 12,8g de sucre pour 100g (soit environ 3 morceaux de sucre par pot).',
          descriptionAr: 'يحتوي على 12.8غ سكر لكل 100غ (ما يعادل قرابة 3 قطع سكر في العلبة).',
          type: 'warning'
        },
        {
          titleFr: 'Source de calcium et protéines',
          titleAr: 'مصدر للكالسيوم والبروتين',
          descriptionFr: '2,8g de protéines et des ferments lactiques bons pour le microbiote.',
          descriptionAr: '2.8غ بروتينات مع خمائر لبنية مفيدة للهضم.',
          type: 'positive'
        },
        {
          titleFr: 'Aliment ultra-transformé (NOVA 4)',
          titleAr: 'غذاء فائق المعالجة (NOVA 4)',
          descriptionFr: 'Contient des arômes artificiels et le colorant E120.',
          descriptionAr: 'يحتوي على منكهات صناعية وملون E120.',
          type: 'negative'
        }
      ]
    },
    source: 'local_morocco',
    sourceUrl: 'https://world.openfoodfacts.org/product/6111029000123'
  },
  {
    barcode: '6111002000010',
    name: 'Couscous Fin ou Moyen Dari',
    nameAr: 'كسكس داري (متوسط أو رقيق)',
    brand: 'Dari Couspate',
    category: 'food',
    imageUrl: 'https://images.openfoodfacts.org/images/products/611/100/200/0010/front_fr.11.400.jpg',
    quantity: '1 kg',
    origin: 'Maroc (Salé) / المغرب',
    labels: ['100% Semoule de blé dur de qualité supérieure', 'Sans additifs'],
    ingredientsText: '100% semoule de blé dur de qualité supérieure.',
    ingredientsTextAr: '100% سميد القمح الصلب الممتاز.',
    ingredientsList: ['Semoule de blé dur'],
    nutriscoreGrade: 'a',
    nutriscoreScore: -2,
    novaGroup: 1,
    ecoscoreGrade: 'a',
    nutriments: {
      energyKcal: 356,
      fat: 1.5,
      saturatedFat: 0.3,
      sugars: 1.5,
      salt: 0.01,
      fiber: 5.0,
      proteins: 12.0,
      sodium: 0.004
    },
    allergens: ['Gluten (Blé) / الغلوتين (القمح)'],
    traces: [],
    additives: [],
    isHalalWarning: {
      hasPorkDerivatives: false,
      hasAlcohol: false,
      hasInsectsCarmine: false,
      detailsFr: 'Produit 100% végétal et naturel, aucun risque.',
      detailsAr: 'منتج طبيعي ونباتي 100%، خالي من أي شبهة.'
    },
    evaluation: {
      status: 'sufficient',
      scoreOutOf100: 95,
      labelFr: 'Excellent pour la santé',
      labelAr: 'ممتاز وصحي للغاية',
      color: '#10b981',
      summaryFr: 'Aliment brut non transformé (NOVA 1), riche en glucides complexes, fibres et protéines végétales, sans aucun additif ni conservateur.',
      summaryAr: 'طعام خام غير معالج (NOVA 1)، غني بالنشويات المعقدة والألياف والبروتين النباتي، خالي تماماً من المواد الحافظة.',
      criteria: [
        {
          titleFr: 'Nutri-Score A & NOVA 1',
          titleAr: 'تصنيف A وغير معالج',
          descriptionFr: 'Excellente qualité nutritionnelle sans aucun ingrédient ultra-transformé.',
          descriptionAr: 'قيمة غذائية ممتازة وطبيعي 100%.',
          type: 'positive'
        },
        {
          titleFr: 'Riche en fibres & protéines',
          titleAr: 'غني بالألياف والبروتينات',
          descriptionFr: '12g de protéines et 5g de fibres pour 100g, idéal pour la satiété.',
          descriptionAr: '12غ بروتين و5غ ألياف للشعور بالشبع والطاقة المستدامة.',
          type: 'positive'
        },
        {
          titleFr: 'Zéro additif',
          titleAr: 'بدون أي مواد حافظة',
          descriptionFr: 'Uniquement du blé dur sélectionné.',
          descriptionAr: 'قمح صلب نقي فقط.',
          type: 'positive'
        }
      ]
    },
    source: 'local_morocco',
    sourceUrl: 'https://world.openfoodfacts.org/product/6111002000010'
  },
  {
    barcode: '6111032000017',
    name: 'Sidi Ali - Eau Minérale Naturelle',
    nameAr: 'سيدي علي - ماء معدني طبيعي',
    brand: 'Oulmès (Les Eaux Minérales d’Oulmès)',
    category: 'food',
    imageUrl: 'https://images.openfoodfacts.org/images/products/611/103/200/0017/front_fr.9.400.jpg',
    quantity: '1.5 L',
    origin: 'Maroc (Tarmilate, Moyen Atlas)',
    labels: ['Faiblement minéralisée', 'Recommandée pour nourrissons'],
    ingredientsText: 'Eau minérale naturelle jaillissante du Moyen Atlas marocain.',
    ingredientsTextAr: 'مياه معدنية طبيعية نابعة من الأطلس المتوسط المغربي.',
    ingredientsList: ['Eau minérale naturelle'],
    nutriscoreGrade: 'a',
    nutriscoreScore: 0,
    novaGroup: 1,
    ecoscoreGrade: 'a',
    nutriments: {
      energyKcal: 0,
      fat: 0,
      saturatedFat: 0,
      sugars: 0,
      salt: 0.01,
      fiber: 0,
      proteins: 0,
      sodium: 0.006
    },
    allergens: [],
    traces: [],
    additives: [],
    evaluation: {
      status: 'sufficient',
      scoreOutOf100: 100,
      labelFr: 'Pureté & Hydratation Parfaite',
      labelAr: 'نقاء ممتاز ومثالي للترطيب',
      color: '#10b981',
      summaryFr: 'Eau minérale naturelle équilibrée et très faiblement minéralisée, excellente pour toute la famille et la préparation des biberons.',
      summaryAr: 'ماء معدني نقي ومنخفض الأملاح ومثالي لجميع أفراد الأسرة ولتغذية الرضع.',
      criteria: [
        {
          titleFr: 'Faible en sodium',
          titleAr: 'منخفض الصوديوم',
          descriptionFr: 'Teneur très faible en sel convenant aux régimes hyposodés.',
          descriptionAr: 'نسبة ملح منخفضة جداً تناسب الحميات الصحية.',
          type: 'positive'
        }
      ]
    },
    source: 'local_morocco',
    sourceUrl: 'https://world.openfoodfacts.org/product/6111032000017'
  },
  {
    barcode: '6111018000013',
    name: 'Confiture de Fraise Aïcha',
    nameAr: 'مربى الفراولة عائشة',
    brand: 'Aïcha',
    category: 'food',
    imageUrl: 'https://images.openfoodfacts.org/images/products/611/101/800/0013/front_fr.14.400.jpg',
    quantity: '370 g',
    origin: 'Maroc (Meknès)',
    labels: ['Sans colorant ni conservateur', 'Préparé avec 45g de fruits pour 100g'],
    ingredientsText: 'Fraises sélectionnées (45%), sucre, sirop de glucose, gélifiant : pectine de fruits, acidifiant : acide citrique.',
    ingredientsTextAr: 'فراولة منتقاة (45%)، سكر، شراب الغلوكوز، مادة هلامية: بكتين الفواكه، مادة محمضة: حمض الستريك.',
    ingredientsList: ['Fraises', 'Sucre', 'Sirop de glucose', 'Pectine', 'Acide citrique'],
    nutriscoreGrade: 'd',
    nutriscoreScore: 14,
    novaGroup: 3,
    ecoscoreGrade: 'c',
    nutriments: {
      energyKcal: 254,
      fat: 0.1,
      saturatedFat: 0.0,
      sugars: 58.0,
      salt: 0.03,
      fiber: 1.2,
      proteins: 0.4,
      sodium: 0.012
    },
    allergens: [],
    traces: [],
    additives: [
      {
        id: 'e440',
        name: 'E440 - Pectines',
        risk: 'safe',
        descriptionFr: 'Gélifiant végétal naturel extrait d’écorces d’agrumes ou de pommes.',
        descriptionAr: 'مادة هلامية طبيعية مستخلصة من قشور الحمضيات أو التفاح.',
        isHalal: true
      },
      {
        id: 'e330',
        name: 'E330 - Acide citrique',
        risk: 'safe',
        descriptionFr: 'Régulateur d’acidité naturellement présent dans le citron.',
        descriptionAr: 'منظم حموضة طبيعي موجود في الليمون.',
        isHalal: true
      }
    ],
    evaluation: {
      status: 'sufficient',
      scoreOutOf100: 48,
      labelFr: 'Médiocre (Taux de sucre très élevé)',
      labelAr: 'متوسط إلى ضعيف (نسبة سكر عالية جداً)',
      color: '#f97316',
      summaryFr: 'Bien que préparée sans conservateurs artificiels, cette confiture contient 58g de sucre pour 100g. À consommer avec parcimonie.',
      summaryAr: 'رغم خلوها من المواد الحافظة الاصطناعية، إلا أن المربى يحتوي على 58 غرام سكر لكل 100 غرام.',
      criteria: [
        {
          titleFr: 'Taux de sucre critique (58%)',
          titleAr: 'نسبة سكر مرتفعة جداً (58%)',
          descriptionFr: 'Une cuillère à soupe apporte l’équivalent de deux morceaux de sucre.',
          descriptionAr: 'ملعقة طعام واحدة تحتوي على ما يقارب قطعتي سكر.',
          type: 'negative'
        },
        {
          titleFr: 'Pectine végétale saine',
          titleAr: 'بكتين نباتي طبيعي',
          descriptionFr: 'Gélifiant végétal sans risque.',
          descriptionAr: 'مادة رابطة نباتية آمنة.',
          type: 'positive'
        }
      ]
    },
    source: 'local_morocco',
    sourceUrl: 'https://world.openfoodfacts.org/product/6111018000013'
  },
  {
    barcode: '4005808119059',
    name: 'Nivea Crème (Boîte Bleue Classique)',
    nameAr: 'كريم نيفيا الكلاسيكي (العلبة الزرقاء)',
    brand: 'Nivea / Beiersdorf',
    category: 'cosmetics',
    imageUrl: 'https://images.openbeautyfacts.org/images/products/400/580/811/9059/front_fr.21.400.jpg',
    quantity: '150 ml',
    origin: 'Allemagne / Maroc',
    labels: ['Hydratation intensive', 'Testé sous contrôle dermatologique'],
    ingredientsText: 'Aqua, Paraffinum Liquidum, Cera Microcristallina, Glycerin, Lanolin Alcohol (Eucerit®), Paraffin, Panthenol, Magnesium Sulfate, Decyl Oleate, Octyldodecanol, Aluminum Stearates, Citric Acid, Magnesium Stearate, Limonene, Geraniol, Hydroxycitronellal, Linalool, Citronellol, Benzyl Benzoate, Cinnamyl Alcohol, Parfum.',
    ingredientsTextAr: 'ماء، زيت معدني (برافين)، شمع ميكروكريستالين، جلسرين، لانولين، بانتينول، كبريتات المغنيسيوم، عطور وحمض الستريك ومسببات حساسية عطرية.',
    cosmeticEvaluation: {
      cleanIngredientsCount: 12,
      lowRiskCount: 4,
      moderateRiskCount: 3,
      hazardousCount: 1,
      hasEndocrineDisruptor: false,
      hasAllergens: true,
      hasMicroplastics: false,
      ingredients: [
        {
          name: 'Paraffinum Liquidum & Cera Microcristallina',
          risk: 'moderate',
          riskLabelFr: 'Huiles minérales issues de la pétrochimie',
          riskLabelAr: 'زيوت معدنية مشتقة من البترول',
          detailsFr: 'Filmogène occlusif qui hydrate par barrière mais peu écologique.',
          detailsAr: 'يشكل طبقة عازلة تمنع جفاف البشرة ولكنه مشتق بترولي.',
          functionFr: 'Émollient barrière'
        },
        {
          name: 'Panthenol & Glycerin',
          risk: 'clean',
          riskLabelFr: 'Actifs très hydratants et apaisants',
          riskLabelAr: 'مرطبات ممتازة ومهدئة',
          detailsFr: 'Pro-vitamine B5 et glycérine végétale très bien tolérées.',
          detailsAr: 'فيتامين ب5 وجلسرين يعززان ترميم البشرة.',
          functionFr: 'Humectant'
        },
        {
          name: 'Limonene, Linalool, Geraniol, Citronellol',
          risk: 'low',
          riskLabelFr: 'Allergènes parfumants obligatoires',
          riskLabelAr: 'مسببات حساسية عطرية محتملة',
          detailsFr: 'Peuvent déclencher des réactions chez les peaux atopiques ou réactives.',
          detailsAr: 'قد تسبب تهيجاً خفيفاً لأصحاب البشرة الحساسة جداً.',
          functionFr: 'Parfum'
        },
        {
          name: 'Cinnamyl Alcohol & Hydroxycitronellal',
          risk: 'moderate',
          riskLabelFr: 'Substances parfumantes irritantes potentielles',
          riskLabelAr: 'مواد عطرية مسببة للحساسية الجلدية',
          detailsFr: 'Molécules reconnues pour leur pouvoir sensibilisant.',
          detailsAr: 'مركبات عطرية معروفة بإمكانية التحسس لدى البعض.',
          functionFr: 'Agent masquant'
        }
      ]
    },
    evaluation: {
      status: 'sufficient',
      scoreOutOf100: 62,
      labelFr: 'Correct (Contient huiles minérales et parfums)',
      labelAr: 'مقبول (يحتوي على زيوت معدنية وعطور حساسة)',
      color: '#eab308',
      summaryFr: 'Hydratant protecteur puissant, sans perturbateurs endocriniens majeurs, mais repose sur des dérivés de pétrole (paraffine) et plusieurs allergènes de parfum.',
      summaryAr: 'مرطب فعال وقوي بدون ملوثات هرمونية خطيرة، لكنه يعتمد على مشتقات بترولية ومواد عطرية قد تحسس البشرة الرقيقة.',
      criteria: [
        {
          titleFr: 'Sans perturbateurs endocriniens majeurs',
          titleAr: 'خالي من الملوثات الهرمونية الخطيرة',
          descriptionFr: 'Ne contient ni parabènes ni phtalates ni filtres UV controversés.',
          descriptionAr: 'لا يحتوي على البارابين أو الفثالات.',
          type: 'positive'
        },
        {
          titleFr: 'Présence d’huiles minérales (Paraffine)',
          titleAr: 'يحتوي على مشتقات البرافين',
          descriptionFr: 'Issu du raffinage du pétrole, effet barrière occlusif sur les pores.',
          descriptionAr: 'مشتق من تكرير البترول، يعزل المسام للحفاظ على الرطوبة.',
          type: 'warning'
        },
        {
          titleFr: 'Nombreux allergènes parfumants',
          titleAr: 'مكونات عطرية مسببة للحساسية',
          descriptionFr: '6 allergènes étiquetables dans la formule.',
          descriptionAr: 'يحتوي على 6 مسببات حساسية عطرية مصنفة.',
          type: 'warning'
        }
      ]
    },
    source: 'openbeautyfacts',
    sourceUrl: 'https://world.openbeautyfacts.org/product/4005808119059'
  },
  {
    barcode: '6111245000034',
    name: 'Savon Noir Beldi à l’Eucalyptus',
    nameAr: 'صابون بلدي مغربي طبيعي بزيت الكاليبتوس',
    brand: 'Artisanal / Terroir du Maroc',
    category: 'cosmetics',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-204128f7d9a1?auto=format&fit=crop&w=400&q=80',
    quantity: '250 g',
    origin: 'Maroc / المغرب',
    labels: ['100% Naturel', 'Sans sulfate', 'Sans parabène', 'Hammam Traditionnel'],
    ingredientsText: 'Olea Europaea Fruit Oil (Huile d’olive saponifiée), Aqua, Potassium Hydroxide, Eucalyptus Globulus Leaf Oil.',
    ingredientsTextAr: 'زيت الزيتون المعصور والمصبن، ماء، هيدروكسيد البوتاسيوم، زيت الكاليبتوس (الأوكالبتوس) الأساسي.',
    cosmeticEvaluation: {
      cleanIngredientsCount: 4,
      lowRiskCount: 0,
      moderateRiskCount: 0,
      hazardousCount: 0,
      hasEndocrineDisruptor: false,
      hasAllergens: false,
      hasMicroplastics: false,
      ingredients: [
        {
          name: 'Olea Europaea Fruit Oil',
          risk: 'clean',
          riskLabelFr: 'Huile d’olive vierge pure',
          riskLabelAr: 'زيت زيتون بكر نقي',
          detailsFr: 'Très nourrissante, riche en polyphénols antioxydants.',
          detailsAr: 'مغذي جداً وغني بمضادات الأكسدة.',
          functionFr: 'Émollient & Base savonneuse'
        },
        {
          name: 'Eucalyptus Globulus Leaf Oil',
          risk: 'clean',
          riskLabelFr: 'Huile essentielle d’eucalyptus pure',
          riskLabelAr: 'زيت عطري طبيعي للكاليبتوس',
          detailsFr: 'Propriétés purifiantes et décongestionnantes traditionnelles au hammam.',
          detailsAr: 'منقي ومطهر للجسم في الحمام المغربي.',
          functionFr: 'Tonifiant'
        }
      ]
    },
    evaluation: {
      status: 'sufficient',
      scoreOutOf100: 98,
      labelFr: 'Exceptionnel & 100% Naturel',
      labelAr: 'استثنائي وطبيعي 100%',
      color: '#10b981',
      summaryFr: 'Formule ancestrale marocaine ultra-pure : seulement 4 ingrédients naturels, aucun tensioactif sulfaté, aucun conservateur chimique ni perturbateur endocrinien.',
      summaryAr: 'تركيبة مغربية أصيلة نقية تماماً: 4 مكونات طبيعية فقط، خالي من الكبريتات والمواد الحافظة الكيميائية.',
      criteria: [
        {
          titleFr: 'Composition ultra-courte et saine',
          titleAr: 'تركيبة نقية وموجزة',
          descriptionFr: 'Aucun produit pétrochimique ni perturbateur endocrinien.',
          descriptionAr: 'خالي من المشتقات البترولية والمواد الضارة.',
          type: 'positive'
        },
        {
          titleFr: 'Huile d’olive riche en vitamine E',
          titleAr: 'زيت زيتون غني بفيتامين E',
          descriptionFr: 'Nourrit la peau en profondeur lors de l’exfoliation.',
          descriptionAr: 'يغذي البشرة بعمق خلال التقشير والفرك بالكيس.',
          type: 'positive'
        }
      ]
    },
    source: 'local_morocco'
  },
  {
    barcode: '3017620422003',
    name: 'Nutella Pâte à Tartiner',
    nameAr: 'نوتيلا شوكولاتة للدهن',
    brand: 'Ferrero',
    category: 'food',
    imageUrl: 'https://images.openfoodfacts.org/images/products/301/762/042/2003/front_fr.519.400.jpg',
    quantity: '400 g',
    origin: 'Italie / France',
    labels: ['Sans gluten'],
    ingredientsText: 'Sucre, huile de palme, noisettes 13%, lait écrémé en poudre 8,7%, cacao maigre 7,4%, émulsifiants : lécithines [soja], vanilline.',
    ingredientsTextAr: 'سكر، زيت النخيل، بندق 13%، حليب خالي الدسم مجفف 8.7%، كاكاو قليل الدسم 7.4%، مستحلب ليسيثين الصويا، فانيلين.',
    nutriscoreGrade: 'e',
    nutriscoreScore: 26,
    novaGroup: 4,
    ecoscoreGrade: 'e',
    nutriments: {
      energyKcal: 539,
      fat: 30.9,
      saturatedFat: 10.6,
      sugars: 56.3,
      salt: 0.107,
      fiber: 0,
      proteins: 6.3,
      sodium: 0.043
    },
    allergens: ['Lait / الحليب', 'Fruits à coque (Noisettes) / البندق', 'Soja / الصويا'],
    traces: [],
    additives: [
      {
        id: 'e322',
        name: 'E322 - Lécithines (Soja)',
        risk: 'safe',
        descriptionFr: 'Émulsifiant extrait de graines de soja, sans risque sanitaire connu.',
        descriptionAr: 'مستحلب طبيعي من بذور الصويا، آمن صحياً.',
        isHalal: true
      }
    ],
    evaluation: {
      status: 'sufficient',
      scoreOutOf100: 22,
      labelFr: 'Très mauvais pour la santé (À éviter ou très rare)',
      labelAr: 'سيء جداً للصحة (يُنصح بتجنبه أو تناوله نادراً)',
      color: '#ef4444',
      summaryFr: 'Composé à plus de 56% de sucre pur et 30% de matières grasses (principalement huile de palme saturée). Produit ultra-transformé (NOVA 4) et Nutri-Score E.',
      summaryAr: 'يتكون من أكثر من 56% سكر خالص و 30% دهون (معظمها زيت النخيل المشبع). فائق المعالجة بتصنيف E الأسوأ.',
      criteria: [
        {
          titleFr: 'Bombe de sucre (56,3g/100g)',
          titleAr: 'قنبلة سكر (56.3غ لكل 100غ)',
          descriptionFr: 'Plus de la moitié du pot est constitué de sucre rapide.',
          descriptionAr: 'أكثر من نصف العلبة عبارة عن سكر مكرر.',
          type: 'negative'
        },
        {
          titleFr: 'Riche en acides gras saturés (Huile de palme)',
          titleAr: 'غني بالدهون المشبعة (زيت النخيل)',
          descriptionFr: '10,6g d’acides gras saturés favorisant le cholestérol LDL.',
          descriptionAr: '10.6غ دهون مشبعة ترفع الكولسترول الضار.',
          type: 'negative'
        },
        {
          titleFr: 'Aliment ultra-transformé (NOVA 4)',
          titleAr: 'منتج فائق المعالجة (NOVA 4)',
          descriptionFr: 'Transformation industrielle avec arômes synthétiques.',
          descriptionAr: 'معالجة صناعية كثيفة مع نكهات مصنعة.',
          type: 'negative'
        }
      ]
    },
    source: 'openfoodfacts',
    sourceUrl: 'https://world.openfoodfacts.org/product/3017620422003'
  }
];
