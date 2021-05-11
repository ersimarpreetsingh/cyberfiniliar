import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtworkComponent } from './pages/artwork/artwork.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'home', component : HomeComponent},
  {path:'artwork', component : ArtworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
