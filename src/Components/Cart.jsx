import { useSelector } from "react-redux";

const Cart = () => {
  const data = useSelector((state) => state.user.cartItem);

  console.log(data);

  return (
    <div className="border-1 flex flex-col">
      <div> Your Cart Items </div>

      {data?.length > 0 ? (
        data.map((item) => (
          <div className="  ">
            <div className=" ">
              <label> Name</label>
              <h3>{item.name}</h3>
              <label>Description</label> <p>{item.description}</p>
              <label>Category</label> <h4>{item.category}</h4>
              <label>Price</label> <h5>{item.price}</h5>
            </div>
          </div>
        ))
      ) : (
        <div> No data found </div>
      )}
    </div>
  );
};

export default Cart;
