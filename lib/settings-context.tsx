'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { WebsiteSettings } from '@/lib/types';
import { siteConfig } from '@/lib/site-config';

interface SettingsContextValue {
  settings: WebsiteSettings | null;
  loading: boolean;
  whatsappNumber: string;
  refreshSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const defaultSettings: WebsiteSettings = {
  id: 1,
  brand_name: siteConfig.brand.name,
  logo_url: null,
  favicon_url: null,
  whatsapp_number: siteConfig.whatsappDefault,
  phone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address_en: siteConfig.contact.address.en,
  address_ar: siteConfig.contact.address.ar,
  instagram: siteConfig.social.instagram,
  facebook: siteConfig.social.facebook,
  pinterest: siteConfig.social.pinterest,
  youtube: siteConfig.social.youtube,
  google_maps_url: null,
  currency: siteConfig.currency,
  default_language: 'en',
  announcement_bar_enabled: true,
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setSettings(data as WebsiteSettings);
      } else {
        setSettings(defaultSettings);
      }
    } catch {
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const whatsappNumber = settings?.whatsapp_number || defaultSettings.whatsapp_number;

  return (
    <SettingsContext.Provider
      value={{ settings, loading, whatsappNumber, refreshSettings: fetchSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return ctx;
}
