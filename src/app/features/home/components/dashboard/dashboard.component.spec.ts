import { ComponentFixture, TestBed } from '@angular/core/testing'

import { provideHttpClient } from '@angular/common/http'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from '../../../../app.routes'
import { HeroesEffects } from '../../../../core/store/effects/heroes.effects'
import { storeHeroes } from '../../../../core/store/reducers/heroes.reducer'
import { DashboardComponent } from './dashboard.component'

describe('DashboardComponent', () => {
    let component: DashboardComponent
    let fixture: ComponentFixture<DashboardComponent>
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
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
        }).compileComponents()

        fixture = TestBed.createComponent(DashboardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
