import { Pipe, PipeTransform } from '@angular/core';

interface SalaryObject {
  min?: number | string | null;
  max?: number | string | null;
  currency?: string | null;
}

@Pipe({
  name: 'formatSalary',
})
export class FormatSalaryPipe implements PipeTransform {
  transform(value: SalaryObject | number | string | null | undefined): string {
    if (!value) {
      return '';
    }

    // Fallback if someone passes just a raw number or string
    if (typeof value === 'number' || typeof value === 'string') {
      return this.formatNumber(value);
    }

    // Handling the { min, max, currency } object
    if (typeof value === 'object') {
      const { min, max, currency } = value;
      const curr = currency ? currency : '';

      const hasMin = min !== null && min !== undefined && min !== '';
      const hasMax = max !== null && max !== undefined && max !== '';

      if (!hasMin && !hasMax) {
        return '';
      }

      const formattedMin = hasMin ? this.formatNumber(min) : null;
      const formattedMax = hasMax ? this.formatNumber(max) : null;

      if (hasMin && !hasMax) {
        return `${curr} ${formattedMin}`;
      }
      if (!hasMin && hasMax) {
        return `${curr} ${formattedMax}`;
      }
      if (min === max) {
        return `${curr} ${formattedMin}`;
      }

      return `${curr} ${formattedMin} - ${formattedMax}`;
    }

    return '';
  }

  private formatNumber(value: number | string): string {
    let num: number;
    if (typeof value === 'string') {
      const cleaned = value.replace(/[^0-9.]/g, '');
      num = parseFloat(cleaned);
    } else {
      num = value;
    }

    if (isNaN(num)) {
      return String(value);
    }

    if (num >= 1000) {
      const thousands = num / 1000;
      const formatted = Number.isInteger(thousands) ? thousands.toString() : thousands.toFixed(1);
      return `${formatted}k`;
    }

    return num.toString();
  }
}
