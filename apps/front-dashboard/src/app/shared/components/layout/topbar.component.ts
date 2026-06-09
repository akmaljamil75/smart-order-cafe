import { Component, signal, computed } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  template: `
    <header class="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20 shrink-0">
      <!-- Left: Dynamic Page Title -->
      <div class="flex items-center gap-3 lg:gap-4">
        <!-- Hamburger Menu Button -->
        <button 
          class="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          (click)="layoutService.toggleSidebar()"
          aria-label="Toggle Sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 class="text-lg font-bold text-slate-900">{{ pageTitle() }}</h2>
        <span class="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
          Live updates
        </span>
      </div>

      <!-- Right: Search & Actions & Profile -->
      <div class="flex items-center gap-4 relative">
        <!-- Search bar -->
        <div class="hidden lg:flex items-center bg-slate-100 text-slate-400 px-3 py-1.5 rounded-lg w-64 gap-2 border border-transparent focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search..." class="bg-transparent border-none outline-none text-xs text-slate-700 w-full placeholder-slate-400" />
        </div>

        <!-- Notification Bell -->
        <button class="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 relative transition-colors" aria-label="Notifications">
          <span class="absolute top-1 right-1.5 h-2 w-2 bg-rose-500 rounded-full"></span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <!-- User Profile Avatar Button -->
        <div class="relative">
          <button
            id="user-menu-button"
            (click)="toggleDropdown()"
            class="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer shadow-md hover:scale-105 transition-all focus:outline-none ring-2 ring-indigo-100"
            aria-haspopup="true"
            [attr.aria-expanded]="isDropdownOpen()"
            [attr.aria-label]="'User menu for ' + authService.username()"
          >
            {{ authService.userInitials() }}
          </button>

          <!-- Dropdown Panel -->
          @if (isDropdownOpen()) {
            <div
              role="menu"
              aria-labelledby="user-menu-button"
              class="absolute right-0 mt-3.5 w-64 bg-white border border-slate-100 rounded-xl shadow-xl z-30 divide-y divide-slate-100 py-1 origin-top-right transform transition-all duration-200"
            >
              <div class="px-4 py-3.5">
                <p class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Signed in as</p>
                <p class="text-sm font-bold text-slate-800 truncate mt-0.5">{{ authService.username() }}</p>
                <p class="text-xs text-slate-500 truncate">{{ authService.userEmail() }}</p>
              </div>
              <div class="py-1">
                <a role="menuitem" href="javascript:void(0)" class="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </a>
                <a role="menuitem" href="javascript:void(0)" class="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </a>
              </div>
              <div class="py-1">
                <button
                  role="menuitem"
                  (click)="logout()"
                  class="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold transition-colors text-left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </header>

    <!-- Dropdown click-away overlay -->
    @if (isDropdownOpen()) {
      <div class="fixed inset-0 z-10" (click)="closeDropdown()" aria-hidden="true"></div>
    }
  `,
  host: {
    class: 'block w-full sticky top-0 z-20 shrink-0'
  }
})
export class TopbarComponent {
  readonly isDropdownOpen = signal<boolean>(false);

  /** Reactive signal tracking the current URL, updated on each NavigationEnd event */
  readonly currentUrl: ReturnType<typeof toSignal<string>>;

  /** Computes header title dynamically based on the active route */
  readonly pageTitle: ReturnType<typeof computed<string>>;

  constructor(
    readonly authService: AuthService,
    readonly layoutService: LayoutService,
    private readonly router: Router,
  ) {
    // Must be initialized in constructor because toSignal() relies on injector context
    // and router is not available as a field initializer before DI completes.
    this.currentUrl = toSignal(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => (event as NavigationEnd).urlAfterRedirects)
      ),
      { initialValue: this.router.url }
    );

    this.pageTitle = computed(() => {
      const url = this.currentUrl!();
      if (url.includes('/dashboard')) return 'Dashboard Overview';
      if (url.includes('/orders')) return 'Orders Queue';
      if (url.includes('/menu')) return 'Menu Catalog';
      if (url.includes('/analytics')) return 'Analytics';
      if (url.includes('/settings')) return 'Settings';
      return 'Overview';
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  logout(): void {
    this.closeDropdown();
    void this.authService.logout();
  }
}
