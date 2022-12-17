import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ISprint } from 'src/app/shared/interfaces/ISprint';
import { ITeamMember } from 'src/app/shared/interfaces/ITeamMember';
import { IVacation } from 'src/app/shared/interfaces/IVacation';
import { ProjectService } from 'src/app/shared/services/project.service';
import { SprintService } from 'src/app/shared/services/sprint.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { VacationService } from 'src/app/shared/services/vacation.service';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  projectId: string = '';
  project: IProject;
  sprintsNames: string[];
  teamMembers: ITeamMember[];
  sprints: ISprint[];
  capacities: { [key: number]: string };
  vacations: IVacation[];
  sCounter: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private teamService: TeamService,
    private vacationService: VacationService) {

    this.projectId = this.route.snapshot.params['id'];
    this.project = { id: '', name: '', description: '', sprints: [] };
    this.sprintsNames = [];
    this.teamMembers = [];
    this.sprints = [];
    this.capacities = {};
    this.vacations = [];
    this.sCounter = 0;
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
      this.sprints = sprints,
        this.sCounter = sprints.length
    });

    this.loadTeamMembers();
  }

  loadTeamMembers = () => {
    this.teamService.getTeamMembers('api/teamMember', this.projectId).subscribe(teamMembers => {
      this.teamMembers = teamMembers;
      this.calcCapacity(this.sprints, teamMembers);
    });


  }

  loadTeamMemberVacation = (sprint: ISprint, teamMember: ITeamMember, vacations: IVacation[]): number => {

    let vacation = vacations.find
      (v => v.sprintId === sprint.id && v.teamMemberId === teamMember.id);

    if (vacation !== undefined) return vacation.duration;

    return 0;
  }

  loadVacations = (sprint: ISprint) => {
    let currentSprintCapacity: number = 0;
    this.vacationService.getVacations("api/vacation", sprint.id).subscribe(v => {
      this.vacations = v,
        this.teamMembers.forEach(member => {

          let vacationDays = this.loadTeamMemberVacation(sprint, member, v);
          let sprintDays = this.transformSprintDurationInDays(sprint.duration);
          let workingHours = member.workingHours;
          let totalCapacityHours = sprintDays * workingHours;
          let capacityHours = totalCapacityHours - vacationDays * workingHours;

          currentSprintCapacity += capacityHours;
        })

      this.saveCapacity(sprint.name, currentSprintCapacity);
    });

  }

  calcCapacity = (sprints: ISprint[], teamMembers: ITeamMember[]) => {

    sprints.forEach(sprint => {
      this.loadVacations(sprint);
    });
  }

  saveCapacity = (sprintName: string, capacity: number) => {
    this.sCounter--;
    this.capacities = { ...this.capacities, [sprintName]: capacity }

    if (this.sCounter === 0) {
      this.loadChart();
    }

  }




  transformSprintDurationInDays = (duration: number): number => {

    if (duration === 1) return 5;
    if (duration === 2) return 10;
    if (duration === 3) return 15;

    return 20;
  }

  loadChart = () => {

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Team Capacity (hours)',
          data: this.capacities,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(95, 189, 37, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(95, 189, 37, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(95, 189, 37, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(95, 189, 37, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}


