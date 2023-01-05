import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {NgModule} from '@angular/core';
import {MatButtonModule} from'@angular/material/button'
import {MatTableModule} from '@angular/material/table'
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs'
import {MatCardModule} from '@angular/material/card';

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
  MatTableModule,
    MatTabsModule,
   
    ScrollingModule,
  ]
})
export class DemoMaterialModule {}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */