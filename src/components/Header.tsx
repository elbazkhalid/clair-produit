import React from 'react';
import { Language } from '../types/product';
import { translations } from '../i18n/translations';
import { Scan, BookOpen, Globe2 } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenScanner: () => void;
  onOpenGuide: () => void;
  activeTab: 'home' | 'history' | 'favorites';
  onSelectTab: (tab: 'home' | 'history' | 'favorites') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenScanner,
  onOpenGuide,
  activeTab,
  onSelectTab
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Scan className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Clair<span className="text-emerald-600">Produit</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {language === 'ar' ? 'فاحص الجودة والباركود العالمي' : 'Vérificateur international de composition'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Scanner Action Button */}
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-3.5 py-2 rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            title={t.scan}
          >
            <Scan className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">{t.scan}</span>
          </button>

          {/* Guide Button */}
          <button
            onClick={onOpenGuide}
            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
            title={t.guide}
          >
            <BookOpen className="w-5 h-5" />
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                language === 'fr'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                language === 'ar'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              عربي
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-1.5 flex items-center justify-around text-xs font-medium text-slate-600 sm:hidden">
        <button
          onClick={() => onSelectTab('home')}
          className={`py-1 px-3 rounded-lg ${activeTab === 'home' ? 'bg-emerald-100 text-emerald-800 font-bold' : ''}`}
        >
          {t.home}
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`py-1 px-3 rounded-lg ${activeTab === 'history' ? 'bg-emerald-100 text-emerald-800 font-bold' : ''}`}
        >
          {t.history}
        </button>
        <button
          onClick={() => onSelectTab('favorites')}
          className={`py-1 px-3 rounded-lg ${activeTab === 'favorites' ? 'bg-emerald-100 text-emerald-800 font-bold' : ''}`}
        >
          {t.favorites}
        </button>
      </div>
    </header>
  );
};
