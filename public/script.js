document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        if (document.querySelector('#search'))
            initSearch()
        if (document.querySelector('#from_datepicker'))
            initDatepicker()
        initStars()
    }
})



const initSearch = () => {
    let searchBar = document.querySelector('#search')
    let rows = document.querySelectorAll('table.table tbody tr')
    searchBar.addEventListener('input', () => {
        let phrase = searchBar.value
        if (phrase.trim().length === 0) {
            rows.forEach(row => {
                row.style['display'] = 'table-row'
            })
        } else {
            rows.forEach(row => {
                let name = row.children[0].innerHTML
                if (name.toLowerCase().includes(phrase.toLowerCase())) {
                    row.style['display'] = 'table-row'
                } else {
                    row.style['display'] = 'none'
                }
            })
        }
    })

}

const initDatepicker = () => {
    let date = new Date()
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    $('#from_datepicker').datepicker({
        autoclose: true,
        endDate: new Date(),
        todayHighlight: true
    })
    $('#to_datepicker').datepicker({
        autoclose: true,
        endDate: new Date(),
        todayHighlight: true
    })

    $('#from_datepicker').datepicker('setDate', today)
    $('#to_datepicker').datepicker('setDate', today)

    let from = document.querySelector('#from_datepicker')
    let to = document.querySelector('#to_datepicker')

    $('#from_datepicker').datepicker().on('changeDate', () => {
        datepickerHandler(`${from.value};${to.value}`)
    })
    $('#to_datepicker').datepicker().on('changeDate', () => {
        datepickerHandler(`${from.value};${to.value}`)
    })

}

const datepickerHandler = date => {
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            fillSearches(JSON.parse(xhr.responseText))
        }
    })
    xhr.open('GET', `/search/searchesByDate/${encodeURIComponent(date)}`, true)
    xhr.send()
}

const fillSearches = searches => {
    let tbody = document.querySelector('#searchesTable tbody')
    tbody.innerHTML = ''
    searches.forEach(search => {
        tbody.innerHTML += searchRow(search)
    })
}

const searchRow = search => {
    return `
        <tr>
            <td>${search.area.name}</td>
            <td>${search.symptoms.map(s => s.name).join(',')}</td>
            <td>${new Date(search.createdAt).toLocaleString()}</td>
            <td>
                <form class='my-form' action='/search/remove/${search.id}' method='POST'>
                    <button class='btn btn-danger btn-sm' type='submit'>
                        <i class='far fa-trash-alt'></i>
                    </button>
                </form>
            </td>
        </tr>
    `
}


const initStars = () => {
    [...document.querySelectorAll('.rating')].forEach( rating => {
        let stars = [...rating.children]
        stars.forEach( (star, index) => {
            star.addEventListener('mouseover', () => {
                stars.forEach( star => {
                    star.classList.remove('fas')
                    star.classList.add('far')
                })
                star.classList.remove('far')
                star.classList.add('fas')
                for(let i=index; i>=0; i--) {
                    stars[i].classList.remove('far')
                    stars[i].classList.add('fas')
                }
            })
            star.addEventListener('mouseout', () => {
                star.classList.add('far')
                star.classList.remove('fas')
                for(let i=index; i>=0; i--) {
                    stars[i].classList.add('far')
                    stars[i].classList.remove('fas')
                }
            })
        })
        rating.addEventListener('mouseout', () => {
            stars.forEach( (star, index) => {
                if (index > parseInt(rating.id)){
                    star.classList.remove('fas')
                    star.classList.add('far')
                } else {
                    star.classList.remove('far')
                    star.classList.add('fas')
                }
            })
        })
        rating.addEventListener('click', () => {
            let val = rating.querySelectorAll('.fas').length
            rating.querySelector('input').value = val
            rating.querySelector('form').submit()
        })
    })
}