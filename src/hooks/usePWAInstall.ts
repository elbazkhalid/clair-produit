import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Detect standalone mode (already installed on phone home screen)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    // 2. Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/.test(userAgent);
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsAndroid(isAndroidDevice);
    setIsIOS(isIOSDevice);

    // 3. Check dismiss state in sessionStorage/localStorage
    const dismissedUntil = localStorage.getItem('clairproduit_install_dismissed_at');
    if (dismissedUntil) {
      const dismissedTime = parseInt(dismissedUntil, 10);
      // Suppress for 2 days after user clicks "Plus tard"
      if (Date.now() - dismissedTime < 2 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }

    // 4. Capture native browser beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      localStorage.removeItem('clairproduit_install_dismissed_at');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    }
    return false;
  };

  const dismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('clairproduit_install_dismissed_at', Date.now().toString());
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isAndroid,
    isIOS,
    isDismissed,
    install,
    dismiss,
    // Show prompt if not already running in standalone mode and not dismissed
    shouldShowPrompt: !isInstalled && !isDismissed
  };
}
