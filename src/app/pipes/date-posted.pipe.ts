import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(seconds) || seconds < 0) {
      return 'Just now';
    }

    const intervals: { [key: string]: number } = {
      y: 31536000,
      m: 2592000, // approx 30 days
      w: 604800,
      d: 86400,
      h: 3600,
      min: 60,
      s: 1,
    };

    // Years
    const years = Math.floor(seconds / intervals['y']);
    if (years >= 1) return `${years} y`;

    // Months
    const months = Math.floor(seconds / intervals['m']);
    if (months >= 1) return `${months} m`;

    // Weeks
    const weeks = Math.floor(seconds / intervals['w']);
    if (weeks >= 1) return `${weeks} w`;

    // Days
    const days = Math.floor(seconds / intervals['d']);
    if (days >= 1) return `${days} d`;

    // Hours
    const hours = Math.floor(seconds / intervals['h']);
    if (hours >= 1) return `${hours} h`;

    // Minutes
    const minutes = Math.floor(seconds / 60);
    if (minutes >= 1) return `${minutes} min`;

    return 'Just now';
  }
}
