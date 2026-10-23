import React, { useState } from 'react';
import { ANDROID_PROJECT_FILES, AndroidFile } from '../data/androidSourceCode';
import { Language } from '../types/product';
import { translations } from '../i18n/translations';
import { X, Smartphone, Copy, Check, Terminal, ExternalLink, Play, Layers } from 'lucide-react';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(ANDROID_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-slate-900 text-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                {t.androidTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Kotlin • Jetpack Compose • CameraX • ML Kit • Retrofit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions banner */}
        <div className="px-5 py-3.5 bg-emerald-950/40 border-b border-emerald-900/40 text-xs text-emerald-200">
          <p className="font-bold text-emerald-300 mb-1">{t.downloadInstructions} :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-emerald-100/80">
            <div>{t.step1}</div>
            <div>{t.step2}</div>
            <div>{t.step3}</div>
            <div>{t.step4}</div>
            <div className="sm:col-span-2 font-semibold text-emerald-300">{t.step5}</div>
          </div>
        </div>

        {/* Code Explorer Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[420px]">
          
          {/* File sidebar tabs */}
          <div className="w-full md:w-64 bg-slate-950/60 border-r border-slate-800 p-2.5 space-y-1 overflow-y-auto shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1 block">
              Fichiers sources Android
            </span>
            {ANDROID_PROJECT_FILES.map((file) => (
              <button
                key={file.filename}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                  selectedFile.filename === file.filename
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="truncate">
                  <span className="block truncate">{file.filename}</span>
                  <span className="text-[10px] opacity-75 font-sans block truncate">{file.description}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">{selectedFile.path}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.codeCopied : t.copyCode}</span>
              </button>
            </div>

            <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-emerald-400/95 leading-relaxed selection:bg-emerald-800 selection:text-white">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
