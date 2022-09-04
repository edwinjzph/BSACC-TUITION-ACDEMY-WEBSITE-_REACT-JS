import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch,Route } from 'react-router-dom';
import './App.css';
import Aboutus from './components/about-us';
import Dashboard from './components/dashboard/dashboard';
import MetaTags from 'react-meta-tags';
import Header from './components/header';
import Navbar from './components/Navbar/navbar';
import Plans from './components/plans/plans';
import Signup from './components/signup/signup';
import Spinner from './components/Spinner';
import Youtube from './components/youtube/youtube';
import { int, out, selectsub } from './features/subSlice';
import { login, logout, selectUser } from './features/userSlice';
import db, { auth } from './firebase';


function App() {
  const user = useSelector(selectUser);
  const address=useSelector(selectsub)
  const dispatch = useDispatch();
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [youtubevideo,setYoutubevideo]=useState("");

  useEffect(() =>{
    setLoading(true)
    db.collection("products")
    .where("active","==",true)
    .get()
     .then((querySnapshot) =>{
        const products= {};
        querySnapshot.forEach(async productDoc =>{
            products[productDoc.id] =productDoc.data();
            const priceSnap = await productDoc.ref.collection("prices").get();
            priceSnap.docs.forEach((price) => {
                products[productDoc.id].prices ={
                    priceId: price.id,
                    priceData: price.data(),
                }
            })
     
        })
        setProducts(products);
        if(products){
          setLoading(false)
        }
    })
        },[]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
        
      }else{
        dispatch(logout());
          dispatch(out())
      }
    });

    return () =>{
      unsubscribe();
    }
  },[dispatch])
  useEffect(() => {
    if(user!==null){
    db.collection('customers')
     .doc(user && user.uid).get('user1')
     .then(querySnapshop =>{
       if(querySnapshop.exists){
        dispatch(int({
          userdetails:querySnapshop.data().user1,}
        ))
       }else{

       }   
     }) 
    }
   }, [dispatch,user])
   useEffect(() => {
  
    db.collection('youtubevideos')
     .doc("Tf7kRnifJUVkjiqSCEk4").get()
     .then(querySnapshop =>{
       console.log(querySnapshop)
       if(querySnapshop.exists){
   setYoutubevideo(querySnapshop.data())
       }else{

       }   
     }) 
    
   }, [])
   console.log(youtubevideo)
 
  if (loading) {
    return   <Spinner />
  }
  return (
    <BrowserRouter>
  <MetaTags>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </MetaTags>
       <Navbar/>
    
        <Switch>
        <Route exact path="/">
    
        <Header/>
        <Aboutus/>
        <Plans products={products}/>
        <Youtube youtubevideo={youtubevideo}/>
  </Route>
  <Route exact path="/signin">
    <Signup/>
</Route>

<Route exact path="/dashboard">
    <Dashboard/>
</Route>
<Route exact path="/plans">
    <Plans products={products}/>
</Route>
<Route exact path="/aboutus">
    <Aboutus/>
</Route>


        </Switch>
    
  
      </BrowserRouter>
  );
}

export default App;
