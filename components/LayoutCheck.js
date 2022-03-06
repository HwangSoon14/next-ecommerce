import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getData} from '../utils/fetchData'
import {save} from '../store/slice/userSlice'
import { useSelector } from "react-redux";
import { saveAll } from "../store/slice/cartSlice";
import { toast } from "react-toastify";
import {saveOrders} from '../store/slice/orderSlice'
import { saveUsers } from "../store/slice/usersSlice";
import { saveCategories } from "../store/slice/categoriesSlice";
const LayoutCheck = ({ children }) => {
    const cart = useSelector(state => state.cart.cart);
    const token = useSelector(state => state.user.token);
    const auth = useSelector(state => state.user.user);
    const orders = useSelector(state => state.order.order);
    const dispatch = useDispatch();
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin) {
            getData("auth/accessToken").then(res => {
                if(res.err) return localStorage.removeItem("firstLogin");
                dispatch(save({
                    user: res.user,
                    access_token: res.access_token,
                }))
            })
        }
        getData("categories").then(res => {
            if(res.err) return toast.error(res.err)
            dispatch(saveCategories({categories: res.categories}));
        })

    }, [dispatch])

    useEffect(() => {
          const next__cart = JSON.parse(localStorage.getItem("next__cart"));
          if(next__cart) {
              dispatch(saveAll(next__cart));
              
          }
    }, [dispatch])
    useEffect(() => {
            localStorage.setItem("next__cart" , JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if(token) {
            getData("order" , token).then(res => {
                if(res.err) return toast.error(res.err);
                dispatch(saveOrders(res.orders));
            })

            if(auth.role === "admin") {
                getData("user" , token).then(res => {
                    if(res.err) return toast.error(res.err);
                    dispatch(saveUsers({users: res.users}));
                })
            }
        }
    } , [token ,dispatch , auth])

    return (
    <>
      {children}
    </>
  );
};

export default LayoutCheck;
