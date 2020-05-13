function toggleFavorite(token, id, callback){   // logica para pasar un coin a favorite
    String.validate.notVoid(token)
    String.isString(id)
    Function.validate(callback)
    
    let url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
    let body = undefined
    let headers = { 'Authorization': `Bearer ${token}` }


    call('GET', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 200) {
            let { favorites = [] } = JSON.parse(response)

            if (favorites.indexOf(id) === -1) {
                favorites.push(id)
            } else {
                favorites = favorites.filter(fav => fav !== id)
            }
            
            body = JSON.stringify({favorites})
            headers =  { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
            
            
            call('PATCH', url, body, headers, (error, status, response) => {
                
                if(error) return callback(error)
            
                if(status === 204) return callback()
            
                const { error: apiError } = JSON.parse(response)
                callback(new Error(apiError))
            })

        } else {
            const { error: apiError } = JSON.parse(response)
            callback(new Error(apiError))
        }
    })

}



