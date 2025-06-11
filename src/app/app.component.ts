import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // IMPORTANTE
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {SideNavigationBarComponent} from './public/components/side-navigation-bar/side-navigation-bar.component';
import {ToolbarComponent} from './public/components/toolbar/toolbar.component';
import {RouterOutlet} from '@angular/router';
import {LanguageSwitcherComponent} from './public/components/language-switcher/language-switcher.component';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatSidenavContainer,
    SideNavigationBarComponent,
    RouterOutlet,
    MatSidenav,
    RouterModule,
    ToolbarComponent

  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KeepItFresh';
  mobileView = window.innerWidth < 768;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    window.addEventListener('resize', () => {
      this.mobileView = window.innerWidth < 768;
    });
  }
}
