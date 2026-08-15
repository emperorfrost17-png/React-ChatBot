import { Link } from "react-router";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./TrackingPage.css";
export function TrackingPage({ cart }) {
  //this is for getting orderId and productId out of the URL
  const { orderId, productId } = useParams();

  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchOrderdata = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };
    fetchOrderdata();
  }, [orderId]);

  if (!order) {
    return null;
  }
  //The code below means
  //Go through order.products.
  //For each item, check if its productId matches the productId from the URL.
  //Save the matching item as orderProduct.
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });
  //This gets total time required for the delivery
  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  //calculates time passed since creating the order
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;

  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100 ;

  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}{" "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"} `}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"} `}>Shipped</div>
            <div className={`progress-label ${isDelivered && "current-status"} `}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
