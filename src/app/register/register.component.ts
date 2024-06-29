import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private axiosService: AxiosService
  ) {
    this.registerForm = new FormGroup({
      Email: new FormControl(''),
      Password: new FormControl(''),
      ConfirmPassword: new FormControl(''),
      acceptTerms: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(6)
      ]],
      ConfirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: this.mustMatch('Password', 'ConfirmPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userDetails = {
        Email: this.registerForm.get('Email')?.value,
        Password: this.registerForm.get('Password')?.value,
        ConfirmPassword: this.registerForm.get('ConfirmPassword')?.value
      };

      this.axiosService.register('https://localhost:44399/api/Account/Register', userDetails).subscribe({
        next: (data) => {
          console.log('Registration successful', data);
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error('Registration error', error);
          
        }
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
