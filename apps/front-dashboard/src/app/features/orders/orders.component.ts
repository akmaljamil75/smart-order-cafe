import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface OrderQueueItem {
  id: string;
  name: string;
  items: string;
  price: number;
  timeRemaining: string;
  status: 'cooking' | 'ready' | 'waiting';
}

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h3 class="text-base font-bold text-slate-900">Live Orders Queue</h3>
          <p class="text-xs text-slate-400 font-medium">Manage and fulfill active coffee and food orders</p>
        </div>
        <div class="flex gap-2 shrink-0">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-600/10">
            + New Order
          </button>
          <button class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all">
            Filter Queue
          </button>
        </div>
      </div>

      <!-- Orders Board -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Cooking column -->
        <div class="bg-slate-150/40 p-4 rounded-2xl border border-slate-200/50 space-y-4">
          <div class="flex items-center justify-between px-2">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Preparing (3)</span>
            <span class="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          </div>

          @for (item of preparingList(); track item.id) {
            <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-slate-900">{{ item.id }}</span>
                <span class="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {{ item.timeRemaining }}
                </span>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800">{{ item.name }}</p>
                <p class="text-xs text-slate-500 mt-1">{{ item.items }}</p>
              </div>
              <div class="flex justify-between items-center pt-2 border-t border-slate-50">
                <span class="text-xs font-bold text-slate-800">{{ item.price | currency:'USD' }}</span>
                <button class="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all">
                  Ready
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Ready to Serve column -->
        <div class="bg-slate-150/40 p-4 rounded-2xl border border-slate-200/50 space-y-4">
          <div class="flex items-center justify-between px-2">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Ready to Serve (2)</span>
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>

          @for (item of readyList(); track item.id) {
            <div class="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm shadow-emerald-500/5 space-y-3 hover:shadow-md transition-all">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-slate-900">{{ item.id }}</span>
                <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Ready
                </span>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800">{{ item.name }}</p>
                <p class="text-xs text-slate-500 mt-1">{{ item.items }}</p>
              </div>
              <div class="flex justify-between items-center pt-2 border-t border-slate-50">
                <span class="text-xs font-bold text-slate-800">{{ item.price | currency:'USD' }}</span>
                <button class="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all">
                  Serve
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Serviced column -->
        <div class="bg-slate-150/40 p-4 rounded-2xl border border-slate-200/50 space-y-4">
          <div class="flex items-center justify-between px-2">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Recently Completed</span>
            <span class="h-2 w-2 rounded-full bg-slate-400"></span>
          </div>

          @for (item of completedList(); track item.id) {
            <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm opacity-75 hover:opacity-100 transition-opacity space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-slate-500">{{ item.id }}</span>
                <span class="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md uppercase">
                  Served
                </span>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800">{{ item.name }}</p>
                <p class="text-xs text-slate-500 mt-1">{{ item.items }}</p>
              </div>
              <div class="flex justify-between items-center pt-2 border-t border-slate-50 text-xs font-bold text-slate-500">
                <span>{{ item.price | currency:'USD' }}</span>
                <span>Fulfill Complete</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class OrdersComponent {
  readonly preparingList = signal<OrderQueueItem[]>([
    { id: '#1084', name: 'John Doe', items: '1x Espresso Macchiato, 2x Croissant', price: 14.50, timeRemaining: '2 min left', status: 'cooking' },
    { id: '#1083', name: 'Jane Smith', items: '2x Iced Caramel Latte, 1x Red Velvet', price: 18.25, timeRemaining: '5 min left', status: 'cooking' },
    { id: '#1085', name: 'Bob Johnson', items: '1x Cafe Americano', price: 3.50, timeRemaining: '8 min left', status: 'cooking' }
  ]);

  readonly readyList = signal<OrderQueueItem[]>([
    { id: '#1082', name: 'Akmal Jamil', items: '1x Double Espresso, 1x Almond Croissant', price: 10.75, timeRemaining: 'Ready', status: 'ready' },
    { id: '#1081', name: 'Sarah Connor', items: '1x Matcha Green Tea, 1x Blueberry Muffin', price: 11.20, timeRemaining: 'Ready', status: 'ready' }
  ]);

  readonly completedList = signal<OrderQueueItem[]>([
    { id: '#1079', name: 'Alice Cooper', items: '1x Flat White, 1x Cinnamon Roll', price: 9.50, timeRemaining: 'Done', status: 'waiting' },
    { id: '#1078', name: 'Charlie Brown', items: '2x Hot Cappuccino', price: 8.00, timeRemaining: 'Done', status: 'waiting' }
  ]);
}
