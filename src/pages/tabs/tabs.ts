import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { NewMediaPage } from '../new-media/new-media';
import { SearchPage } from '../search/search';
import { FollowContentPage } from '../follow-content/follow-content';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabNewMedia = NewMediaPage;
  tabSearch = SearchPage;
  tabFollow = FollowContentPage;
  tabAbout = AboutPage;

  constructor() {

  }
}
