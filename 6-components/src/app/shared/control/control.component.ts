import { Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  // disable the style scoping 
  // styling for input and textarea inside ng-content
  encapsulation: ViewEncapsulation.None,
  // styling for control without wrapping with p 
  host: {
    class: "control",
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // this is discouraged.
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('Clicked!')
  // }

  label = input.required<string>();

  // if you need programmatic access to the host element, use this. But it's rare.
  private el = inject(ElementRef);

  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>
  private control = 
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  onClick() {
    console.log('Clicked!')
    console.log(this.el);
    // console.log(this.control);
    console.log(this.control());
  }
}
