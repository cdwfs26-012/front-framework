import { Routes } from '@angular/router';


// Pour crée des sous routes, crée un fichier dans la _page/nom-de-la-page/nom-de-la-page.routes.ts avec la meme structure que ce fichier
// Dans ce fichier ajouter une routes /catalogue qui load la route catalogue.routes.ts
// Les urls seront donc /catalogue/sous-route
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./_pages/home/home').then(m => m.Home),
    data: { hideHeader: false, hideFooter: true }
  },
  {
    path: 'my-box',
    loadComponent: () => import('./_pages/my-box/my-box').then(m => m.MyBox),
    data: { hideHeader: false, hideFooter: false }
  },
  {
    path: 'catalogue',
    loadComponent: () =>
      import('./_pages/catalogue/catalogue').then(m => m.Catalogue),
    data: { hideHeader: false, hideFooter: false }
  },
  {
    path: 'product/:lang/:livraison/:categorie/:slug',
    loadComponent: () =>
      import('./_pages/product/product').then(m => m.Product),
    data: { hideHeader: false, hideFooter: false }
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./_pages/cart/cart').then(m => m.CartComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./_pages/login/login').then(m => m.Login)
  },

  {
    path: '404',
    loadComponent: () =>
      import('./_pages/error/error404/error404').then(m => m.Error404)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
