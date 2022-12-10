
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITeamMemberDto } from 'src/app/shared/interfaces/dtos/ITeamMemberDto';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ITeamMember } from 'src/app/shared/ITeamMember';
import { ProjectService } from '../../project.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  projectId: string = '';
  project: IProject;
  teamMembers: ITeamMember[];
  isAddPanelVisible: boolean = false;
  isEditPanelVisible: boolean = false;
  addTeamMemberForm: FormGroup;

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

  showHidePanel(panel: string, action: string) {
    if (panel === "add") {

      if (action === "show") this.isAddPanelVisible = true;
      if (action === "hide") this.isAddPanelVisible = false;
    }
    if (panel === "edit") {

      if (action === "show") this.isEditPanelVisible = true;
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

    const teamMember: ITeamMemberDto = {
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

  delete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {

      this.teamService.delete('api/teamMember', id).subscribe(() => {
        this.loadTeamMembers();
      });
    }
  }
}
