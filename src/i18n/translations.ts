export const translations = {
  fr: {
    appName: 'ClairProduit',
    appSubtitle: 'Transparence & Qualité pour votre santé',
    tagline: 'Aliments, boissons et cosmétiques décryptés en toute transparence à l’international',
    
    // Navigation
    home: 'Accueil',
    scan: 'Scanner',
    history: 'Historique',
    favorites: 'Favoris',
    guide: 'Comprendre les notes',
    androidCode: 'Code Android Kotlin',
    
    // Home actions
    scanProductBtn: 'Scanner un produit',
    scanSubtitle: 'Pointez la caméra vers le code-barres',
    foodCategory: 'Aliments & Boissons',
    foodSubtitle: 'Nutri-Score, NOVA, Additifs, Sucre & Sel',
    cosmeticsCategory: 'Cosmétiques & Hygiène',
    cosmeticsSubtitle: 'INCI, Allergènes, Perturbateurs & Soins',
    
    // Search
    searchPlaceholder: 'Rechercher par nom (ex: Nutella, Nivea, Coca-Cola, Bio...)',
    searchOrBarcode: 'Ou saisissez un code-barres (8 à 13 chiffres)',
    searchBtn: 'Rechercher',
    searching: 'Recherche en cours...',
    popularMorocco: 'Produits populaires au Maroc',
    popularSub: 'Testez directement sans scanner un emballage physique',
    
    // Scanner
    scannerTitle: 'Scanner de code-barres',
    scannerInstructions: 'Placez le code-barres au centre du cadre pour le scanner instantanément',
    scannerPermissionDenied: 'Accès caméra refusé. Vous pouvez activer l’autorisation caméra ou saisir le code manuellement.',
    scannerManualInput: 'Saisir le code manuellement',
    enterBarcode: 'Entrer le code-barres (ex: 6111029000123)',
    validateBarcode: 'Valider',
    flashToggle: 'Lampe torche',
    switchCamera: 'Changer de caméra',
    stopScan: 'Fermer',
    tryDemoBarcodes: 'Codes-barres d’exemple à tester',
    
    // Product Details
    barcodeLabel: 'Code-barres',
    brandLabel: 'Marque',
    quantityLabel: 'Quantité',
    originLabel: 'Origine',
    ingredients: 'Ingrédients',
    noIngredients: 'Liste des ingrédients non renseignée par le fabricant.',
    nutritionalValues: 'Valeurs nutritionnelles (pour 100g / 100ml)',
    energy: 'Énergie',
    fat: 'Matières grasses',
    saturatedFat: 'Dont acides gras saturés',
    sugars: 'Dont sucres',
    fiber: 'Fibres alimentaires',
    proteins: 'Protéines',
    salt: 'Sel',
    sodium: 'Sodium',
    
    // Quality & Scores
    evaluationTitle: 'Évaluation ClairProduit',
    scoreLabel: 'Score global',
    insufficientDataTitle: 'Informations insuffisantes pour évaluer ce produit',
    insufficientDataDesc: 'Ce produit ne comporte pas assez de données nutritionnelles ou de liste d’ingrédients validée pour calculer un score scientifique fiable.',
    methodExplanation: 'Comment est calculée cette note ?',
    nutriscoreDesc: 'Indice de qualité nutritionnelle de A (meilleur) à E (à limiter)',
    novaDesc: 'Degré de transformation industrielle (Groupe 1 à 4)',
    ecoscoreDesc: 'Impact environnemental et empreinte écologique',
    
    // Additives & Allergens
    additivesTitle: 'Additifs alimentaires',
    noAdditives: 'Aucun additif détecté.',
    allergensTitle: 'Allergènes identifiés',
    noAllergens: 'Aucun allergène majeur détecté.',
    tracesTitle: 'Traces potentielles',
    
    // Moroccan specific / Halal alert
    halalCheckTitle: 'Vigilance Ingrédients & Éthique (Gélatine, Alcool, E120)',
    halalOk: 'Aucun ingrédient suspect d’origine porcine ou alcoolique détecté.',
    porkWarning: 'Attention : contient ou peut contenir de la gélatine porcine ou des dérivés de porc.',
    alcoholWarning: 'Attention : présence d’alcool ou d’arôme alcoolisé identifiée.',
    carmineWarning: 'Colorant E120 (Carmin / Cochenille) présent : extrait d’insectes.',
    
    // Cosmetics evaluation
    cosmeticsComposition: 'Analyse toxicologique & INCI',
    cleanIngredients: 'Ingrédients sains',
    lowRiskIngredients: 'Risque faible',
    moderateRiskIngredients: 'Risque modéré',
    hazardousIngredients: 'Ingrédients controversés',
    endocrineDisruptorDetected: 'Présence possible de perturbateurs endocriniens',
    microplasticsDetected: 'Contient des polymères synthétiques / microplastiques',
    
    // Status & Feedback
    notFoundTitle: 'Produit non trouvé',
    notFoundDesc: 'Ce code-barres n’est pas encore répertorié dans Open Food Facts ou Open Beauty Facts.',
    networkErrorTitle: 'Erreur de connexion',
    networkErrorDesc: 'Impossible de joindre la base de données. Vérifiez votre connexion Internet.',
    addedToFavorites: 'Ajouté aux favoris !',
    removedFromFavorites: 'Retiré des favoris',
    clearHistory: 'Effacer l’historique',
    emptyHistory: 'Aucun produit scanné pour le moment.',
    emptyFavorites: 'Aucun produit enregistré dans vos favoris.',
    sourceCredit: 'Données issues des bases libres et collaboratives Open Food Facts & Open Beauty Facts (Licence ODbL).',
    contribute: 'Contribuer à la base',
    
    // Android native tab
    androidTitle: 'Projet Android Native (Kotlin & Jetpack Compose)',
    androidDesc: 'Code source Kotlin complet, architecture MVVM, CameraX + ML Kit, Retrofit & Room pour Google Play Store.',
    copyCode: 'Copier le code',
    codeCopied: 'Code copié avec succès !',
    downloadInstructions: 'Comment tester et compiler sur Android Studio',
    step1: '1. Ouvrez Android Studio et créez un projet "Empty Compose Activity"',
    step2: '2. Ajoutez les dépendances CameraX, ML Kit Barcode et Retrofit dans build.gradle.kts',
    step3: '3. Copiez les classes Kotlin fournies ci-dessous',
    step4: '4. Lancez l’application sur votre smartphone Android avec câble USB ou émulateur',
    step5: '5. Générez l’Android App Bundle (AAB) signé pour le Google Play Store'
  },
  
  ar: {
    appName: 'كلير برودوي (ClairProduit)',
    appSubtitle: 'الشفافية والجودة من أجل صحتك',
    tagline: 'فحص الأغذية والمشروبات ومستحضرات التجميل في جميع أنحاء العالم',
    
    // Navigation
    home: 'الرئيسية',
    scan: 'مسح الباركود',
    history: 'السجل',
    favorites: 'المفضلة',
    guide: 'فهم التقييمات',
    androidCode: 'كود أندرويد كوتلن',
    
    // Home actions
    scanProductBtn: 'مسح منتج الآن',
    scanSubtitle: 'وجّه الكاميرا نحو الرمز الشريطي (الباركود)',
    foodCategory: 'أغذية ومشروبات',
    foodSubtitle: 'القيم الغذائية، نوتري سكور، المواد المضافة، السكر والملح',
    cosmeticsCategory: 'تجميل وعناية شخصية',
    cosmeticsSubtitle: 'المكونات، مسببات الحساسية، والملوثات الضارة',
    
    // Search
    searchPlaceholder: 'ابحث بالاسم (مثال: نوتيلا، نيفيا، كوكاكولا...)',
    searchOrBarcode: 'أو أدخل رقم الباركود (من 8 إلى 13 رقماً)',
    searchBtn: 'بحث',
    searching: 'جاري البحث في قاعدة البيانات...',
    popularMorocco: 'منتجات شائعة في المغرب',
    popularSub: 'جرب الفحص فوراً بدون الحاجة لعلبة حقيقية',
    
    // Scanner
    scannerTitle: 'ماسح الرمز الشريطي (الباركود)',
    scannerInstructions: 'ضع الرمز الشريطي داخل الإطار ليتم التعرف عليه تلقائياً',
    scannerPermissionDenied: 'تم رفض إذن استخدام الكاميرا. يمكنك تفعيل الإذن من إعدادات الهاتف أو إدخال الرقم يدوياً.',
    scannerManualInput: 'إدخال الباركود يدوياً',
    enterBarcode: 'أدخل رقم الباركود (مثال: 6111029000123)',
    validateBarcode: 'تأكيد',
    flashToggle: 'تشغيل الفلاش',
    switchCamera: 'تبديل الكاميرا',
    stopScan: 'إغلاق',
    tryDemoBarcodes: 'أمثلة لباركودات يمكنك تجربتها',
    
    // Product Details
    barcodeLabel: 'الرمز الشريطي',
    brandLabel: 'العلامة التجارية',
    quantityLabel: 'الحجم / الكمية',
    originLabel: 'بلد المنشأ',
    ingredients: 'المكونات',
    noIngredients: 'قائمة المكونات غير متوفرة من طرف المصنع.',
    nutritionalValues: 'القيم الغذائية (لكل 100 غرام / 100 مل)',
    energy: 'السعرات الحرارية (الطاقة)',
    fat: 'الدهون',
    saturatedFat: 'منها دهون مشبعة',
    sugars: 'منها سكريات',
    fiber: 'ألياف غذائية',
    proteins: 'بروتينات',
    salt: 'الملح',
    sodium: 'الصوديوم',
    
    // Quality & Scores
    evaluationTitle: 'تقييم ClairProduit',
    scoreLabel: 'التقييم العام',
    insufficientDataTitle: 'معلومات غير كافية لتقييم هذا المنتج',
    insufficientDataDesc: 'لا تتوفر في هذا المنتج بيانات غذائية كافية أو قائمة مكونات مدققة لحساب تقييم علمي دقيق.',
    methodExplanation: 'كيف يتم احتساب هذه النتيجة ؟',
    nutriscoreDesc: 'مؤشر الجودة الغذائية من A (الأفضل) إلى E (ينصح بالتقليل منه)',
    novaDesc: 'مستوى المعالجة الصناعية (من المجموعة 1 إلى 4)',
    ecoscoreDesc: 'الأثر البيئي للبصمة الكربونية',
    
    // Additives & Allergens
    additivesTitle: 'المواد الحافظة والمضافة',
    noAdditives: 'لم يتم رصد مواد مضافة.',
    allergensTitle: 'مسببات الحساسية المحددة',
    noAllergens: 'لم يتم رصد مسببات حساسية كبرى.',
    tracesTitle: 'آثار محتملة',
    
    // Moroccan specific / Halal alert
    halalCheckTitle: 'تنبيه المكونات (مشتقات الخنزير، الكحول، والملونات)',
    halalOk: 'لم يتم العثور على أي مكون مشبوه من أصل خنزيري أو كحولي.',
    porkWarning: 'تنبيه: يحتوي أو قد يحتوي على جيلاتين خنزيري أو مشتقات لحم الخنزير.',
    alcoholWarning: 'تنبيه: يحتوي على كحول أو نكهات تحتوي على الكحول.',
    carmineWarning: 'يحتوي على الملون E120 (القرمز / الكارمين): مستخلص من الحشرات.',
    
    // Cosmetics evaluation
    cosmeticsComposition: 'تحليل المكونات ومستحضرات التجميل (INCI)',
    cleanIngredients: 'مكونات آمنة ونظيفة',
    lowRiskIngredients: 'خطر منخفض',
    moderateRiskIngredients: 'خطر متوسط',
    hazardousIngredients: 'مكونات مشبوهة أو مقلقة',
    endocrineDisruptorDetected: 'احتمال وجود مواد مسببة للاضطراب الهرموني',
    microplasticsDetected: 'يحتوي على بوليمرات اصطناعية أو بلاستيك دقيق',
    
    // Status & Feedback
    notFoundTitle: 'المنتج غير موجود',
    notFoundDesc: 'هذا الباركود غير مسجل حالياً في قاعدة بيانات Open Food Facts أو Open Beauty Facts.',
    networkErrorTitle: 'خطأ في الاتصال',
    networkErrorDesc: 'تعذر الاتصال بقاعدة البيانات. يرجى التحقق من اتصالك بالإنترنت.',
    addedToFavorites: 'تمت الإضافة إلى المفضلة !',
    removedFromFavorites: 'تم الحذف من المفضلة',
    clearHistory: 'مسح السجل',
    emptyHistory: 'لم تقم بمسح أي منتج حتى الآن.',
    emptyFavorites: 'لا توجد منتجات محفوظة في المفضلة.',
    sourceCredit: 'البيانات مستخلصة من قواعد البيانات المفتوحة والتشاركية Open Food Facts و Open Beauty Facts (ترخيص ODbL).',
    contribute: 'المساهمة في قاعدة البيانات',
    
    // Android native tab
    androidTitle: 'مشروع أندرويد نيتف (Kotlin & Jetpack Compose)',
    androidDesc: 'الكود المصدري الكامل بلغة كوتلن مع بنية MVVM و CameraX للماسح والجاهز للرفع على Google Play.',
    copyCode: 'نسخ الكود البرمجي',
    codeCopied: 'تم نسخ الكود بنجاح !',
    downloadInstructions: 'خطوات تشغيل المشروع على Android Studio ونشره على Google Play',
    step1: '1. افتح برنامج Android Studio وأنشئ مشروع جديد "Empty Compose Activity"',
    step2: '2. أضف مكتبات CameraX و ML Kit Barcode و Retrofit إلى ملف build.gradle.kts',
    step3: '3. انسخ ملفات كوتلن المعروضة في الأسفل',
    step4: '4. شغل التطبيق مباشرة على هاتفك الأندرويد بواسطة كابل USB أو المحاكي',
    step5: '5. أنشئ حزمة Android App Bundle (AAB) الموقعة لرفعها على متجر Google Play'
  }
};
