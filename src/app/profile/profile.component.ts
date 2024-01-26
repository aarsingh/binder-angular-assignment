import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class profileComponent implements OnInit  {
  userForm: FormGroup;
  profileImageUrl: string = 'default-profile-image.jpg';

  areasOfInterest = [
    { id: 1, name: 'Interest 1' },
    { id: 2, name: 'Interest 2' },
    { id: 3, name: 'Interest 3' }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      aboutYourself: ['', Validators.maxLength(100)],
      areasOfInterest: [[]],
      isStudent: [true],
      experience: [''],
      expertise: [''],
      role: ['', Validators.maxLength(200)]
    });

    // Load user data from local storage
    const userData = localStorage.getItem('userData');
    this.profileImageUrl = localStorage.getItem('profileImageUrl') || 'default-profile-image.jpg';
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userForm.setValue(parsedUserData);
      // this.profileImageUrl = parsedUserData.profileImageUrl || 'default-profile-image.jpg';
    }
  }

  openImageUploader(): void {
    // code to open image uploader
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      // Save user data to local storage
      const userData = { ...this.userForm.value, profileImageUrl: this.profileImageUrl };
      localStorage.setItem('userData', JSON.stringify(userData));
      alert('Your profile is updated.');
    }
  }

  onImageChange(files: FileList): void {
    const file = files.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.profileImageUrl = event.target.result;
        localStorage.setItem('profileImageUrl', this.profileImageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  /*
  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
        localStorage.setItem('profileImageUrl', this.profileImageUrl);
      };
      reader.readAsDataURL(file);
    }
  }
  */

  ngOnDestroy(): void {
    // Save user image to local storage when component is destroyed
    localStorage.setItem('profileImageUrl', this.profileImageUrl);
  }
}







