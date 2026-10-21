import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  template: `
    <div
      class="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-6 bg-[#201A23]/5 border-t border-[#201A23]/15 font-mono text-xs"
    >
      <!-- Items per page selector -->
      <div class="flex items-center gap-3">
        <span class="text-[#201A23]/70 uppercase tracking-wider text-[10px]">Jobs/Page:</span>
        <select
          [value]="pageSize()"
          (change)="onPageSizeChange($event)"
          class="bg-[#201A23]/5 border-0 border-b-2 border-[#201A23]/40 px-2.5 py-1 text-xs text-[#201A23] focus:outline-none focus:border-[#201A23] cursor-pointer"
        >
          @for (size of pageSizeOptions; track size) {
            <option [value]="size" [selected]="size === pageSize()">{{ size }}</option>
          }
        </select>
        <span class="text-[#201A23]/60 text-[10px]"> ({{ totalItems() }} total jobs) </span>
      </div>

      <!-- Cursor-based Navigation Container -->
      <div
        class="flex items-center gap-3 bg-[#D7D6D6] border border-[#201A23]/20 px-4 py-2 shadow-sm"
      >
        <!-- Previous Button -->
        <button
          (click)="onPrev()"
          [disabled]="currentPage() <= 1"
          class="px-3 py-1.5 flex items-center gap-1 bg-[#201A23]/5 text-[#201A23] hover:bg-[#201A23]/15 disabled:opacity-30 disabled:cursor-not-allowed transition font-bold"
          title="Previous Page"
        >
          &lsaquo; Prev
        </button>

        <!-- Current Page Indicator -->
        <span class="px-2 text-[#201A23] font-bold">
          Page {{ currentPage() }}
        </span>

        <!-- Next Button -->
        <button
          (click)="onNext()"
          [disabled]="currentPage() >= totalPages()"
          class="px-3 py-1.5 flex items-center gap-1 bg-[#201A23]/5 text-[#201A23] hover:bg-[#201A23]/15 disabled:opacity-30 disabled:cursor-not-allowed transition font-bold"
          title="Next Page"
        >
          Next &rsaquo;
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class Pagination {
  readonly currentPage = input<number>(1);
  readonly pageSize = input<number>(20);
  readonly totalItems = input<number>(0);
  readonly totalPages = input<number>(1);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly pageSizeOptions = [5, 10, 20, 30, 50];

  onPrev() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  onNext() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onPageSizeChange(event: Event) {
    const val = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(val);
  }
}
