
fetch("http://localhost:4545/api/allproducts")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })