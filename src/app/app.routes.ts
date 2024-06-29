import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'events', component: EventsComponent },
    { path: 'add-item', component: AddEventComponent },
    { path: 'event/:id', component: EventDetailsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
