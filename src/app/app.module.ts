import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { HomeComponent } from './ui/home/home.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { HeaderComponent } from './common/header/header.component';
import { MenuItemComponent } from './common/header/menu-item/menu-item.component';

import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { ValueService } from './services/value.service';
import { TokenService } from './services/token.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DeviceService } from './services/device.service';
import { MenuService } from './services/menu.service';
import { GamesComponent } from './ui/games/games.component';
import { ZSurvivalComponent } from './games/z-survival/z-survival.component';
import { ZMainComponent } from './games/z-survival/ui/z-main/z-main.component';
import { ZBottomMenuComponent } from './games/z-survival/common/z-bottom-menu/z-bottom-menu.component';
import { ZBottomMenuItemComponent } from './games/z-survival/common/z-bottom-menu/z-bottom-menu-item/z-bottom-menu-item.component';
import { ZHideComponent } from './games/z-survival/ui/z-main/z-hide/z-hide.component';
import { ZMainHeaderComponent } from './games/z-survival/common/z-main-header/z-main-header.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'z-survival', component: ZSurvivalComponent,
    children: [
        { path: '' },
        { path: 'login', component: LoginComponent },
        { path: 'main',  component: ZMainComponent,
          children: [
            { path: '' },
            { path: 'hide', component: ZHideComponent },

          ]
        },
        { path: 'home',  component: HomeComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    RegisterComponent,
    MenuItemComponent,
    GamesComponent,
    GamesComponent,
    ZSurvivalComponent,
    ZMainComponent,
    ZBottomMenuComponent,
    ZBottomMenuItemComponent,
    ZHideComponent,
    ZMainHeaderComponent
  ],
  imports: [
    AlertModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService, AuthService, ValueService, TokenService, CookieService, DeviceService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
