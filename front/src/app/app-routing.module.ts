import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisorComponent } from './visor/visor.component';

const routes: Routes = [
  {
    path: '',
    component: VisorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
