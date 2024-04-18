import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
    },
    {
        path: 'create',
        loadChildren: () =>
            import('./features/hero/create/create.routes').then(
                (m) => m.CREATE_ROUTES
            ),
    },
    {
        path: 'edit/:id',
        loadChildren: () =>
            import('./features/hero/edit/edit.routes').then(
                (m) => m.EDIT_ROUTES
            ),
    },
]
