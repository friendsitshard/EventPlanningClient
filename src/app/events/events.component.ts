import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AxiosService } from '../services/axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgFor],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private axiosService: AxiosService, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.axiosService.getEvents('https://localhost:44399/api/Events', this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.events = data.Events;
        this.totalItems = data.TotalEvents;
        this.totalPages = data.TotalPages;
      },
      error: (error) => {
        console.error('Error fetching events', error);
      }
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadEvents();
  }

  goToEvent(eventId: number): void {
    this.router.navigate(['/event', eventId]);
  }
}
