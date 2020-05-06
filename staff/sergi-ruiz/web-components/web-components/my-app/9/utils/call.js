function call(method, url, body, headers, callback) {
    var xhr = new XMLHttpRequest()

    xhr.open(method, url)

    if (headers)
        for (const key in headers)
            xhr.setRequestHeader(key, headers[key])

    xhr.onload = function() {
        callback(undefined, this.status, this.responseText)
    }

<<<<<<< HEAD
    xhr.onerror = function(error) {
=======
    xhr.onerror = function () {
>>>>>>> develop
        callback(new Error('network error'))
    }

    xhr.send(body ? body : undefined)
}