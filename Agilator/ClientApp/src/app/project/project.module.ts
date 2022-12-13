import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DetailsProjectComponent } from './details-project/details-project.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { SprintsComponent } from './sprints/sprints.component';
import { TitleComponent } from './title/title.component';
import { ChartsComponent } from './charts/charts.component';



@NgModule({
  declarations: [
    CreateProjectComponent,
    ProjectsComponent,
    EditProjectComponent,
    DetailsProjectComponent,
    TeamMembersComponent,
    SprintsComponent,
    TitleComponent,
    ChartsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }
