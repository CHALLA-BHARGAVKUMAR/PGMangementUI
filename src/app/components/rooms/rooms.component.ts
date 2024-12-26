import { AsyncPipe, CommonModule } from '@angular/common';
import { Component,OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ApiResponse, RoomList } from '../../Model/Interfaces/api-response';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, timeInterval } from 'rxjs';
declare var bootstrap: any;
@Component({
  selector: 'app-rooms',
  standalone:true,
  imports: [AsyncPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{

  constructor(private masterService:MasterService,private cdr: ChangeDetectorRef){

  }
  roomsList$: Observable<RoomList[]> =new Observable<RoomList[]>();
  loading=true;
  showSuccessMessage:boolean=false;
  showErrorMessage:boolean=false;
  addRoomForm: FormGroup = new FormGroup({
    roomNo: new FormControl('', Validators.required),
    roomType: new FormControl('', Validators.required)

  });
  
  ngOnInit(): void {
    this.getAllRooms()
        
  }

selectedRoom: any = null;

getAllRooms(){
  this.roomsList$=this.masterService.getAllRooms().pipe(map((response: ApiResponse) => response.result));
  this.loading=false;
}


addRoom(){
  if (this.addRoomForm.valid) {
    const formValues = this.addRoomForm.value;
     formValues.roomType = parseInt(formValues.roomType, 10);
    this.masterService.addRoom(formValues).subscribe((res:ApiResponse)=>{
      if(res.result==true){
        this.showSuccessMessage=true;
        setTimeout(() => { this.showSuccessMessage=false;this.closeRoomModal(); }, 2000);
        
        this.getAllRooms()
        this.addRoomForm.reset();
      }
      else{
        this.showErrorMessage=true;
      }
    })
    
  } else {
    // Handle invalid form (show messages, etc.)
    console.log("Form is invalid.");
  }
};

addMember(room:any){
  this.selectedRoom = room;
    const modal = new bootstrap.Modal(document.getElementById('addMember')!);
    modal.show();
}
 // Show the success modal
 addRoomModal() {
  const modal = new bootstrap.Modal(document.getElementById('addRoomModal'));
  modal.show();
}
closeRoomModal() {
  debugger
  const modal = new bootstrap.Modal(document.getElementById('addRoomModal'));
  modal.hide();
}
editRoom(room:any){
  //todo
}
deleteRoom(id:any){
  this.masterService.deleteRoom(id).subscribe((res:ApiResponse)=>{
    if(res.result==true){
      this.showSuccessMessage=res.result;
      setTimeout(() => { this.showSuccessMessage=false;}, 5000);
      this.getAllRooms();
    }
    else{
    this.showErrorMessage=true;
    setTimeout(() => { this.showErrorMessage=false;}, 5000);
    }
    
  });
  
}

 // Show the success modal
 showSuccessModal() {
  const modal = new bootstrap.Modal(document.getElementById('successModal'));
  modal.show();
}

// Close the success modal
closeSuccessModal() {
  const modal = new bootstrap.Modal(document.getElementById('successModal'));
  modal.hide();
}
}

