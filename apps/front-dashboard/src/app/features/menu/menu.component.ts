import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface MenuItem {
  name: string;
  category: 'Coffee' | 'Bakery' | 'Tea';
  price: number;
  available: boolean;
  imageEmoji: string;
}

@Component({
  selector: 'app-menu',
  imports: [CurrencyPipe],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h3 class="text-base font-bold text-slate-900">Menu Catalog</h3>
          <p class="text-xs text-slate-400 font-medium">Manage item availability, pricing and categories</p>
        </div>
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-600/10">
          + Add Item
        </button>
      </div>

      <!-- Grid Catalog -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (item of menuItems(); track item.name) {
          <div class="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
            <div class="h-28 bg-slate-50 rounded-xl flex items-center justify-center text-4xl relative">
              {{ item.imageEmoji }}
              <span class="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold"
                [class.bg-emerald-50]="item.available"
                [class.text-emerald-700]="item.available"
                [class.bg-slate-100]="!item.available"
                [class.text-slate-600]="!item.available"
              >
                {{ item.available ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>

            <div>
              <span class="text-[10px] text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-md uppercase">
                {{ item.category }}
              </span>
              <h4 class="text-xs font-bold text-slate-800 mt-2 truncate">{{ item.name }}</h4>
              <p class="text-xs font-bold text-slate-900 mt-1">{{ item.price | currency:'USD' }}</p>
            </div>
            
            <div class="flex gap-2">
              <button class="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[10px] py-1.5 rounded-lg transition-colors">
                Edit
              </button>
              <button class="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[10px] py-1.5 rounded-lg transition-colors">
                Toggle Stock
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class MenuComponent {
  readonly menuItems = signal<MenuItem[]>([
    { name: 'Iced Caramel Macchiato', category: 'Coffee', price: 5.50, available: true, imageEmoji: '🥤' },
    { name: 'Classic Croissant', category: 'Bakery', price: 4.50, available: true, imageEmoji: '🥐' },
    { name: 'Cold Brew Coffee', category: 'Coffee', price: 4.50, available: true, imageEmoji: '☕' },
    { name: 'Matcha Green Tea', category: 'Tea', price: 4.80, available: true, imageEmoji: '🍵' },
    { name: 'Vanilla Caffe Latte', category: 'Coffee', price: 5.00, available: true, imageEmoji: '🥛' },
    { name: 'Almond Croissant', category: 'Bakery', price: 4.90, available: false, imageEmoji: '🥐' }
  ]);
}
