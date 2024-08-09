import { createContext } from "react";
import  { useState , useEffect  } from 'react';
import {   fetchUsers  } from '../api/UserPageAPI';
import { useNavigate  } from 'react-router-dom';



const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [userData , setUserData] = useState([]);
    const [username, setUsername] = useState(
      localStorage.getItem("username") || ""
    );
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [wrongAccount , setWrongAccount] = useState('') ; 
    const handleTogglePassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate() ; 
  console.log("usernamefrom login" ,username)
    const validateForm = () => {
      let errors = {};
      let isValid = true;
  
      if (!username.trim()) {
        errors.username = 'Username is required';
        isValid = false;
      }
  
      if (!password.trim()) {
        errors.password = 'Password is required';
        isValid = false;
      }
  
      setErrors(errors);
      return isValid;
    };
  
    console.log(username)
    console.log(password)
    useEffect(() => {
      fetchUsersData();
    }, []);
  
  
    const fetchUsersData = async () => {
      try {
        const data = await fetchUsers();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    const handleSubmit = async (e) => {
      
      e.preventDefault();
      if (validateForm()) {
         setErrors({}) ; 
             
       const account = userData.find((c) => c.fullName===username && c.password === password) ; 
       if (account) {
        setErrors({});
        setWrongAccount("");
        console.log("yes you have account");
        navigate("/");
        setUsername(username);
        localStorage.setItem("username", username);
      } else {
        console.log("no account");
        setWrongAccount("wrong account");
      } 
          
      }
    };




    return (
        <LoginContext.Provider value={{
            userData,
            username,
            setUsername,
            setUserData,
            password,
            setPassword,
            wrongAccount,
            errors,
            setErrors,
            handleTogglePassword,
            showPassword,
            setShowPassword,
            handleSubmit


        }}>
            {children}
            </LoginContext.Provider>
    );
};
export default LoginContext;