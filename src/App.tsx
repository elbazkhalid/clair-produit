/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProductData, Language, ProductCategory, ScanHistoryItem } from './types/product';
import { translations } from './i18n/translations';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HistoryAndFavorites } from './components/HistoryAndFavorites';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { EvaluationGuideModal } from './components/EvaluationGuideModal';
import { fetchProductByBarcode, searchProducts } from './services/openFoodFacts';
import { 
  getStoredLanguage, saveStoredLanguage, 
  getScanHistory, saveToHistory, clearHistory, 
  getFavorites, toggleFavorite, isProductFavorite 
} from './services/storage';
import { 
  Scan, Home, History, Heart, Smartphone, BookOpen, AlertCircle, Loader2, CheckCircle2 
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'favorites'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  
  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAndroidCodeOpen, setIsAndroidCodeOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Selected Product & History & Favorites
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [historyItems, setHistoryItems] = useState<ScanHistoryItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<ProductData[]>([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const t = translations[language];

  // Sync RTL / LTR on documentElement
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    saveStoredLanguage(language);
  }, [language]);

  // Load storage on start
  useEffect(() => {
    setHistoryItems(getScanHistory());
    setFavoriteItems(getFavorites());
  }, []);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Barcode handler
  const handleBarcodeScanned = async (barcode: string) => {
    setIsScannerOpen(false);
    showToast(
      language === 'ar' ? `جاري البحث عن الباركود ${barcode}...` : `Recherche du produit #${barcode}...`,
      'info'
    );

    try {
      const product = await fetchProductByBarcode(barcode);
      if (product) {
        setSelectedProduct(product);
        setIsDetailOpen(true);
        const updatedHistory = saveToHistory(product);
        setHistoryItems(updatedHistory);
      } else {
        showToast(
          language === 'ar' 
            ? `المنتج رقم ${barcode} غير مسجل حتى الآن في قواعد البيانات` 
            : `Produit #${barcode} introuvable dans Open Food/Beauty Facts`,
          'error'
        );
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showToast(t.networkErrorDesc, 'error');
    }
  };

  // Search handler
  const handleSearch = async (query: string, category: ProductCategory) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchProducts(query, category);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      showToast(t.networkErrorDesc, 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectProduct = (product: ProductData) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleToggleFavorite = (product: ProductData) => {
    const isNowFav = toggleFavorite(product);
    setFavoriteItems(getFavorites());
    setHistoryItems(getScanHistory());
    showToast(
      isNowFav ? t.addedToFavorites : t.removedFromFavorites,
      isNowFav ? 'success' : 'info'
    );
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistoryItems([]);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className={`px-4 py-2.5 rounded-2xl shadow-xl border flex items-center gap-2 text-xs font-bold ${
            toastMessage.type === 'success'
              ? 'bg-emerald-800 text-white border-emerald-600'
              : toastMessage.type === 'error'
              ? 'bg-red-800 text-white border-red-600'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-300" />}
            {toastMessage.type === 'info' && <Loader2 className="w-4 h-4 text-teal-300 animate-spin" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main App Bar / Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAndroidCode={() => setIsAndroidCodeOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 sm:py-6">
        {activeTab === 'home' && (
          <HomeScreen
            language={language}
            onOpenScanner={() => setIsScannerOpen(true)}
            onSelectProduct={handleSelectProduct}
            onSearch={handleSearch}
            searchResults={searchResults}
            isSearching={isSearching}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {(activeTab === 'history' || activeTab === 'favorites') && (
          <HistoryAndFavorites
            language={language}
            activeView={activeTab}
            historyItems={historyItems}
            favoriteItems={favoriteItems}
            onSelectProduct={handleSelectProduct}
            onClearHistory={handleClearHistory}
            onRemoveFavorite={handleToggleFavorite}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Authentic Android Experience) */}
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] py-1.5 px-4">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* Home Tab */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[11px]">{t.home}</span>
          </button>

          {/* Central Floating Scanner Action */}
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex flex-col items-center -mt-6 group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <Scan className="w-6 h-6 stroke-[2.4]" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-800 mt-0.5">{t.scan}</span>
          </button>

          {/* History Tab */}
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'history' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-[11px]">{t.history}</span>
          </button>

          {/* Favorites Tab */}
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              activeTab === 'favorites' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className={`w-5 h-5 ${activeTab === 'favorites' ? 'fill-emerald-700' : ''}`} />
            <span className="text-[11px]">{t.favorites}</span>
          </button>

          {/* Android Code Project Button */}
          <button
            onClick={() => setIsAndroidCodeOpen(true)}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl text-slate-500 hover:text-emerald-700 transition-all"
            title={t.androidTitle}
          >
            <Smartphone className="w-5 h-5 text-emerald-600" />
            <span className="text-[11px]">Android</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onBarcodeDetected={handleBarcodeScanned}
        language={language}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        language={language}
        isFavorite={selectedProduct ? isProductFavorite(selectedProduct.barcode) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenGuide={() => {
          setIsDetailOpen(false);
          setIsGuideOpen(true);
        }}
      />

      <AndroidCodeModal
        isOpen={isAndroidCodeOpen}
        onClose={() => setIsAndroidCodeOpen(false)}
        language={language}
      />

      <EvaluationGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        language={language}
      />
    </div>
  );
}
