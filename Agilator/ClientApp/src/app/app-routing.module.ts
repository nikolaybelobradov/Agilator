import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ChartsComponent } from './project/charts/charts.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { DetailsProjectComponent } from './project/details-project/details-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { SprintsComponent } from './project/sprints/sprints.component';
import { TeamMembersComponent } from './project/team-members/team-members.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},

  //Auth
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'auth/forgot', component: ForgotComponent},


  //Project
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'project/create', component: CreateProjectComponent, canActivate: [AuthGuard]},
  {path: 'project/details/:id', component: DetailsProjectComponent, canActivate: [AuthGuard]},
  {path: 'project/edit/:id', component: EditProjectComponent, canActivate: [AuthGuard]},

  //Team
  {path: 'project/team-members/:id', component: TeamMembersComponent, canActivate: [AuthGuard]},

  //Sprint
  {path: 'project/sprints/:id', component: SprintsComponent, canActivate: [AuthGuard]},

  //Chart
  {path: 'project/charts/:id', component: ChartsComponent, canActivate: [AuthGuard]},


  //Error 404 - Not Found
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
