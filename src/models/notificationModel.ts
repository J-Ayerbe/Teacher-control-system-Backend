
export class notificationModel {
    private usuId: number;
    private notFecha: string;
    private notMensaje: string;
    private notEstado: string;

    // constructor(usuId: number, notFecha: Date, notMensaje: string, notEstado: string) {
    //     this.usuId = usuId;
    //     this.notFecha = notFecha;
    //     this.notMensaje = notMensaje;
    //     this.notEstado = notEstado;
    // }
    constructor() {
        this.usuId = 1;
        this.notFecha = "12/06/2023";
        this.notMensaje = "Hola";
        this.notEstado = "Activa";
    }

    getUsuId(){
        return this.usuId;
    }
    
    setUsuId(value: number) {
        this.usuId = value;
    }
    
    getNotFecha() {
        return this.notFecha;
    }

    setNotFecha(value: string) {
        this.notFecha = value;
    }

    getNotMensaje() {
        return this.notMensaje;
    }

    setNotMensaje(value: string) {
        this.notMensaje = value;
    }

    getNotEstado() {
        return this.notEstado;
    }

    setNotEstado(value: string) {
        this.notEstado = value;
    }

    toString() {
        return `Notification: ${this.usuId} ${this.notFecha} ${this.notMensaje} ${this.notEstado}`;
    }

}