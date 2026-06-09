import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled';
  time: string;
}

interface PopularItem {
  name: string;
  salesCount: number;
  percentage: number;
  revenue: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe],
  template: `
    <div class="space-y-8">
      <!-- Welcome Bar -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div class="absolute right-0 bottom-0 top-0 opacity-10 flex items-center pointer-events-none">
          <span class="text-9xl mr-8 select-none">☕</span>
        </div>
        <div class="relative z-10">
          <h3 class="text-xl md:text-2xl font-bold">Welcome back, {{ auth.username() }}!</h3>
          <p class="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Coffee order streams are running smoothly. You have <strong class="text-amber-400">8 pending orders</strong> requiring attention in the queue.
          </p>
        </div>
      </div>

      <!-- Cards Grid -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        @for (card of statCards(); track card.title) {
          <div class="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ card.title }}</span>
              <div class="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-base"
                [style.background-color]="card.iconBg"
                [style.color]="card.iconColor"
              >
                {{ card.emoji }}
              </div>
            </div>
            <div class="mt-4 flex items-baseline gap-2">
              <span class="text-2xl font-bold text-slate-800">{{ card.value }}</span>
            </div>
            <div class="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span [class.text-emerald-600]="card.trendUp" [class.text-rose-600]="!card.trendUp">
                {{ card.trend }}
              </span>
              <span class="text-slate-400 font-medium">from yesterday</span>
            </div>
          </div>
        }
      </section>

      <!-- Dual Section Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Recent Orders (2/3 col) -->
        <div class="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div class="px-4 md:px-6 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-900">Active Live Orders</h3>
              <p class="text-xs text-slate-400 font-medium mt-0.5">Kitchen queuing system</p>
            </div>
            <button class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              View queue settings
            </button>
          </div>

          <!-- Live Queue Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th class="py-3 px-4 md:px-6 whitespace-nowrap">Order ID</th>
                  <th class="py-3 px-4 md:px-6 whitespace-nowrap">Customer</th>
                  <th class="py-3 px-4 md:px-6 whitespace-nowrap">Items</th>
                  <th class="py-3 px-4 md:px-6 whitespace-nowrap">Total</th>
                  <th class="py-3 px-4 md:px-6 whitespace-nowrap">Status</th>
                  <th class="py-3 px-4 md:px-6 text-right whitespace-nowrap">Time</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                @for (order of recentOrders(); track order.id) {
                  <tr class="hover:bg-slate-50/50 transition-colors group">
                    <td class="py-3 md:py-4 px-4 md:px-6 font-bold text-slate-700 whitespace-nowrap">{{ order.id }}</td>
                    <td class="py-3 md:py-4 px-4 md:px-6 whitespace-nowrap">
                      <span class="font-bold text-slate-800">{{ order.customer }}</span>
                    </td>
                    <td class="py-3 md:py-4 px-4 md:px-6 text-slate-500 max-w-[12rem] md:max-w-xs truncate">{{ order.items }}</td>
                    <td class="py-3 md:py-4 px-4 md:px-6 font-bold text-slate-800 whitespace-nowrap">
                      {{ order.total | currency:'USD':'symbol':'1.2-2' }}
                    </td>
                    <td class="py-3 md:py-4 px-4 md:px-6 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                        [class.bg-amber-50]="order.status === 'Pending'"
                        [class.text-amber-700]="order.status === 'Pending'"
                        [class.bg-indigo-50]="order.status === 'Preparing'"
                        [class.text-indigo-700]="order.status === 'Preparing'"
                        [class.bg-emerald-50]="order.status === 'Completed'"
                        [class.text-emerald-700]="order.status === 'Completed'"
                        [class.bg-rose-50]="order.status === 'Cancelled'"
                        [class.text-rose-700]="order.status === 'Cancelled'"
                      >
                        <span class="h-1.5 w-1.5 rounded-full mr-1.5"
                          [class.bg-amber-500]="order.status === 'Pending'"
                          [class.bg-indigo-500]="order.status === 'Preparing'"
                          [class.bg-emerald-500]="order.status === 'Completed'"
                          [class.bg-rose-500]="order.status === 'Cancelled'"
                        ></span>
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="py-3 md:py-4 px-4 md:px-6 text-right text-slate-400 font-medium whitespace-nowrap">{{ order.time }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Popular Items (1/3 col) -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900">Popular Catalog</h3>
                <p class="text-xs text-slate-400 font-medium mt-0.5">Top-selling items today</p>
              </div>
              <span class="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded-md">
                Catalog
              </span>
            </div>

            <div class="space-y-4">
              @for (item of popularItems(); track item.name) {
                <div class="space-y-1">
                  <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{{ item.name }}</span>
                    <span class="text-slate-400 font-medium">{{ item.salesCount }} sold</span>
                  </div>
                  
                  <!-- Progress bar container -->
                  <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      [style.width.%]="item.percentage"
                    ></div>
                  </div>

                  <div class="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>{{ item.percentage }}% share</span>
                    <span>{{ item.revenue | currency:'USD':'symbol':'1.0-0' }} revenue</span>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Recommendation Card -->
          <div class="mt-6 bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/30 flex items-start gap-3">
            <span class="text-lg">💡</span>
            <div>
              <h4 class="text-xs font-bold text-indigo-950">Tip of the Day</h4>
              <p class="text-[10px] text-indigo-700/80 leading-normal mt-0.5">
                "Iced Caramel Macchiato" is peaking. Consider a 10% combo discount with "Classic Croissant" to increase average basket size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  constructor(readonly auth: AuthService) {}

  // Mock Stats Data
  readonly statCards = signal([
    {
      title: "Today's Revenue",
      value: "$1,824.50",
      emoji: "💰",
      iconBg: "#fef3c7",
      iconColor: "#d97706",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Active Orders",
      value: "18",
      emoji: "⚡",
      iconBg: "#e0e7ff",
      iconColor: "#4f46e5",
      trend: "+4 orders",
      trendUp: true
    },
    {
      title: "Avg Prep Time",
      value: "8.4 min",
      emoji: "⏱️",
      iconBg: "#ecfdf5",
      iconColor: "#059669",
      trend: "-1.2m",
      trendUp: true
    },
    {
      title: "Table Occupancy",
      value: "85%",
      emoji: "🍽️",
      iconBg: "#fdf2f8",
      iconColor: "#db2777",
      trend: "-2.4%",
      trendUp: false
    }
  ]);

  // Mock Recent Orders List
  readonly recentOrders = signal<Order[]>([
    {
      id: "#1084",
      customer: "John Doe",
      items: "1x Espresso Macchiato, 2x Croissant",
      total: 14.50,
      status: "Preparing",
      time: "3 mins ago"
    },
    {
      id: "#1083",
      customer: "Jane Smith",
      items: "2x Iced Caramel Latte, 1x Red Velvet",
      total: 18.25,
      status: "Pending",
      time: "5 mins ago"
    },
    {
      id: "#1082",
      customer: "Akmal Jamil",
      items: "1x Double Espresso, 1x Almond Croissant",
      total: 10.75,
      status: "Completed",
      time: "12 mins ago"
    },
    {
      id: "#1081",
      customer: "Sarah Connor",
      items: "1x Matcha Green Tea, 1x Blueberry Muffin",
      total: 11.20,
      status: "Completed",
      time: "24 mins ago"
    },
    {
      id: "#1080",
      customer: "David Miller",
      items: "3x Cold Brew Coffee",
      total: 15.00,
      status: "Cancelled",
      time: "40 mins ago"
    }
  ]);

  // Mock Popular Items List
  readonly popularItems = signal<PopularItem[]>([
    {
      name: "Iced Caramel Macchiato",
      salesCount: 45,
      percentage: 38,
      revenue: 247
    },
    {
      name: "Classic Croissant",
      salesCount: 32,
      percentage: 27,
      revenue: 144
    },
    {
      name: "Cold Brew Coffee",
      salesCount: 28,
      percentage: 23,
      revenue: 126
    },
    {
      name: "Vanilla Caffe Latte",
      salesCount: 14,
      percentage: 12,
      revenue: 77
    }
  ]);
}
