const logoutButton = new LogoutButton()
const ratesBoard = new RatesBoard()
const moneyManager = new MoneyManager()
const favoritesWidget = new FavoritesWidget()

function responseFavorites(response) {
    if (response.success) {
        favoritesWidget.clearTable()
        favoritesWidget.fillTable(response.data)
        moneyManager.updateUsersList(response.data)
    } else {
        favoritesWidget.setMessage(response.success, response.error)
    }
}

function responseMoney(response) {
    if (response.success) {
        moneyManager.setMessage(response.success, 'Успешно')
        ProfileWidget.showProfile(response.data)
    } else {
        moneyManager.setMessage(response.success, response.error)
    }
}

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload()
        }
    })
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
})

function getStocksValute() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable()
            ratesBoard.fillTable(response.data)
        }
    })
}
getStocksValute()
setInterval(getStocksValute, 60000)

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, responseMoney) 
    }
moneyManager.conversionMoneyCallback = data => {
     ApiConnector.convertMoney(data, responseMoney) 
    }
moneyManager.sendMoneyCallback = data => {
     ApiConnector.transferMoney(data, responseMoney) 
    }

ApiConnector.getFavorites(responseFavorites)
favoritesWidget.addUserCallback = data => {
     ApiConnector.addUserToFavorites(data, responseFavorites) 
    }
favoritesWidget.removeUserCallback = id => {
     ApiConnector.removeUserFromFavorites(id, responseFavorites) 
    }