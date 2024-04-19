import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { FormType } from '../../../../core/models/form-type.enum'
import { HeroFormComponent } from '../../forms/hero-form/hero-form.component'

@Component({
    selector: 'app-edit',
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
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css',
})
export class EditComponent {
    formType = FormType
}
