export type UserRole="customer"|"admin";
export type OrderStatus="pending_payment"|"paid"|"in_progress"|"ready"|"completed"|"cancelled";
export interface Service{id:string;name:string;category:string;description:string;price:number;unit:string;icon:string;popular?:boolean}
export interface UserProfile{uid:string;name:string;email:string;phone:string;role:UserRole;createdAt?:string}
export interface CafeOrder{id:string;userId:string;serviceId:string;serviceName:string;amount:number;quantity:number;unit:string;notes:string;scheduledDate:string;customerName:string;customerPhone:string;status:OrderStatus;razorpayOrderId?:string;razorpayPaymentId?:string;createdAt?:string;updatedAt?:string}