import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingComponent } from "./loading/loading.component";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@NgModule({
    declarations: [
        LoadingComponent,
        ConfirmDialogComponent,
        AlertDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatListModule
    ],
    exports: [
        LoadingComponent,
        ConfirmDialogComponent,
        AlertDialogComponent,
        CommonModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule
    ]
})
export class SharedModule {
}