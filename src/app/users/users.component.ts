import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    HomeComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users:number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  userId:number = 0;
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
}
