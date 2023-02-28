import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@shared/footer/footer.component';
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    FooterComponent,
    NavbarComponent,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('../../main/main.module'),
          },
        ],
      },
    ]),
  ],
})
export default class HomeModule {}
