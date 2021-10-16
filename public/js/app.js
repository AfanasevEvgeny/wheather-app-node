let whetherForm = document.forms['whetherForm']
let whetherInput = whetherForm['whetherInput']
let whetherInfo = document.getElementById('whetherInfo')
console.log(whetherInput)

whetherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(whetherInput.value)

    fetch(`http://localhost:3000/weather?address=${whetherInput.value}`).then((response) => {
        response.json().then(data => {
            whetherInfo.innerText = data.forecast
        })
    })
})