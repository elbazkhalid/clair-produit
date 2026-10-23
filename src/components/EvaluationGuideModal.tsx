import React from 'react';
import { Language } from '../types/product';
import { translations } from '../i18n/translations';
import { X, BookOpen, ShieldCheck, Scale, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EvaluationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EvaluationGuideModal: React.FC<EvaluationGuideModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{t.guide}</h3>
              <p className="text-xs text-slate-500">
                {language === 'ar' ? 'معايير التقييم العلمي المعتمدة' : 'Méthodologie scientifique & indépendante'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1: Aliments & Boissons */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-emerald-800 text-base">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span>{language === 'ar' ? '1. تقييم الأغذية والمشروبات' : '1. Évaluation des Aliments & Boissons'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-sm">Nutri-Score (60% de la note)</span>
                <p className="text-slate-600">
                  {language === 'ar'
                    ? 'يحسب التوازن بين العناصر المفيدة (بروتينات، ألياف، فواكه وخضروات) والعناصر الواجب التقليل منها (سعرات حرارية، سكريات، دهون مشبعة، ملح).'
                    : 'Évalue l’équilibre entre les nutriments favorables (fibres, protéines, fruits/légumes) et défavorables (calories, sucres, acides gras saturés, sel).'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block text-sm">Classification NOVA (25%)</span>
                <p className="text-slate-600">
                  {language === 'ar'
                    ? 'يقيس مستوى المعالجة الصناعية من 1 (غير معالج أو طبيعي) إلى 4 (فائق المعالجة صناعياً بمواد تكثيف ونكهات صناعية).'
                    : 'Définit le degré de transformation industrielle de NOVA 1 (aliment brut naturel) à NOVA 4 (produit ultra-transformé).'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 block text-sm">Additifs alimentaires (15%)</span>
              <p className="text-slate-600">
                {language === 'ar'
                  ? 'رصد المواد الحافظة والملونات ومكسبات الطعم مع التنبيه للمواد المشبوهة مثل نتريت الصوديوم (E250) والأسبارتام (E951).'
                  : 'Chaque additif est analysé selon la littérature scientifique (CIRC, EFSA) : sans risque, à modérer, ou hautement controversé.'}
              </p>
            </div>
          </div>

          {/* Section 2: Vigilance Ingrédients Maroc */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 font-extrabold text-emerald-800 text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{language === 'ar' ? '2. مراقبة المكونات (معايير الحلال والجودة)' : '2. Vigilance Ingrédients & Traçabilité (Halal, Porc, Alcool)'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-950 space-y-1">
              <p>
                {language === 'ar'
                  ? 'يقوم التطبيق بفحص تلقائي للمكونات للكشف عن جيلاتين الخنزير، والدهون الحيوانية غير المحددة، والكحول، والملون الأحمر E120 (الكارمين المستخرج من حشرات القرمز).'
                  : 'ClairProduit analyse la composition pour identifier la présence de gélatine porcine, saindoux, alcool ou colorant E120 (carmin de cochenille).'}
              </p>
            </div>
          </div>

          {/* Section 3: Cosmétiques & Hygiène */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-extrabold text-purple-900 text-base">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>{language === 'ar' ? '3. تقييم مستحضرات التجميل والعناية' : '3. Évaluation Cosmétiques & Soins (INCI)'}</span>
            </div>

            <p className="text-xs text-slate-600">
              {language === 'ar'
                ? 'نظام تقييم مستقل يحلل قائمة المكونات الدولية (INCI) لمستحضرات التجميل لرصد المواد المقلقة:'
                : 'L’évaluation cosmétique ne suit pas le Nutri-Score alimentaire mais analyse chaque ingrédient INCI :'}
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-950 border border-red-150 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Perturbateurs endocriniens & cancérigènes :</strong> Parabènes, phtalates, BHT, silicones volatils (D5), formaldéhyde.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-950 border border-amber-150 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Agents décapants & occlusifs :</strong> Sulfates (SLS), huiles minérales pétrochimiques (paraffine), PEG.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-150 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Actifs nobles & naturels :</strong> Huile d’argan du Maroc, beurre de karité, aloe vera, glycérine végétale pure.</span>
              </div>
            </div>
          </div>

          {/* Section 4: Règle de transparence - Pas de fausses données */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900 block">
              {language === 'ar' ? 'مبدأ الشفافية : لا نخترع أي بيانات' : 'Transparence absolue : aucune donnée inventée'}
            </span>
            <p className="text-slate-600">
              {language === 'ar'
                ? 'إذا لم يوفر المصنع الجدول الغذائي أو قائمة المكونات، يعرض التطبيق بوضوح «معلومات غير كافية لتقييم هذا المنتج» بدلاً من تخمين النتيجة.'
                : 'Si un produit ne contient pas assez d’informations vérifiées, ClairProduit affiche explicitement « Informations insuffisantes pour évaluer ce produit » plutôt que de générer une note arbitraire.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
