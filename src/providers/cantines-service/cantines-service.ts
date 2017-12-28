import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CantinesServiceProvider {

  private cantinesEndpoint = 'http://services.web.ua.pt/sas/ementas?date=day&place=santiago&format=json';
  
  constructor(public http: Http) {
    console.log('Hello CantinesServiceProvider Provider');
  }

  getCurrent(): Promise<any> {
    //let url: string = this.makeDataURL('weather');
    let url: string = this.makeDataURL("nothing"); 
    return this.http.get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  
  private makeDataURL(command: string): string {
    //Build a weather service URL using the command string and
    //location data that we have.
    let uri = this.cantinesEndpoint;  //+ command;
    return uri;
  }
  
  //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
  private extractData(res: Response) {
    //Convert the response to JSON format
    let body = res.json();
    //console.log(body); 
    //Return the data (or nothing)
    return body || {};
  }
  
  //'Borrowed' from //https://angular.io/docs/ts/latest/guide/server-communication.html
  private handleError(res: Response | any) {
    console.error('Entering handleError');
    console.dir(res);
    return Promise.reject(res.message || res);
  }

}
