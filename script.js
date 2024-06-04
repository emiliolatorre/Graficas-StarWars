// URLs
const urlPeliculas = 'https://swapi.dev/api/films/'
const urlPersonajes = 'https://swapi.dev/api/people/'

// GRÁFICA DE BARRAS

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
        },
        axisY: {
          onlyInteger: true
        }
      });
})
.catch(error => console.error(error))

// GRAFICA LINEAS

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
      
      const options = {
        high: 7,
        low: 0,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 2 === 0 ? value : null;
          }
        },
        axisY: {
          onlyInteger: true
        }
      };
      new Chartist.Bar('#chart2', data, options);
})
.catch(error => console.error(error))