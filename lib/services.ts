import type {Service} from "@/types";
export const SERVICES:Service[]=[
{id:"online-form",name:"Online Form Filling",category:"Digital Services",description:"Government, exam, scholarship and other online forms.",price:50,unit:"per form",icon:"FileText",popular:true},
{id:"pf-advance",name:"PF Advance",category:"Government Services",description:"Assistance with PF advance withdrawal application.",price:50,unit:"per application",icon:"Landmark",popular:true},
{id:"aadhaar-pvc",name:"Aadhaar PVC Card",category:"Government Services",description:"Aadhaar PVC card application assistance.",price:75,unit:"per card",icon:"CreditCard",popular:true},
{id:"pan-card-new",name:"New PAN Card",category:"Government Services",description:"Assistance with new PAN card application.",price:140,unit:"per application",icon:"FileText",popular:true},
{id:"resume-cv",name:"Resume / CV",category:"Digital Services",description:"Professional resume creation and document formatting.",price:50,unit:"per resume",icon:"FileUser",popular:true}
];
export function getService(id:string){return SERVICES.find(s=>s.id===id)}
export function calculateAmount(id:string,q:number){const s=getService(id);if(!s)throw new Error("Service not found");const n=Math.max(1,Math.min(1000,Math.floor(q||1)));return s.price*n}