import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculator3delementsComponent } from './calculator3delements.component';

describe('Calculator3delementsComponent', () => {
  let component: Calculator3delementsComponent;
  let fixture: ComponentFixture<Calculator3delementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calculator3delementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calculator3delementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
