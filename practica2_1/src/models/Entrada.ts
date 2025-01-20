class Entrada {
    IDBanco: number;
    NumeroCuenta: string;
    Beneficiario: string;
    TipoIdentificacion: string;
    NumeroIdentificacion: string;
    Moneda: string;
    Monto: number;
    Email: string;

 
    constructor() {
        this.IDBanco = 1;
        this.NumeroCuenta = "";
        this.Beneficiario = "";
        this.TipoIdentificacion = 'C';
        this.NumeroIdentificacion = "";
        this.Moneda = "DOP";
        this.Monto = 0;
        this.Email = "";
    }
}

export default Entrada;