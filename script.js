// Gráfica de lineas - peliculas por año
const urlPeliculas = 'https://swapi.dev/api/films/'
const urlPersonajes = 'https://swapi.dev/api/people/'


// Gráfica de barras - personajes por pelicula


// FUNCIONES

const jsonPeliculas = async () => {
    try {
        const resp = await fetch(urlPeliculas)
        const result = await resp.json()
        return result
        
    } catch (error) {
        throw 'la url no es válida o no está funcionando'
    }
}

jsonPeliculas ()
.then(resp => {
    const results = resp.results
    const peliculas = []
    const años = []
    
    results.forEach(element => {

        peliculas.push(element.title)

        const fechaStr = element.release_date
        const fecha = new Date(fechaStr);
        const año = fecha.getFullYear();
        años.push(año)
    })
    console.log(peliculas)
    console.log(años)

    new Chartist.Line('#chart1', {
        labels: peliculas,
        series: [años]
      }, {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      });
})
.catch(error => console.error(error))

// GRAFICA LINEAS

// dos primeros selects, el tercero selector multiple
// desplegar rama main, y te da una url con una web desplegada

const jsonPersonajes = async () => {
    try {
        const resp = await fetch(urlPersonajes)
        const result = await resp.json()
        return result
        
    } catch (error) {
        throw 'la url no es válida o no está funcionando'
    }
}

jsonPersonajes()
.then (resp => {
    const results = resp.results
    const personajes = []
    const numPeliculas = []

    results.forEach(element => {
        personajes.push(element.name)
        numPeliculas.push(element.films.length)
    })
    console.log(personajes)
    console.log(numPeliculas)

    const data = {
        labels: personajes,
        series: [
          numPeliculas
        ]
      };
      
      var options = {
        high: 10,
        low: -10,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      };
      
      new Chartist.Bar('#chart2', data, options);


})
.catch(error => console.error(error))