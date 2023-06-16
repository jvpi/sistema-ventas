export default function () {
    clickTabs()
}

function clickTabs() {
    let tabs = document.getElementById('tabs')
    let tabsItems = Array.prototype.slice.call(document.querySelectorAll('.tabs-items'))
    let panelItems = Array.prototype.slice.call(document.querySelectorAll('.panels-items'))
    tabs.addEventListener('click', function (e) {
        if (e.target.className == 'tabs-items') {
            removerClass(tabsItems,panelItems)
            agregarClass(e.target,panelItems,tabsItems)
        }
    })
}
function removerClass(tabsItems,panelItems) {
    for (let index = 0; index < tabsItems.length; index++) {
        tabsItems[index].classList.remove('active')
        panelItems[index].classList.remove('active')
    }
}
function agregarClass(target,panelItems,tabsItems) {
    let indice = tabsItems.indexOf(target)
    panelItems[indice].classList.add('active')
    target.classList.add('active')
}