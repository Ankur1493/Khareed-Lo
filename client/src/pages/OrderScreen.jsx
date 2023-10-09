import React,{useEffect} from 'react'
import { useParams } from 'react-router'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } from '../slices/ordersApiSlice';
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js"
import { useSelector } from 'react-redux';
import Loader from "../components/Loader"
import Message from '../components/Message';
import {toast} from "react-toastify";
 

const OrderScreen = () => {

    const {id: orderId}= useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
      } = useGetOrderDetailsQuery(orderId);


    const [payOrder, {isLoading: loadingPayment}] =  usePayOrderMutation();

    const[{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const {data: paypal, isLoading: loadingPaypal, error: errorPaypal} = useGetPaypalClientIdQuery();

    const {userInfo} = useSelector(state=> state.auth);

    useEffect(()=>{
      if(!errorPaypal && !loadingPayment && paypal && paypal.clientId){
        const loadPayPalScript = async()=>{
          paypalDispatch({
            type: "resetOptions",
            value:{
              "clientId" : paypal.clientId,
              currency: "USD"
            }
          });
          paypalDispatch({type: 'setLoadingStatus',value: "pending"});
        }
        if(order && !order.isPaid){
          if(!window.paypal){
            loadPayPalScript();
          }
        }
      }
    },[order,paypal, paypalDispatch, loadingPaypal, errorPaypal]);


    function onApprove(data, actions) {
      return actions.order.capture().then(async function (details) {
        try {
          await payOrder({ orderId, details });
          refetch();
          toast.success('Payment Successful');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      });
    }

    async function onApproveTest (){
        await payOrder({ orderId, details: {payer: {} } });
          refetch();
          toast.success('Payment Successful');
    }

    function createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: { value: order.totalPrice },
            },
          ],
        })
        .then((orderID) => {
          return orderID;
        });
    }
    
    function onError(err){
      toast.error(err.message || err.error);
    }


  return (
    <div className='pt-16 h-[90vh] flex'>

      {
        isLoading? (
          <div className='flex w-[100vw] justify-center items-center'>
            <Loader/>
          </div>
        ):
      
        (
        <div className='flex w-screen'>
        <div className="leftArea w-[60%] ml-8 min-h-[80vh] mt-5">
        <div className='text-3xl font-bold text-gray-800'>Order No:- <span className='font-semibold text-black'>{orderId}</span></div>
          <div className="head text-2xl text-gray-800 font-semibold ml-5 mt-4">Shipping</div>
            <div className="userInfo mt-3 ml-5">
              <div className='font-semibold text-[18px] text-gray-800'>Name: <span className='font-normal text-[15px] text-black'>{order?.user?.name}</span></div>
              <div className='font-semibold text-[18px] text-gray-800'>Email: <span className='font-normal text-[15px] text-black'>{order?.user?.email}</span></div>
              <div className='font-semibold text-[18px] text-gray-800'>Address: <span className='font-normal text-[15px] text-black'>{order?.shippingAddress.address} {order?.shippingAddress.city} {order?.shippingAddress.postalCode} {order?.shippingAddress.country}</span></div>
              {
                order.isDelivered? (
                  <div className='w-[70%] h-20 my-3 py-5 pl-4 text-2xl rounded-lg bg-blue-300 border-blue-400 border'>
                    Delivered on {order.deliveredAt}
                  </div>
                )
                :(
                  <div className='w-[70%] h-20 my-3 py-5 pl-4 text-2xl rounded-lg bg-red-300 border-red-400 border'>
                    Not Delivered
                  </div>
                )
              }
            </div>
            <div className="payment mt-4 ml-5">
              <div className="head text-2xl text-gray-800 font-semibold mt-4">Payment Status</div>
              {
                order.isPaid? (
                  <div className='w-[70%] h-20 my-3 py-5 pl-4 text-2xl rounded-lg bg-blue-300 border-blue-400 border'>
                    Paid on {order.paidAt}
                  </div>
                ):
                (
                  <div className='w-[70%] h-20 my-3 py-5 pl-4 text-2xl rounded-lg bg-red-300 border-red-400 border'>
                  Not paid
                  </div>
                  )
              }
            </div>

            <div className="details my-6 ml-5">
            <div className="head text-2xl text-gray-800 font-semibold mt-4">Order Items</div>
              <ul>
              {order.orderItems.map((order)=>(
                <li key={order._id}>
                    <div className='flex my-3 w-[60%] h-16 items-center border-[1.5px] pl-4 border-red-400 rounded-lg '>
                    <div><img className='h-14 w-14' src={order.image} alt="" /></div>
                    <div className='flex justify-between items-start w-full pr-4'>
                      <div className='text-[20px]'>{order?.name}</div>
                      <div >

                        <div>Qty: {order.qty}</div>
                        <div>Price per unit: {order.price}</div>
                      </div>
                    </div>
                    </div>
                  </li>
              )
              )}
              </ul>
            </div>
        </div>
        <div className="rightArea flex justify-start text-center items-center w-[40%] min-h-[80vh]">
          <div className='h-[60vh] w-2/3 rounded-md border border-red-200 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
            <div className="head text-3xl text-gray-800 h-14 border-b-2 border-red-300 font-semibold mt-4">Order Summary</div>
            <div className="details border-b-2 border-red-300 text-start mt-8 pb-8 leading-8 pl-5 text-[18px]">
              <div>Payment Method:- <span className='ml-16'>{order.paymentMethod}</span></div>
              <div>Items Price:- <span className='ml-28'>{order.totalPrice}</span></div>
              <div>Shipping Price:- <span className='ml-20 pl-1'>0</span></div>
            </div>
            {
              !order.isPaid && (

                <div className="buttons">
                   {loadingPayment && <Loader/>}
                   {isPending ? <Loader/> : (
                    <div>
                      <button onClick={onApproveTest} className='border-2 m-4'>Test Pay Order</button>
                      <div><PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}></PayPalButtons></div>
                    </div>
                   )}
                </div>
                )
            }

          </div>
        </div>
      </div>)    
      }
    
    </div>
  )
}

export default OrderScreen