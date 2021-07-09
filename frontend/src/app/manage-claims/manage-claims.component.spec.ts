import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClaimsComponent } from './manage-claims.component';

describe('ManageClaimsComponent', () => {
  let component: ManageClaimsComponent;
  let fixture: ComponentFixture<ManageClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
