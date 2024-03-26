import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyCount++;
    this.spinnerService.show(undefined, {
      type: "line-scale-party",
      bdColor: "rgb(255,255,255,0)",
      color: "#333333"
    });
  }

  idel() {
    this.busyCount--;
    if(this.busyCount <= 0) {
      this.busyCount = 0;
      this.spinnerService.hide();
    }
    
  }
}
