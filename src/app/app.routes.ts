import { Routes } from '@angular/router';
import { TablesComponent } from './pages/tables/tables.component';
import { EditComponent } from './pages/edit/edit.component';


export const routes: Routes = [ // Add `export` keyword
  { path: '', component: TablesComponent, pathMatch: 'full' },
  { path: 'edit/:id', component: EditComponent }
];
