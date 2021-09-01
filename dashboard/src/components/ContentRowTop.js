import React, {Component} from 'react'
import ContentRowProducts from './ContentRowProducts'	
import Categorias from './Categorias'
import UltimoProducto from './UltimoProducto'

class ContentRowTop extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            imagen: "",
            nombre: "",
            descripcion: '',
            id: '',
            categorias: []
        }     
    }

    async componentDidMount() {
        let products = await fetch('http://localhost:1050/api/products').then(res => res.json())
        let ultimoProductoID = products.products.pop().id
        let ultimoProducto = await fetch(`http://localhost:1050/api/products/${ultimoProductoID}`).then(res => res.json())
        this.setState({
            imagen: ultimoProducto.imagen,
            nombre: ultimoProducto.nombre,
            descripcion: ultimoProducto.descripcion,
            id: ultimoProducto.id,
            categorias: [
                "Vinos: " + products.countByCategory.Vinos,
                "Espirituosas: " + products.countByCategory.Espirituosas,
                "Cervezas: " + products.countByCategory.Cervezas,
                "Licores: " + products.countByCategory.Licores
            ]
        })
    }        

    render () {
        return (    
            <div className="container-fluid">
    
                <ContentRowProducts />        
    
                <div className="row">
    
                    <UltimoProducto>
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '40rem'}} src={this.state.imagen} alt=" Star Wars - Mandalorian "/>
                        </div>
                        <p>{this.state.nombre}</p>
                        <p>{this.state.descripcion}</p>
                        <a className="btn btn-danger" rel="nofollow" href={`http://localhost:1050/products/${this.state.id}`}>Ver Detalle del Producto</a>
                    </UltimoProducto>
    
                    <Categorias
                        categorias = {this.state.categorias}
                    />
    
                </div>
            </div>
        )
    }
}

export default ContentRowTop