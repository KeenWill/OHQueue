/**
 * @license
 * Copyright William Goeller. All Rights Reserved.
 * Licensed under the Apache License. See LICENSE in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
//import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(/*private analytics: AnalyticsService*/) {
  }

  ngOnInit() {
    //this.analytics.trackPageViews();
  }
}
