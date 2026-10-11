'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Collection } from '@/lib/types';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { toast } from 'sonner';
import { GalleryImagePicker } from '@/components/gallery-image-picker';

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [form, setForm] = useState({ name_en: '', name_ar: '', slug: '', description_en: '', description_ar: '', hero_image_url: '', story_en: '', story_ar: '', display_order: '0', is_published: true });

  useEffect(() => { fetchCollections(); }, []);

  async function fetchCollections() {
    setLoading(true);
    const { data } = await supabase.from('collections').select('*').order('display_order', { ascending: true });
    setCollections((data as Collection[]) || []);
    setLoading(false);
  }

  function startEdit(col: Collection) {
    setEditing(col);
    setForm({ name_en: col.name_en, name_ar: col.name_ar || '', slug: col.slug, description_en: col.description_en || '', description_ar: col.description_ar || '', hero_image_url: col.hero_image_url || '', story_en: col.story_en || '', story_ar: col.story_ar || '', display_order: String(col.display_order), is_published: col.is_published });
    setShowForm(true);
  }

  function startNew() {
    setEditing(null);
    setForm({ name_en: '', name_ar: '', slug: '', description_en: '', description_ar: '', hero_image_url: '', story_en: '', story_ar: '', display_order: '0', is_published: true });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name_en || !form.slug) { toast.error('Name and slug required'); return; }
    try {
      const payload = {
        name_en: form.name_en, name_ar: form.name_ar || null, slug: form.slug,
        description_en: form.description_en || null, description_ar: form.description_ar || null,
        hero_image_url: form.hero_image_url || null, story_en: form.story_en || null, story_ar: form.story_ar || null,
        display_order: parseInt(form.display_order) || 0, is_published: form.is_published,
      };
      if (editing) {
        const { error } = await supabase.from('collections').update(payload).eq('id', editing.id);
        if (error) throw error;
        toast.success('Collection updated');
      } else {
        const { error } = await supabase.from('collections').insert(payload);
        if (error) throw error;
        toast.success('Collection created');
      }
      setShowForm(false);
      fetchCollections();
    } catch (err: any) {
      toast.error(err.message || 'Failed');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this collection?')) return;
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (error) { toast.error('Failed'); return; }
    toast.success('Deleted');
    fetchCollections();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-heading">Collections</h1>
        <button onClick={startNew} className="flex items-center gap-2 bg-gold px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-soft-black hover:bg-gold-light">
          <Plus className="h-4 w-4" /> Add Collection
        </button>
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 animate-pulse bg-muted" />)}</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {collections.map((col) => (
            <div key={col.id} className="flex gap-4 border border-border/10 bg-card p-4">
              <div className="h-20 w-28 flex-shrink-0 overflow-hidden bg-muted">
                {col.hero_image_url && <img src={col.hero_image_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="text-sm font-medium text-heading">{col.name_en}</h3>
                <p className="text-xs text-secondary-text/70">{col.slug}</p>
                <p className="mt-1 text-xs text-secondary-text/70 line-clamp-1">{col.description_en}</p>
                <div className="mt-auto flex gap-2 pt-2">
                  <button onClick={() => startEdit(col)} className="flex h-7 w-7 items-center justify-center border border-border/15 text-secondary-text/70 hover:border-gold hover:text-gold"><Edit className="h-3 w-3" /></button>
                  <button onClick={() => handleDelete(col.id)} className="flex h-7 w-7 items-center justify-center border border-border/15 text-secondary-text/70 hover:border-red-300 hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-soft-black/60 p-4" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-heading">{editing ? 'Edit Collection' : 'New Collection'}</h2>
              <button type="button" onClick={() => setShowForm(false)}><X className="h-5 w-5 text-secondary-text/70" /></button>
            </div>
            <AF label="Name (English) *" value={form.name_en} onChange={(v) => setForm({ ...form, name_en: v })} />
            <AF label="Name (Arabic)" value={form.name_ar} onChange={(v) => setForm({ ...form, name_ar: v })} />
            <AF label="Slug *" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
            <AF label="Description (English)" value={form.description_en} onChange={(v) => setForm({ ...form, description_en: v })} textarea />
            <AF label="Description (Arabic)" value={form.description_ar} onChange={(v) => setForm({ ...form, description_ar: v })} textarea />
            <AF label="Story (English)" value={form.story_en} onChange={(v) => setForm({ ...form, story_en: v })} textarea />
            <AF label="Story (Arabic)" value={form.story_ar} onChange={(v) => setForm({ ...form, story_ar: v })} textarea />
            <div className="sm:col-span-2">
              <GalleryImagePicker label="Hero Image" value={form.hero_image_url} onChange={(v) => setForm({ ...form, hero_image_url: v || '' })} category="collections" />
            </div>
            <AF label="Display Order" value={form.display_order} onChange={(v) => setForm({ ...form, display_order: v })} type="number" />
            <label className="flex items-center gap-2 text-xs text-heading"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-gold" /> Published</label>
            <button type="submit" className="w-full bg-gold py-3 text-xs font-medium uppercase tracking-wider text-soft-black">{editing ? 'Save' : 'Create'}</button>
          </form>
        </div>
      )}
    </div>
  );
}

function AF({ label, value, onChange, type = 'text', textarea }: { label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="label-luxury mb-1.5 block text-secondary-text/70">{label}</label>
      {textarea ? <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-border/15 px-3 py-2 text-sm outline-none focus:border-gold" /> : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-border/15 px-3 py-2 text-sm outline-none focus:border-gold" />}
    </div>
  );
}
