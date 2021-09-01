import React from 'react'

function GenresInDb (props) {
    return (
        <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Total de Productos por Categoría</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {props.categorias.map((categoria, i) => 
                            <div key={i + categoria} className="col-lg-6 mb-4">
                                <div className="card bg-dark text-white shadow">
                                    <div className="card-body">
                                        {categoria}
                                    </div>
                                </div>
                            </div>                        
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenresInDb
