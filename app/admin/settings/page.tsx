'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminAuth } from '@/lib/admin-auth';
import { toast } from 'sonner';
import { Save, Lock, Eye, EyeOff, User } from 'lucide-react';
import type { WebsiteSettings } from '@/lib/types';
import { GalleryImagePicker } from '@/components/gallery-image-picker';

export default function AdminSettingsPage() {
  const { user, updatePassword } = useAdminAuth();
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data } = await supabase
      .from('website_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (data) setSettings(data as WebsiteSettings);
    setLoading(false);
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase
      .from('website_settings')
      .update({
        brand_name: settings.brand_name,
        whatsapp_number: settings.whatsapp_number,
        phone: settings.phone,
        email: settings.email,
        address_en: settings.address_en,
        address_ar: settings.address_ar,
        instagram: settings.instagram,
        facebook: settings.facebook,
        pinterest: settings.pinterest,
        youtube: settings.youtube,
        google_maps_url: settings.google_maps_url,
        currency: settings.currency,
        default_language: settings.default_language,
        announcement_bar_enabled: settings.announcement_bar_enabled,
        logo_url: settings.logo_url,
        favicon_url: settings.favicon_url,
      })
      .eq('id', 1);
    setSaving(false);
    if (error) {
      toast.error('Failed to save settings');
    } else {
      toast.success('Settings saved successfully');
    }
  }

  async function handleChangePassword() {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setChangingPassword(true);
    const { error } = await updatePassword(newPassword);
    setChangingPassword(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  function update<K extends keyof WebsiteSettings>(key: K, value: WebsiteSettings[K]) {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  }

  if (loading) {
    return (
      <div>
        <h1 className="font-serif text-2xl text-heading">Settings</h1>
        <div className="mt-6 space-y-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-14 animate-pulse bg-muted" />)}</div>
      </div>
    );
  }

  const inputClass = 'w-full border border-border/15 bg-card px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-gold';
  const labelClass = 'mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-secondary-text/70';

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-2xl text-heading">Settings</h1>

      {/* Website Settings */}
      <section className="mt-8 border border-border/10 bg-card p-6">
        <h2 className="font-serif text-lg text-heading">Website Information</h2>
        <p className="mt-1 text-xs text-secondary-text/70">Configure your store contact details, social links, and currency.</p>

        <div className="mt-6 space-y-5">
          <div>
            <label className={labelClass}>Brand Name</label>
            <input className={inputClass} value={settings?.brand_name || ''} onChange={(e) => update('brand_name', e.target.value)} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <GalleryImagePicker label="Logo" value={settings?.logo_url || null} onChange={(v) => update('logo_url', (v as string) || null)} category="logos" />
            <GalleryImagePicker label="Favicon" value={settings?.favicon_url || null} onChange={(v) => update('favicon_url', (v as string) || null)} category="logos" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input className={inputClass} placeholder="e.g. 971501234567" value={settings?.whatsapp_number || ''} onChange={(e) => update('whatsapp_number', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input className={inputClass} value={settings?.phone || ''} onChange={(e) => update('phone', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" value={settings?.email || ''} onChange={(e) => update('email', e.target.value)} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Address (English)</label>
              <input className={inputClass} value={settings?.address_en || ''} onChange={(e) => update('address_en', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Address (Arabic)</label>
              <input className={inputClass} dir="rtl" value={settings?.address_ar || ''} onChange={(e) => update('address_ar', e.target.value)} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input className={inputClass} value={settings?.instagram || ''} onChange={(e) => update('instagram', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Facebook URL</label>
              <input className={inputClass} value={settings?.facebook || ''} onChange={(e) => update('facebook', e.target.value)} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Pinterest URL</label>
              <input className={inputClass} value={settings?.pinterest || ''} onChange={(e) => update('pinterest', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>YouTube URL</label>
              <input className={inputClass} value={settings?.youtube || ''} onChange={(e) => update('youtube', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Google Maps URL</label>
            <input className={inputClass} value={settings?.google_maps_url || ''} onChange={(e) => update('google_maps_url', e.target.value)} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Currency</label>
              <select className={inputClass} value={settings?.currency || 'USD'} onChange={(e) => update('currency', e.target.value)}>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Default Language</label>
              <select className={inputClass} value={settings?.default_language || 'en'} onChange={(e) => update('default_language', e.target.value)}>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-card px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-body transition-colors hover:bg-soft-black/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </section>

      {/* Announcement Bar */}
      <section className="mt-6 border border-border/10 bg-card p-6">
        <h2 className="font-serif text-lg text-heading">Announcement Bar</h2>
        <p className="mt-1 text-xs text-secondary-text/70">Show or hide the announcement strip above the website navigation.</p>
        <label className="mt-5 flex items-center gap-3 text-sm text-heading">
          <input type="checkbox" checked={settings?.announcement_bar_enabled ?? true} onChange={(e) => update('announcement_bar_enabled', e.target.checked)} className="h-4 w-4 accent-gold" />
          Show announcement bar
        </label>
      </section>

      {/* Admin Profile */}
      <section className="mt-6 border border-border/10 bg-card p-6">
        <h2 className="flex items-center gap-2 font-serif text-lg text-heading">
          <User className="h-5 w-5" /> Admin Profile
        </h2>
        <div className="mt-4 rounded-sm bg-muted/50 p-4">
          <p className="text-xs text-secondary-text/70">Signed in as</p>
          <p className="mt-1 text-sm font-medium text-heading">{user?.email}</p>
        </div>
      </section>

      {/* Change Password */}
      <section className="mt-6 border border-border/10 bg-card p-6">
        <h2 className="flex items-center gap-2 font-serif text-lg text-heading">
          <Lock className="h-5 w-5" /> Change Password
        </h2>
        <p className="mt-1 text-xs text-secondary-text/70">Update your admin account password.</p>

        <div className="mt-6 space-y-5">
          <div>
            <label className={labelClass}>New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={inputClass}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-secondary-text/70 hover:text-heading"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>Confirm New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={inputClass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          <button
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="flex items-center gap-2 border border-gold/40 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-soft-black disabled:opacity-50"
          >
            <Lock className="h-4 w-4" />
            {changingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </section>
    </div>
  );
}
