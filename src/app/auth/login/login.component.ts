import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;

  authStatusSub : Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(){
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authRes=>{
    this.isLoading = false;
   });
  }
  ngOnDestroy(){
  this.authStatusSub.unsubscribe();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
