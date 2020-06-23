const appController = (() => {
    const participants = ['Arafat Rahman', 'Ishrar Tahsin', 'Moshiur Alam', 'Mohammad Tur', 'Rakib Jahan Abid', 'Foysal Ahmed', 'Wasif Alam Nadvee', 'Mahfujur Rahman', 'Foyaz Ahmed', 'Abdullah Al Zubair', 'Arifur Rahman Romi']

    const data = {
        alive: []
    }


    if (!localStorage.getItem('alive')) {
        data.alive = participants
        localStorage.setItem('alive', data.alive)
    } else {
        data.alive = localStorage.getItem('alive').split(',')
    }



    const updateLocalStorage = () => {
        localStorage.setItem('alive', data.alive)
    }

    const toss = array => {
        let resultNum = Math.floor(Math.random() * array.length)
        let result = array[resultNum]
        let sacInd = data.alive.indexOf(result)
        data.alive.splice(sacInd, 1)
        updateLocalStorage()
        return result
    }

    const clearHistory = () => {
        data.alive = participants
        updateLocalStorage()
    }

    return {
        getToss: array => {
            return toss(array)
        },

        getAlive: () => {
            return data.alive
        },

        getClearHistory: () => {
            return clearHistory()
        }
    }
})()



const UIController = (() => {

    const DOM = {
        loader: document.querySelector('.loader'),
        tossResult: document.querySelector('.result__name'),
        aliveCont: document.querySelector('.history__result'),
        clearHistoryBtn: document.querySelector('.clear'),

        tempBtns: document.querySelectorAll('.edit'),

        tossBtn: document.querySelector('.toss')
    }

    const tossUI = result => {
        if (result) {
            DOM.tossResult.style.display = 'initial'
            DOM.tossResult.textContent = result
        }
    }

    const aliveUI = aliveArr => {

        DOM.aliveCont.innerHTML = ''

        aliveArr.forEach(cur => {
            let markup = `
            <li>
                <svg class="sac-list">
                    <use href="icons.svg#icon-check"></use>
                </svg>

                <span class="name">${cur}</span>

                <svg class="sac-list sac-remove">
                    <use href="icons.svg#icon-circle-with-cross"></use>
                </svg>  
            </li>
            `

            DOM.aliveCont.insertAdjacentHTML('beforeend', markup)
        })
    }



    return {
        getDOM: () => {
            return DOM
        },

        getTossUI: result => {
            return tossUI(result)
        },

        getAliveUI: aliveArr => {
            return aliveUI(aliveArr)
        } 
    }
})()



const controller = ((appCtrl, UICtrl) => {
    const DOM = UICtrl.getDOM()

    const tossCtrl = () => {
        let result = appCtrl.getToss(appCtrl.getAlive())
        UICtrl.getTossUI(result)
        UICtrl.getAliveUI(appCtrl.getAlive())
    }

    const clearHistoryCtrl = () => {
        appCtrl.getClearHistory()
        UICtrl.getAliveUI(appCtrl.getAlive())
    }


    const setupEventLiseteners = () => {
        DOM.tossBtn.addEventListener('click', tossCtrl)
        document.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                tossCtrl()
            }
        })

        DOM.clearHistoryBtn.addEventListener('click', clearHistoryCtrl)
    }

    const tempEvents = () => {
        DOM.tempBtns.forEach(cur => {
            cur.addEventListener('click', () => {
            alert('Coming Soon....')
        })})
    }

    return {
        init: () => {
            setupEventLiseteners()
            tempEvents()
            UICtrl.getAliveUI(appCtrl.getAlive())
        }
    }
})(appController, UIController)

controller.init()