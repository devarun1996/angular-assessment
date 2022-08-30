import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  constructor( private route: ActivatedRoute, private messageService: MessageService,
     private apiCall: ApiCallService, private router: Router) { }

  jobObject = {
    "job_number": "",
      "job_title": "",
      "job_start_date": "",
      "job_close_date": "",
      "experience_required": false,
      "number_of_openings": 0,
      "job_notes": ""
  };

  jobId: any;
  dataChanged = false;

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      this.jobId = res.id;
    });
    this.getJobById();
  }

  async getJobById() {

    try {
       await this.apiCall.getJobById(this.jobId).subscribe((res: any) => {
        this.jobObject = res;
      });
    } catch (err) {
      console.error(err);
    }
    
  }

  setEditCounter() {
    this.dataChanged = true;
  }

  async updateJob() {
    if (this.jobObject.job_title !== '' && this.jobObject.job_start_date !== '' && this.jobObject.job_close_date !== '' &&
        this.jobObject.number_of_openings > 0 && this.jobObject.job_notes !== '' && this.dataChanged)
        {
          try {

            this.jobObject.job_close_date = '' + new Date (this.jobObject.job_close_date).getFullYear() + '-' + (new Date (this.jobObject.job_close_date).getMonth()+1)
                                            + '-' +  new Date (this.jobObject.job_close_date).getDate();

            this.jobObject.job_start_date = '' + new Date (this.jobObject.job_start_date).getFullYear() + '-' + (new Date (this.jobObject.job_start_date).getMonth()+1)
                                            + '-' +  new Date (this.jobObject.job_start_date).getDate();

            await this.apiCall.updateJob(this.jobId, this.jobObject).subscribe((res: any) => console.log(res));
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Job successfully updated!'});
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
