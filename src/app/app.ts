import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { Header } from './_components/header/header';
import { Footer } from './_components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // Signals pour piloter l'affichage
  showHeader = signal(true);
  showFooter = signal(true);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.showHeader.set(!(data['hideHeader'] === true));
      this.showFooter.set(!(data['hideFooter'] === true));
    });
  }
}
