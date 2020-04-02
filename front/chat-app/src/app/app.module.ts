import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AccueilComponent } from './accueil/accueil.component';
import { LoginWithAccountComponent } from './login-with-account/login-with-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { RoomListComponent } from './room-list/room-list.component';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { AppComponent } from './app.component';
import { BtnsNavComponent } from './btns-nav/btns-nav.component';

import { Room } from 'src/models/room';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoxInputMessageComponent } from './box-input-message/box-input-message.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';





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
    BoxInputMessageComponent,
    BtnsNavComponent
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
    ScrollingModule,
    HttpClientModule,
    AvatarModule
  ],
  providers: [CookieService, ChatService, Room, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
