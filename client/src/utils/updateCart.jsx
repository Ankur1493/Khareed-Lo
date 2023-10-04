export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(1);
};

export const updateCart = (state) => {
    
    const totalPrice = state.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    state.totalPrice= addDecimals(totalPrice);

    localStorage.setItem("cart", JSON.stringify(state));
  };

