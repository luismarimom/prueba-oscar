import Axios from 'axios';
export const getData = busqueda => {
    try {
        const body = {"TipoServicioId":"","TextoBusqueda":`${busqueda}`,"MyLong":-74.05165250319779,"MyLat":4.663264043337151,"TipoOrden":"ubicacion","infoFilter":{}};
        return Axios({
            method : 'POST',
            url : 'https://vp5fdqngyi.execute-api.us-east-1.amazonaws.com/qa/api/BuscarCentros',
            data : body
        });
    } catch (error) {
        throw console.error(error);
    };
};

export const getHorario = idCentro => {
    try {
        return Axios({
            method : 'GET',
            url : 'https://vp5fdqngyi.execute-api.us-east-1.amazonaws.com/qa/api/HorariosCentro/',
            params : {
                pCentroId : idCentro
            }
        });
    } catch (error) {
        throw console.error(error);
    };
}