import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHeader]'
})
export class HeaderDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.fontSize = '20px';
  }
}