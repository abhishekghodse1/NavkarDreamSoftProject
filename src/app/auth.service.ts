import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

import {Firestore} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firestore: any;

  constructor(private fireauth :AngularFireAuth ) {
    this.firestore = this.firestore;
   }

  
    addStudent(studentData: any) {
      return this.firestore.collection('StudentData').add(studentData);
    }



}
