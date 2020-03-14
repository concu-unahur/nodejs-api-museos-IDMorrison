const superagent = require('superagent');
const fs = require('fs');

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const museos = respuesta.body.results;
  const cantidad = museos.length;
  var stringMuseos = '';
  /*
  for(var i= 0; i < cantidad; i++){
    const museo = museos[i];
    stringMuseos = stringMuseos + `\n${museo.nombre} (${museo.direccion}). Por cualquier consulta comunicarse al ${museo.telefono}.`;
  }*/

  museos.map(museo => {
    stringMuseos = stringMuseos + `\n${museo.nombre} (${museo.direccion}). Por cualquier consulta comunicarse al ${museo.telefono}.`;
  })
  
  fs.writeFile('./museos.txt', stringMuseos, (error) => {
    if (error) {
      throw new Error('algo se rompió', error);
    }
    console.log('El archivo fue escrito');
  })
}



superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(imprimirMuseos)

console.log('Después de llamar a superagent')
