import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersComponent } from './team-members/team-members.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TeamMembersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ]
})
export class TeamModule { }
