import axios from "axios";

export const getProducts = () => async (dispatch) => {
    try {
        const getData = await axios.get("/getproducts");
        

        dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: getData.data})

    } catch (error) {
        dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.response })

    }
}




