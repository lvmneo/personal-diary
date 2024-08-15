import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryListComponent } from '../diary-list/diary-list.component';
import { DiaryEntryComponent } from '../diary-entry/diary-entry.component';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: DiaryListComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: DiaryEntryComponent, canActivate: [AuthGuard] },
  { path: 'new', component: DiaryEntryComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}