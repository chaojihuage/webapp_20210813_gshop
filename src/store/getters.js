export default {
    totalCount (state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    totalPrice (state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
    },
    // positiveSize (state) {
    //     return (state.ratings.filter(item => {
    //         return item.rateType === 0
    //     })).length
    // }, 满意数量
    positiveSize (state) {
        return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
    }
}
