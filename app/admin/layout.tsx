'use client';

import { AdminAuthProvider, useAdminAuth } from '@/lib/admin-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, FolderTree, Layers, CalendarDays, Mail, Settings, LogOut, Home, Megaphone, Globe } from 'lucide-react';

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/collections', label: 'Collections', icon: Layers },
  { href: '/admin/currencies', label: 'Currencies', icon: Globe },
  { href: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [loading, user, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="font-serif text-2xl tracking-[0.3em] text-gold">DUGARS</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/30 lg:flex">
      {/* Sidebar */}
      <aside className="hidden w-60 flex-shrink-0 bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-6">
          <Link href="/admin" className="font-serif text-xl font-light tracking-[0.3em] text-body">
            DUGARS
          </Link>
        </div>
        <div className="h-px bg-card/10" />
        <nav className="flex-1 space-y-1 p-3">
          {adminNav.map((item) => {
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-medium transition-colors ${
                  isActive ? 'bg-gold/10 text-gold' : 'text-secondary-text/85 hover:bg-card/5 hover:text-body'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/10 p-3">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-xs text-secondary-text/85 hover:text-body">
            <Home className="h-4 w-4" /> View Website
          </Link>
          <button onClick={signOut} className="flex w-full items-center gap-3 px-3 py-2.5 text-xs text-secondary-text/85 hover:text-body">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex h-14 items-center justify-between bg-background px-4 lg:hidden">
        <span className="font-serif text-lg tracking-[0.3em] text-body">DUGARS</span>
        <div className="flex gap-3">
          <Link href="/" className="text-secondary-text/85"><Home className="h-4 w-4" /></Link>
          <button onClick={signOut} className="text-secondary-text/85"><LogOut className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex gap-1 overflow-x-auto bg-card px-2 py-2 lg:hidden">
        {adminNav.map((item) => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-shrink-0 items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider ${
                isActive ? 'bg-gold text-soft-black' : 'text-secondary-text/85'
              }`}
            >
              <item.icon className="h-3 w-3" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
