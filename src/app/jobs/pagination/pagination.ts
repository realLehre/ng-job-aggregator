import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  template: `
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-6 bg-[#201A23]/5 border-t border-[#201A23]/15 font-mono text-xs">
      
      <!-- Items per page selector -->
      <div class="flex items-center gap-3">
        <span class="text-[#201A23]/70 uppercase tracking-wider text-[10px]">ITEMS_PER_PAGE:</span>
        <select 
          [value]="pageSize()"
          (change)="onPageSizeChange($event)"
          class="bg-[#201A23]/5 border-0 border-b-2 border-[#201A23]/40 px-2.5 py-1 text-xs text-[#201A23] focus:outline-none focus:border-[#201A23] cursor-pointer"
        >
          @for (size of pageSizeOptions; track size) {
            <option [value]="size">{{ size }}</option>
          }
        </select>
        <span class="text-[#201A23]/60 text-[10px]">
          ({{ totalItems() }} total signals)
        </span>
      </div>

      <!-- Reference Layout Pagination Container -->
      <div class="flex items-center gap-2 bg-[#D7D6D6] border border-[#201A23]/20 px-3 py-2 shadow-sm">
        
        <!-- Previous Arrow Button -->
        <button
          (click)="onPageChange(currentPage() - 1)"
          [disabled]="currentPage() <= 1"
          class="w-8 h-8 flex items-center justify-center bg-[#201A23]/5 text-[#201A23] hover:bg-[#201A23]/15 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Previous Page"
        >
          &lsaquo;
        </button>

        <!-- Page Numbers & Ellipsis -->
        <div class="flex items-center gap-1.5">
          @for (p of displayedPages(); track p) {
            @if (p === '...') {
              <span class="px-2 text-[#201A23]/50">…</span>
            } @else {
              <button
                (click)="onPageChange(Number(p))"
                [class]="currentPage() === Number(p)
                  ? 'w-8 h-8 flex items-center justify-center bg-[#201A23] text-[#D7D6D6] font-bold shadow'
                  : 'w-8 h-8 flex items-center justify-center bg-[#201A23]/5 text-[#201A23] hover:bg-[#201A23]/15 transition'"
              >
                {{ p }}
              </button>
            }
          }
        </div>

        <!-- Next Arrow Button -->
        <button
          (click)="onPageChange(currentPage() + 1)"
          [disabled]="currentPage() >= totalPages()"
          class="w-8 h-8 flex items-center justify-center bg-[#201A23]/5 text-[#201A23] hover:bg-[#201A23]/15 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Next Page"
        >
          &rsaquo;
        </button>

        <!-- Go to: [ input ] -->
        <div class="flex items-center gap-1.5 pl-3 border-l border-[#201A23]/20 text-[#201A23]">
          <span class="text-[11px] opacity-70">Go to:</span>
          <input
            type="number"
            min="1"
            [max]="totalPages()"
            [value]="gotoInput()"
            (input)="gotoInput.set(($any($event.target).value))"
            (keydown.enter)="onGotoPage()"
            placeholder="e.g. {{ totalPages() }}"
            class="w-16 bg-[#201A23]/5 border border-[#201A23]/30 px-2 py-1 text-xs text-[#201A23] focus:outline-none focus:border-[#201A23]"
          />
        </div>

      </div>

    </div>
  `,
  styles: ``
})
export class Pagination {
  readonly currentPage = input<number>(1);
  readonly pageSize = input<number>(20);
  readonly totalItems = input<number>(0);
  readonly totalPages = input<number>(1);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly pageSizeOptions = [5, 10, 20, 30, 50];
  readonly gotoInput = signal<string>('');

  readonly displayedPages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, '...', total);
      } else if (current >= total - 2) {
        pages.push(1, '...', total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }
    return pages;
  });

  Number = Number;

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(event: Event) {
    const val = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(val);
  }

  onGotoPage() {
    const val = Number(this.gotoInput());
    if (val >= 1 && val <= this.totalPages()) {
      this.pageChange.emit(val);
      this.gotoInput.set('');
    }
  }
}
