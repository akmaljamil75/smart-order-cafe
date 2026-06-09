import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  imports: [CurrencyPipe],
  template: `
    <div class="space-y-8">
      <!-- Title -->
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 class="text-base font-bold text-slate-900">Performance Analytics</h3>
        <p class="text-xs text-slate-400 font-medium">Analyze café sales, orders statistics and customer traffic trends</p>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <p class="text-xs font-bold text-slate-450 uppercase tracking-wider">Gross Revenue (Month)</p>
          <p class="text-2xl font-bold text-slate-800">$45,824.00</p>
          <div class="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <span>+18.4%</span>
            <span class="text-slate-400 font-medium">from last month</span>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <p class="text-xs font-bold text-slate-450 uppercase tracking-wider">Total Orders Fulfill</p>
          <p class="text-2xl font-bold text-slate-800">12,480</p>
          <div class="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <span>+10.2%</span>
            <span class="text-slate-400 font-medium">from last month</span>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <p class="text-xs font-bold text-slate-450 uppercase tracking-wider">Average Ticket Size</p>
          <p class="text-2xl font-bold text-slate-800">$12.45</p>
          <div class="flex items-center gap-1.5 text-xs text-rose-600 font-semibold">
            <span>-2.1%</span>
            <span class="text-slate-400 font-medium">from last month</span>
          </div>
        </div>
      </div>

      <!-- Mock Chart Display -->
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div class="flex justify-between items-center border-b border-slate-50 pb-4">
          <div>
            <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Daily Sales Performance</h4>
            <p class="text-[10px] text-slate-400 mt-0.5">Mock chart representation</p>
          </div>
          <span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md uppercase">
            Hourly Traffic
          </span>
        </div>
        <div class="h-64 flex items-end gap-3 pt-6 px-4">
          @for (bar of chartData(); track bar.hour) {
            <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div class="w-full bg-slate-100 hover:bg-indigo-100 rounded-md transition-all duration-300 relative group"
                [style.height.%]="bar.height"
              >
                <!-- Tooltip -->
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow z-10">
                  {{ bar.value | currency:'USD':'symbol':'1.0-0' }}
                </div>
              </div>
              <span class="text-[9px] font-bold text-slate-400">{{ bar.hour }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent {
  readonly chartData = signal([
    { hour: '08:00', height: 35, value: 180 },
    { hour: '10:00', height: 85, value: 540 },
    { hour: '12:00', height: 95, value: 620 },
    { hour: '14:00', height: 65, value: 410 },
    { hour: '16:00', height: 45, value: 290 },
    { hour: '18:00', height: 75, value: 480 },
    { hour: '20:00', height: 25, value: 140 }
  ]);
}
