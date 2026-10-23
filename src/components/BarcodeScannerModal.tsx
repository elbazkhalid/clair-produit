import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Language } from '../types/product';
import { translations } from '../i18n/translations';
import { X, Flashlight, Camera, Keyboard, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOROCCAN_AND_POPULAR_PRODUCTS } from '../data/moroccanProducts';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBarcodeDetected: (barcode: string) => void;
  language: Language;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onBarcodeDetected,
  language
}) => {
  const t = translations[language];
  const [manualCode, setManualCode] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [hasTorchCapability, setHasTorchCapability] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const readerElementId = 'clairproduit-barcode-scanner-view';

  // Play scanner beep with Web Audio API
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // 880Hz pleasant high beep
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // Audio not allowed or unavailable
    }
  };

  const handleSuccessfulScan = (code: string) => {
    const clean = code.trim();
    if (!clean) return;
    playBeep();
    stopScanner();
    onBarcodeDetected(clean);
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn('Error stopping scanner:', err);
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      return;
    }

    let isMounted = true;
    setCameraError(null);

    const startScanner = async () => {
      // Small timeout to allow DOM element to be in document
      await new Promise(r => setTimeout(r, 150));
      if (!isMounted) return;

      const element = document.getElementById(readerElementId);
      if (!element) return;

      try {
        const html5QrCode = new Html5Qrcode(readerElementId, {
          formatsToSupport: [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.QR_CODE
          ],
          verbose: false
        });
        html5QrCodeRef.current = html5QrCode;

        const config = {
          fps: 15,
          qrbox: { width: 280, height: 180 },
          aspectRatio: 1.333
        };

        await html5QrCode.start(
          { facingMode: 'environment' },
          config,
          (decodedText) => {
            if (isMounted) {
              handleSuccessfulScan(decodedText);
            }
          },
          () => {
            // Frame analysis error (normal while scanning empty space)
          }
        );

        if (isMounted) {
          setIsScanning(true);
          // Check for torch capability
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const track = (html5QrCode as any).getRunningTrackCameraCapabilities?.();
            if (track?.torchFeature?.()?.isSupported?.()) {
              setHasTorchCapability(true);
            }
          } catch {
            // torch unsupported
          }
        }
      } catch (err: unknown) {
        console.warn('Camera start error:', err);
        if (isMounted) {
          setCameraError(t.scannerPermissionDenied);
          setIsScanning(false);
        }
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      stopScanner();
    };
  }, [isOpen]);

  const toggleTorch = async () => {
    if (!html5QrCodeRef.current) return;
    try {
      const nextTorch = !torchOn;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (html5QrCodeRef.current as any).applyVideoConstraints({
        advanced: [{ torch: nextTorch }]
      });
      setTorchOn(nextTorch);
    } catch (e) {
      console.warn('Torch toggle not supported', e);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleSuccessfulScan(manualCode.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[92vh]">
        
        {/* Top bar */}
        <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{t.scannerTitle}</h3>
              <p className="text-xs text-slate-400">{t.scannerInstructions}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Camera Scanner Viewport */}
        <div className="relative w-full bg-black min-h-[260px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
          <div id={readerElementId} className="w-full h-full max-h-[340px]" />

          {/* Viewfinder Target Graphic */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-[280px] h-[180px] border-2 border-emerald-400/90 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
              
              {/* Animated Red Laser Line */}
              <div className="absolute left-2 right-2 h-[2.5px] bg-red-500 shadow-[0_0_10px_#ef4444] animate-scan-laser rounded-full" />
            </div>
          </div>

          {/* Camera Permission Error Notice */}
          {cameraError && (
            <div className="absolute inset-0 bg-slate-900/95 p-6 flex flex-col items-center justify-center text-center">
              <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
              <h4 className="font-bold text-white text-base mb-1">{t.scannerPermissionDenied}</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                {language === 'ar' 
                  ? 'يمكنك تجربة إدخال الباركود يدوياً بالأسفل أو اختيار منتج من القائمة التجريبية.'
                  : 'Vous pouvez tester en sélectionnant un produit ou en saisissant les chiffres du code.'}
              </p>
            </div>
          )}

          {/* Flash Toggle */}
          {hasTorchCapability && (
            <button
              onClick={toggleTorch}
              className={`absolute top-4 right-4 p-2.5 rounded-full transition-all ${
                torchOn ? 'bg-amber-400 text-slate-900 shadow-lg' : 'bg-black/60 text-white backdrop-blur-md'
              }`}
              title={t.flashToggle}
            >
              <Flashlight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Manual Barcode Entry */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder={t.enterBarcode}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={!manualCode.trim()}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all shadow-md active:scale-95"
            >
              {t.validateBarcode}
            </button>
          </form>

          {/* Demo quick barcodes to test */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.tryDemoBarcodes} :</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {MOROCCAN_AND_POPULAR_PRODUCTS.map((prod) => (
                <button
                  key={prod.barcode}
                  onClick={() => handleSuccessfulScan(prod.barcode)}
                  className="text-xs bg-slate-800 hover:bg-emerald-950/60 hover:border-emerald-500/50 border border-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-left"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-medium truncate max-w-[140px]">{language === 'ar' && prod.nameAr ? prod.nameAr : prod.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({prod.barcode.slice(-4)})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
