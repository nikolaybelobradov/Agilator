import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IEditProjectDto } from 'src/app/shared/interfaces/dtos/Project/IEditProjectDto';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit {

  editProjectForm: FormGroup;

  id: string;
  project: IProject;
  errorMessage: string = '';
  showError!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private toastr: ToastrService) {
    this.id = this.route.snapshot.params['id'];
    this.project = {id: '', name: '', description: '', sprints: []};

    this.editProjectForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    })
  };

  ngOnInit(): void {
    this.loadProjectDetails();
  }

  loadProjectDetails = () => {
    this.projectService.getProjectDetails('api/project', this.id).subscribe(project => {
      this.project = project;

      this.editProjectForm = new FormGroup({
        name: new FormControl(project.name, [Validators.required]),
        description: new FormControl(project.description),
      })
    });
  }

  edit = (editProjectFormValue: any) => {
    const formValues = { ...editProjectFormValue };

    const project: IEditProjectDto = {
      id: this.id,
      name: formValues.name,
      description: formValues.description
    };

    this.projectService.edit("api/project", this.id, project).subscribe({
      next: () => {
        this.toastr.warning('Successful edited project.', 'Message', { timeOut: 2500 });
        this.router.navigate([`/project/details/${this.id}`]);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        this.showError = true;
      }
    });

  }

}
