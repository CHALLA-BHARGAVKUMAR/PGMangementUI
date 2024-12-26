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
  }