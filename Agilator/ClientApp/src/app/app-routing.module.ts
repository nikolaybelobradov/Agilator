import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { DetailsProjectComponent } from './project/details-project/details-project.component';
import { ProjectsComponent } from './project/projects/projects.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},

  //Auth
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},

  //Project
  {path: 'project/details/:id', component: DetailsProjectComponent, canActivate: [AuthGuard]},
  {path: 'project/all', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'project/create', component: CreateProjectComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
