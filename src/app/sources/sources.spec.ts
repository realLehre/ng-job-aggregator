import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sources } from './sources';

describe('Sources', () => {
  let component: Sources;
  let fixture: ComponentFixture<Sources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sources],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all 5 aggregation sources', () => {
    expect(component.sourcesList.length).toBe(5);
    expect(component.sourcesList.map(s => s.name)).toEqual([
      'Remote OK',
      'Himalayas',
      'Remotive',
      'WeWorkRemotely',
      'Arbeitnow',
    ]);
  });
});
