import { Routes } from '@angular/router'
import { FormType } from './core/models/form-type.enum'

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
    },
    {
        path: 'create',
        data: { type: FormType.CREATE },
        loadChildren: () =>
            import('./features/hero/forms/hero-form.routes').then(
                (m) => m.HERO_FORM_ROUTES
            ),
    },
    {
        path: 'edit/:id',
        data: { type: FormType.EDIT },
        loadChildren: () =>
            import('./features/hero/forms/hero-form.routes').then(
                (m) => m.HERO_FORM_ROUTES
            ),
    },
]
