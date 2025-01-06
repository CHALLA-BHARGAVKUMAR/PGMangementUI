import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private masterService:MasterService,private router:Router,private authService: AuthService){
    this.loginForm = new FormGroup({        
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  

  ngOnInit(): void {
    this.authService.clearStorage()
  }

  onLogin(){
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;  

      this.authService.login(formValues).subscribe({
        next:(response)=>{
          if(response.success){
            this.authService.saveToken(response.token)
            debugger;
            this.router.navigate([''])
          }
          else{
            this.router.navigate(['/login'])
          }
          
        },
        error: (error) => {
           var msg =error.error.error.at(0).messages.at(0)
          console.error(msg);
        }
      })
      
    } else {
      // Handle invalid form (show messages, etc.)
      console.log("Form is invalid.");
    }
  }
}
