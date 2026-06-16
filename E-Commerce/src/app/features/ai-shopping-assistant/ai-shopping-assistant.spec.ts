import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiShoppingAssistant } from './ai-shopping-assistant';

describe('AiShoppingAssistant', () => {
  let component: AiShoppingAssistant;
  let fixture: ComponentFixture<AiShoppingAssistant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiShoppingAssistant],
    }).compileComponents();

    fixture = TestBed.createComponent(AiShoppingAssistant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
