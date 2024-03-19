import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  @Input() userResourceData: any;

  model: any = {};

  constructor(private accountService: AccountService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    
  }

  register() {
    this.accountService.register(this.model).subscribe((data) => {
      this.cancel();
    },
    error => this.toastr.error(error.error))
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
