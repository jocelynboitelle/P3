function getApi(urlApi, callback) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                const jsonResponse = JSON.parse(request.responseText);
                callback(jsonResponse);
            } else {
                console.error(request.status + " " + request.statusText + " " + urlApi);
            }
        }
    };

    request.open("GET", urlApi);
    request.send()
}
