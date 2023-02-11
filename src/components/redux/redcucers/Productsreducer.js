const products = [];

export const getProductsreducer = (state = { products }, action) => {
    if (action.type === "SUCCESS_GET_PRODUCTS") {
        return { products: action.payload }

    }
    if (action.type === "FAIL_GET_PRODUCTS") {
        return { products: action.payload }

    }
    return state;




}
