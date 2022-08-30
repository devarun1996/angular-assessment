import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  url = 'http://localhost:3000/jobs';

  constructor(private http: HttpClient) { }

  getJobs(): any {
    return this.http.get(this.url);
  }
  
  getJobById(jobId: number): any {
    return this.http.get(this.url + `/${jobId}`);
  }

  createJob(jobObject: any): any {
    return this.http.post(this.url, jobObject);
  }

  updateJob(jobId: number, jobObject: any): any {
    return this.http.put(this.url + `/${jobId}`, jobObject);
  }
}
