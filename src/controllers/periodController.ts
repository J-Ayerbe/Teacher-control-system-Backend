//Pide los datos a una api externa
//Que se encuentra en el siguiente link: http://127.0.0.1:8000/periodos

export class PeriodController {
    static async getPeriods(_req: any, res: any) {
        try {
            const response = await fetch('http://127.0.0.1:8000/periodos');
            const data = await response.json();
            res.status(200).json(data);      
        } catch (error) {
            res.status(500).json({ error: error });         
        }

    }

}
