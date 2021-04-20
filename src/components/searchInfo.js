import React, { useEffect, useState } from 'react';
import { getData, getHorario } from '../utils/HTTPRequest';
import { dynamicAttributes } from '../utils/utils';
export let datos ;

export default function Search (){
    
    const [search, setSearch] = useState('');
    const [idCentro, setIdCentro] = useState('');
    const [data, setData] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [infoExtra, setInfoExtra] = useState(null);

    useEffect( () => {
        try {
            getData(search).then( response => {
                setData(response.data);
            });
            getHorario(idCentro).then( response => setHorarios(response.data));
        } catch (error) {
            console.log(error);
        }
    }, [search, idCentro]);
    
    return(
        <div className = 'container-search'>
            <form>
                <label for='busqueda'>Introduzca el nombre de una ciudad para filtrar</label>
                <input id='busqueda' placeholder='Ciudad' type='text' onChange = {onChangeValue}></input>
            </form>
            
            {infoExtra?
            <div className='info-extra'>
                <div {...dynamicAttributes("key", infoExtra.id)} className='content-data'>
                    <div className='content-img'>
                        <img {...dynamicAttributes("src", infoExtra.imagenCentro.ruta)} alt='imagen centro'/>
                        <div><a {...dynamicAttributes("href", infoExtra.paginaWeb)}>{infoExtra.paginaWeb}</a></div>
                    </div>
                    <div className='content-info'>
                        <h2>{infoExtra.nombre}</h2>
                        <span className = 'info-centro descripcion'>{infoExtra.tipoCentro.descripcionDetallada}</span>
                        <span className = 'info-centro'><span className='bold'>Ciudad: </span>{infoExtra.ciudad}</span>
                        <span className = 'info-centro'><span className='bold'>Dirección: </span>{infoExtra.direccion}</span>
                        <span className = 'info-centro'><span className='bold'>Teléfono: </span>{infoExtra.telefono}</span>
                        <span className = 'info-centro'><span className='bold'>Características del servicio: </span>{infoExtra.descripcion}</span>
                    </div>
                </div>
                <div>
                    <div className='header-info'>
                        <div><h2>Horario de atención {infoExtra.nombre}</h2></div>
                        <div id='content-button'><button className='cerrar' onClick={CerrarInfoExtra}>X</button></div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Días</th>
                                <th>Apertura A.M</th>
                                <th>Cierre A.M</th>
                                <th>Apertura P.M</th>
                                <th>Cierre P.M</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Lunes</td>
                                <td>{ValidarHorario(horarios, "Lunes", "aperturaAm")}</td>
                                <td>{ValidarHorario(horarios, "Lunes", "cierreAm")}</td>
                                <td>{ValidarHorario(horarios, "Lunes", "aperturaPm")}</td>
                                <td>{ValidarHorario(horarios, "Lunes", "cierrePm")}</td>
                            </tr>
                            <tr>
                                <td>Martes</td>
                                <td>{ValidarHorario(horarios, "Martes", "aperturaAm")}</td>
                                <td>{ValidarHorario(horarios, "Martes", "cierreAm")}</td>
                                <td>{ValidarHorario(horarios, "Martes", "aperturaPm")}</td>
                                <td>{ValidarHorario(horarios, "Martes", "cierrePm")}</td>
                            </tr>
                            <tr>
                                <td>Miércoles</td>
                                <td>{ValidarHorario(horarios, "Miercoles", "aperturaAm")}</td>
                                <td>{ValidarHorario(horarios, "Miercoles", "cierreAm")}</td>
                                <td>{ValidarHorario(horarios, "Miercoles", "aperturaPm")}</td>
                                <td>{ValidarHorario(horarios, "Miercoles", "cierrePm")}</td>
                            </tr>
                            <tr>
                                <td>Jueves</td>
                                <td>{ValidarHorario(horarios, "Jueves", "aperturaAm")}</td>
                                <td>{ValidarHorario(horarios, "Jueves", "cierreAm")}</td>
                                <td>{ValidarHorario(horarios, "Jueves", "aperturaPm")}</td>
                                <td>{ValidarHorario(horarios, "Jueves", "cierrePm")}</td>
                            </tr>
                            <tr>
                                <td>Viernes</td>
                                <td>{ValidarHorario(horarios, "Viernes", "aperturaAm")}</td>
                                <td>{ValidarHorario(horarios, "Viernes", "cierreAm")}</td>
                                <td>{ValidarHorario(horarios, "Viernes", "aperturaPm")}</td>
                                <td>{ValidarHorario(horarios, "Viernes", "cierrePm")}</td>
                            </tr>
                            <tr>
                                <td>Sábado</td>
                                <td>{ValidarHorario(horarios, "Sabado", "aperturaAm")}</td>
                                <td>{ValidarHorario(horarios, "Sabado", "cierreAm")}</td>
                                <td>{ValidarHorario(horarios, "Sabado", "aperturaPm")}</td>
                                <td>{ValidarHorario(horarios, "Sabado", "cierrePm")}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='footer-infoExtra'>
                        
                    </div>
                </div>
            </div>
            :
            data.map( element =>       
                <div {...dynamicAttributes("key", element.id)} className='content-data'>
                    <div className='content-img'>
                        <img {...dynamicAttributes("src", element.imagenCentro.ruta)} alt='imagen centro'/>
                        <div><a {...dynamicAttributes("href", element.paginaWeb)}>{element.paginaWeb}</a></div>
                    </div>
                    <div className='content-info' onClick={()=>obtenerInfoExtra(element)}>
                        <h2>{element.nombre}</h2>
                        <span className = 'info-centro descripcion'>{element.tipoCentro.descripcionDetallada}</span>
                        <span className = 'info-centro'><span className='bold'>Ciudad: </span>{element.ciudad}</span>
                        <span className = 'info-centro'><span className='bold'>Dirección: </span>{element.direccion}</span>
                        <span className = 'info-centro'><span className='bold'>Teléfono: </span>{element.telefono}</span>
                    </div>
                </div>
            )}
        </div>
    );

    function onChangeValue (e) {
        setInfoExtra(null)
        setSearch(e.target.value)
    }

    function obtenerInfoExtra (element) {
        setIdCentro(element.centroId)
        setInfoExtra(element);
    }

    function CerrarInfoExtra (e){
        if(e.target.classList.contains('cerrar')){
            setInfoExtra(null)
        }
    }

    function ValidarHorario (object, dia, horario) {
        try {
            if(null !== object[dia]){
                return object[dia][horario]
            }
        } catch (error) {
            return 'Cerrado';
        }
    }
}
