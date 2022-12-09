import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { DetailsProjectComponent } from './project/details-project/details-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { SprintsComponent } from './project/sprint/sprints/sprints.component';
import { TeamMembersComponent } from './project/team/team-members/team-members.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},

  //Auth
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},

  //Project
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'project/create', component: CreateProjectComponent, canActivate: [AuthGuard]},
  {path: 'project/details/:id', component: DetailsProjectComponent, canActivate: [AuthGuard]},
  {path: 'project/edit/:id', component: EditProjectComponent, canActivate: [AuthGuard]},

  //Team
  {path: 'project/:id/team-members', component: TeamMembersComponent, canActivate: [AuthGuard]},

  //Sprint
  {path: 'project/:id/sprints', component: SprintsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
