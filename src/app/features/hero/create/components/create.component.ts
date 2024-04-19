import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { FormType } from '../../../../core/models/form-type.enum'
import { HeroFormComponent } from '../../forms/hero-form/hero-form.component'

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
        HeroFormComponent,
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
    formType = FormType
}
