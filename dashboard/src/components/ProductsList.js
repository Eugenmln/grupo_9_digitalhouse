import React from 'react';

function ProductsList(props){
    return(
        <>
            {props.products.map((product, i) => 
                <tr key={i + product.name}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                </tr>                
            )}
        </>    
    )
}

export default ProductsList;