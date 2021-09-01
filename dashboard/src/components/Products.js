import React, {Component} from 'react';
import ProductsList from './ProductsList';

class Products extends Component {

    constructor(props){
        super(props)
        this.state = {
			products: []
        }     
    }

    async componentDidMount() {
        let products = await fetch('http://localhost:1050/api/products').then(res => res.json())
        this.setState({
			products: products.products
        })
    }        

	render() {
		return(
			<>
				{/*<!-- PRODUCTS LIST -->*/}
				<h1 className="h3 mb-0 text-gray-800 movies">Listado de Productos</h1>
				<br/>
				
				{/*<!-- DataTales Example -->*/}
				<div className="card shadow mb-4 movies">
					<div className="card-body">
						<div className="table-responsive">
							<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
								<thead>
									<tr>
										<th>Nombre</th>
										<th>Descripción</th>
										<th>Categoría</th>
										<th>Precio</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Titulo</th>
										<th>Calificación</th>
										<th>Premios</th>
										<th>Precio</th>
									</tr>
								</tfoot>
								<tbody>
									<ProductsList
										products = {this.state.products}
									/>
								</tbody>
							</table>
						</div>
					</div>
				</div>            
			</>
		)	
	}
}

export default Products