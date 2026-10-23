import React, { useState } from 'react';
import { ProductData, Language } from '../types/product';
import { translations } from '../i18n/translations';
import { 
  X, Heart, Share2, AlertTriangle, ShieldCheck, CheckCircle2, 
  HelpCircle, ExternalLink, Leaf, Sparkles, Scale, Info, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: ProductData | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (product: ProductData) => void;
  onOpenGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  isFavorite,
  onToggleFavorite,
  onOpenGuide
}) => {
  const t = translations[language];
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !product) return null;

  const handleFavoriteClick = () => {
    onToggleFavorite(product);
    if (!isFavorite) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // confetti fallback
      }
    }
  };

  const handleShare = async () => {
    const text = `${product.name} (${product.brand}) - Analyse ClairProduit`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text,
          url: product.sourceUrl || window.location.href
        });
      } catch {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(`${text}: ${product.sourceUrl || window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const evalInfo = product.evaluation;
  const isFood = product.category === 'food';
  const displayName = language === 'ar' && product.nameAr ? product.nameAr : product.name;

  // Nutriscore Color map
  const nutriscoreColors: Record<string, { bg: string; text: string; label: string }> = {
    a: { bg: 'bg-emerald-600', text: 'text-white', label: 'Nutri-Score A' },
    b: { bg: 'bg-lime-500', text: 'text-white', label: 'Nutri-Score B' },
    c: { bg: 'bg-amber-400', text: 'text-slate-900', label: 'Nutri-Score C' },
    d: { bg: 'bg-orange-500', text: 'text-white', label: 'Nutri-Score D' },
    e: { bg: 'bg-red-600', text: 'text-white', label: 'Nutri-Score E' },
    unknown: { bg: 'bg-slate-300', text: 'text-slate-700', label: 'Nutri-Score Inconnu' }
  };

  // NOVA Group labels
  const novaLabels: Record<number, { titleFr: string; titleAr: string; color: string }> = {
    1: { titleFr: 'NOVA 1 : Aliment non transformé', titleAr: 'NOVA 1 : طعام طبيعي غير معالج', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    2: { titleFr: 'NOVA 2 : Ingrédient culinaire', titleAr: 'NOVA 2 : مكون للطهي', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    3: { titleFr: 'NOVA 3 : Aliment transformé', titleAr: 'NOVA 3 : طعام معالج', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    4: { titleFr: 'NOVA 4 : Aliment ultra-transformé', titleAr: 'NOVA 4 : طعام فائق المعالجة صناعياً', color: 'bg-red-100 text-red-800 border-red-200' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        
        {/* Sticky Header with Actions */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isFood ? 'bg-amber-100 text-amber-800' : 'bg-pink-100 text-pink-800'
            }`}>
              {isFood ? t.foodCategory : t.cosmeticsCategory}
            </span>
            <span className="text-xs text-slate-400 font-mono">#{product.barcode}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-600 scale-110' 
                  : 'bg-slate-100 text-slate-500 hover:text-rose-600'
              }`}
              title={isFavorite ? t.removedFromFavorites : t.addedToFavorites}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 stroke-rose-500' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="Partager"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* Product Hero Info */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-full sm:w-36 h-40 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shrink-0 overflow-hidden relative group">
              <ProductImage
                src={product.imageUrl}
                alt={displayName}
                category={product.category}
                barcode={product.barcode}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                {product.brand}
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                {displayName}
              </h2>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-3">
                {product.quantity && (
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                    {t.quantityLabel}: {product.quantity}
                  </span>
                )}
                {product.origin && (
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                    {t.originLabel}: {product.origin}
                  </span>
                )}
              </div>

              {/* Badges strip (Nutri-Score, NOVA, EcoScore) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* NutriScore badge */}
                {product.nutriscoreGrade && product.nutriscoreGrade !== 'unknown' && (
                  <div className={`px-3 py-1 rounded-xl font-black text-sm uppercase shadow-xs ${
                    nutriscoreColors[product.nutriscoreGrade]?.bg || 'bg-slate-200'
                  } ${nutriscoreColors[product.nutriscoreGrade]?.text || 'text-slate-800'}`}>
                    Nutri-Score {product.nutriscoreGrade.toUpperCase()}
                  </div>
                )}

                {/* NOVA Group badge */}
                {product.novaGroup && novaLabels[product.novaGroup] && (
                  <div className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${novaLabels[product.novaGroup].color}`}>
                    {language === 'ar' ? novaLabels[product.novaGroup].titleAr : novaLabels[product.novaGroup].titleFr}
                  </div>
                )}

                {/* Eco-Score badge */}
                {product.ecoscoreGrade && product.ecoscoreGrade !== 'unknown' && (
                  <div className="px-2.5 py-1 rounded-xl text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Eco-Score {product.ecoscoreGrade.toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MAIN EVALUATION BOX */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">{t.evaluationTitle}</h3>
              </div>
              <button
                onClick={onOpenGuide}
                className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.methodExplanation}</span>
              </button>
            </div>

            {/* Insufficient data handling (Required condition) */}
            {evalInfo.status === 'insufficient' ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{t.insufficientDataTitle}</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {t.insufficientDataDesc}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Score badge & label */}
                <div className="flex items-center gap-3">
                  {evalInfo.scoreOutOf100 !== null && (
                    <div 
                      className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black text-white shadow-md shrink-0"
                      style={{ backgroundColor: evalInfo.color }}
                    >
                      <span className="text-lg leading-none">{evalInfo.scoreOutOf100}</span>
                      <span className="text-[10px] opacity-80">/ 100</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">
                      {language === 'ar' ? evalInfo.labelAr : evalInfo.labelFr}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {language === 'ar' ? evalInfo.summaryAr : evalInfo.summaryFr}
                    </p>
                  </div>
                </div>

                {/* Breakdown criteria */}
                {evalInfo.criteria && evalInfo.criteria.length > 0 && (
                  <div className="pt-2 space-y-2 border-t border-slate-200/60">
                    {evalInfo.criteria.map((crit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        {crit.type === 'positive' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {crit.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                        {crit.type === 'negative' && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                        {crit.type === 'neutral' && <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                        <div>
                          <span className="font-bold text-slate-800">
                            {language === 'ar' ? crit.titleAr : crit.titleFr} :{' '}
                          </span>
                          <span className="text-slate-600">
                            {language === 'ar' ? crit.descriptionAr : crit.descriptionFr}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* VIGILANCE INGRÉDIENTS (HALAL / PORC / ALCOOL / CARMIN AU MAROC) */}
          {isFood && product.isHalalWarning && (
            <div className={`p-4 rounded-2xl border ${
              product.isHalalWarning.hasPorkDerivatives || product.isHalalWarning.hasAlcohol
                ? 'bg-red-50 border-red-200 text-red-950'
                : product.isHalalWarning.hasInsectsCarmine
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-emerald-50/60 border-emerald-150 text-emerald-950'
            }`}>
              <div className="flex items-center gap-2 mb-1.5 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{t.halalCheckTitle}</span>
              </div>
              <p className="text-xs leading-relaxed">
                {language === 'ar' ? product.isHalalWarning.detailsAr : product.isHalalWarning.detailsFr}
              </p>
            </div>
          )}

          {/* COSMETIC INCI DETAILS */}
          {!isFood && product.cosmeticEvaluation && (
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
              <h4 className="font-bold text-purple-950 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{t.cosmeticsComposition}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                  <div className="text-emerald-600 font-extrabold text-lg">
                    {product.cosmeticEvaluation.cleanIngredientsCount}
                  </div>
                  <div className="text-slate-600 text-[11px]">{t.cleanIngredients}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                  <div className="text-lime-600 font-extrabold text-lg">
                    {product.cosmeticEvaluation.lowRiskCount}
                  </div>
                  <div className="text-slate-600 text-[11px]">{t.lowRiskIngredients}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                  <div className="text-amber-500 font-extrabold text-lg">
                    {product.cosmeticEvaluation.moderateRiskCount}
                  </div>
                  <div className="text-slate-600 text-[11px]">{t.moderateRiskIngredients}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                  <div className="text-red-500 font-extrabold text-lg">
                    {product.cosmeticEvaluation.hazardousCount}
                  </div>
                  <div className="text-slate-600 text-[11px]">{t.hazardousIngredients}</div>
                </div>
              </div>
            </div>
          )}

          {/* INGREDIENTS LIST */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">{t.ingredients}</h4>
              {product.ingredientsText && product.ingredientsText.length > 200 && (
                <button
                  onClick={() => setShowAllIngredients(!showAllIngredients)}
                  className="text-xs text-emerald-700 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>{showAllIngredients ? 'Réduire' : 'Voir tout'}</span>
                  {showAllIngredients ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {product.ingredientsText ? (
              <p className={`text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 ${
                !showAllIngredients ? 'line-clamp-4' : ''
              }`}>
                {language === 'ar' && product.ingredientsTextAr ? product.ingredientsTextAr : product.ingredientsText}
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3.5 rounded-2xl">
                {t.noIngredients}
              </p>
            )}
          </div>

          {/* NUTRITION TABLE (Food only) */}
          {isFood && product.nutriments && (
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>{t.nutritionalValues}</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {product.nutriments.energyKcal !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 block text-[11px]">{t.energy}</span>
                    <span className="font-bold text-slate-800 text-sm">{product.nutriments.energyKcal} kcal</span>
                  </div>
                )}
                {product.nutriments.sugars !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">{t.sugars}</span>
                      <span className={`w-2 h-2 rounded-full ${product.nutriments.sugars > 15 ? 'bg-red-500' : product.nutriments.sugars > 5 ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{product.nutriments.sugars} g</span>
                  </div>
                )}
                {product.nutriments.fat !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 block text-[11px]">{t.fat}</span>
                    <span className="font-bold text-slate-800 text-sm">{product.nutriments.fat} g</span>
                  </div>
                )}
                {product.nutriments.saturatedFat !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">{t.saturatedFat}</span>
                      <span className={`w-2 h-2 rounded-full ${product.nutriments.saturatedFat > 5 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{product.nutriments.saturatedFat} g</span>
                  </div>
                )}
                {product.nutriments.proteins !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 block text-[11px]">{t.proteins}</span>
                    <span className="font-bold text-slate-800 text-sm">{product.nutriments.proteins} g</span>
                  </div>
                )}
                {product.nutriments.fiber !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-500 block text-[11px]">{t.fiber}</span>
                    <span className="font-bold text-slate-800 text-sm">{product.nutriments.fiber} g</span>
                  </div>
                )}
                {product.nutriments.salt !== undefined && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">{t.salt}</span>
                      <span className={`w-2 h-2 rounded-full ${product.nutriments.salt > 1.2 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{product.nutriments.salt} g</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ADDITIVES & ALLERGENS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Additives */}
            {isFood && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">{t.additivesTitle}</h4>
                {product.additives && product.additives.length > 0 ? (
                  <div className="space-y-1.5">
                    {product.additives.map((add, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{add.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                            add.risk === 'hazard' ? 'bg-red-100 text-red-800' :
                            add.risk === 'moderate' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {add.risk === 'hazard' ? 'Risque' : add.risk === 'moderate' ? 'À modérer' : 'Sans risque'}
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-1">
                          {language === 'ar' ? add.descriptionAr : add.descriptionFr}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl">
                    {t.noAdditives}
                  </p>
                )}
              </div>
            )}

            {/* Allergens */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">{t.allergensTitle}</h4>
              {product.allergens && product.allergens.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {product.allergens.map((alg, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-medium">
                      ⚠️ {alg}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl">
                  {t.noAllergens}
                </p>
              )}

              {/* Traces */}
              {product.traces && product.traces.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">{t.tracesTitle} :</span>
                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                    {product.traces.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ODbL License & Open Source Attribution */}
          <div className="p-3.5 rounded-2xl bg-slate-100/70 border border-slate-200 text-slate-500 text-[11px] flex items-center justify-between gap-3">
            <p className="leading-relaxed">
              {t.sourceCredit}
            </p>
            {product.sourceUrl && (
              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 flex items-center gap-1 font-bold text-emerald-700 hover:underline"
              >
                <span>Fiche source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
