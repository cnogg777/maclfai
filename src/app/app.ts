import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('paes-lenguaje-app');

  isLogged: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // 👇 SOLO si estás en navegador
    if (typeof window !== 'undefined') {
      this.isLogged = !!localStorage.getItem('usuario');
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuario');
    }

    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}