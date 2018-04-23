import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Share } from '../../app/shared/models/share';
import { ShareService } from '../../app/services/share';
import { ToastComponent } from '../../app/shared/toast/toast';
import { AuthService } from '../../app/services/auth';

// import * as $ from 'jquery';
// import * as d3 from 'd3';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.html'
  // styleUrls: ['./shares.css']
})

export class SharesPage implements OnInit {

  isLoading = true;
  editing = false;

  share = new Share();
  shares: Share[] = [];

  addShareForm: FormGroup;
  currentUser = this.auth.currentUser.username;
  user = new FormControl(this.auth.currentUser.username);
  tickerName = new FormControl('', Validators.required);
  shareNum = new FormControl('', Validators.required);
  cost = new FormControl('', Validators.required);

  constructor(private shareService: ShareService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService) { }

  ngOnInit() {
    this.editing = false;
    this.getShares();
    this.resetShareForm();
  }

  getShares() {
    this.shareService.getShares(this.currentUser).subscribe(
      data => {
          this.shares = data;
          console.log(data);
          for(let share of this.shares){
            this.getPrice(share);
          };
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getPrice(share: Share){
    this.shareService.getPrice(share).subscribe(
      data => {
          console.log("Current price for " + share.tickerName + " is: " + data);
          share.currentPrice = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  resetShareForm(){
    this.user = new FormControl(this.auth.currentUser.username);

    this.addShareForm = this.formBuilder.group({
      user: this.auth.currentUser.username,
      tickerName: this.tickerName,
      shareNum: this.shareNum,
      cost: this.cost
    });

  }

  addShare() {
    this.shareService.addShare(this.addShareForm.value).subscribe(
      res => {
        this.shares.push(res);
        this.resetShareForm();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
    console.log(this.addShareForm.value);
    this.getShares();
  }

  enableEditing(share: Share) {
    this.editing = true;
    this.share = share;
  }

  cancelEditing() {
    this.editing = false;
    this.share = new Share();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the shares to reset the editing
    this.ngOnInit();
  }

  editShare(share: Share) {
    this.shareService.editShare(share).subscribe(
      () => {
        this.editing = true;
        this.share = share;
        this.editing = false;
        this.ngOnInit();
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteShare(share: Share) {
    if (window.confirm('Are you sure you want to delete this stock from your portfolio?')) {
      this.shareService.deleteShare(share).subscribe(
        () => {
          const pos = this.shares.map(elem => elem._id).indexOf(share._id);
          this.shares.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
