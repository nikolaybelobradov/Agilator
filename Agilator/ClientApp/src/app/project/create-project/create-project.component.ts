import { HttpErrorResponse } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateProjectDto } from 'src/app/shared/interfaces/dtos/Project/ICreateProjectDto';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {

  createProjectForm: FormGroup;
  errorMessage: string = '';
  showError!: boolean;

  constructor(
    private projectService: ProjectService, 
    private router: Router,
    private toastr: ToastrService) {
    this.createProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })
  };

  public create = (createProjectFormValue: any) => {
    const formValues = { ...createProjectFormValue };

    const project: ICreateProjectDto = {
      name: formValues.name,
      description: formValues.description
    };

    this.projectService.create("api/project/create", project).subscribe({
      next: () => {
        this.toastr.success('Successful created project.', 'Message', { timeOut: 2500 });
        this.router.navigate([`/projects`]);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        this.showError = true;
      }
    });

  }

}
