import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../components/confirm-dialog/confirm-dialog.component';
import { CommonError } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  success(message: string, duration = environment.defaultAlertTimeout) {
    this.openSnackBar(message, ['alert-success'], duration);
  }

  error(
    error: string | CommonError,
    duration = environment.defaultAlertTimeout
  ) {
    let message: string;
    if (typeof error === 'string') {
      message = error;
    } else {
      if (error.title) message = `${error.title} - ${error.message}`;
      else message = error.message;
    }
    this.openSnackBar(message, ['alert-error'], duration);
  }

  warning(
    message: string,
    duration: number = environment.defaultAlertTimeout
  ): void {
    this.openSnackBar(message, ['alert-warning'], duration);
  }

  private openSnackBar(
    message: string,
    panelClass: string[],
    duration: number
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass,
      politeness: 'assertive',
    };
    this.snackBar.open(message, 'OK', config);
  }

  confirm(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      maxWidth: '96vw',
      data,
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }
}
