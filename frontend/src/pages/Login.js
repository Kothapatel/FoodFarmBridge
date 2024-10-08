import React from 'react';
import { Link } from "react-router-dom";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const userData = useSelector(state => state);
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      try {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        });
        const dataRes = await fetchData.json();
        console.log(dataRes);
        toast(dataRes.message);

        if (dataRes.alert) {
          dispatch(loginRedux(dataRes));
          navigate("/"); // Redirect to home page upon successful login
        }
      } catch (error) {
        console.error("Error during login", error);
        toast.error("An error occurred during login. Please try again.");
      }
    } else {
      toast.error("Please enter the required fields");
    }
  };

  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-md bg-white m-auto flex flex-col p-4'>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
          <img src={loginSignupImage} className='w-full' alt="Login Signup" />
        </div>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            id='email'
            name='email'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              name='password'
              className='w-full bg-slate-200 border-none outline-none'
              value={data.password}
              onChange={handleOnChange}
            />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className='w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded mt-4'>Login</button>
        </form>

        <p className='text-left text-base mt-2'>
          Don't have an account? <Link to="/signup" className="text-red-500 underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;




// import React from 'react'
// import { Link } from "react-router-dom";
// import loginSignupImage from "../assets/login-animation.gif"
// import { BiShow } from "react-icons/bi";
// import { BiHide } from "react-icons/bi";
// import { toast } from "react-hot-toast";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch , useSelector } from 'react-redux';
// import { loginRedux } from "../redux/userSlice";

// const Login = () => {
//   const [showPassword,setShowPassword] = React.useState(false)
//   const [data,setdata] = React.useState({
//     email : "",
//     password : ""
//   });

//   const navigate = useNavigate()
//  const userData = useSelector(state => state)

//  const dispatch = useDispatch()

  
//   const handleShowPassword = ()=>{
//     setShowPassword(preve =>!preve)
//   }
  
// const handleOnChange = (e)=>{

//   const {name,value} = e.target
//   setdata((preve)=> {
//     return{
//       ...preve,
//       [name] : value
//     }
//   })
// }

//  const handleSubmit = async(e)=>{
//   e.preventDefault();
//   const {email,password} = data
//   if(email && password){
   
//       const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`,{
//         method : "POST",
//         headers : {
//           "content-type" : "application/json"
//         },
//         body : JSON.stringify(data)
//       })
//       const dataRes = await fetchData.json()
//       console.log(dataRes)
   
//       toast(dataRes.message)

//       if(dataRes.alert){
//         dispatch(loginRedux(dataRes))
//         setTimeout(() =>{
//           navigate("/home")
//         }, 1000);
//       }

//       console.log(userData)
//     }
//     else{
//       alert("please enter the required field")
//     }

//  }

//   return (
//     <div className='p-3 md:p-4'>
//         <div className='w-full max-w-md bg-white m-auto  flex  flex-col p-4'>
//        {/* <h1 className='text-center text-2xl font-bold'>Sign Up</h1> */}
//        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
//         <img src={loginSignupImage} className='w-full'/>
//        </div>
//        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
      

        
       
//         <label htmlFor='email'>Email</label>
//         <input 
//         type={"email"} 
//         id='email' 
//         name='email' 
//         className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
//         value = {data.email}
//         onChange ={handleOnChange}
//         />

//         <label htmlFor='password'>Password</label>
//         <div className='flex px-2 py-1 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
//         <input 
//         type={showPassword ? "text" : "password"} 
//         id='password' 
//         name='password' 
//         className=' w-full bg-slate-200 border-none outline-none '
//         value = {data.password}
//         onChange ={handleOnChange}
//         />
//         <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ?<BiShow/> : <BiHide/>}</span>
//         </div>

       

//         <button className='w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded mt-4'>Login</button>
//        </form>

//        <p className='text-left text-base mt-2'>Don't have account ? <Link to={"/Signup"} className="text-red-500 underline">Sign Up</Link> </p>
//     </div>
//   </div>
//   )
// }

// export default Login