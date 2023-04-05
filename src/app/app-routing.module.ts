import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './registration/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignonComponent } from './registration/signon/signon.component';

const routes: Routes = [
{
  path: '', redirectTo: 'login', pathMatch: 'full'
},
{
  path: 'login', component: LoginComponent,
},
{
  path: 'signon', component: SignonComponent,
},
{
  path: 'user',
  loadChildren: () => import('./user/user.module')
    .then(m => m.UserModule),
}, 
{
  path: '404', component: NotFoundComponent,
},
{
  path: '**', redirectTo: '/404',
}];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
