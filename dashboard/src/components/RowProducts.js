import React from 'react'
	
function RowProducts (props) {
    return (           
        <div className="col-md-4 mb-4">
            <div className={"card " + props.colorDeBorde + " shadow h-100 py-2"}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={"text-xs font-weight-bold " + props.colorDeTexto + " text-uppercase mb-1"}> {props.titulo} </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800"> {props.cifra} </div>
                        </div>
                        <div className="col-auto">
                            <i className={"fas " + props.icono + " fa-2x text-gray-300"}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RowProducts