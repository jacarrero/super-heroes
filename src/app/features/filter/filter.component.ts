import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FilterForm } from '../../core/models/filter-form.model';
import { filterHeros, initDataHero } from '../../core/store/actions/heroes.actions';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filterForm = new FormGroup<FilterForm>({
    name: new FormControl(undefined, {nonNullable: true}),
    age: new FormControl(undefined, {nonNullable: true}),
    city: new FormControl(undefined, {nonNullable: true}),
    fly: new FormControl(undefined, {nonNullable: true})
  });

  constructor(private store: Store, private router: Router) {}

  navigateToCreateHero(){
    this.router.navigate(['create']);
  }

  search(ev: Event) {
    const formValue = this.filterForm.getRawValue();
    this.store.dispatch(filterHeros({filterForm: formValue}));
    ev.preventDefault();
  }

  reset() {
    this.filterForm.reset();
    this.store.dispatch(initDataHero());
  }
}
