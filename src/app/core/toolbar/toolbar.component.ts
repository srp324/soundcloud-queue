import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  public user: firebase.User;

  constructor(public loginDialog: MatDialog, public firebase: FirebaseService) { }

  ngOnInit() {
  }

  isLoggedIn() {
    const currentUser = this.firebase.getCurrentUser();
    if (currentUser) {
      this.user = currentUser;
      return true;
    }
    else
      return false;
  }

  openDialog() {
    this.loginDialog.open(LoginDialogComponent)
    .afterClosed()
    .subscribe(response => {
      this.user = response;
    });
  }
}

@Component({
  selector: 'app-login-dialog',
  template: '<ngx-auth-firebaseui [guestEnabled]="true" [providers]="[\'google\']" (onSuccess)="saveUser($event)"></ngx-auth-firebaseui>'
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  saveUser($event: any): void {
    this.dialogRef.close($event);
  }

}
