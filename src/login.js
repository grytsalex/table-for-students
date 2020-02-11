document.getElementById('loginAutorizationBtn').addEventListener('click',() => {
    const login = document.querySelector('#login');
    const password = document.querySelector('#password');
       const body = {
        login: login.value,
        password: password.value     
};
fetch('http://localhost:8080/login', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
})
.then(response => response.json())
.then(response => {
        if(response.success){
            localStorage.setItem('teacher_id', response.id);
            window.location.replace('table.html');
        }
        else {
            failed();
        }
    })
    .catch(failed);

    function failed(error){
        console.log(error);
        alert('Something went wrong... try again later, please');
    }
});


