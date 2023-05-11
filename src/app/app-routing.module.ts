import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LangResolver } from './lang.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { lang: LangResolver } },
  { path: 'about', component: AboutComponent, resolve: { lang: LangResolver } },
  { path: ':lang', component: HomeComponent, resolve: { lang: LangResolver } },
  { path: ':lang/about', component: AboutComponent, resolve: { lang: LangResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
