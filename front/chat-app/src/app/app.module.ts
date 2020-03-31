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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { RoomListComponent } from './room-list/room-list.component';
import { Room } from 'src/models/room';
import { MessageComponent } from './message/message.component';
import {UserService} from './services/user.service';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoxInputMessageComponent } from './box-input-message/box-input-message.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';


const config: SocketIoConfig = {  url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginWithAccountComponent,
    CreateAccountComponent,
    UserProfileComponent,
    FourOhFourComponent,
    AppComponent,
    ChatComponent,
    RoomListComponent,
    MessageComponent,
    BoxInputMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    SocketIoModule.forRoot(config),
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    FlexLayoutModule,
    MatIconModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatCardModule,
    ScrollingModule
  ],
  providers: [ChatService, Room, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
