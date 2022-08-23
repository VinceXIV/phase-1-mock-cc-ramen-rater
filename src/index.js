// write your code here
populateDom()

function populateDom(){
    fetch('http://localhost:3000/ramens')
    .then(result => result.json())
    .then(data => {
        initializeFunctionDetail()
        for(ramen of data){
            const menuItem = addItemToMenu(ramen)
            handleClickOnItem(menuItem)
        }
    })
}

function addItemToMenu(ramen){
    const domRamenMenu = document.getElementById('ramen-menu')
    
    const menuItem = document.createElement('div')
    menuItem.id = ramen.id
    menuItem.innerHTML = `
        <img src="${ramen.image}"/>
    `
    menuItem.style.margin = "0.1em"

    domRamenMenu.append(menuItem)

    return menuItem
}

function initializeFunctionDetail(){
    fetch(`http://localhost:3000/ramens/1`)
    .then(result => result.json())
    .then(data => {
        showDetails(data)
    })
}

function handleClickOnItem(menuItem){
    menuItem.addEventListener('click', e=>{
        const clickedItemId = e.target.parentElement.id
        fetch(`http://localhost:3000/ramens/${clickedItemId}`)
        .then(result => result.json())
        .then(data => {
            showDetails(data)
        })
    })

    return menuItem
}

function showDetails(menuItem){
    const domRamenDetail = document.getElementById('ramen-detail')
    domRamenDetail.querySelector('.detail-image').src = menuItem.image
    domRamenDetail.querySelector('.name').textContent = menuItem.name
    domRamenDetail.querySelector('.restaurant').textContent = menuItem.restaurant
    document.getElementById('rating-display').textContent = menuItem.rating
    document.getElementById('comment-display').textContent = menuItem.comment
}