import React from 'react';
import { ScanHistoryItem, ProductData, Language } from '../types/product';
import { translations } from '../i18n/translations';
import { Trash2, Heart, History, Sparkles, ArrowRight, Utensils, Sparkle } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface HistoryAndFavoritesProps {
  language: Language;
  activeView: 'history' | 'favorites';
  historyItems: ScanHistoryItem[];
  favoriteItems: ProductData[];
  onSelectProduct: (product: ProductData) => void;
  onClearHistory: () => void;
  onRemoveFavorite: (product: ProductData) => void;
  onOpenScanner: () => void;
}

export const HistoryAndFavorites: React.FC<HistoryAndFavoritesProps> = ({
  language,
  activeView,
  historyItems,
  favoriteItems,
  onSelectProduct,
  onClearHistory,
  onRemoveFavorite,
  onOpenScanner
}) => {
  const t = translations[language];

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4 pb-16">
      
      {/* Title & Clear Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {activeView === 'history' ? (
            <History className="w-5 h-5 text-emerald-600" />
          ) : (
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          )}
          <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl">
            {activeView === 'history' ? t.history : t.favorites}
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {activeView === 'history' ? historyItems.length : favoriteItems.length}
          </span>
        </div>

        {activeView === 'history' && historyItems.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearHistory}</span>
          </button>
        )}
      </div>

      {/* History Items List */}
      {activeView === 'history' && (
        <>
          {historyItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/90 p-6">
              <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base mb-1">{t.emptyHistory}</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {language === 'ar' 
                  ? 'قم بمسح الباركود الخاص بأي منتج غذائي أو تجميلي ليتم حفظه تلقائياً هنا.'
                  : 'Scannez le code-barres de vos produits pour les retrouver ici en un clic.'}
              </p>
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
              >
                <span>{t.scanProductBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item.product)}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                    <ProductImage
                      src={item.product.imageUrl}
                      alt={language === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name}
                      category={item.product.category}
                      barcode={item.product.barcode}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span>{item.product.brand}</span>
                      <span>•</span>
                      <span>{formatDate(item.scannedAt)}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm truncate">
                      {language === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {item.product.evaluation.scoreOutOf100 !== null ? (
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                          style={{ backgroundColor: item.product.evaluation.color }}
                        >
                          {item.product.evaluation.scoreOutOf100}/100
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                          Données insuffisantes
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">#{item.barcode}</span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Favorites List */}
      {activeView === 'favorites' && (
        <>
          {favoriteItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/90 p-6">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base mb-1">{t.emptyFavorites}</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {language === 'ar'
                  ? 'اضغط على رمز القلب في بطاقة أي منتج لحفظه في مفضلتك للرجوع إليه أثناء التسوق.'
                  : 'Appuyez sur le cœur d’une fiche produit pour la retrouver rapidement lors de vos courses.'}
              </p>
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
              >
                <span>{t.scanProductBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {favoriteItems.map((prod) => (
                <div
                  key={prod.barcode}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all flex items-center gap-3.5 group"
                >
                  <div 
                    onClick={() => onSelectProduct(prod)}
                    className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden cursor-pointer"
                  >
                    <ProductImage
                      src={prod.imageUrl}
                      alt={language === 'ar' && prod.nameAr ? prod.nameAr : prod.name}
                      category={prod.category}
                      barcode={prod.barcode}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div 
                    onClick={() => onSelectProduct(prod)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-emerald-700 block truncate">
                      {prod.brand}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm truncate">
                      {language === 'ar' && prod.nameAr ? prod.nameAr : prod.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {prod.evaluation.scoreOutOf100 !== null && (
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                          style={{ backgroundColor: prod.evaluation.color }}
                        >
                          {prod.evaluation.scoreOutOf100}/100
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">#{prod.barcode}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(prod)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors shrink-0"
                    title={t.removedFromFavorites}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
