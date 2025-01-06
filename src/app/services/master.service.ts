import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../Model/Interfaces/api-response';
import { MemberDto, RoomDto } from '../Model/Classes/room-list';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http : HttpClient) {   }

  getAllRooms(params?: any):Observable<PaginatedResponse>
  {
    return this.http.get<PaginatedResponse>(environment.PGMS_API+"api/AdminApi/AllRooms",{params});
  }
  addRoom(room:any):Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>(environment.PGMS_API+"api/AdminApi/AddRoom",room);
  }
  editRoom(room:any):Observable<ApiResponse>
  {
    return this.http.put<ApiResponse>(environment.PGMS_API+"api/AdminApi/EditRoom",room);
  }
  deleteRoom(id:any):Observable<ApiResponse>
  {
    return this.http.delete<ApiResponse>(environment.PGMS_API+"api/AdminApi/DeleteRoom?roomId="+id);
  }

  addMember(member:any):Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>(environment.PGMS_API+"api/AdminApi/AddMember",member);
  }
  editMember(member:any):Observable<ApiResponse>
  {
    return this.http.put<ApiResponse>(environment.PGMS_API+"api/AdminApi/EditMember",member);
  }
  deleteMember(id:any):Observable<ApiResponse>
  {
    return this.http.delete<ApiResponse>(environment.PGMS_API+"api/AdminApi/DeleteMember?memberId="+id);
  }

}
