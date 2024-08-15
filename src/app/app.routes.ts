import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { DiaryEntryComponent } from './diary-entry/diary-entry.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', component: DiaryListComponent },
  { path: 'edit/:id', component: DiaryEntryComponent },
  { path: 'new', component: DiaryEntryComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }