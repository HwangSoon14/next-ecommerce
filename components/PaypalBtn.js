import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchData } from '../utils/fetchData';
import LoadingCpn from './Loading';
import { toast } from 'react-toastify';
import { orderPaypal } from '../store/slice/orderSlice';
const PaypalBtn = (props) => {
  const {total, orderProps} = props;
  const [loading , setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
    const paypalRef = useRef()
    useEffect(() => {
        paypal.Buttons({

            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: total,
                  }
                }]
              });
            },
    
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(orderData) {
               
                setLoading(true);
                patchData(`order/payment/${orderProps._id}`,{paymentId: orderData.payer.payer_id}, token).then(res => {
                  if(res.err) {
                    setLoading(false);
                    return toast.error(res.err);
                  }
                  dispatch(orderPaypal({paid: result.paid ,dateOfPayment: result.dateOfPayment, id:order._id, paymentId: order.payer.payer_id , method: "Paypal" }));
                  toast.success(res.msg);
                setLoading(false);
                    });        
                  });
            }
          }).render(paypalRef.current);
    }, [])

    return (
        <div ref={paypalRef}> 
            {loading && <LoadingCpn />}
        </div>
    );
};

export default PaypalBtn;