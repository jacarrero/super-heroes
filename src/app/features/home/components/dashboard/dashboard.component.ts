import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Hero } from '../../../../core/models/hero.model'
import { HeroesService } from '../../../../core/services/heroes/heroes.service'
import {
    deleteHero,
    loadHeroesData,
} from '../../../../core/store/actions/heroes.actions'
import {
    selectHeroesData,
    selectLoading,
} from '../../../../core/store/selectors/heroes.selector'
import { CapitalizeFirstLetterPipe } from '../../../../shared/pipes/capitalize-first-letter.pipe'
import { DeleteHeroDialogComponent } from '../../../dialogs/delete-hero-dialog/delete-hero-dialog.component'

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatTableModule,
        HttpClientModule,
        MatIconModule,
        DeleteHeroDialogComponent,
        MatButtonModule,
        CapitalizeFirstLetterPipe,
        MatProgressSpinnerModule,
        CommonModule,
    ],
    providers: [HeroesService],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    displayedColumns: string[] = ['name', 'age', 'city', 'fly', 'actions']
    tableData: Hero[] = []
    heroes$: Observable<Hero[]>
    loading$: Observable<boolean>
    dataSource = new MatTableDataSource()
    constructor(
        private store: Store,
        public dialog: MatDialog,
        private router: Router
    ) {
        this.heroes$ = this.store.pipe(select(selectHeroesData))
        this.loading$ = this.store.pipe(select(selectLoading))
    }

    ngOnInit(): void {
        this.store.dispatch(loadHeroesData())
        this.heroes$.subscribe((data) => (this.dataSource.data = [...data]));
    }

    openDeleteHeroDialog(hero: Hero) {
        this.dialog
            .open(DeleteHeroDialogComponent, {
                data: hero.name,
            })
            .afterClosed()
            .subscribe((confirm: Boolean) => {
                if (confirm) {
                    this.store.dispatch(deleteHero({ id: hero.id }))
                } else {
                    this.dialog.closeAll()
                }
            })
    }

    editHero(hero: Hero): void {
        this.router.navigate(['/edit', hero.id], { state: { hero } })
    }
}
