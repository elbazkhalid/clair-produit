import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types/product';
import { Smartphone, Download, X, CheckCircle2, Share, ArrowRight, Sparkles } from 'lucide-react';

interface InstallAppBannerProps {
  language: Language;
}

export const InstallAppBanner: React.FC<InstallAppBannerProps> = ({ language }) => {
  const { isInstallable, isInstalled, isAndroid, isIOS, shouldShowPrompt, install, dismiss } = usePWAInstall();
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already installed in standalone mode or dismissed, don't show
  if (!shouldShowPrompt || isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    setIsInstalling(true);
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowManualGuide(true);
      }
    } else {
      // If browser hasn't fired beforeinstallprompt yet or WebKit, show visual 1-2-3 guide
      setShowManualGuide(true);
    }
    setIsInstalling(false);
  };

  return (
    <>
      {/* Floating Bottom Install Banner */}
      <div className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in slide-in-from-bottom-5 duration-300">
        <div className="bg-slate-900/95 text-white backdrop-blur-md p-4 sm:p-4.5 rounded-2xl shadow-2xl border border-emerald-500/30 flex flex-col gap-3">
          
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 shrink-0">
                <Smartphone className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-white truncate">
                    {language === 'ar' ? 'تثبيت التطبيق على أندرويد' : 'Installer sur votre Android'}
                  </h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase shrink-0">
                    Gratuit
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-snug mt-0.5 line-clamp-2">
                  {language === 'ar'
                    ? 'احصل على ماسح باركود فوري وسريع على شاشة هاتفك الرئيسية وبدون إنترنت.'
                    : 'Scannez vos produits en 1 seconde depuis votre écran d’accueil, même hors-ligne.'}
                </p>
              </div>
            </div>

            <button
              onClick={dismiss}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              title={language === 'ar' ? 'إغلاق' : 'Plus tard'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleInstallClick}
              disabled={isInstalling}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>
                {language === 'ar' ? 'تثبيت التطبيق الآن' : 'Installer l’application'}
              </span>
            </button>

            <button
              onClick={dismiss}
              className="px-3 py-2.5 text-xs text-slate-400 hover:text-slate-200 font-semibold rounded-xl hover:bg-slate-800 transition-colors"
            >
              {language === 'ar' ? 'لاحقاً' : 'Plus tard'}
            </button>
          </div>

          {/* Direct APK fallback note */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            <span>{language === 'ar' ? 'أو حمّل ملف APK مباشرة :' : 'Ou installation directe APK :'}</span>
            <a
              href="/clairproduit.apk"
              download="clairproduit.apk"
              className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>Télécharger le .APK (13 Ko)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Manual Installation Guided Modal */}
      {showManualGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <button
                onClick={() => setShowManualGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {isIOS 
                  ? (language === 'ar' ? 'تثبيت على آيفون (iPhone)' : 'Installer sur iPhone / Safari')
                  : (language === 'ar' ? 'تثبيت على هاتف أندرويد' : 'Installer sur Chrome Android')}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {language === 'ar'
                  ? 'اتبع هذه الخطوات البسيطة لإضافة التطبيق لشاشة هاتفك فوراً :'
                  : 'Ajoutez ClairProduit sur votre écran d’accueil en 2 secondes :'}
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700">
              {isIOS ? (
                <>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                    <span>Touchez le bouton <strong>Partager</strong> en bas de Safari.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                    <span>Faites défiler et touchez <strong>« Sur l'écran d'accueil »</strong>.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                    <span>Touchez le menu <strong>(3 petits points)</strong> en haut à droite de Google Chrome.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                    <span>Appuyez sur <strong>« Installer l’application »</strong> (ou « Ajouter à l’écran d’accueil »).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                    <span>L'icône ClairProduit apparaît sur votre bureau Android !</span>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/clairproduit.apk"
                download="clairproduit.apk"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Télécharger directement le fichier .APK</span>
              </a>

              <button
                onClick={() => setShowManualGuide(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                {language === 'ar' ? 'فهمت' : 'J’ai compris'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
