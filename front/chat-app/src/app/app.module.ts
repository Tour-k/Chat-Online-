import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccueilComponent } from './accueil/accueil.component';
import { LoginWithAccountComponent } from './login-with-account/login-with-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ChannelComponent } from './channel/channel.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const config : SocketIoConfig = {  url: 'http://localhost:8988', options: {} }; 

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginWithAccountComponent,
    CreateAccountComponent,
    ChannelComponent,
    UserProfileComponent,
    FourOhFourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
