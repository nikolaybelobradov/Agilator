
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICreateTeamMemberDto } from 'src/app/shared/interfaces/dtos/TeamMember/ICreateTeamMemberDto';
import { IEditTeamMemberDto } from 'src/app/shared/interfaces/dtos/TeamMember/IEditTeamMemberDto';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ITeamMember } from 'src/app/shared/ITeamMember';
import { TeamService } from 'src/app/shared/services/team.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  teamMemberId: string = '';
  projectId: string = '';
  project: IProject;
  teamMembers: ITeamMember[];
  isAddPanelVisible: boolean = false;
  isEditPanelVisible: boolean = false;
  addTeamMemberForm: FormGroup;
  editTeamMemberForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private teamService: TeamService) {

  
    this.projectId = this.route.snapshot.params['id'];
    this.project = { id: '', name: '', description: '', sprints: [] };
    this.teamMembers = [];

    this.addTeamMemberForm = new FormGroup({
      name: new FormControl(''),
      workingHours: new FormControl(8),
    });

    this.editTeamMemberForm = new FormGroup({
      name: new FormControl(''),
      workingHours: new FormControl(''),
    });

  };

  ngOnInit(): void {
    this.loadProjectDetails();
    this.loadTeamMembers();
  }

  loadProjectDetails = () => {
    this.projectService.getProjectDetails('api/project', this.projectId).subscribe(project => {
      this.project = project;
    });
  }

  showHidePanel(panel: string, action: string, teamMember?: ITeamMember) {
    if (panel === "add") {

      if(this.isEditPanelVisible) this.isEditPanelVisible = false;
      if (action === "show") this.isAddPanelVisible = true;
      if (action === "hide") this.isAddPanelVisible = false;
    }
    if (panel === "edit") {

      if(this.isAddPanelVisible) this.isAddPanelVisible = false;
      if (action === "show"){
        this.isEditPanelVisible = true;
        this.editTeamMemberForm.setValue({
          name: teamMember ? teamMember.name : '',
          workingHours: teamMember ? teamMember.workingHours : ''
        });
        this.teamMemberId = teamMember ? teamMember.id : '';
      } 
      if (action === "hide") this.isEditPanelVisible = false;
    }
  }

  loadTeamMembers = () => {
    this.teamService.getTeamMembers('api/teamMember', this.projectId).subscribe(teamMembers => {
      this.teamMembers = teamMembers;
    });
  }

  add = (addTeamMemberFormValue: any) => {
    const formValues = { ...addTeamMemberFormValue };

    const teamMember: ICreateTeamMemberDto = {
      name: formValues.name,
      workingHours: Number(formValues.workingHours),
      projectId: this.projectId
    };

    this.teamService.create("api/teamMember/add", teamMember).subscribe({
      next: () => {
        console.log("Successful created project");
        this.loadTeamMembers();
        this.addTeamMemberForm.reset({
          name: '',
          workingHours: 8,
        });
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });

  }

  edit = (editTeamMemberFormValue: any) => {
    const formValues = { ...editTeamMemberFormValue };

    //TODO IF ID = NULL
    const teamMember: IEditTeamMemberDto = {
      id: this.teamMemberId,
      name: formValues.name,
      workingHours: Number(formValues.workingHours)
    };

    this.teamService.edit('api/teamMember', teamMember).subscribe({
      next: () => {
        this.loadTeamMembers();
        this.isEditPanelVisible = false;
      },
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    });
  }

  delete = (teamMember: ITeamMember) => {
    if (confirm(`Are you sure you want to delete ${teamMember.name}?`)) {

      this.teamService.delete('api/teamMember', teamMember.id).subscribe(() => {
        this.loadTeamMembers();
      });
    }
  }
}
