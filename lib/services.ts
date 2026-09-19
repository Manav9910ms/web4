import type {Service} from "@/types";
export const SERVICES:Service[]=[
{id:"online-form",name:"Online Form Filling",category:"Digital Services",description:"Government, exam, scholarship and other online forms.",price:50,unit:"per form",icon:"FileText",popular:true},
{id:"pf-advance",name:"PF Advance",category:"Government Services",description:"Assistance with PF advance withdrawal application.",price:50,unit:"per application",icon:"Landmark",popular:true},
{id:"aadhaar-pvc",name:"Aadhaar PVC Card",category:"Government Services",description:"Aadhaar PVC card application assistance.",price:75,unit:"per card",icon:"CreditCard",popular:true},
{id:"pan-card-new",name:"New PAN Card",category:"Government Services",description:"Assistance with new PAN card application.",price:140,unit:"per application",icon:"FileText",popular:true},
{id:"resume-cv",name:"Resume / CV",category:"Digital Services",description:"Professional resume creation and document formatting.",price:150,unit:"per resume",icon:"FileUser",popular:true},
{id:"print-bw",name:"B&W Printing",category:"Printing",description:"Sharp black-and-white document printing.",price:5,unit:"per page",icon:"Printer"},
{id:"print-color",name:"Colour Printing",category:"Printing",description:"High-quality colour document printing.",price:15,unit:"per page",icon:"Palette",popular:true},
{id:"scan",name:"Document Scanning",category:"Printing",description:"Scan documents and prepare digital PDF files.",price:10,unit:"per page",icon:"ScanLine"},
{id:"photocopy",name:"Photocopy",category:"Printing",description:"Fast black-and-white photocopy service.",price:3,unit:"per page",icon:"Copy"},
{id:"passport-photo",name:"Passport Photo",category:"Photo Services",description:"Passport-size photo layout and print.",price:80,unit:"per set",icon:"Camera"},
{id:"computer-time",name:"Computer Usage",category:"Computer",description:"Use a connected computer for browsing and online work.",price:30,unit:"per 30 min",icon:"Monitor"}
];
export function getService(id:string){return SERVICES.find(s=>s.id===id)}
export function calculateAmount(id:string,q:number){const s=getService(id);if(!s)throw new Error("Service not found");const n=Math.max(1,Math.min(1000,Math.floor(q||1)));return s.price*n}