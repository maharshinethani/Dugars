'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/lib/types';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { toast } from 'sonner';
import { GalleryImagePicker } from '@/components/gallery-image-picker';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name_en: '', name_ar: '', slug: '', description_en: '', description_ar: '', image_url: '', display_order: '0', is_published: true });

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
    setCategories((data as Category[]) || []);
    setLoading(false);
  }

  function startEdit(cat: Category) {
    setEditing(cat);
    setForm({ name_en: cat.name_en, name_ar: cat.name_ar || '', slug: cat.slug, description_en: cat.description_en || '', description_ar: cat.description_ar || '', image_url: cat.image_url || '', display_order: String(cat.display_order), is_published: cat.is_published });
    setShowForm(true);
  }

  function startNew() {
    setEditing(null);
    setForm({ name_en: '', name_ar: '', slug: '', description_en: '', description_ar: '', image_url: '', display_order: '0', is_published: true });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name_en || !form.slug) { toast.error('Name and slug required'); return; }
    try {
      if (editing) {
        const { error } = await supabase.from('categories').update({
          name_en: form.name_en, name_ar: form.name_ar || null, slug: form.slug,
          description_en: form.description_en || null, description_ar: form.description_ar || null,
          image_url: form.image_url || null, display_order: parseInt(form.display_order) || 0, is_published: form.is_published,
        }).eq('id', editing.id);
        if (error) throw error;
        toast.success('Category updated');
      } else {
        const { error } = await supabase.from('categories').insert({
          name_en: form.name_en, name_ar: form.name_ar || null, slug: form.slug,
          description_en: form.description_en || null, description_ar: form.description_ar || null,
          image_url: form.image_url || null, display_order: parseInt(form.display_order) || 0, is_published: form.is_published,
        });
        if (error) throw error;
        toast.success('Category created');
      }
      setShowForm(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.message || 'Failed');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this category?')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) { toast.error('Failed'); return; }
    toast.success('Deleted');
    fetchCategories();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-heading">Categories</h1>
        <button onClick={startNew} className="flex items-center gap-2 bg-gold px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-soft-black hover:bg-gold-light">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square animate-pulse bg-muted" />)}</div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.id} className="group border border-border/10 bg-card p-4">
              <div className="relative aspect-square overflow-hidden bg-muted">
                {cat.image_url && <img src={cat.image_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <h3 className="mt-3 text-sm font-medium text-heading">{cat.name_en}</h3>
              <p className="text-xs text-secondary-text/70">{cat.slug}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => startEdit(cat)} className="flex h-8 w-8 items-center justify-center border border-border/15 text-secondary-text/70 hover:border-gold hover:text-gold"><Edit className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(cat.id)} className="flex h-8 w-8 items-center justify-center border border-border/15 text-secondary-text/70 hover:border-red-300 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-soft-black/60 p-4" onClick={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-heading">{editing ? 'Edit Category' : 'New Category'}</h2>
              <button type="button" onClick={() => setShowForm(false)}><X className="h-5 w-5 text-secondary-text/70" /></button>
            </div>
            <AdminField label="Name (English) *" value={form.name_en} onChange={(v) => setForm({ ...form, name_en: v })} />
            <AdminField label="Name (Arabic)" value={form.name_ar} onChange={(v) => setForm({ ...form, name_ar: v })} />
            <AdminField label="Slug *" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
            <AdminField label="Description (English)" value={form.description_en} onChange={(v) => setForm({ ...form, description_en: v })} textarea />
            <AdminField label="Description (Arabic)" value={form.description_ar} onChange={(v) => setForm({ ...form, description_ar: v })} textarea />
            <div className="sm:col-span-2">
              <GalleryImagePicker label="Category Image" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v || '' })} category="categories" />
            </div>
            <AdminField label="Display Order" value={form.display_order} onChange={(v) => setForm({ ...form, display_order: v })} type="number" />
            <label className="flex items-center gap-2 text-xs text-heading"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="accent-gold" /> Published</label>
            <button type="submit" className="w-full bg-gold py-3 text-xs font-medium uppercase tracking-wider text-soft-black">{editing ? 'Save' : 'Create'}</button>
          </form>
        </div>
      )}
    </div>
  );
}

function AdminField({ label, value, onChange, type = 'text', textarea }: { label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="label-luxury mb-1.5 block text-secondary-text/70">{label}</label>
      {textarea ? <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-border/15 px-3 py-2 text-sm outline-none focus:border-gold" /> : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-border/15 px-3 py-2 text-sm outline-none focus:border-gold" />}
    </div>
  );
}
