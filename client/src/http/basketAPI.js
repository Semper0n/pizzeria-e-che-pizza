import {$authHost} from "./index";

export const createBasketProduct = async (basketProduct) => {
    const {data} = await $authHost.post('api/basket', basketProduct)
    return data
}

export const fetchBasketProducts = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

export const removeBasketProduct = async (basketProduct) => {
    const {data} = await $authHost.post('api/basket/remove', basketProduct)
    return data
}

// export const fetchOneBasketProduct = async (id) => {
//     const {data} = await $authHost.get('api/basket/' + id)
//     return data
// }