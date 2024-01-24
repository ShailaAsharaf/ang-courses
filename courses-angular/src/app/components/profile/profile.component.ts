import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { profileModel } from 'src/app/data-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profileData: profileModel = {
    id: '',
    displayName: '',
    firstName: '',
    lastName: '',
    about: '',
    interest: '',
    professional: '',
    experience: '',
    expertise: '',
    role: '',
    url: '',
    type: '',
  }
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      displayName: [this.profileData.displayName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
        ]
      ],
      firstName: [this.profileData.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
        ]
      ],
      lastName: [this.profileData.lastName],
      about: [this.profileData.about, Validators.maxLength(100)],
      interest: [this.profileData.about],
      professional: [this.profileData.professional],
      experience: [this.profileData.experience],
      expertise: [this.profileData.expertise],
      role: [this.profileData.role, Validators.maxLength(200)],
    })
  }
  onSUbmit(){

  }
  get displayName() {
    return this.profileForm.get('displayName');
  }
}
