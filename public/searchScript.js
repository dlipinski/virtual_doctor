document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    initAreaAPICall()
}

const initAreaAPICall = () => {
    let areaPicker = document.querySelector('#area')
    areaPicker.addEventListener('change', async () => {
        let symptoms = await getSymptomsByArea([...areaPicker.querySelectorAll('option')].filter(o => o.selected)[0].value)
        console.log(symptoms)
    })
}

const getSymptomsByArea = async areaId => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (this.readyState == 4) {
            return xhr.response
        }
    })
    xhr.open('GET', `/symptomsByArea/${areaId}` , true);
    xhr.send()
}