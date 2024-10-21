import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms'; 

import { IndexedDBService } from './services/indexeddb.service'; 
import { SqliteService } from './services/sqlite.service';
import { ConnectivityService } from './services/connectivity.service';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatButtonModule, MatProgressBarModule, FormsModule,HttpClientModule], 
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  IndexedDBService, SqliteService, ConnectivityService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
