import React from 'react';
import ContentRowTop from './ContentRowTop'
import Products from './Products'
	
function ContentWrapper () {
    return (    
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
                <br/>
                <ContentRowTop />    
            </div>
            <Products />
        </div>
    )
}

export default ContentWrapper
