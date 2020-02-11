document.getElementById('register').addEventListener('click', () => {
    const login = document.querySelector('#login');
    const password = document.querySelector('#password');
    const email = document.querySelector('#email');
    const phonePrefix = document.querySelector('#phonePrefix');
    const phone = document.querySelector('#phone');
    const body = {
        login: login.value,
        password: password.value,
        email: email.value,
        phone: phonePrefix.value + phone.value
    };
    fetch('http://localhost:8080/teacher', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(response => {
        if(response.success){
            alert('Done!');
        }
        else{
            failed();
        }
    })
    .catch(failed);

    function failed(){
        alert('Something went wrong... try again later, please');
    }
});