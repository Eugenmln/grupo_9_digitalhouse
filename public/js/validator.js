window.addEventListener('load', function() {

    //Formularios de creación y edición de productos

    let createProduct = document.querySelector('.validate-create-product')

    if (createProduct) {

        createProduct.addEventListener('submit', function (e) {
            
            let erroresProduct = []

            let nombre = document.querySelector('.validate-product-name')
            if (nombre.value == '') {
                erroresProduct.push('Ingresá el nombre del producto')
            } else if (nombre.value != '' && nombre.value.length < 2) { 
                erroresProduct.push("El nombre del producto debe tener al menos 2 caracteres")
            }
            
            
            let descripcion = document.querySelector('.validate-product-descripcion')
            if (descripcion.value == '') {
                erroresProduct.push('Ingresá la descripción del producto')
            } else if (descripcion.value != '' && descripcion.value.length < 20) { 
                erroresProduct.push("La descripción del producto debe tener al menos 20 caracteres")
            }
            

            let precio = document.querySelector('.validate-product-precio')
            if (precio.value == '') {
                erroresProduct.push('Ingresá el precio del producto')
            }
            
            
            let stock = document.querySelector('.validate-product-stock')
            if (stock.value == '') {
                erroresProduct.push('Ingresá el stock del producto')
            }

            let categorias = document.querySelectorAll('.validate-product-categoria')
            let seleccionados = []
            for (let i=0; i < categorias.length; i++) {
                if (categorias[i].checked == true) {       
                    seleccionados.push('Se seleccionó una categoría')
                }
            }
            if (seleccionados.length == 0) {
                erroresProduct.push('Seleccioná la categoría del producto')
            }

            let imagen = document.querySelector('.validate-product-imagen')
            let extension = imagen.value.slice(-4)
            let acceptedExtensions = ['.jpg',  '.JPG', '.png', '.PNG', '.jpeg', '.JPEG', '.gif', '.GIF']
            if(imagen.value != '' && !acceptedExtensions.includes(extension)) {
                erroresProduct.push(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
            
            if (erroresProduct.length > 0) {
                e.preventDefault()
                let ulErrores = document.querySelector('.errores-create-product')
                ulErrores.innerHTML = ''
                for (let i=0; i < erroresProduct.length; i++) {
                    ulErrores.innerHTML += '<li>' + erroresProduct[i] + '</li>'
                }
            }
        })
    }

    // Formulario de registro de usuarios

    let registerUser = document.querySelector('.validate-register-user')

    if (registerUser) {

        registerUser.addEventListener('submit', function(e) {

            let erroresRegister = []

            let nombreYApellido = document.querySelector('.validate-register-nombre_y_apellido')
            if (nombreYApellido.value == '') {
                erroresRegister.push('Tenés que escribir tu nombre y apellido')
            } else if (nombreYApellido.value != '' && nombreYApellido.value.length < 2) {
                erroresRegister.push('El nombre debe tener al menos 2 caracteres')
            }

            let email = document.querySelector('.validate-register-email')
            if (email.value == '') {
                erroresRegister.push('Tenés que escribir tu email')
            } else if (email.value.indexOf('@') == -1 || (email.value.slice(-4) != '.com' && email.value.slice(-7) != '.com.ar' && email.value.slice(-3) != '.es') || (email.value.slice(-5) == '@.com' && email.value.slice(-8) == '@.com.ar' && email.value.slice(-4) == '@.es') || email.value.indexOf('@') == 0 ) {
                erroresRegister.push('Formato no válido para correo electrónico')
            }

            let contraseña = document.querySelector('.validate-register-contraseña')
            if (contraseña.value == '') {
                erroresRegister.push('Tenés que escribir una contraseña con al menos 8 caracteres')
            } else if (contraseña.value != '' && contraseña.value.length < 8) {
                console.log(contraseña.value.length)
                erroresRegister.push('La contraseña debe tener al menos 8 caracteres')
            }

            let avatar = document.querySelector('.validate-register-avatar')
            let extension = avatar.value.slice(-4)
            let acceptedExtensions = ['.jpg',  '.JPG', '.png', '.PNG', '.jpeg', '.JPEG', '.gif', '.GIF']
            if (avatar.value == '') {
                erroresRegister.push('Tenés que subir una imagen de perfil')
            } else if (avatar.value != '' && !acceptedExtensions.includes(extension)) {
                erroresRegister.push(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }          
            
            if (erroresRegister.length > 0) {
                e.preventDefault()
                let ulErrores = document.querySelector('.errores-register-user')
                ulErrores.innerHTML = ''
                for (let i=0; i < erroresRegister.length; i++) {
                    ulErrores.innerHTML += '<li>' + erroresRegister[i] + '</li>'
                }
            }

        })
    }    

    // Formulario de login de usuarios
    
    let loginUser = document.querySelector('.validate-login-user')

    if (loginUser) {

        loginUser.addEventListener('submit', function(e) {

            let erroresLogin = []

            let email = document.querySelector('.validate-login-email')
            if (email.value == '') {
                erroresLogin.push('Tenés que escribir un email')
            } else if (email.value.indexOf('@') == -1 || (email.value.slice(-4) != '.com' && email.value.slice(-7) != '.com.ar' && email.value.slice(-3) != '.es') || (email.value.slice(-5) == '@.com' && email.value.slice(-8) == '@.com.ar' && email.value.slice(-4) == '@.es') || email.value.indexOf('@') == 0 ) {
                erroresLogin.push('Tenés que escribir un email válido')
            }

            let contraseña = document.querySelector('.validate-login-contraseña')
            if (contraseña.value == '') {
                erroresLogin.push('Tenés que escribir una contraseña con al menos 8 caracteres')
            } else if (contraseña.value != '' && contraseña.value.length < 8) {
                console.log(contraseña.value.length)
                erroresLogin.push('Tenés que escribir una contraseña con al menos 8 caracteres')
            }
            
            if (erroresLogin.length > 0) {
                e.preventDefault()
                let ulErrores = document.querySelector('.errores-login-user')
                ulErrores.innerHTML = ''
                for (let i=0; i < erroresLogin.length; i++) {
                    ulErrores.innerHTML += '<li>' + erroresLogin[i] + '</li>'
                }
            }

        })
    }    
})