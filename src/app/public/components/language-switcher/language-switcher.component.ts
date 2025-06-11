import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  imports: [
    MatMenuTrigger,
    MatIcon,
    MatIcon,
    MatMenuItem,
    MatButton,
    MatMenu,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent {
  protected currentLang: string = 'en';
  protected languages: string[] = ['en', 'es'];

  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang || 'en';
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = language;
  }
}
