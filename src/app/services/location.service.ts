import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

export interface CountryResponse {
  name: {
    common: string;
    official: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://restcountries.com/v3.1/independent?status=true&fields=name';

  getCountries(): Observable<string[]> {
    return this.http.get<CountryResponse[]>(this.apiUrl).pipe(
      map(response => {
        const countries = response
          .map(item => item.name.common)
          .sort((a, b) => a.localeCompare(b));
        return ['All', 'Germany', 'United States', 'United Kingdom', 'Canada', ...countries.filter(c => !['Germany', 'United States', 'United Kingdom', 'Canada'].includes(c))];
      }),
      catchError(() => {
        // Fallback default countries if offline or rate-limited
        return of(['All', 'Germany', 'United States', 'United Kingdom', 'Canada', 'France', 'Switzerland', 'Netherlands', 'Singapore', 'Japan']);
      })
    );
  }
}
