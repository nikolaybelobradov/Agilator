import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit{

  teamMemberId: string = '';
  projectId: string = '';
  project: IProject;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,) {

    this.projectId = this.route.snapshot.params['id'];
    this.project = { id: '', name: '', description: '', sprints: [] };
    }

  ngOnInit(): void {
    this.loadProjectDetails();
  }

  loadProjectDetails = () => {
    this.projectService.getProjectDetails('api/project', this.projectId).subscribe(project => {
      this.project = project;
    });
  }
}
