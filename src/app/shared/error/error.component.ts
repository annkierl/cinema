import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [CommonModule],
  standalone: true,
  template: `<div class="smth-went-wrong"><p>Ups coś poszło nie tak...</p></div> `,
  styles: ['.smth-went-wrong {  text-align: center }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
