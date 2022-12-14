import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private toastr: ToastrService) { }


  @Input() project: IProject = { id: '', name: '', description: '', sprints: [] };


  edit = (id: string) => {
    this.router.navigate([`/project/edit/${id}`]);
  }

  delete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the ${name} project and all sprints and team members in it?`)) {
      this.projectService.delete('api/project', id).subscribe(() => {
        this.toastr.error('Project deleted.', 'Message', { timeOut: 2500 });
        this.router.navigate(['/projects']);
      });
    }
  }
}
