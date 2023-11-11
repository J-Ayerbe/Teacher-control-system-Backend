export interface Period {
  name:string,
  year:number,
  semester:number,
  startDate:Date,
  endDate:Date
}

export interface Educator {
  id:number,
  email:string,
  password:string,
  gender:string,
  idType:string,
  title:string,
  lastName:string,
  joinDate:Date,
  picture:string,
  notifications:Notification[],
  labours:Labour[],
  role:string,
  autoEvaluations:AutoEvaluation[]
}


export interface Notification{
  title:string,
  content:string,
  date:Date,
  read:boolean,
}

export interface AutoEvaluation{
  state:string,
  puntuation:number,
  date:Date,
  evaluator:Educator,
  evaluated:Educator,
  results:string,
  suggestions?:string,
  act?:number,
  observation?:string,
  labour:Labour,
  evidencesLink:string,
}

export interface Labour{
  description:string,
  hours:number,
  labourType:LabourType,
  assignedHours:number
  autoEvaluations:AutoEvaluation[],
  isActive:boolean
}
export interface LabourType{
  id:number,
  code:string,
  description:string,
}