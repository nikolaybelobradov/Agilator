import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.scss']
})
export class DetailsProjectComponent implements OnInit {

  id: string;
  project: IProject;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService) {
    this.id = this.route.snapshot.params['id'];
    this.project = {id: '', name: '', description: '', sprints: []}
  };

  ngOnInit(): void {
    this.loadProjectDetails();
  }

  loadProjectDetails = () => {
    this.projectService.getProjectDetails('api/project', this.id).subscribe(project => {
      this.project = project;
    });
  }
}
