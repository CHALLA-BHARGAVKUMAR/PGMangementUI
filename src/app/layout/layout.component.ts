import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private router:Router,private authService:AuthService){}
OnLogOut() {
this.authService.clearStorage()
this.router.navigate(['/login']);
}

}
