import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { selectUser } from '../../features/userSlice';
import { selectsubs, subs_int,subs_out } from '../../features/subsSlice';
import db from '../../firebase';
import './plans.css'

function Plans({products}) {
    let history = useHistory();
    const user = useSelector(selectUser);
    const subs = useSelector(selectsubs);
    const [loading,setLoading]=useState(false);
    const [subscription,setSubscriptions]=useState(null);  
    const dispatch = useDispatch();
console.log(subs)
useEffect(() =>{
    if(user){
        db.collection("customers")
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(async subscription => {
                setSubscriptions({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
    
                })
                if(subscription){
                    dispatch(subs_int({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    }));
                  }else{
                    dispatch(subs_out());
                  }
    
            })
           
        })  
    }
   

},[user,dispatch])
        const loadCheckout = async (priceId) => {
            setLoading(true)
          const docRef =await db
          .collection("customers")
          .doc(user.uid)
          .collection("checkout_sessions")
          .add({
              price: priceId,
                success_url: window.location.origin,
                   cancel_url: window.location.origin,
              });
          docRef.onSnapshot(async(snap) => {
              const{ error,sessionId} =snap.data();
              if(error){
                setLoading(false)
                  alert(`An error occured: ${error.message}`);
              }
              if(sessionId){
                  const stripe = await loadStripe(
                      "pk_test_51KQ56ZSCw6CxshnKmLR3dniOjod6Bouog53L344AGbh1cXVa4nXhzozxbFG4IS8GP1Ut296KMYnXPuaWkUPHM79W002xvLID2U"
                       )
                  stripe.redirectToCheckout({sessionId}).then(
                    setLoading(false)
                  )
                
              }
          })
      };

  return ( <LoadingOverlay
    active={loading}
       spinner={<ClipLoader color="red" />}
  >
  <div className='plan' >
      <h1>Our plans</h1>
     <div className="plans">
     {products&& Object.entries(products).map(([productId,productData]) =>{
             const isCurrentPackage =productData.name?.toLowerCase().replace(/\s/g,'').includes(subscription?.role);
             
                return(
<div key={productId}   className={`${
                         isCurrentPackage && "plans_sub--disabled"
                         } plans_sub`}>
    <div className="plans_sub_two">
    <h3>{productData.name}</h3>
<img src={productData.images.length>0 && productData.images[0]}></img>
<h4>Price - {productData.prices? `${productData.prices.priceData.unit_amount/100} INR`:"4000"}</h4>
<p>{productData.description}</p>
<button  onClick={() => {user?!isCurrentPackage &&loadCheckout(productData.prices.priceId):history.push('/signin')}}>  {isCurrentPackage? 'Current Package': 'Enroll now'}</button>
    </div>

</div>
               
                )
            })}
     </div>

  </div>
  </LoadingOverlay>)
}

export default Plans;
