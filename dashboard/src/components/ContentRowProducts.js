import React, {Component} from 'react'
import RowProducts from './RowProducts'

class ContentRowProducts extends Component {

    constructor(props){
        super(props)
        this.state = {
            metricas: [ 
                {
                    titulo: "Total de Productos",
                    cifra: '',
                    colorDeBorde: "border-left-primary",
                    colorDeTexto: "text-primary",
                    icono: "fa-store"
                },
                {
                    titulo: "Total de Categorías",
                    cifra: 4,
                    colorDeBorde: "border-left-success",
                    colorDeTexto: "text-success",
                    icono: "fa-th"
                },
                {
                    titulo: "Total de Usuarios",
                    cifra: '',
                    colorDeBorde: "border-left-warning",
                    colorDeTexto: "text-warning",
                    icono: "fa-user"
                }
            ]
        }
    }

    async componentDidMount() {
        let products = await fetch('http://localhost:1050/api/products').then(res => res.json())
        let users = await fetch('http://localhost:1050/api/users').then(res => res.json())
        this.setState({
            metricas: [ 
                {
                    titulo: "Total de Productos",
                    cifra: products.count,
                    colorDeBorde: "border-left-primary",
                    colorDeTexto: "text-primary",
                    icono: "fa-store"
                },
                {
                    titulo: "Total de Categorías",
                    cifra: 4,
                    colorDeBorde: "border-left-success",
                    colorDeTexto: "text-success",
                    icono: "fa-th"
                },
                {
                    titulo: "Total de Usuarios",
                    cifra: users.count,
                    colorDeBorde: "border-left-warning",
                    colorDeTexto: "text-warning",
                    icono: "fa-user"
                }
            ] 
        })
    }        

    render () {
        return (    
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>
    
                <div className="row">
                    
                    {this.state.metricas.map((metrica, i) => 
                        <RowProducts
                            key = {i + metrica.titulo} 
                            titulo = {metrica.titulo}
                            cifra = {metrica.cifra}
                            colorDeBorde = {metrica.colorDeBorde}
                            colorDeTexto = {metrica.colorDeTexto}
                            icono = {metrica.icono}
                        />    
                    )}
    
                </div>
            </>
        )    
    }
}


export default ContentRowProducts