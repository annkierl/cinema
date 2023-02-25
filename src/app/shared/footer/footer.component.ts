import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
