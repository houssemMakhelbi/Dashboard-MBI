import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToastrModule} from "ngx-toastr";

import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ProductsComponent} from "./pages/products/products.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { CategoriesComponent } from './pages/categories/categories.component';
import { SlideComponent } from './pages/slide/slide.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProductsComponent,
    CategoriesComponent,
    SlideComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule,
    NgbPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
