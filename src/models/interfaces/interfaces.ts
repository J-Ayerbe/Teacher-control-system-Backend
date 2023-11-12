export interface Period {
  readonly _id?: string;
  name:string,
  year:number,
  semester:number,
  startDate:Date,
  endDate:Date,
  autoEvaluations:AutoEvaluation[]
}

enum DocentType {
  TC = "Tiempo Completo",
  Planta = "Planta",
  Catedra = "Cátedra",
}

enum EducatorRole {
  Docente = "Docente",
  Decano = "Decano",
  Coordinador = "Coordinador",
}

export interface Educator {
  readonly _id?: string;
  id:number,
  email:string,
  password:string,
  gender:string,
  idType:string,
  docentType:DocentType,
  title:string,
  lastName:string,
  joinDate:Date,
  picture:string,
  notifications:Notification[],
  labours:Labour[],
  role:EducatorRole,
  autoEvaluations:AutoEvaluation[]
}

export interface Notification{
  readonly _id?: string;
  title:string,
  content:string,
  date:Date,
  read:boolean,
}

export interface AutoEvaluation{
  readonly _id?: string;
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
  readonly _id?: string;
  description:string,
  hours:number,
  labourType:LabourType,
  assignedHours:number
  autoEvaluations:AutoEvaluation[],
  isActive:boolean
}

export interface LabourType{
  readonly _id?: string;
  id:number,
  code:string,
  description:string,
}