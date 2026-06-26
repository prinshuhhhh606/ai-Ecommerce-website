import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralSucess } from './referral-sucess';

describe('ReferralSucess', () => {
  let component: ReferralSucess;
  let fixture: ComponentFixture<ReferralSucess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferralSucess],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferralSucess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
