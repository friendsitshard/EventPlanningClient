import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private axiosService: AxiosService
  ) {
    this.myForm = new FormGroup({
      Email: new FormControl(''),
      Password: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const credentials = {
        Email: this.myForm.get('Email')?.value,
        Password: this.myForm.get('Password')?.value
      };

      this.axiosService.login('https://localhost:44399/api/Account/Login', credentials).subscribe({
        next: (data) => {
          console.log('Login successful', data);
          this.router.navigate(['/events']);
        },
        error: (error) => {
          console.error('Login error', error);
        }
      });

      this.axiosService.getData('https://localhost:44399/api/Events').subscribe({
        next: (data) => {
          console.log('Data fetched successfully', data);
          this.data = data;
        },
        error: (error) => {
          console.error('Error fetching data', error);
        }
      });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
