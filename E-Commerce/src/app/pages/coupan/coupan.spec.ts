import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coupan } from './coupan';

describe('Coupan', () => {
  let component: Coupan;
  let fixture: ComponentFixture<Coupan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coupan],
    }).compileComponents();

    fixture = TestBed.createComponent(Coupan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
