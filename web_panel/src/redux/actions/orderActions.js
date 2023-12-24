import { OrderConstants, ActionTypes } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastObjects } from "../../util/toastObject";
import { logout } from "./userActions";
import { Modal } from "antd";
const { confirm } = Modal;

const { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } =
  OrderConstants;
const { CLEAR_CART_ITEM } = ActionTypes;

export const createOrder = (reqData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const response = await axios.post(`orders/`, reqData);

    const responseData = response.data;

    if (!responseData.status) {
      toast.error(responseData.message, ToastObjects);
    } else {
      toast.success(responseData.message, ToastObjects);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: responseData });
      dispatch({ type: CLEAR_CART_ITEM });
      localStorage.removeItem("cartItems");
    }

    const orderId = responseData.orderId;
    // Usage: Call the downloadInvoice function with the order ID
    downloadInvoice(orderId);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    toast.error(message, ToastObjects);

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const processPayment = (reqData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const response = await axios.post("checkout/payment/", reqData);

    const responseData = response.data;

    if (!responseData.status) {
      toast.error(responseData.message, ToastObjects);
    } else {
      dispatch(createOrder(reqData));
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    toast.error(message, ToastObjects);

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

// Function to download the invoice PDF

const downloadInvoice = async (orderId) => {
  try {
    confirm({
      title: "Download Invoice",
      content: "Do you want to download the invoice?",
      onOk: async () => {
        const response = await axios.get(
          `http://localhost:5002/api/orders/invoice/${orderId}`,
          {
            responseType: "arraybuffer", // Set the response type to 'arraybuffer'
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice_${orderId}.pdf`);

        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        link.remove();
      },
      onCancel: () => {
        // Handle cancelation if desired
      },
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};
