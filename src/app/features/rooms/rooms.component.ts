import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RoomsComponent {}
