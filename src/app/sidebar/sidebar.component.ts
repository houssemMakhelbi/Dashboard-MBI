import {Component, OnInit} from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
/*
  {path: '/dashboard', title: 'Tableau de board', icon: 'nc-bank', class: ''},
*/
  {path: '/products', title: 'Produits', icon: 'nc-bag-16', class: ''},
  {path: '/categories', title: 'Catégories', icon: 'nc-box', class: ''},
/*
  {path: '/notifications', title: 'Notifications', icon: 'nc-bell-55', class: ''},
*/
/*
  {path: '/user', title: 'User Profile', icon: 'nc-single-02', class: ''},
*/
  {path: '/table', title: 'Les commandes', icon: 'nc-app', class: ''}
/*
  {path: '/typography', title: 'Typography', icon: 'nc-caps-small', class: ''},
*/
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
