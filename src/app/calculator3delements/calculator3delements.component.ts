import { Component, OnInit, Input } from '@angular/core';

import { trigger, transition, state, animate, style } from '@angular/animations';

// import { Calculations, User, CalculatorDefaultValues } from '../interfaces';
import { CalculationsService } from '../services/calculations.service';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireDatabase } from '@angular/fire/database';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  messagingtoken?: string;
  calculations?: Calculations;
}

export interface Calculations {
  uid?: string;
  inputWidth?: number;
  inputLength?: number;
  inputTotal?: number;
  seedCost?: number;
  seedTotal?: number;
  fertilizeCost?: number;
  fertilizeTotal?: number;
  mowCost?: number;
  mowTotal?: number;
  numSqFtPerHour?: number;
  gallonsWaterPerSqFt?: number;
  totalWaterSavings?: number;
  totalCostSavings?: number;
  totalHoursSavings?: number;
  editvars?: boolean;
  editedvars?: boolean;
}

export interface CalculatorDefaultValues {
  seedCost?: number;
  fertilizeCost?: number;
  mowCost?: number;
  numSqFtPerHour?: number;
  gallonsWaterPerSqFt?: number;
}

@Component({
  selector: 'app-calculator3delements',
  templateUrl: './calculator3delements.component.html',
  styleUrls: ['./calculator3delements.component.scss']
})
export class Calculator3delementsComponent implements OnInit {
  @Input() widgetTitle: string;
  @Input() widgetImageURL: string;
  @Input() calculatorDefaultValues: CalculatorDefaultValues;

  @Input() seedCost: number;
  @Input() fertilizeCost: number;
  @Input() mowCost: number;
  @Input() costVariance: number;

  @Input() numSqFtPerHour: number;
  @Input() gallonsWaterPerSqFt: number;

  userCalculations: Calculations;

  inputWidth: number;
  inputLength: number;
  inputTotal: number;

  seedTotal: number;
  fertilizeTotal: number;
  mowTotal: number;
  totalWaterSavings: number;
  totalCostSavings: number;
  totalHoursSavings: number;
  totalRangedSavingsLow: number;
  totalRangedSavingsHigh: number;
  editvars: boolean;
  editedvars: boolean;

  user$: Observable<any>;

  optout = false;

  showresults = true;

  constructor(
    public calculationsService: CalculationsService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public authenticationService: AuthenticationService
  ) {


    this.user$ = this.authenticationService.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {

          return this.db.object(`usercalculations/${user.uid}`).valueChanges();
          // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  ngOnInit(): void {
  }


  async updateCalculations(calculations: Calculations) {
    const user = await this.getUser();

    if (user) {
      const calculationsRef = this.db.object(`users/${user.uid}/calculations`);
      return calculationsRef.update(calculations);
    };
  }

  async userAuth(): Promise<boolean> {
    console.log('run user auth');
    const user = await this.authenticationService.getUserPromise();
    const loggedIn = !!user;

    if (!loggedIn) {
        console.log(user);
    }

    return loggedIn;
}

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async isloggedin() {

    const user = await this.authService.getUser();
    console.log(user);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  updateTotalbyWidthxLength() {
    if (this.inputWidth && this.inputLength) {
      this.inputTotal = this.inputWidth * this.inputLength;
      this.updatetotalsavingsif();
    }
  }
  updatetotalsavingsif() {
    this.updatetotalsavings();
    // this.optout);
    // if (this.isloggedin() || this.optout) {
    //   this.updatetotalsavings();
    // }
  }

  updatetotalsavings() {
    this.seedTotal = this.inputTotal * this.seedCost;
    this.fertilizeTotal = this.inputTotal * this.fertilizeCost;
    this.mowTotal = this.inputTotal * this.mowCost;

    this.totalCostSavings = this.moneyformat(this.seedTotal) + this.moneyformat(this.fertilizeTotal) + this.moneyformat(this.mowTotal);

    this.totalWaterSavings =
      this.gallonsWaterPerSqFt *
      this.inputTotal;

    this.totalHoursSavings =
      this.inputTotal
      / this.numSqFtPerHour;

      this.totalRangedSavingsLow = (
        this.moneyformat(this.seedTotal) +
        this.moneyformat(this.fertilizeTotal-(this.fertilizeTotal*this.costVariance)) +
        this.moneyformat(this.mowTotal-(this.mowTotal*this.costVariance))
      );
      this.totalRangedSavingsHigh = (
        this.moneyformat(this.seedTotal) +
        this.moneyformat(this.fertilizeTotal+(this.fertilizeTotal*this.costVariance)) +
        this.moneyformat(this.mowTotal+(this.mowTotal*this.costVariance))
      );

  }

  updateseed() {
    this.seedTotal = this.inputTotal * this.seedCost;
  }
  updatefertilizer() {
    this.fertilizeTotal = this.inputTotal * this.fertilizeCost;
  }
  updatemow() {
    this.mowTotal = this.inputTotal * this.mowCost;
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  moneyformat(num: number) {
    return Math.ceil(num * 100) / 100;
  }

  fixedformat(num: number) {
    return this.moneyformat(num).toFixed(2);
  }

  numberWithCommas(x) {
    if (x) {
      if (x.toFixed() == 0) {
        return 1;
      } else {
      return x.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    } else {
      return ' ';
    }
  }
}
