
export class RoomDto{
    roomNo: string;
    roomType:bigint;

    constructor(roomNo:string,roomType:bigint){
        this.roomNo=roomNo,
        this.roomType=roomType
    }
}