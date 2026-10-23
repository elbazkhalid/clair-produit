import React, { useState } from 'react';
import { Language } from '../types/product';
import { translations } from '../i18n/translations';
import { 
  X, Check, Copy, ExternalLink, HelpCircle, Shield, 
  Smartphone, Sparkles, AlertCircle, ArrowRight, Download, UploadCloud, FileText
} from 'lucide-react';

interface PlayStoreBeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PlayStoreBeginnerGuideModal: React.FC<PlayStoreBeginnerGuideModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'beginner' | 'playstore_form' | 'privacy'>('beginner');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://votre-app.run.app';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const textsFr = {
    shortDesc: "Scannez vos aliments et cosmétiques pour connaître leur composition, Nutri-Score et additifs.",
    longDesc: `ClairProduit est votre compagnon citoyen indépendant pour faire les bons choix au supermarché et au quotidien à l'international.

FONCTIONNALITÉS PRINCIPALES :
• Scanner de code-barres ultra-rapide avec la caméra de votre smartphone.
• Analyse des Aliments et Boissons : Nutri-Score officiel (A à E), degré de transformation industrielle NOVA (1 à 4), sucres, graisses saturées et sel.
• Analyse Cosmétiques & Hygiène : détection des perturbateurs endocriniens, parabènes, sulfates, silicones et valorisation des actifs naturels (huile d'argan, karité, aloe vera).
• Vigilance Ingrédients & Traçabilité : alerte gélatine porcine, alcool et colorant rouge E120 (carmin d'insectes).
• Historique des scans et favoris accessibles hors-connexion.
• 100% Gratuit, sans publicité intrusive et sans abonnement.

Les données proviennent des bases collaboratives et ouvertes Open Food Facts et Open Beauty Facts sous licence libre ODbL.`,
    privacyText: `Politique de Confidentialité de ClairProduit

1. Données Personnelles : L'application ClairProduit ne collecte, ne vend et ne partage aucune donnée personnelle identifiant l'utilisateur.
2. Caméra : L'autorisation d'accès à la caméra est utilisée exclusivement et localement pour lire les codes-barres des produits. Aucune image ni flux vidéo n'est enregistré ni téléversé vers des serveurs tiers.
3. Données de produits : Les requêtes de code-barres interrogent les bases publiques libres Open Food Facts et Open Beauty Facts.
4. Stockage local : Vos produits favoris et l'historique de vos scans sont stockés uniquement sur la mémoire de votre appareil.
Contact : contact@clairproduit.ma`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Guide Débutant : Déployer sur Google Play sans coder
              </h3>
              <p className="text-xs text-slate-500">
                La méthode la plus simple au monde (PWABuilder & Google TWA officiel)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-2 flex gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('beginner')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'beginner'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Méthodes Simples (Sans coder)
          </button>
          <button
            onClick={() => setActiveTab('playstore_form')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'playstore_form'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Textes prêts pour Google Play
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'privacy'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. Politique de confidentialité
          </button>
        </div>

        {/* Body content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {activeTab === 'beginner' && (
            <div className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm mb-1">Pas besoin d'être informaticien : voici les alternatives simples</h4>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Si PWABuilder vous demande des clés ou certificats complexes, il existe <strong>deux solutions beaucoup plus simples</strong> pour obtenir votre fichier <code>.aab</code> pour Google Play sans blocage technique.
                  </p>
                </div>
              </div>

              {/* Solution A: AppsGeyser / Web2App Converter */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  A
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">Solution 1 (La plus facile) : Convertisseur 1-Clic</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Recommandé</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Des sites comme <strong>AppsGeyser</strong> ou <strong>AppMySite</strong> ne vous demandent <em>aucune</em> information technique. Ils créent le fichier <code>.aab</code> automatiquement :
                  </p>
                  <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1">
                    <li>Copiez l'adresse de votre application ci-dessous :</li>
                  </ol>
                  <div className="flex items-center gap-2">
                    <input 
                      readOnly 
                      value={currentUrl} 
                      className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 flex-1 truncate"
                    />
                    <button
                      onClick={() => copyToClipboard(currentUrl, 'app_url')}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      {copiedKey === 'app_url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'app_url' ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>
                  <ol start={2} className="list-decimal list-inside text-xs text-slate-600 space-y-1 pt-1">
                    <li>Rendez-vous sur <strong>appsgeyser.com</strong> (ou web2application.com).</li>
                    <li>Sélectionnez le modèle <strong>« Website »</strong> et collez votre URL.</li>
                    <li>Donnez le nom <strong>ClairProduit</strong>.</li>
                    <li>Cliquez sur <strong>Télécharger le fichier AAB pour Google Play</strong>. La clé de signature est créée automatiquement pour vous !</li>
                  </ol>
                  <a
                    href="https://appsgeyser.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl mt-1"
                  >
                    <span>Ouvrir AppsGeyser.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Solution B: Android Studio Native */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  B
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Solution 2 (100% Officiel Google) : Android Studio en 3 clics</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tout le code Kotlin et Jetpack Compose est déjà prêt dans l'application (onglet <strong>Code Kotlin</strong>). Vous n'avez pas besoin de programmer :
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    <li>Installez <strong>Android Studio</strong> (gratuit).</li>
                    <li>Créez un projet vierge et collez les fichiers du dossier Code Kotlin.</li>
                    <li>Dans le menu du haut, cliquez sur <strong>Build</strong> &gt; <strong>Generate Signed Bundle / APK</strong>.</li>
                    <li>Sélectionnez <strong>Android App Bundle (.aab)</strong> et choisissez un mot de passe simple.</li>
                    <li>Android Studio génère votre fichier <code>app-release.aab</code> sur votre ordinateur !</li>
                  </ul>
                </div>
              </div>

              {/* Solution C: Délégation à petit prix */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  C
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Solution 3 (Zéro effort) : Déléguer la génération (10 à 15 €)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sur des plateformes francophones comme <strong>ComeUp.com</strong> (ex-5euros) ou <strong>Fiverr</strong>, des spécialistes convertissent votre site web en fichier AAB prêt pour Google Play et vous le livrent en 24h pour environ 10 à 15 €. Vous n'avez qu'à leur transmettre l'adresse web de ClairProduit.
                  </p>
                </div>
              </div>

              {/* Alternative Immediate Install */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
                <h4 className="font-bold text-xs flex items-center gap-1.5 mb-1 text-amber-900">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>Vous voulez tester l'application sur votre téléphone immédiatement ?</span>
                </h4>
                <p className="text-xs text-amber-800">
                  Ouvrez ce lien sur votre téléphone avec le navigateur <strong>Google Chrome</strong>, cliquez sur les <strong>3 petits points</strong> en haut à droite, puis sur <strong>« Installer l'application »</strong>. L'application s'installera comme une vraie application sur votre écran d'accueil avec son icône et la caméra activée !
                </p>
              </div>

            </div>
          )}

          {activeTab === 'playstore_form' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Google Play vous demande un titre, une description courte et une description complète. Vous pouvez copier-coller ces textes validés directement :
              </p>

              {/* Nom de l'app */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Nom de l'application (Max 30 caractères)</span>
                  <button
                    onClick={() => copyToClipboard('ClairProduit - Scanner Produits', 'app_title')}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'app_title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'app_title' ? 'Copié' : 'Copier'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
                  ClairProduit - Scanner Produits
                </div>
              </div>

              {/* Brève description */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Description courte (Max 80 caractères)</span>
                  <button
                    onClick={() => copyToClipboard(textsFr.shortDesc, 'short_desc')}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'short_desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'short_desc' ? 'Copié' : 'Copier'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs bg-white p-2 rounded-lg border border-slate-200 text-slate-800">
                  {textsFr.shortDesc}
                </div>
              </div>

              {/* Description complète */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Description complète (Google Play Store)</span>
                  <button
                    onClick={() => copyToClipboard(textsFr.longDesc, 'long_desc')}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'long_desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'long_desc' ? 'Copié' : 'Copier le texte'}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={8}
                  value={textsFr.longDesc}
                  className="w-full text-xs font-mono bg-white p-3 rounded-lg border border-slate-200 text-slate-800 resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm mb-1">Obligation légale de Google Play</h4>
                  <p className="text-xs text-blue-900">
                    Google exige un lien vers une politique de confidentialité expliquant pourquoi l'application utilise la caméra (pour scanner le code-barres). Voici un modèle rédigé spécifiquement pour ClairProduit :
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Texte de politique de confidentialité prêt à l'emploi</span>
                  <button
                    onClick={() => copyToClipboard(textsFr.privacyText, 'privacy_text')}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'privacy_text' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'privacy_text' ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={9}
                  value={textsFr.privacyText}
                  className="w-full text-xs font-mono bg-white p-3 rounded-lg border border-slate-200 text-slate-800 resize-none"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Besoin d'aide ? Vous pouvez aussi tester l'application directement depuis ce navigateur.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            J'ai compris
          </button>
        </div>

      </div>
    </div>
  );
};
