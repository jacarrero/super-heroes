import { Component } from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Hero } from '../../../../core/models/hero.model'
import { HeroesForm } from '../../../../core/models/heroes-form.model'
import { SnackbarService } from '../../../../core/services/snackbar/snackbar.service'
import { createHero } from '../../../../core/store/actions/heroes.actions'

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatButtonModule,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    templateUrl: './create.component.html',
    styleUrl: './create.component.css',
})
export class CreateComponent {
    createForm = new FormGroup<HeroesForm>({
        id: new FormControl(undefined, { nonNullable: true }),
        name: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
        age: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
        city: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
        fly: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
    })

    constructor(
        private router: Router,
        private store: Store,
        private snackbarService: SnackbarService
    ) {}

    onSubmit(ev: Event) {
        const formValue = this.createForm.getRawValue()
        if (this.createForm.valid) {
            this.store.dispatch(createHero({ hero: formValue as Hero }))
        } else {
            this.snackbarService.openSnackbar(
                'Debe rellenar todos los campos',
                'error'
            )
        }
        ev.preventDefault()
    }

    navigateToHome() {
        this.router.navigate(['/'])
    }

    resetCreateForm() {
        this.createForm.reset({
            id: undefined,
            name: undefined,
            age: undefined,
            city: undefined,
            fly: undefined,
        })
    }
}
