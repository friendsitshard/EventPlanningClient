import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  addEventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private axiosService: AxiosService
  ) {
    this.addEventForm = new FormGroup({
      EventName: new FormControl(''),
      EventCapacity: new FormControl(''),
      EventDate: new FormControl(''),
      EventLocation: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.addEventForm = this.formBuilder.group({
      EventName: ['', Validators.required],
      EventCapacity: ['', [Validators.required, Validators.min(1)]],
      EventDate: ['', Validators.required],
      EventLocation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addEventForm.valid) {
      const eventDto = {
        EventName: this.addEventForm.get('EventName')?.value,
        EventCapacity: this.addEventForm.get('EventCapacity')?.value,
        EventDate: this.addEventForm.get('EventDate')?.value,
        EventLocation: this.addEventForm.get('EventLocation')?.value
      };

      this.axiosService.addEvent('https://localhost:44399/api/Events/post', eventDto).subscribe({
        next: (data) => {
          console.log('Event added successfully', data);
          this.router.navigate(['/events']); 
        },
        error: (error) => {
          console.error('Error adding event', error);
        }
      });
    }
  }
}
