export interface IDishShort {
  name: string
  description: string
  price: number
}

export interface IDishList{
  [id:string]: IDishShort
}

export interface IDish extends IDishShort{
  id: string
}