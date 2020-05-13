function retrieveUser(token, callback) {
    String.validate.notVoid(token)

    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const { name, surname, username, categories, country, favorite, headlines } = JSON.parse(body)
                
                callback(undefined, { name, surname, email:username, categories, country, favorite, headlines})
            } else {
                const { error } = JSON.parse(body)
                

                callback(new Error(error))
            }
        }
    )
}