import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICreateSprintDto } from 'src/app/shared/interfaces/dtos/Sprint/ICreateSprintDto';
import { IEditSprintDto } from 'src/app/shared/interfaces/dtos/Sprint/IEditSprintDto';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ISprint } from 'src/app/shared/interfaces/ISprint';
import { ProjectService } from 'src/app/shared/services/project.service';
import { SprintService } from 'src/app/shared/services/sprint.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit{

  sprintId: string = '';
  selectedSprint: ISprint;
  projectId: string = '';
  project: IProject;
  sprints: ISprint[];
  isAddPanelVisible: boolean = false;
  isEditPanelVisible: boolean = false;
  addSprintForm: FormGroup;
  editSprintForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sprintService: SprintService) {

    this.projectId = this.route.snapshot.params['id'];
    this.selectedSprint = { id: '', name: '', duration: 0};
    this.project = { id: '', name: '', description: '', sprints: [] };
    this.sprints = [];

    this.addSprintForm = new FormGroup({
      name: new FormControl(''),
      duration: new FormControl(2),
    });

    this.editSprintForm = new FormGroup({
      name: new FormControl(''),
      duration: new FormControl(''),
    });
    }

  ngOnInit(): void {
    this.loadProjectDetails();
    this.loadSprints();
  }

  loadProjectDetails = () => {
    this.projectService.getProjectDetails('api/project', this.projectId).subscribe(project => {
      this.project = project;
    });
  }

  loadSprints = () => {
    this.sprintService.getSprints('api/sprint', this.projectId).subscribe(sprints => {
      this.sprints = sprints;
    });
  }

  selectSprint = (id: string) => {
    this.sprintService.getSprint('api/sprint/getSprint', id).subscribe(sprint => {
      this.selectedSprint = sprint;
    });
  }

  showHidePanel(panel: string, action: string, sprint?: ISprint) {
    if (panel === "add") {

      if(this.isEditPanelVisible) this.isEditPanelVisible = false;
      if (action === "show") this.isAddPanelVisible = true;
      if (action === "hide") this.isAddPanelVisible = false;
    }
    if (panel === "edit") {

      if(this.isAddPanelVisible) this.isAddPanelVisible = false;
      if (action === "show"){
        this.isEditPanelVisible = true;
        this.editSprintForm.setValue({
          name: sprint ? sprint.name : '',
          duration: sprint ? sprint.duration : ''
        });
        this.sprintId = sprint ? sprint.id : '';
      } 
      if (action === "hide") this.isEditPanelVisible = false;
    }
  }

  add = (addSprintFormValue: any) => {
    const formValues = { ...addSprintFormValue };

    const sprint: ICreateSprintDto = {
      name: formValues.name,
      duration: Number(formValues.duration),
      projectId: this.projectId
    };

    this.sprintService.create("api/sprint/add", sprint).subscribe({
      next: () => {
        this.loadSprints();
        this.addSprintForm.reset({
          name: '',
          duration: 2,
        });
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });

  }

  edit = (editSprintFormValue: any) => {
    const formValues = { ...editSprintFormValue };

    //TODO IF ID = NULL
    const sprint: IEditSprintDto = {
      id: this.sprintId,
      name: formValues.name,
      duration: Number(formValues.duration)
    };

    this.sprintService.edit('api/sprint', sprint).subscribe({
      next: () => {
        this.loadSprints();
        this.isEditPanelVisible = false;
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });
  }

  delete = (sprint: ISprint) => {
    if (confirm(`Are you sure you want to delete ${sprint.name}?`)) {

      this.sprintService.delete('api/sprint', sprint.id).subscribe(() => {
        this.loadSprints();
      });
    }
  }
}
