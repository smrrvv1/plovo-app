import type { IBasketState, IDish, IBasket } from '../types'

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

  const totalCount = newItems.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = newItems.reduce((sum, item) => sum + (item.dish.price * item.count), 0)

  return { items: newItems, totalCount, totalPrice }
}