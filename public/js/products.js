let category, status, sort, manualChange
const handleDetail = e => {
    window.location.href = `/products/${e.id}`
}

const handleCart = e => {
    console.log(e)
    // window.location.href = `/products/${e.id}`
}

const handleLimit = (e, limit, page) => {
    let link = ''
    const setLimit = e.value
    if (category) link += `&category=${category}`
    if (status) link += `&status=${status}`
    if (sort) link += `&sort=${sort}`
    localStorage.setItem('filters', JSON.stringify({ category, status, sort }))
    if (manualChange)
        window.location.href = `/products?limit=${setLimit ? setLimit : 10}&page=${1}${link}`
}

const handleCategory = (e, limit, page) => {
    let link = ''
    category = e.value
    if (category) link += `&category=${category}`
    if (status) link += `&status=${status}`
    if (sort) link += `&sort=${sort}`
    localStorage.setItem('filters', JSON.stringify({ category, status, sort }))
    if (manualChange) window.location.href = `/products?limit=${limit}&page=${1}${link}`
}

const handleStatus = (e, limit, page) => {
    let link = ''
    status = e.value
    if (category) link += `&category=${category}`
    if (status) link += `&status=${status}`
    if (sort) link += `&sort=${sort}`
    localStorage.setItem('filters', JSON.stringify({ category, status, sort }))
    if (manualChange) window.location.href = `/products?limit=${limit}&page=${1}${link}`
}

const handleSort = (e, limit, page) => {
    let link = ''
    sort = e.value
    if (category) link += `&category=${category}`
    if (status) link += `&status=${status}`
    if (sort) link += `&sort=${sort}`
    localStorage.setItem('filters', JSON.stringify({ category, status, sort }))
    if (manualChange) window.location.href = `/products?limit=${limit}&page=${page}${link}`
}

window.addEventListener('load', function () {
    const limitInput = document.getElementById('limit')
    if (limitInput) {
        const limit = limitInput.getAttribute('limit')
        const categorySelect = document.getElementById('category')
        const statusSelect = document.getElementById('status')
        const sortSelect = document.getElementById('sort')
        let filters = localStorage.getItem('filters')
        if (filters) {
            filters = JSON.parse(filters)
            if (filters.hasOwnProperty('category')) {
                category = filters.category
            } else {
                category = ''
            }
            if (filters.hasOwnProperty('status')) {
                status = filters.status
            } else {
                status = ''
            }
            if (filters.hasOwnProperty('sort')) {
                sort = filters.sort
            } else {
                sort = ''
            }
            categorySelect.value = category
            statusSelect.value = status
            sortSelect.value = sort
            limitInput.value = limit
        }
        manualChange = true
    }
})
