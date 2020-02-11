var create = document.getElementById("create");
var body = document.querySelector("body");

body.addEventListener('click', function(e) {
    if(e.target.getAttribute('id') ===  'del') {
        const id = e.target.getAttribute('data-id');//
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    readFunction();
                }
            }
        };

        var defaultParams = {
            id: id
        };
        var params = new URLSearchParams(defaultParams);

        xhr.open('delete', 'http://localhost:8080/', true);
        xhr.send(params);
    }

    if(e.target.getAttribute('id') ===  'upd') {  //Update
        const id = e.target.getAttribute('data-id');
        const updateName = document.querySelector('[data-name-id="'+id+'"]');
        const updateLastName = document.querySelector('[data-last_name-id="'+id+'"]');
        const updateAge = document.querySelector('[data-age-id="'+id+'"]');
        const updateCity = document.querySelector('[data-city-id="'+id+'"]');

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log( xhr.responseText );
                }
            }
        };
        var defaultParams = {
            id: id,
            name: updateName.value,
            last_name: updateLastName.value,
            age: updateAge.value ,
            city: updateCity.value
        };
        var params = new URLSearchParams(defaultParams);

        xhr.open('put', 'http://localhost:8080/');
        xhr.send(params);
    }

});

create.addEventListener('click', function() {
    var inputName = document.getElementById('name');
    var inputLastName = document.getElementById('last_name');
    var inputAge = document.getElementById('age');
    var inputCity = document.getElementById('city');
    if(!inputName.value || !inputLastName.value || !inputAge.value || !inputCity.value) {
        alert("Put here your info");
        return;
    } else if(inputAge.value <= 0) {
        alert("Age must be bigger than 0 !!!  Please, be more attentive.");
        return;
    }

    const xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                readFunction();
                inputName.value = '';
                inputLastName.value = '';
                inputAge.value = '';
                inputCity.value ='';
            }
        }
    };

    var defaultParams = {
        name: inputName.value,
        last_name: inputLastName.value,
        age: inputAge.value ,
        city: inputCity.value
    };
    var params = new URLSearchParams(defaultParams);

    xhr.open('post', 'http://localhost:8080/');
    xhr.send(params);

});

readFunction();

function readFunction() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                let str = `<div class="row p-2">
                                <div class="col-1 text-justify">
                                    ID
                                </div>
                                <div class="col-2 text-justify">
                                    FIRST NAME
                                </div>
                                <div class="col-2 text-justify">
                                    LAST NAME
                                </div>
                                <div class="col-1 text-justify">
                                    AGE
                                </div>
                                <div class="col-2 text-justify">
                                    HOME TOWN
                                </div>
                            </div>`;
                data.forEach(element => {
                    const row = `<div class="row p-2">
					                <div class="col-1 text-justify">
					                    ${element.id}
					                </div>
					                <div class="col-2 text-justify">
                                        <input class="form-control" type="text" data-name-id="${element.id}" value="${element.name}"></input>
					                </div>
					                <div class="col-2 text-justify">
                                        <input class="form-control" type="text" data-last_name-id="${element.id}" value="${element.last_name}"></input>
					                </div>
					                <div class="col-1 text-justify">
                                        <input class="form-control" type="text" data-age-id="${element.id}" value="${element.age}"></input>
					                </div>
					                <div class="col-2 text-justify">
                                        <input class="form-control" type="text" data-city-id="${element.id}" value="${element.city}"></input>
					                </div>
					                <div class="col-1 text-justify">
					            		<button class="btn btn-primary btn-sm" id="upd" data-id=${element.id}>Update</button>       
					                </div>
					                <div class="col-1 text-justify">
					                    <button class="btn btn-primary btn-sm" id="del" data-id=${element.id}>Delete</button>
					                </div>
					            </div>`;
					str += row;            
                });
                document.querySelector('#students').innerHTML = str;
            }
        }
    };
    xhr.open('get', 'http://localhost:8080/', true);
    xhr.send();
}
