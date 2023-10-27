import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PositiveNegativeColorDirective } from './positive-negative-color.directive';

@Component({
  template: '<span [appPositiveNegativeColor]="testValue">{{ testValue }}</span>'
})
class TestComponent {
  testValue!: number;
}

describe('PositiveNegativeColorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let spanElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositiveNegativeColorDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    spanElement = fixture.debugElement.query(By.css('span'));
  });

  it('should set color to green for a positive number', () => {
    component.testValue = 5;
    fixture.detectChanges();
    expect(spanElement.nativeElement.style.color).toBe('green');
  });

  it('should set color to red for a negative number', () => {
    component.testValue = -5;
    fixture.detectChanges();
    expect(spanElement.nativeElement.style.color).toBe('red');
  });
});
