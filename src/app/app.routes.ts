import { Routes } from '@angular/router';
import { CreateComponent } from './features/hero/create/create.component';
import { EditComponent } from './features/hero/edit/edit.component';

export const routes: Routes = [
    {
        path:'',
        loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
    },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditComponent },
];
