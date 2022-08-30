import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './create-job/create-job.component';
import { DisplayJobComponent } from './display-job/display-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';

const routes: Routes = [
  {path: '', redirectTo: 'jobs', pathMatch: 'full'},
  {path: 'jobs', component: DisplayJobComponent, pathMatch: 'full'},
  {path: 'jobs/new', component: CreateJobComponent, pathMatch: 'full'},
  {path: 'jobs/:id', component: EditJobComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
