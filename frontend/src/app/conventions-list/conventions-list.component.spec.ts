import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionsListComponent } from './conventions-list.component';

describe('ConventionsListComponent', () => {
  let component: ConventionsListComponent;
  let fixture: ComponentFixture<ConventionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConventionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
