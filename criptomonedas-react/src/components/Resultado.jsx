import styled from "@emotion/styled"

const Contenedor = styled.div`
    color: #FFF;
    font-family: 'Lato',sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
    
`
const Texto = styled.p`
    font-size: 18px;

     span{
        font-weight: 700;
    }
`
const Imagen = styled.img`
    display: block;
    width: 150px;

`


const Precio = styled.p`
    font-size: 26px;
    span{
        font-weight: 700;
    }

`

const Resultado = ({resultado}) => {
    //extraemos los valores de la api 
    const { PRICE, HIGHDAY , LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = 
    resultado
    return (
        <Contenedor>
            <Imagen 
            src={`https://cryptocompare.com/${IMAGEURL}`} 
            alt="cripto-imagen" />
           
           <div>
            <Precio>El precio es de: <span>{PRICE}</span> </Precio>
                <Texto>El precio mas Alto del dia: <span>{HIGHDAY}</span> </Texto>
                <Texto>El precio mas Bajo del dia: <span>{LOWDAY}</span> </Texto>
                <Texto>Variacion ultimas 24 horas: <span>{ CHANGEPCT24HOUR}</span> </Texto>
                <Texto>Ultima Actualizacion: <span>{LASTUPDATE}</span> </Texto>
           </div>
            
        </Contenedor>
    )
}

export default Resultado
