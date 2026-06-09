import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="flex h-screen bg-slate-50 font-sans text-slate-800 antialiased overflow-hidden w-full relative">
      <!-- Mobile Overlay -->
      @if (layoutService.isSidebarOpen()) {
        <div class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm transition-opacity" (click)="layoutService.closeSidebar()" aria-hidden="true"></div>
      }

      <!-- Sidebar -->
      <app-sidebar></app-sidebar>

      <!-- Main container -->
      <div class="flex-1 flex flex-col min-w-0 relative h-full">
        <!-- Topbar -->
        <app-topbar></app-topbar>

        <!-- Dynamic Content Router Outlet -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'block w-full h-full'
  }
})
export class LayoutComponent {
  constructor(readonly layoutService: LayoutService) {}
}
