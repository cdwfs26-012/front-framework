import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../_services/login';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
})
export class Login {
  protected username: string = '';
  protected password: string = '';
  private loginService = inject(LoginService);
  private router = inject(Router);

  async loginSite(): Promise<void> {
    const isLog: boolean = await this.loginService.login(
      this.username,
      this.password
    );

    if (isLog) {
      this.router.navigate(['/catalogue']);
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  }
}
