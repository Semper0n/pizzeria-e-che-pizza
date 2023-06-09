import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = [
        ]
        this._products = [


        ]
        this._basketProducts = [


        ]

        this._selectedType = ''

        this._totalPrice = 0

        this._selectedProductId = ''

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setProducts(products) {
        this._products = products
    }
    setBasketProducts(basketProducts) {
        this._basketProducts = basketProducts
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedProductId(id) {
        this._selectedProductId = id
    }
    addTotalPrice(price) {
        this._totalPrice += price
    }
    reduceTotalPrice(price) {
        this._totalPrice -= price
    }

    get types() {
        return this._types
    }
    get products() {
        return this._products
    }
    get basketProducts() {
        return this._basketProducts
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedProductId() {
        return this._selectedProductId
    }
    get totalPrice() {
        return this._totalPrice
    }

}
