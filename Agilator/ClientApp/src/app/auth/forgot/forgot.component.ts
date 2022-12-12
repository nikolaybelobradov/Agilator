import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {


  constructor(private toastr: ToastrService){ }

  sendPassword = (email: string) => {
    if(email){
      this.toastr.success('Check your email.', 'Message', { timeOut: 2500 });
    }else{
      this.toastr.error('Incorrect data entered.', 'Message', { timeOut: 2500 });

    }

  }
  
}
