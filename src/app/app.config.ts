import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient } from '@angular/common/http'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes'
import { HeroesEffects } from './core/store/effects/heroes.effects'
import { storeHeroes } from './core/store/reducers/heroes.reducer'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideStore(storeHeroes),
        provideEffects(HeroesEffects),
        provideStoreDevtools(),
        provideHttpClient(),
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: { hasBackdrop: false },
        },
    ],
}
