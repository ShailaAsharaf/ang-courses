import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { profileModel } from 'src/app/data-model';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('file')
  file!: { nativeElement: { value: string; }; };
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
  imageUrl = 'assets/profile.jpeg';
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      displayName: [this.profileData.displayName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
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
    this.dialog.open(PopupComponent, {
      width: '300px',
      data: {
        mode: 'profileUpdated',
      },
    });
  }
  // since we are using button for upload file and hiding input type="file" we need this code to do the actions in background
  addFile() {
    let element: HTMLElement = document.getElementsByName(
      'attachmentFiles'
    )[0] as HTMLElement;
    this.file.nativeElement.value = '';
    element.click();
  }
  upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageUrl = URL.createObjectURL(event.target.files[0]);
    }
  }
  get displayName() {
    return this.profileForm.get('displayName');
  }
  get firstName() {
    return this.profileForm.get('firstName');
  }
  get about() {
    return this.profileForm.get('about');
  }
  get role() {
    return this.profileForm.get('role');
  }
}
