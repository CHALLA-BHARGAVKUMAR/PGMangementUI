import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MasterService } from '../../services/master.service';
import { PaginatedResponse, Room } from '../../Model/Interfaces/api-response';

@Component({
  selector: 'app-members',
  imports: [CommonModule,FormsModule,MatPaginatorModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit{
  rooms: Room[] = [];
  pageNumber: number = 1;
  pageSize: number = 5; // Default page size
  pageSizeOptions: number[] = [5, 10, 20, 50]; // Available page sizes
  totalItems: number = 0;
  totalPages: number = 0;

  sortBy: string = 'RoomNumber'; // Current field to sort by
  sortDescending: boolean = false; // Current sort direction

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms(): void {
    const params = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDescending: this.sortDescending,
    };

    this.masterService.getAllRooms(params).subscribe(
      (response: PaginatedResponse) => {
        this.rooms = response.data;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
      },
      (error: any) => {
        console.error('Error fetching rooms', error);
      }
    );
  }

  onPageChange(newPage: number): void {
    this.pageNumber = newPage;
    this.fetchRooms();
  }

  onPageSizeChange(): void {
    this.pageNumber = 1; // Reset to the first page
    this.fetchRooms();
  }

  onSort(field: string): void {
    if (this.sortBy === field) {
      this.sortDescending = !this.sortDescending; // Toggle sort direction
    } else {
      this.sortBy = field; // Set new field to sort by
      this.sortDescending = false; // Default to ascending order
    }
    this.fetchRooms(); // Fetch sorted data
  }
}