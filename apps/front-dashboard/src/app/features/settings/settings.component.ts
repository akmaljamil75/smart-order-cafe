import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  template: `
    <div class="max-w-3xl bg-white border border-slate-100 shadow-sm rounded-2xl p-8 space-y-8">
      <div>
        <h3 class="text-base font-bold text-slate-900">Café Settings</h3>
        <p class="text-xs text-slate-400 font-medium">Configure terminal outlets, printer systems, and layout views</p>
      </div>

      <div class="space-y-6 divide-y divide-slate-100">
        <!-- Section 1 -->
        <div class="pt-2 pb-6 space-y-4">
          <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wide">Terminal Outlets</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-slate-800">Terminal 1 - Front counter</p>
                <p class="text-[10px] text-slate-500 mt-0.5">Active Outlet IP: 192.168.1.50</p>
              </div>
              <span class="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </div>
            <div class="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-slate-800">Terminal 2 - Drive-thru</p>
                <p class="text-[10px] text-slate-500 mt-0.5">Active Outlet IP: 192.168.1.51</p>
              </div>
              <span class="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>
        </div>

        <!-- Section 2 -->
        <div class="pt-6 pb-6 space-y-4">
          <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wide">Printing & Receipt System</h4>
          <div class="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
            <div>
              <p class="text-xs font-bold text-slate-800">Automatic Kitchen Printing</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Print receipt on kitchen ticket machine once payment succeeds</p>
            </div>
            <button class="w-10 h-6 bg-indigo-600 rounded-full p-0.5 transition-colors relative flex items-center justify-end">
              <span class="bg-white w-5 h-5 rounded-full shadow-sm"></span>
            </button>
          </div>
        </div>

        <!-- Section 3 -->
        <div class="pt-6 space-y-4">
          <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wide">Sync & Integrations</h4>
          <div class="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
            <div>
              <p class="text-xs font-bold text-slate-800">SSO Keycloak Integration</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Integration is operational. Single Sign-Out tab synchronization active.</p>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {}
