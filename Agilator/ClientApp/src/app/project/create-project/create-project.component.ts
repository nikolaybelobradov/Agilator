import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProjectDto } from 'src/app/shared/interfaces/dtos/IProjectDto';
import { IResponseDto } from 'src/app/shared/interfaces/dtos/IResponseDto';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {

  createProjectForm: FormGroup;

  constructor(private projectService: ProjectService) {
    this.createProjectForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    })
  };

  public create = (createProjectFormValue: any) => {
    const formValues = { ...createProjectFormValue };

    const project: IProjectDto = {
      name: formValues.name,
      description: formValues.description
    };

    this.projectService.create("api/project/create", project).subscribe({
      next: (response: IResponseDto) => {
        console.log("Successful created project")
        //TODO REDIRECT
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });

  }

}
