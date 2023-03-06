import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import RoomsComponent from './rooms.component';
import ScreenComponent from './screen/screen/screen.component';

@NgModule({
  declarations: [RoomsComponent],
  imports: [
    ScreenComponent,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoomsComponent,
      },
      {
        path: ':dayid/:id',
        loadComponent: () => import('./screen/screen/screen.component'),
      },
    ]),
  ],
})
export default class RoomsModule {}
