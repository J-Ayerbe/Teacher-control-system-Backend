export class workModel{
    private nameWork: string;
    private  typeWork: number;
    private hours: number;
/*
    constructor(nameWork: string,typeWork: number,hours: number){
        this.nameWork=nameWork;
        this.typeWork=typeWork;
        this.hours=hours;
    }*/
    constructor(){
        this.nameWork='electiva';
        this.typeWork=1;
        this.hours=10;
    }
    getNameWork(){
        return this.nameWork;
    }
    getTypeWork(){
        return this.typeWork;
    }
    getHours(){
        return this.getHours;
    }
    setNameWork(nameWork: string){
        this.nameWork=nameWork;
    }
    setTypeWork(typeWork: number){
        this.typeWork=typeWork;
    }
    setHours(hours: number){
        this.hours=hours;
    }
    toString() {
        return `Work: ${this.nameWork} ${this.getTypeWork} ${this.hours} `;
    }
}