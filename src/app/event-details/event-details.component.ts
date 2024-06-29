import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  event: any;

  constructor(private route: ActivatedRoute, private axiosService: AxiosService) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.axiosService.getData(`https://localhost:44399/api/Events/${eventId}`).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (error) => {
        console.error('Error fetching event details', error);
      }
    });
  }
}
