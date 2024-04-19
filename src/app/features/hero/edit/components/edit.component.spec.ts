import { provideHttpClient } from '@angular/common/http'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import 'zone.js/testing'
import { routes } from '../../../../app.routes'
import { HeroesEffects } from '../../../../core/store/effects/heroes.effects'
import { storeHeroes } from '../../../../core/store/reducers/heroes.reducer'
import { EditComponent } from './edit.component'

describe('EditComponent', () => {
    let component: EditComponent
    let fixture: ComponentFixture<EditComponent>
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditComponent],
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

        fixture = TestBed.createComponent(EditComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', async () => {
        await waitForAsync(() => component)
        expect(component).toBeTruthy()
    })
})
