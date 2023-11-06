

export class periodModel {
    private id: number;
    private name: string;
    private year: string;
    private semester: number;
    private startDate: Date;
    private endDate: Date;

    //Creamos el contructor
    constructor() {
        this.id = 0;
        this.name = '';
        this.year = '';
        this.semester = 0;
        this.startDate = new Date();
        this.endDate = new Date();
    }

    //Getters
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getYear() {
        return this.year;
    }

    getSemester() {
        return this.semester;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    //Setters

    setId(id: number) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setYear(year: string) {
        this.year = year;
    }

    setSemester(semester: number) {
        this.semester = semester;
    }

    setStartDate(startDate: Date) {
        this.startDate = startDate;
    }

    setEndDate(endDate: Date) {
        this.endDate = endDate;
    }

}