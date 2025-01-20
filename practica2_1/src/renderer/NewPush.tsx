import { useState } from "react";
import { NominaContext } from "./context";
import { useContext } from "react";
import Entrada from "../models/Entrada";
import { useNavigate } from "react-router-dom";

function NewPush() {
    const [IDBanco, setIDBanco] = useState(1);
    const [NumeroCuenta, setNumeroCuenta] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Apellido, setApellido] = useState("");
    const [TipoIdentificacion, setTipoIdentificacion] = useState('C');
    const [NumeroIdentificacion, setNumeroIdentificacion] = useState("");
    const [Moneda, setMoneda] = useState("DOP");
    const [Monto, setMonto] = useState(0);
    const [Email, setEmail] = useState("");
    const {nomina, setNomina} = useContext<any>(NominaContext);
    const navigate = useNavigate();

    const addNomina = (e: any) => {
        e.preventDefault();

        let entrada: Entrada = new Entrada();
        entrada.IDBanco = IDBanco;
        entrada.NumeroCuenta = NumeroCuenta;
        entrada.Beneficiario = `${Nombre} ${Apellido}`;
        entrada.TipoIdentificacion = TipoIdentificacion;
        entrada.NumeroIdentificacion = NumeroIdentificacion;
        entrada.Moneda = Moneda;
        entrada.Email = Email;

        let n: any[] = [...nomina];
        n.push(entrada);
        
        setNomina(n);
        console.log(n);
        navigate("/push");
    }

    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-10">
                <h1>Nueva Entrada</h1>
                <form onSubmit={addNomina}>
                    <div className="form-group">
                        <label htmlFor="Banco">Banco</label>
                        <select value={IDBanco} onChange={(e) => setIDBanco(parseInt(e.target.value))} id="Banco" className="form-control">
                            <option value={1}>Asociación Popular de Ahorros y Préstamos</option>
                            <option value={2}>Banco Popular Dominicano</option>
                            <option value={3}>Banreservas</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Número de Cuenta</label>
                        <input value={NumeroCuenta} onChange={(e) => setNumeroCuenta(e.target.value)} required className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Nombre del Beneficiario</label>
                        <input value={Nombre} onChange={(e) => setNombre(e.target.value)} required className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Apellido del Beneficiario</label>
                        <input value={Apellido} onChange={(e) => setApellido(e.target.value)} required className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="TipoIdentificacion">Tipo de identificación</label>
                        <select value={TipoIdentificacion} onChange={e => setTipoIdentificacion(e.target.value)} id="TipoIdentificacion" className="form-control">
                            <option value={"C"}>Cédula</option>
                            <option value={"P"}>Pasaporte</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="NumeroIdentificacion">Número de Identificación</label>
                        <input value={NumeroIdentificacion} onChange={e => setNumeroIdentificacion(e.target.value)} className="form-control"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Moneda">Moneda</label> 
                        <select value={Moneda} onChange={e => setMoneda(e.target.value)} id="Moneda" className="form-control">
                            <option value={"DOP"}>Peso Dominicano</option>
                            <option value={"USD"}>Dolar Estadounidense</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Monto">Monto</label>
                        <input value={Monto} type="number" min={0} step="1" onChange={e => setMonto(Number(e.target.value))} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input value={Email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
                </div>
            </div>
        </div>
        
    );
}
export default NewPush;