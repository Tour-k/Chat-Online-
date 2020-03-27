import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ChatService } from './services/chat.service';


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
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    SocketIoModule.forRoot(config)
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
