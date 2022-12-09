import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProjectDto } from 'src/app/shared/interfaces/dtos/IProjectDto';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit {

  editProjectForm!: FormGroup;

  id: string;
  project: IProject;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService) {
    this.id = this.route.snapshot.params['id'];
    this.project = {id: '', name: '', description: '', sprints: []}
  };

  ngOnInit(): void {

    this.loadProjectDetails();
    this.editProjectForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    })

  }

  loadProjectDetails = () => {
    this.projectService.getProjectDetails('api/project', this.id).subscribe(project => {
      this.project = project;
    });
  }

  edit = (createProjectFormValue: any) => {
    const formValues = { ...createProjectFormValue };

    const project: IProjectDto = {
      name: formValues.name,
      description: formValues.description
    };

    this.projectService.edit("api/project", this.id, project).subscribe({
      next: () => {
        this.router.navigate([`/project/details/${this.id}`]);
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });

  }

}
