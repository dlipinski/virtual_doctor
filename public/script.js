document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        if(document.querySelector('#search'))
            initSearch()
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