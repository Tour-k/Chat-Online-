import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginWithAccountComponent } from './login-with-account/login-with-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ChannelComponent } from './channel/channel.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';


const routes: Routes = [
  {path: 'login-with-account', component: LoginWithAccountComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: 'channel', component: ChannelComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'user-profile', component: UserProfileComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
