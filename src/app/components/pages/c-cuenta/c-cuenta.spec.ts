import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCuenta } from './c-cuenta';

describe('CCuenta', () => {
  let component: CCuenta;
  let fixture: ComponentFixture<CCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CCuenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCuenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
