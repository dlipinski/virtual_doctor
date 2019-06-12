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
    let symptomButtonContainer = document.querySelector('#symptoms_buttons')

    areaButtons.forEach(button => {
        button.addEventListener('click', () => {
            symptomButtonContainer.innerHTML = ''
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

let symptoms = {}

const getSymptomsByArea = areaId => {
    if (symptoms[areaId]) {
        fillSymptoms(symptoms[areaId])
    } else {
        let xhr = new XMLHttpRequest()
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                symptoms[areaId] = JSON.parse(xhr.responseText)
                fillSymptoms(symptoms[areaId])
            }
        })
        xhr.open('GET', `/search/symptomsByArea/${areaId}` , true)
        xhr.send()
    }
}

const fillSymptoms = symptoms => {
    let areaPicker = document.querySelector('#area')
    let searchbutton = document.querySelector('#searchButton')
    let symptomButtonContainer = document.querySelector('#symptoms_buttons')
    let symptomsInput = document.querySelector('#symptoms')
    searchbutton.addEventListener('click', () => {
        document.querySelector('#disaesCard').style['display'] = 'block'
        sendStatistic([...areaPicker.querySelectorAll('option')].filter(o => o.selected)[0].value, symptomsInput.value.slice(0,-1).split(','))
        getDisaesBySymptoms(symptomsInput.value.slice(0,-1).split(','))
    })
    
    symptoms.forEach(symptom => {
        let button = document.createElement('button')
        button.classList.add('btn','btn-outline-info', 'mr-1', 'symptom-button')
        if (symptomsInput.value.split(',').includes(symptom._id))
            button.classList.add('active')
        button.innerHTML = symptom.name
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) {
                symptomsInput.value = symptomsInput.value.replace(`${symptom._id},`,'')
                button.classList.remove('active')
            } else {
                symptomsInput.value = symptomsInput.value + `${symptom._id},`
                button.classList.add('active')
            }
            if (symptomsInput.value.length > 1){
                searchbutton.removeAttribute('disabled')
            } else {
                searchbutton.setAttribute('disabled', 'true')
            }
        })
        symptomButtonContainer.appendChild(button)
    })

}

const sendStatistic = (area, symptoms) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', `/search/create` , true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ area, symptoms }))
}

const getDisaesBySymptoms = symptomsIds => {
    document.querySelector('#waitContainer').style.display='block'
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {          
            setTimeout(() => {
                fillDisaes(JSON.parse(xhr.responseText))
                document.querySelector('#waitContainer').style.display='none'
            }, 200)
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

