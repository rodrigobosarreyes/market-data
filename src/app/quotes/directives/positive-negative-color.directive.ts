import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPositiveNegativeColor]'
})
export class PositiveNegativeColorDirective {
  @Input() set appPositiveNegativeColor(value: number) {
    if (value > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

}
