import { Link } from "react-router-dom";
import Entrada from "../models/Entrada";
import { useEffect, useState } from "react";

function Pull() {
    const [entradas, setEntradas] = useState<Entrada[]>([]);

    useEffect(() => {
        cargarEntradas();
    },[]);

    const cargarEntradas = async () => {
        window.electron.ipcRenderer.once('get-entries', (arg: any) => {
            setEntradas(arg.map((e:any) => e.dataValues));
        });

        window.electron.ipcRenderer.sendMessage("get-entries");
    }

    const abrirArchivo = () => {
        document.getElementById("txtInput")?.click();
    }

    const subirEntradas = (entradas: any[]) => {
        window.electron.ipcRenderer.once('post-entries', (arg: any) => {
            console.log("AAAAH");
            console.log(arg.map((e: any) => e.dataValues));
            setEntradas(arg);
        });

        window.electron.ipcRenderer.sendMessage("post-entries", entradas);
    }

    const cargarArchivo = (event: any) => {
        let file = event.target.files[0];
        
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt: any) {
                let entries = evt.target.result.split(/\r?\n/);
                let array = entries.map((d: any) => {
                    let e = new Entrada();
                    e.IDBanco = parseInt(d.substr(0,2).trimEnd());
                    e.NumeroCuenta = d.substr(2,28).trimEnd();
                    e.Beneficiario = d.substr(30,80).trimEnd();
                    e.TipoIdentificacion = d.substr(110,1).trimEnd();
                    e.NumeroIdentificacion = d.substr(111,11).trimEnd();
                    e.Moneda = d.substr(122,3).trimEnd();
                    e.Monto = d.substr(125,9).trimEnd();
                    e.Email = d.substr(134,80).trimEnd();

                    return e;
                });
                subirEntradas(array);
            }
            reader.onerror = function (evt) {
            }
        }
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    <button className="btn btn-success m-2" onClick={abrirArchivo}>Cargar Archivo</button>
                </div>
            </div>
            <div className="row">
                <input hidden id="txtInput" type="file" accept=".txt" onChange={cargarArchivo} />
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
                        {entradas.map((n, i) => {
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

export default Pull;