import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Model/Interfaces/api-response';
import { RoomDto } from '../Model/Classes/room-list';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http : HttpClient) {   }

  getAllRooms()
  {
    return this.http.get<ApiResponse>(environment.PGMS_API+"api/AdminApi/AllRooms");
  }
  addMember(member:any):Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>("/",member);
  }
  addRoom(room:RoomDto):Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>(environment.PGMS_API+"api/AdminApi/AddRoom",room);
  }
  deleteRoom(id:any):Observable<ApiResponse>
  {
    return this.http.delete<ApiResponse>(environment.PGMS_API+"api/AdminApi/DeleteRoom?roomId="+id);
  }
}
