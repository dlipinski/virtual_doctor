document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    initAreaRestCall()
}


/* icony ciala: https://www.flaticon.com/packs/human-body-outline*/
const initAreaRestCall = () => {
    let areaPicker = document.querySelector('#area')
    let areaButtons = document.querySelectorAll('.area-button')
    areaButtons.forEach(button => {
        button.addEventListener('click', () => {
            ;[...document.querySelector('#symptoms_buttons').children].forEach(but => {but.remove()})
            document.querySelector('#disaesCard').style['display'] = 'none'
            let areaId = button.id
            if([...areaButtons].filter(b => b.classList.contains('active'))[0] !== undefined) {
                ;[...areaButtons].filter(b => b.classList.contains('active'))[0].classList.remove('active')
            } 
            button.classList.add('active')
            ;[...areaPicker.querySelectorAll('option')].filter(o => o.selected)[0].removeAttribute('selected')
            ;[...areaPicker.querySelectorAll('option')].filter(o => o.value === areaId)[0].setAttribute('selected', 'true')
            getSymptomsByArea(areaId)
        })
    })
   
}

const getSymptomsByArea = areaId => {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            fillSymptoms(JSON.parse(xhr.responseText))
        }
    })
    xhr.open('GET', `/search/symptomsByArea/${areaId}` , true)
    xhr.send()
}

const fillSymptoms = symptoms => {
    let symptomsPicker = document.querySelector('#symptoms')
    let areaPicker = document.querySelector('#area')
    let searchbutton = document.querySelector('#searchButton')
    let symptomButtonContainer = document.querySelector('#symptoms_buttons')
    symptomsPicker.innerHTML = ''
    searchbutton.addEventListener('click', () => {
        document.querySelector('#disaesCard').style['display'] = 'block'
        sendStatistic([...areaPicker.querySelectorAll('option')].filter(o => o.selected)[0].value, [...symptomsPicker.querySelectorAll('option')].filter(o => o.selected).map(o => o.value))
        getDisaesBySymptoms([...symptomsPicker.querySelectorAll('option')].filter(o => o.selected).map(o => o.value))
    })
    symptoms.forEach(symptom => {
        let option = document.createElement('option')
        option.innerHTML = symptom.name
        option.value = symptom._id
        symptomsPicker.appendChild(option)
        let button = document.createElement('button')
        button.classList.add('btn','btn-outline-info', 'mr-1')
        button.innerHTML = symptom.name
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                option.removeAttribute('selected')
                button.classList.remove('active')
            } else {
                option.setAttribute('selected', 'true')
                button.classList.add('active')
            }
            if([...symptomsPicker.querySelectorAll('option')].filter(o => o.selected)[0] !== undefined){
                searchbutton.removeAttribute('disabled')
              
            } else {
                searchbutton.setAttribute('disabled', 'true')
            }
        })
        symptomButtonContainer.appendChild(button)
    })
    document.querySelector('#symptomsGroup').style['display'] = 'block'

}





const sendStatistic = (area, symptoms) => {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            console.log('Statistic send', area, symptoms)
        }
    })
    xhr.open('POST', `/search/create` , true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ area, symptoms }))
}

const getDisaesBySymptoms = symptomsIds => { 
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            fillDisaes(JSON.parse(xhr.responseText))
        }
    })
    xhr.open('GET', `/search/disaesBySymptoms/${symptomsIds.join(',')}` , true)
    xhr.send()
}

const fillDisaes = disaes => {
    let disaeContainer = document.querySelector('#disaeContainer')
    disaeContainer.innerHTML = ''
    if  (disaes.length > 0) {
        disaes.forEach(disae => {
            disaeContainer.innerHTML += disaeCard(disae)
        })
    } else {
        disaeContainer.innerHTML = '<h6 class="text-center text-muted mt-3 mb-3">  Brak chorób do wyświetlenia </h6>'
    }
}

const disaeCard = disae => {
   return `
    <a href='/disae/show/${disae._id}'>
        <div class='card' style='width: 30%; display: inline-block;margin: 10px;'>
            <div class='card-header'>
                ${disae.name}
            </div>
            <div class='card-body'>
                ${disae.description}
            </div>
        </div>
    </a>
   `
}