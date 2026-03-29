import type { IBasketState, IDish, IBasket } from '../types'

const calculateTotals = (items: IBasket[]): IBasketState => {
    const totalCount = items.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.dish.price * item.count), 0)
    return { items, totalCount, totalPrice }
  }

export const addDishToBasket = (currentState: IBasketState, dish: IDish): IBasketState => {
  const existingItemIndex = currentState.items.findIndex((item) => item.dish.id === dish.id)

  let newItems: IBasket[]

  if (existingItemIndex !== -1) {
    newItems = currentState.items.map((item, index) => {
      if (index === existingItemIndex) {
        return { ...item, count: item.count + 1 }
      }
      return item
    })
  } else {
    newItems = [...currentState.items, { dish, count: 1 }]
  }
  return calculateTotals(newItems)
}

export const decreaseDishCount = (currentState: IBasketState, dishId: string): IBasketState => {
    const newItems = currentState.items
      .map((item) => {
        if (item.dish.id === dishId) {
          return { ...item, count: item.count - 1 }
        }
        return item
      })
      .filter((item) => item.count > 0) 
  
    return calculateTotals(newItems)
  }

export const increaseDishCount = (currentState: IBasketState, dishId: string): IBasketState => {
    const newItems = currentState.items.map((item) => {
      if (item.dish.id === dishId) {
        return { ...item, count: item.count + 1 }
      }
      return item
    })

    return calculateTotals(newItems)
}