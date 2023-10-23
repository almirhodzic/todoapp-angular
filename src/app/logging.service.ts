import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  log(msg: any) {
    console.log(new Date() + ": " + JSON.stringify(msg));
  }
}
