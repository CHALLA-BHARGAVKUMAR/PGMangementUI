
export class RoomDto{
    roomNo: string;
    roomType:bigint;

    constructor(roomNo:string,roomType:bigint){
        this.roomNo=roomNo,
        this.roomType=roomType
    }
}

export class MemberDto{
    fullName: string;
    email: string;
    phoneNumber:string;
    roomId:bigint;
    constructor(fullName: string,
        email: string,
        phoneNumber:string,
        roomId:bigint){
            this.fullName= fullName,
            this.email= email,
            this.phoneNumber=phoneNumber,
            this.roomId=roomId
    }
}