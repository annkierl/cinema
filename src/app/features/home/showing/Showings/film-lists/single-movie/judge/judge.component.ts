import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  wasJudged$ = this.judgeService.wasJudged$;
  movieId$ = this.judgeService.movieId$;

  markTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  closeDialog() {
    this.dialogRef.close();
  }

  chooseMark(mark: number, movieId: number) {
    console.log(movieId);
    this.judgeService.postFilmJudge(movieId, mark);
    this.judgeService.postJudgedFilm(movieId);
    this.closeDialog();
  }

  ngOnDestroy() {
    this.judgeService.changeStatusOfJudge(false);
  }
}
