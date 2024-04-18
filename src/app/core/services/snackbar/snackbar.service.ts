import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {}

    openSnackbar(message: string, messageType: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            panelClass: [
                messageType === 'error' ? 'error-snackbar' : 'info-snackbar',
            ], // Clase CSS según el tipo de mensaje
        })
    }
}
