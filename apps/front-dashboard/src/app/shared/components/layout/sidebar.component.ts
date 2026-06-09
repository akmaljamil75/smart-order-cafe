import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../../core/services/layout.service';

interface NavLink {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside 
      class="fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shrink-0 h-full"
      [class.-translate-x-full]="!layoutService.isSidebarOpen()"
      [class.translate-x-0]="layoutService.isSidebarOpen()"
    >
      <div>
        <!-- Sidebar Header -->
        <div class="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
          <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-sm font-bold text-white tracking-wide uppercase truncate">Smart Order</h1>
            <p class="text-xs text-amber-500 font-medium truncate">Café Dashboard</p>
          </div>
        </div>

        <!-- Sidebar Nav Links -->
        <nav class="p-4 space-y-1">
          @for (link of navLinks(); track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="layoutService.closeSidebar()"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-450 hover:bg-slate-800 hover:text-white transition-all duration-200"
            >
              <span class="opacity-80 shrink-0" [innerHTML]="link.icon"></span>
              <span class="truncate">{{ link.label }}</span>
            </a>
          }
        </nav>
      </div>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-slate-800">
        <div class="bg-slate-800/40 rounded-xl p-3.5 flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-sm shrink-0">
            ☕
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold text-white truncate">Coffee Terminal 1</p>
            <p class="text-[10px] text-slate-500 font-medium truncate">Status: Operational</p>
          </div>
        </div>
      </div>
    </aside>
  `,
  host: {
    // Hidden entirely on mobile if not needed, but since it's absolute, it won't take space
    class: 'block h-full shrink-0'
  }
})
export class SidebarComponent {
  constructor(readonly layoutService: LayoutService) {}
  readonly navLinks = signal<NavLink[]>([
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>`
    },
    {
      label: 'Orders Queue',
      path: '/orders',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`
    },
    {
      label: 'Menu Catalog',
      path: '/menu',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.532.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>`
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
    }
  ]);
}
