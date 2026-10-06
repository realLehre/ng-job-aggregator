import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Jobs } from './jobs';
import { LocationService } from '../services/location.service';

describe('Jobs', () => {
  let component: Jobs;
  let fixture: ComponentFixture<Jobs>;

  beforeEach(async () => {
    const mockLocationService = {
      getCountries: () => of(['All', 'Germany', 'United States'])
    };

    await TestBed.configureTestingModule({
      imports: [Jobs],
      providers: [
        provideRouter([]),
        { provide: LocationService, useValue: mockLocationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Jobs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
