import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { ICreateSprintDto } from 'src/app/shared/interfaces/dtos/Sprint/ICreateSprintDto';
import { IEditSprintDto } from 'src/app/shared/interfaces/dtos/Sprint/IEditSprintDto';
import { IVacationDto } from 'src/app/shared/interfaces/dtos/Vacation/IVacationDto';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ISprint } from 'src/app/shared/interfaces/ISprint';
import { ITeamMember } from 'src/app/shared/interfaces/ITeamMember';
import { IVacation } from 'src/app/shared/interfaces/IVacation';
import { ProjectService } from 'src/app/shared/services/project.service';
import { SprintService } from 'src/app/shared/services/sprint.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { VacationService } from 'src/app/shared/services/vacation.service';
import { ToastrService } from 'ngx-toastr';

//@Input() counter = '';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {

  sprintId: string = '';
  selectedSprint: ISprint;
  projectId: string = '';
  project: IProject;
  sprints: ISprint[];
  vacations: IVacation[];
  teamMembers: ITeamMember[];
  isAddPanelVisible: boolean = false;
  isEditPanelVisible: boolean = false;
  addSprintForm: FormGroup;
  editSprintForm: FormGroup;

  totalCapacityUnit: string = 'hours';
  capacityUnit: string = 'hours';
  capacities: {[key: string]:string};

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private teamService: TeamService,
    private sprintService: SprintService,
    private vacationService: VacationService,
    private toastr: ToastrService) {

    this.projectId = this.route.snapshot.params['id'];
    this.selectedSprint = { id: '', name: '', duration: 0 };
    this.project = { id: '', name: '', description: '', sprints: [] };
    this.sprints = [];
    this.teamMembers = [];
    this.vacations = [];
    this.capacities = {};


    this.addSprintForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      duration: new FormControl(2),
    });

    this.editSprintForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
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

  loadTeamMembers = () => {
    this.teamService.getTeamMembers('api/teamMember', this.projectId).subscribe(teamMembers => {
      this.teamMembers = teamMembers;
    });
  }

  loadVacations = (sprintId: string) => {
    this.vacationService.getVacations("api/vacation", sprintId).subscribe(vacations => {
      this.vacations = vacations;
    });
  }

  loadTeamMemberVacation = (sprint: ISprint, teamMember: ITeamMember): number => {

    let vacation = this.vacations.find
      (v => v.sprintId === sprint.id && v.teamMemberId === teamMember.id);

    if (vacation) return vacation.duration;

    return 0;
  }

  selectSprint = (id: string) => {
    this.sprintService.getSprint('api/sprint/getSprint', id).subscribe(sprint => {
      this.selectedSprint = sprint;
      this.loadVacations(id);
      this.loadTeamMembers();
    });
  }

  onChangeTotalCapacityUnit = (unit: string) => {
    this.totalCapacityUnit = unit;
  }

  onChangeCapacityUnit = (unit: string) => {
    this.capacityUnit = unit;
  }

  transformHoursToDays = (hours: number): string => {

    let _days = Math.floor(hours / 8);
    let _hours = hours % 8;

    if (_days === 0) return `${_hours} h`;
    if (_hours === 0) return `${_days} d`;

    return `${_days} d ${_hours} h`;
  }

  transformHoursToPercentages = (hours: number, sprintDays: number): string => {

    let result: number = Math.round((hours / (sprintDays * 8)) * 100);
    return `${result} %`;
  }

  calcTotalCapacity = (sprint: ISprint, teamMember: ITeamMember): string => {

    let sprintDays = this.transformSprintDurationInDays(sprint.duration);
    let workingHours = teamMember.workingHours;
    let totalCapacityHours = sprintDays * workingHours;

    if (this.totalCapacityUnit === 'days')
      return this.transformHoursToDays(totalCapacityHours);

    if (this.totalCapacityUnit === '%')
      return this.transformHoursToPercentages(totalCapacityHours, sprintDays);

    return `${totalCapacityHours} h`;
  }


  calcCapacity = (sprint: ISprint, teamMember: ITeamMember, vacationDays: number = 0) => {

    let sprintDays = this.transformSprintDurationInDays(sprint.duration);
    let workingHours = teamMember.workingHours;
    let totalCapacityHours = sprintDays * workingHours;
    let capacityHours = totalCapacityHours - vacationDays * workingHours;

    if (this.capacityUnit === 'days')
      return this.transformHoursToDays(capacityHours);

    if (this.capacityUnit === '%')
      return this.transformHoursToPercentages(capacityHours, sprintDays);

    return `${capacityHours} h`;

  }

  transformSprintDurationInDays = (duration: number): number => {

    if (duration === 1) return 5;
    if (duration === 2) return 10;
    if (duration === 3) return 15;

    return 20;
  }

  showHidePanel(panel: string, action: string, sprint?: ISprint) {
    if (panel === "add") {

      if (this.isEditPanelVisible) this.isEditPanelVisible = false;
      if (action === "show") this.isAddPanelVisible = true;
      if (action === "hide") this.isAddPanelVisible = false;
    }
    if (panel === "edit") {

      if (this.isAddPanelVisible) this.isAddPanelVisible = false;
      if (action === "show") {
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

  updateVacation(sprint: ISprint, teamMember: ITeamMember, days: number | string) {

    const vacation: IVacationDto = {

      duration: Number(days),
      sprintId: sprint.id,
      teamMemberId: teamMember.id
    };

    this.vacationService.update("api/vacation", vacation).subscribe({
      next: () => {
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });
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
        this.toastr.success('Successful added sprint.', 'Message', { timeOut: 2000 });
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });

  }

  edit = (editSprintFormValue: any) => {
    const formValues = { ...editSprintFormValue };
    const sprint: IEditSprintDto = {
      id: this.sprintId,
      name: formValues.name,
      duration: Number(formValues.duration)
    };

    this.sprintService.edit('api/sprint', sprint).subscribe({
      next: () => {
        this.loadSprints();
        this.isEditPanelVisible = false;
        this.toastr.warning('Successful edited sprint.', 'Message', { timeOut: 2000 });
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });
  }

  delete = (sprint: ISprint) => {
    if (confirm(`Are you sure you want to delete ${sprint.name}?`)) {

      this.sprintService.delete('api/sprint', sprint.id).subscribe(() => {
        this.toastr.error('Sprint deleted.', 'Message', { timeOut: 2000 });
        this.loadSprints();
        this.selectedSprint = { id: '', name: '', duration: 0 };
      });
    }
  }
}
