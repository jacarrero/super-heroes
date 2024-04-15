import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-hero-dialog',
  standalone: true,
  imports: [
    MatDialogActions, 
    MatDialogContent, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './delete-hero-dialog.component.html',
  styleUrl: './delete-hero-dialog.component.css'
})
export class DeleteHeroDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ){

  }

  closeModal(){
    this.dialogRef.close();
  }
}
