export interface Period {
  readonly _id?: string;
  name:string,
  year:string,
  semester:number,
  startDate:Date,
  endDate:Date,
  autoEvaluations:string[]
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
  identification:string,
  email:string,
  password:string,
  isActive:boolean
  idType:string,
  docentType:DocentType,
  title:string,
  firstName:string,
  lastName:string,
  joinDate:Date,
  picture:string,
  notifications:string[],
  labours:string[],
  role:EducatorRole,
  autoEvaluations:string[]
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
  act?:boolean,
  observation?:string,
  labour:Labour,
  evidencesLink:string,
  period:Period
}

export interface Labour{
  readonly _id?: string;
  description:string,
  hours:number,
  labourType:string,
  assignedHours:number
  isActive:boolean,
  nameWork:string,
  code:string,
  idlabourType:number
}

export interface LabourType{
  readonly _id?: string;
  idLabourType:number,
  code:string,
  description:string,
}