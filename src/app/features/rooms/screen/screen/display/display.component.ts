import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { map } from 'rxjs';
import { ScreenService } from '../screen.service';
import { DisplayScreenService } from './display-screen.service';
import { SinlgeSeatComponent } from './single-seat/sinlge-seat.component';

@Component({
  selector: 'app-display',
  imports: [CommonModule, SinlgeSeatComponent],
  standalone: true,
  templateUrl: './display.html',
  styleUrls: ['./display.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent {
  private screenService = inject(ScreenService);

  toggle = false;
  seatsAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

  show2$ = this.screenService.show$.pipe(
    map(show => {
      const reservedSeats = show.reservedSeats.reduce((acc, [row, col]) => {
        const rowIndex = this.seatsAlphabet[row];
        if (acc[rowIndex]) {
          acc[rowIndex] = [...acc[rowIndex], col];
        } else {
          acc[rowIndex] = [col];
        }

        return acc;
      }, {} as Record<string, number[]>);

      return show.screenLayout.reduce((acc, row, index) => {
        const rowIndex = this.seatsAlphabet[index];
        if (acc[rowIndex]) {
          for (let i of row) {
            acc[rowIndex][i] = { disabled: Boolean(reservedSeats[rowIndex]?.includes(i)) };
          }
        } else {
          const temp: Record<number, { disabled?: boolean }> = {};
          for (let i of row) temp[i] = { disabled: Boolean(reservedSeats[rowIndex]?.includes(i)) };
          acc[rowIndex] = temp;
        }

        return acc;
      }, {} as Record<string, Record<number, { disabled?: boolean }>>);
    })
  );
}
