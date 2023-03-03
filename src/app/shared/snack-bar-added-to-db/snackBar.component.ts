import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: './snackbar.html',
  styleUrls: ['./snackBar.scss'],
})
export class SnackBar {
  snackBarRef = inject(MatSnackBarRef);
}
