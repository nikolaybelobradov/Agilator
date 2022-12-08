import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: IProject[] = [];

  constructor(private projectService: ProjectService) { };

  ngOnInit(): void {
   this.loadMyProjects();
  }

  loadMyProjects = () =>{
    this.projectService.getMyProjects('api/project/all').subscribe( projects => {
      this.projects = projects;
    });
  }
}
