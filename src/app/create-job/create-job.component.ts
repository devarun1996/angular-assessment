import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  constructor(private messageService: MessageService, private apiCall: ApiCallService, private router: Router) { }

  jobObject = {
      "job_number": "",
      "job_title": "",
      "job_start_date": "",
      "job_close_date": "",
      "experience_required": false,
      "number_of_openings": 0,
      "job_notes": ""
    };

  ngOnInit(): void {
  }

  async createJob() {
    if (this.jobObject.job_title !== '' && this.jobObject.job_start_date !== '' && this.jobObject.job_close_date !== '' &&
        this.jobObject.number_of_openings > 0 && this.jobObject.job_notes !== '')
        {
          this.jobObject.job_close_date = '' + new Date (this.jobObject.job_close_date).getFullYear() + '-' + (new Date (this.jobObject.job_close_date).getMonth()+1)
           + '-' +  new Date (this.jobObject.job_close_date).getDate();

          this.jobObject.job_start_date = '' + new Date (this.jobObject.job_start_date).getFullYear() + '-' + (new Date (this.jobObject.job_start_date).getMonth()+1)
           + '-' +  new Date (this.jobObject.job_start_date).getDate();

          let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

          this.jobObject.job_number = Math.floor(Math.random()*(999-100+1)+100) + '-' + alphabet.charAt(Math.floor(Math.random()*alphabet.length))
            + alphabet.charAt(Math.floor(Math.random()*alphabet.length))
           + alphabet.charAt(Math.floor(Math.random()*alphabet.length))

          try {

            await this.apiCall.createJob(this.jobObject).subscribe((res: any) => console.log(res));
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Job successfully created!'});
            setTimeout(() => {
              this.router.navigate(['../']);
            }, 700)

          } catch (error) {

            console.log(error);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Please fill all the fields!'});
          }

        }
    else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please fill all the fields!'});
    }
  }

}
