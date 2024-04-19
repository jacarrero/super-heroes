import { ComponentFixture, TestBed } from '@angular/core/testing'

import { provideHttpClient } from '@angular/common/http'
import {
    MAT_DIALOG_DATA,
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import 'zone.js/testing'
import { routes } from '../../../app.routes'
import { HeroesEffects } from '../../../core/store/effects/heroes.effects'
import { storeHeroes } from '../../../core/store/reducers/heroes.reducer'
import { DeleteHeroDialogComponent } from './delete-hero-dialog.component'

describe('DeleteHeroDialogComponent', () => {
    let component: DeleteHeroDialogComponent
    let fixture: ComponentFixture<DeleteHeroDialogComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeleteHeroDialogComponent, MatDialogModule],
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
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(DeleteHeroDialogComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
