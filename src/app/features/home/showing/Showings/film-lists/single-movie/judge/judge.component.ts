import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CalendarService } from '../../../calendar/calendar.service';
import { JudgeService } from './judge.service';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.html',
  styleUrls: ['./judge.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JudgeComponent {
  private judgeService = inject(JudgeService);
  private dialogRef = inject<MatDialogRef<JudgeComponent, void>>(MatDialogRef);
  private calendarService = inject(CalendarService);

  wasJudged$ = this.judgeService.wasJudged$;
  movieId$ = this.judgeService.movieId$;
  currentDay$ = this.calendarService.currentDay$;

  markTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  closeDialog() {
    this.dialogRef.close();
  }

  chooseMark(mark: number, movieId: number, dayId: number) {
    this.judgeService.postJudgeMovie(movieId, dayId);
    this.judgeService.postFilmJudge(movieId, mark);
    this.closeDialog();
  }

  ngOnDestroy() {
    this.judgeService.changeStatusOfJudge(false);
  }
}
