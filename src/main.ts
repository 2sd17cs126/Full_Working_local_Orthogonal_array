import './polyfills';
import { ModalModule } from './app/_modal/modal.module'
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';

import {ExpansionOverviewExample} from './app/expansion-overview-example';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    
    ReactiveFormsModule,
    ModalModule,
  ],
  entryComponents: [ExpansionOverviewExample],
  declarations: [ExpansionOverviewExample],
  bootstrap: [ExpansionOverviewExample],
  providers: []
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */