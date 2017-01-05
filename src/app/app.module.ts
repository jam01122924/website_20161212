import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule, CarouselModule, AccordionModule, DropdownModule, ProgressbarModule } from 'ng2-bootstrap/ng2-bootstrap';

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

// Z-Survival Game:
import { ZSurvivalComponent } from './games/z-survival/z-survival.component';
import { ZMainComponent } from './games/z-survival/ui/z-main/z-main.component';
import { ZBottomMenuComponent } from './games/z-survival/common/z-bottom-menu/z-bottom-menu.component';
import { ZBottomMenuItemComponent } from './games/z-survival/common/z-bottom-menu/z-bottom-menu-item/z-bottom-menu-item.component';
import { ZHideComponent } from './games/z-survival/ui/z-main/z-hide/z-hide.component';
import { ZMainHeaderComponent } from './games/z-survival/common/z-main-header/z-main-header.component';
import { SelfieComponent } from './common/selfie/selfie.component';
import { HeaderUserStatusComponent } from './common/header/header-user-status/header-user-status.component';
import { OpenTaleComponent } from './games/z-survival/ui/open-tale/open-tale.component';
import { CharacterCreateComponent } from './games/z-survival/ui/character-create/character-create.component';
import { StartMenuComponent } from './games/z-survival/ui/start-menu/start-menu.component';
import { ZConfirmPanelComponent } from './games/z-survival/common/z-confirm-panel/z-confirm-panel.component';

import { MainPipe } from './games/z-survival/common/directives/pipe/main.pipe';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'z-survival', component: ZSurvivalComponent,
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'start-menu', component: StartMenuComponent },
        { path: 'open-tale', component: OpenTaleComponent },
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
    ZMainHeaderComponent,
    SelfieComponent,
    HeaderUserStatusComponent,
    OpenTaleComponent,
    CharacterCreateComponent,
    StartMenuComponent,
    ZConfirmPanelComponent
  ],
  imports: [
    AlertModule,
    CarouselModule,
    AccordionModule,
    DropdownModule,
    ProgressbarModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MainPipe
  ],
  providers: [HttpService, AuthService, ValueService, TokenService, CookieService, DeviceService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
