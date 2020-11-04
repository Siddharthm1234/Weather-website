const input = document.querySelector('input');
const submit = document.querySelector('button');
const result = document.querySelector('.result')


const readData = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/weather?address=${input.value}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
        }else{
            result.textContent = '';
            const para1 = document.createElement('p');
            para1.textContent = data.location;
            const para2 = document.createElement('p');
            para2.textContent = data.api_location;
            const para3 = document.createElement('p');
            para3.textContent = data.forecast;
            result.appendChild(para1);
            result.appendChild(para2);
            result.appendChild(para3);
        }
    })
})
    
}
submit.addEventListener('click', readData);

