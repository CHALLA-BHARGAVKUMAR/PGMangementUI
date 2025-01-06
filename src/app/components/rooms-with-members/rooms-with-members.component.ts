import { Component, OnInit } from '@angular/core';
import { ApiResponse, PaginatedResponse, Room } from '../../Model/Interfaces/api-response';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms-with-members',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './rooms-with-members.component.html',
  styleUrl: './rooms-with-members.component.css'
})
export class RoomsWithMembersComponent implements OnInit {
    rooms: Room[] = [];
    selectedRoom: any | null = null; // Store the currently selected room
    pageNumber: number = 1;
    pageSize: number = 5;
    totalItems: number = 0;
    totalPages: number = 0;
  
    sortBy: string = 'RoomNumber'; // Current field to sort by
    sortDescending: boolean = false; // Current sort direction
    pageSizeOptions: number[] = [5, 10, 20, 50]; // Options for items per page
  
  // Add Member Form
  addMemberForm: FormGroup;
  showAddMemberForm: boolean = false;

  constructor(private masterService: MasterService) {
    this.addMemberForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      RoomId: new FormControl('1')
    });
  }
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
  
      this.masterService.getAllRooms(params).subscribe({
        next: (response: PaginatedResponse) => {
          this.rooms = response.data;
          this.pageNumber = response.pageNumber;
          this.pageSize = response.pageSize;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
        },
        error:(error: any) => {
          console.error('Error fetching rooms', error);
        }
      });
        
    }
  
  
    onPageChange(newPage: number): void {
      this.pageNumber = newPage;
      this.fetchRooms();
    }
  
    onPageSizeChange(): void {
      this.pageNumber = 1; // Reset to first page when page size changes
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
  
    onShowAddMemberForm(): void {
      this.showAddMemberForm = true;
    }
    onRoomClick(room: any): void {
      this.selectedRoom = room;
      
    }
    // Add Member to a Room
    onAddMember(): void {
      if (this.addMemberForm.valid) {
          const formValues = this.addMemberForm.value;  
          formValues.RoomId = parseInt(this.selectedRoom.id,10);
          debugger        
          this.masterService.addMember(formValues).subscribe({
            next:(response)=>{
              this.fetchRooms();
              this.selectedRoom?.members.push(response);
              this.showAddMemberForm = false;
              this.addMemberForm.reset();
            },
            error: (error) => {
              console.error('Error adding member', error);
            }
          })
          
        } else {
          // Handle invalid form (show messages, etc.)
          console.log("Form is invalid.");
        }
    }
  
    // Remove Member from Room
    onRemoveMember(roomId: number, memberId: number): void {
      if (confirm('Are you sure you want to remove this member from the room?')) {
        // this.masterService.removeMemberFromRoom(roomId, memberId).subscribe(
        //   (response) => {
        //     this.fetchRooms(); // Refresh room data
        //     if (this.selectedRoom) {
        //       this.selectedRoom.members = this.selectedRoom.members.filter(m => m.id !== memberId); // Remove the member from the selected room
        //     }
        //   },
        //   (error) => {
        //     console.error('Error removing member', error);
        //   }
        // );
      }
    }
  
    // Edit Room
    onEditRoom(roomId: number): void {
      const newRoomNo = prompt('Enter new Room No');
      // if (newRoomNo) {
      //   this.masterService.updateRoom(roomId, { roomNo: newRoomNo }).subscribe(
      //     (response) => {
      //       this.fetchRooms(); // Refresh room data
      //     },
      //     (error) => {
      //       console.error('Error editing room', error);
      //     }
      //   );
      // }
    }
  
    // Delete Room
    onDeleteRoom(roomId: number): void {
      if (confirm('Are you sure you want to delete this room?')) {
        this.masterService.deleteRoom(roomId).subscribe(
          (response) => {
            this.fetchRooms(); // Refresh room data
          },
          (error) => {
            console.error('Error deleting room', error);
          }
        );
      }
    }
}
