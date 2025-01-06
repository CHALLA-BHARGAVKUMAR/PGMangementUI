export interface ApiResponse {
    result:any,
    error:any
}

export interface RoomList {
    id: number
    roomNo: string
    occupied: number
    bedsAvailable: number
    type: string
    capacity: number
    members:any[]
  }

  export interface Room {
    id: number;
    roomNo: string;
    occupied: number;
    bedsAvailable: number;
    type: string;
    capacity: number;
    members: any[];
  }
  
  export interface PaginatedResponse {
    data: Room[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }