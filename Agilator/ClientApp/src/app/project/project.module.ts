import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DetailsProjectComponent } from './details-project/details-project.component';
import { TeamModule } from './team/team.module';
import { SprintModule } from './sprint/sprint.module';



@NgModule({
  declarations: [
    CreateProjectComponent,
    ProjectsComponent,
    EditProjectComponent,
    DetailsProjectComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TeamModule,
    SprintModule
  ]
})
export class ProjectModule { }
