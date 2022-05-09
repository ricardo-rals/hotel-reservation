const HOTEIS = [
  {
    name: "LakeWood",
    classification: 3,
    typeClient: {
      regular: {
        normalTax: 120,
        weekendTax: 80
      },
      reward: {
        normalTax: 90,
        weekendTax: 80
      }
    },
    totalPrice: 0
  },
  {
    name: "BridgeWood",
    classification: 4,
    typeClient: {
      regular: {
        normalTax: 160,
        weekendTax: 60
      },
      reward: {
        normalTax: 110,
        weekendTax: 50
      }
    },
    totalPrice: 0
  },
  {
    name: "RidgeWood",
    classification: 5,
    typeClient: {
      regular: {
        normalTax: 220,
        weekendTax: 150
      },
      reward: {
        normalTax: 100,
        weekendTax: 40
      }
    },
    totalPrice: 0
  },
]

function getCheapestHotel(type, date1, date2, date3) { //DO NOT change the function's name.
  const dates = [
    new Date(date1).getDay(),
    new Date(date2).getDay(),
    new Date(date3).getDay()
  ]

  const isWeekend = dates.filter(elem => elem === 0 || elem === 6)
  const quantWeekendDays = dates.filter(elem => elem === 0 || elem === 6).length
  const quantNormalDays = dates.length - quantWeekendDays

  if (type === "Regular") {
    if (quantWeekendDays.length !== 0) {
      for (let i = 0; i < HOTEIS.length; i++) {
        if (isWeekend) {
          let price = HOTEIS.map(
            elem =>
              elem.typeClient.regular.weekendTax *
              quantWeekendDays +
              elem.typeClient.regular.normalTax *
              quantNormalDays
          )
          HOTEIS[i].totalPrice = price[i]
        }
      }

      return HOTEIS.reduce((prev, current) => {
        if (prev.totalPrice < current.totalPrice) {
          return prev
        } else if (prev.totalPrice === current.totalPrice) {
          if (prev.classification > current.classification) {
            return prev
          } else if (prev.classification < current.classification) {
            return current
          } else {
            current
          }
        } else {
          return current
        }
      })

    }
  } else if (type === "Reward") {
    if (quantWeekendDays !== 0) {
      for (let i = 0; i < HOTEIS.length; i++) {
        if (isWeekend) {
          let price = HOTEIS.map(
            elem =>
              elem.typeClient.reward.weekendTax *
              quantWeekendDays +
              elem.typeClient.reward.normalTax *
              quantNormalDays
          )
          HOTEIS[i].totalPrice = price[i]
        }
      }

      return HOTEIS.reduce((prev, current) => {
        if (prev.totalPrice < current.totalPrice) {
          return prev
        } else if (prev.totalPrice === current.totalPrice) {
          if (prev.classification > current.classification) {
            return prev
          } else if (prev.classification < current.classification) {
            return current
          } else {
            current
          }
        } else {
          return current
        }
      })
    } else {
      let bestHotel = HOTEIS.find(best => Math.min(best.typeClient.reward.normalTax))
      return bestHotel.name
    }
  } else {
    return "Tipo de cliente inválido"
  }
}
console.log(getCheapestHotel("Regular", "2009, 3, 16", "2009, 3, 17", "2009, 3, 18"))
console.log(getCheapestHotel("Regular", "2009, 3, 20", "2009, 3, 21", "2009, 3, 22"))
console.log(getCheapestHotel("Reward", "2009, 3, 26", "2009, 3, 27", "2009, 3, 28"))

exports.getCheapestHotel = getCheapestHotel
