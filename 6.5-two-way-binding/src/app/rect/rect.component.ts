import { Component, EventEmitter, Input, Output, model } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // traditional way
  // @Input({ required: true }) size!: { width: string, height: string };

  // need very specific name. not your choice.
  // @Output() sizeChange = new EventEmitter<{ width: string, height: string }>();

  // after Angular 17.2
  size = model.required<{ width: string, height: string }>();

  onReset() {
    // traditional way
    // this.sizeChange.emit({
    //   width: '100',
    //   height: '100'
    // })

    //new way
    this.size.set({
      width: '100',
      height: '100'
    })
  }
}
