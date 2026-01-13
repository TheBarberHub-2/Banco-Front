import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTarjeta } from './c-tarjeta';

describe('CTarjeta', () => {
  let component: CTarjeta;
  let fixture: ComponentFixture<CTarjeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CTarjeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTarjeta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
