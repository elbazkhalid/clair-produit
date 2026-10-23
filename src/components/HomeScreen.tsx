import React, { useState } from 'react';
import { ProductData, Language, ProductCategory } from '../types/product';
import { translations } from '../i18n/translations';
import { 
  Scan, Search, Sparkles, Utensils, Sparkle, ArrowRight, 
  CheckCircle2, ShieldCheck, Heart, AlertCircle, Loader2
} from 'lucide-react';
import { MOROCCAN_AND_POPULAR_PRODUCTS } from '../data/moroccanProducts';
import { ProductImage } from './ProductImage';

interface HomeScreenProps {
  language: Language;
  onOpenScanner: () => void;
  onSelectProduct: (product: ProductData) => void;
  onSearch: (query: string, category: ProductCategory) => void;
  searchResults: ProductData[];
  isSearching: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  onOpenPlayStoreGuide?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onOpenScanner,
  onSelectProduct,
  onSearch,
  searchResults,
  isSearching,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenPlayStoreGuide
}) => {
  const t = translations[language];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory);
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    const nextCat = selectedCategory === cat ? 'all' : cat;
    setSelectedCategory(nextCat);
    if (searchQuery.trim()) {
      onSearch(searchQuery, nextCat);
    }
  };

  // Nutri-Score indicator badge helper
  const getScoreBadge = (p: ProductData) => {
    if (p.category === 'food' && p.nutriscoreGrade && p.nutriscoreGrade !== 'unknown') {
      const colors: Record<string, string> = {
        a: 'bg-emerald-600 text-white',
        b: 'bg-lime-500 text-white',
        c: 'bg-amber-400 text-slate-900',
        d: 'bg-orange-500 text-white',
        e: 'bg-red-600 text-white'
      };
      return (
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${colors[p.nutriscoreGrade] || 'bg-slate-200 text-slate-700'}`}>
          Nutri {p.nutriscoreGrade.toUpperCase()}
        </span>
      );
    }
    if (p.evaluation.scoreOutOf100 !== null) {
      return (
        <span 
          className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
          style={{ backgroundColor: p.evaluation.color }}
        >
          {p.evaluation.scoreOutOf100}/100
        </span>
      );
    }
    return (
      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
        Non noté
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Subtle Moroccan geometric backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-xs mb-3 border border-emerald-400/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>{language === 'ar' ? 'فاحص المنتجات المفتوح والمجاني' : 'Application Citoyenne 100% Gratuite'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2">
            {language === 'ar' ? 'اعرف ماذا تأكل وماذا تضع على بشرتك' : 'Mangez mieux, choisissez plus sain.'}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            {t.tagline}
          </p>

          {/* Big CTA Scanner Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenScanner}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-emerald-800 font-extrabold text-base shadow-lg shadow-black/20 hover:bg-emerald-50 active:scale-98 transition-all group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scan className="w-4 h-4" />
              </div>
              <span>{t.scanProductBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Beginner Google Play & Phone Install Banner */}
      {onOpenPlayStoreGuide && (
        <div 
          onClick={onOpenPlayStoreGuide}
          className="p-3.5 sm:p-4 rounded-2xl bg-linear-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-emerald-200/90 hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-amber-500 to-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {language === 'ar' ? 'كيف تنشر التطبيق على متجر Google Play بدون برمجة ؟' : 'Comment publier ClairProduit sur Google Play sans coder ?'}
              </h4>
              <p className="text-[11px] text-slate-600">
                {language === 'ar' 
                  ? 'دليل مبسط للمبتدئين: تحويل التطبيق لملف AAB رسمي بضغطة زر وتثبيته على هاتفك فوراً.'
                  : 'Guide pas-à-pas débutant : générez le fichier .aab prêt pour le Play Store en 1 clic.'}
              </p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-bold text-emerald-700 bg-white px-2.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs hidden sm:inline-flex items-center gap-1">
            <span>Voir le guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {/* Category Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          onClick={() => handleCategoryClick('food')}
          className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
            selectedCategory === 'food'
              ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30'
              : 'bg-white hover:bg-slate-50 border-slate-200'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">{t.foodCategory}</h3>
              {selectedCategory === 'food' && (
                <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">Actif</span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              {t.foodSubtitle}
            </p>
          </div>
        </button>

        <button
          onClick={() => handleCategoryClick('cosmetics')}
          className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
            selectedCategory === 'cosmetics'
              ? 'bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/30'
              : 'bg-white hover:bg-slate-50 border-slate-200'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Sparkle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">{t.cosmeticsCategory}</h3>
              {selectedCategory === 'cosmetics' && (
                <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">Actif</span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              {t.cosmeticsSubtitle}
            </p>
          </div>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length >= 3) {
                  onSearch(e.target.value, selectedCategory);
                }
              }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{t.searchBtn}</span>
          </button>
        </form>
      </div>

      {/* SEARCH RESULTS (If active search) */}
      {searchQuery.trim().length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'ar' ? `نتائج البحث عن "${searchQuery}"` : `Résultats pour "${searchQuery}"`} ({searchResults.length})
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Effacer
            </button>
          </div>

          {isSearching ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500">{t.searching}</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700 text-sm mb-1">{t.notFoundTitle}</p>
              <p className="text-xs">{t.notFoundDesc}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {searchResults.map((product) => (
                <div
                  key={product.barcode}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex gap-3 items-center group"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                    <ProductImage
                      src={product.imageUrl}
                      alt={language === 'ar' && product.nameAr ? product.nameAr : product.name}
                      category={product.category}
                      barcode={product.barcode}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide block truncate">
                      {product.brand}
                    </span>
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                      {language === 'ar' && product.nameAr ? product.nameAr : product.name}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {getScoreBadge(product)}
                      <span className="text-[10px] text-slate-400 font-mono">#{product.barcode.slice(-4)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Universal International Features (Visible when not searching) */}
      {searchQuery.trim().length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Scan className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'ar' ? 'مسح عالمي فوري' : 'Scan International'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'ar'
                ? 'يتعرف على جميع الرموز الشريطية القياسية (EAN-13, UPC) لأي منتج في العالم.'
                : 'Reconnaissance instantanée de tous les codes-barres standards (EAN-13, UPC, Code 128).'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'ar' ? 'أكثر من 3 ملايين منتج' : '+3 millions de produits'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'ar'
                ? 'قاعدة بيانات مفتوحة وتشاركية تغطي المنتجات الغذائية والتجميلية عالمياً.'
                : 'Interrogation directe des bases mondiales Open Food Facts et Open Beauty Facts.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'ar' ? 'معايير علمية مستقلة' : 'Scores Scientifiques'}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'ar'
                ? 'حساب دقيق لـ Nutri-Score، ومعالجة NOVA، ومكونات مستحضرات التجميل INCI.'
                : 'Calcul certifié du Nutri-Score, niveau de transformation NOVA et toxicologie INCI.'}
            </p>
          </div>
        </div>
      )}

      {/* Trust & Methodology highlight */}
      <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-950">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div>
          <span className="font-bold block">100% Indépendant & Collaboratif</span>
          <span className="text-emerald-800">
            {language === 'ar' 
              ? 'البيانات مستخلصة مباشرة من قواعد البيانات المفتوحة Open Food Facts و Open Beauty Facts بدون أي تأثير تجاري.'
              : 'Aucune marque ne peut payer pour modifier sa note. Nous utilisons des critères scientifiques validés (Nutri-Score, NOVA, INCI).'}
          </span>
        </div>
      </div>
    </div>
  );
};
