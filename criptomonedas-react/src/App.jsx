import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCriptomonedas from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'


//importamos arriba styledComponents
// definimos en una variable los Styled components
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`


const Heading = styled.h1`
  font-family:'Lato', sans-serif;
  color:#FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {
  const [monedas, setMonedas] = useState({})
  
  //iniciamos el state como un objeto vacio y se va a ir llenando con setResultado
  const [resultado, setResultado] = useState({})
  
  //state de spinner de carga
  const [cargando, setCargando] = useState(false)

  //asi realizamos el llamado a nuestra api
  useEffect(() =>{
    if(Object.keys(monedas).length > 0){
      
      const cotizarCriptomoneda = async() =>{
        // inicia la carga y luego de que realize la consulta al final pasa a ser false
        setCargando(true)
        setResultado({})
        //aplicamos un object destructuring e inyectamos la variable en la url
        const {moneda, criptomoneda} = monedas
        
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
       
        //extraemos los datos con fetch 
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
          setResultado(resultado.DISPLAY[criptomoneda][moneda])

          setCargando(false)
      }
      cotizarCriptomoneda()
    } 

  }, [monedas])

  return (
    <Contenedor>
      <Imagen
        src={ImagenCriptomonedas}
        alt="imagen-criptomonedas"
      />
        <div>
            <Heading>Cotiza tus Criptos al instante</Heading>
            <Formulario
              setMonedas={setMonedas}
            />
              { cargando && <Spinner/>}
              { resultado.PRICE && <Resultado resultado={resultado}/>}
        
        </div>
    
    </Contenedor>
  )
}

export default App
