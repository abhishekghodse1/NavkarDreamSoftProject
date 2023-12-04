import { Component, ViewChild, inject } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import {Firestore} from '@angular/fire/firestore'
import {addDoc, collection} from 'firebase/firestore'
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';





@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  contactInfo: FormGroup;
  authService: any;
  studentData: any;
 


  onSubmit()
  {
    if(this.studentData.valid)
    {
     console.log(this.contactInfo.value);
    //  this.saveData()
    const studentData = this.contactInfo.value;
    this.authService.addStudent(studentData).then(() => {
      console.log('Student data added to Firestore');
    }).catch((error: any) => {
      console.error('Error adding student data to Firestore:', error);
    });
  }

    //  localStorage.setItem('studentDetails', JSON.stringify(this.contactInfo.value));

     
  }


  

  constructor(private fb: FormBuilder,firestore: AngularFirestore) {
    

    this.contactInfo = this.fb.group({
      id: [this.generateId()],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      registrationfees: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      collegefees: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      examfees: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      totalfees: [{ value: '', disabled: true }, [Validators.required]],
      mobilno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      passingYear: ['', [Validators.required]],
    
    });

    this.contactInfo.get('registrationfees')?.valueChanges.subscribe(() => this.updateTotalFees());
    this.contactInfo.get('collegefees')?.valueChanges.subscribe(() => this.updateTotalFees());
    this.contactInfo.get('examfees')?.valueChanges.subscribe(() => this.updateTotalFees());
    this.contactInfo.get('passingYear')?.valueChanges.subscribe(() => this.updateTotalFees());

  }

  generateId(): string {
    
    return new Date().getTime().toString();
  }

  updateTotalFees() {
    const registrationfees = this.contactInfo.get('registrationfees')?.value || 0;
    const collegefees = this.contactInfo.get('collegefees')?.value || 0;
    const examfees = this.contactInfo.get('examfees')?.value || 0;

    const totalfees = registrationfees + collegefees + examfees;
    console.log('Total Fees:', totalfees);      
    this.contactInfo.get('totalfees')?.setValue(totalfees);
    
  }




  
}



