// Importaciones necesarias para el componente
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    //  SOLO en navegador
    if (typeof window !== 'undefined') {
      const usuario = localStorage.getItem('usuario');

      if (usuario) {
        this.router.navigate(['/home']);
      }
    }
  }

  login() {
    if (this.email === 'admin@paes.cl' && this.password === '1234') {

      //  SOLO en navegador
      if (typeof window !== 'undefined') {
        localStorage.setItem('usuario', this.email);

        // puedes usar cualquiera de las dos:
        // opción 1 (recomendada ahora mismo)
        window.location.href = '/home';

        // opción 2 (cuando tengamos AuthService)
        // this.router.navigate(['/home']);
      }

    } else {
      this.error = 'Correo o contraseña incorrectos';
    }
  }
}
