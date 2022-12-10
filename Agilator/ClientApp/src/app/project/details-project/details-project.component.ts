import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.scss']
})
export class DetailsProjectComponent implements OnInit {

  id: string;
  project: IProject;

  constructor(
    private router: Router,
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

  edit = (id: string) => {
    this.router.navigate([`/project/edit/${id}`]);
  }

  delete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the ${name} project and all sprints and team members in it?`)) {
      this.projectService.delete('api/project', id).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
