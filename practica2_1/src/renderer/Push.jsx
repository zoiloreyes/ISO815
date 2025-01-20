import { Link } from "react-router-dom";
import { NominaContext } from "./context";
import { useContext } from "react";
import Entrada from "../models/Entrada";

function Push() {
    const {nomina} = useContext(NominaContext);
    
    const generarArchivo = () => {
        let filename = `Nomina_UNAPEC_${(new Date()).toISOString().split('T')[0].replace(/-/g, '_')}`;

        let nomText = nomina.map(e => {
            return `${e.IDBanco.toString().padEnd(2," ")}${e.NumeroCuenta.padEnd(28," ")}${e.Beneficiario.padEnd(80," ")}${e.TipoIdentificacion}${e.NumeroIdentificacion.padEnd(11, " ")}${e.Moneda}${e.Monto.toString().padEnd(9, " ")}${e.Email.padEnd(80, " ")}`;
        }).join("\n");

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(nomText));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
        console.log("Generando Archivo");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <Link className="btn btn-primary m-2" to="/push/new">Nueva Entrada</Link>
                    <button className="btn btn-success m-2" onClick={generarArchivo}>Generar Archivo</button>
                </div>
            </div>
            <div className="row">
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>IDBanco</th>
                            <th>Numero Cuenta</th>
                            <th>Beneficiario</th>
                            <th>Tipo Identificación</th>
                            <th>Numero Identificación</th>
                            <th>Moneda</th>
                            <th>Monto</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nomina.map((n, i) => {
                            return <tr key={i}>
                                <td>{n.IDBanco}</td>
                                <td>{n.NumeroCuenta}</td>
                                <td>{n.Beneficiario}</td>
                                <td>{n.TipoIdentificacion}</td>
                                <td>{n.NumeroIdentificacion}</td>
                                <td>{n.Moneda}</td>
                                <td>{n.Monto.toFixed(2)}</td>
                                <td>{n.Email}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Push;