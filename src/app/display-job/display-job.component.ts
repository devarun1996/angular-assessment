import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-display-job',
  templateUrl: './display-job.component.html',
  styleUrls: ['./display-job.component.scss']
})
export class DisplayJobComponent implements OnInit {

  constructor(private apiCall: ApiCallService) { }

  jobData = [];

  ngOnInit(): void {
    this.getJobData();
  }
  
  getJobData() {

    try{
        this.apiCall.getJobs().subscribe((res: any) => {
        this.jobData = res;
      });
    } catch (err) {
      console.error(err);
    }
  }

}
