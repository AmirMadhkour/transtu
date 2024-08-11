import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import LoginContext from './LoginContext';
import { updateUsers, fetchUsers } from '../api/UserPageAPI';

const CompteUserContext = createContext();

export const CompteUserProvider = ({ children }) => {
  const { username } = useContext(LoginContext);
  console.log("username from loginComp:",username);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState([]);
  const [user , setUser] = useState ({
   
  });
  console.log(user)
  const [_username, set_UserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [tel, setTel] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [idUser,setIdUser] = useState('');
 


  

  
  

  const getUser = async () => {
    try {
      const data = await fetchUsers();
      let _user = null ;
        data.forEach((user) => {
        console.log("test",user.fullName === username)
        if(user.fullName === username) {_user = user}   
        setUser(_user)
      });
      
      console.log("_user:",_user)
      console.log(data)
      if(_user) {
        set_UserName(_user.fullName);
        setEmail(_user.mail);
        setTel(_user.tel);
        setPassword(_user.password)
      }
      
     
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }

    
    
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const isError = input === '';
  const isConfirmPasswordError = newPassword !== confirmPassword;

  const handleEdit = (user) => {
    setSelectedUser(user);
    set_UserName(user.fullName);
    setEmail(user.mail);
    setIdUser(user.id);
    setTel(user.tel);
    setPassword();
    localStorage.removeItem("username");
    onOpen();
  };

  const clearForm = () => {
    setSelectedUser(null);
    set_UserName('');
    setEmail('');
    setIdUser('');
    setTel('');
  }

  const handleSaveChanges = async () => {
   let newUser = null ;
    if (!password || password.length === 0){
    alert("Please Write your Password");
    return;
   }
   else if(password != user.password){
    alert("password incorrect");
    return;
   }

    if(newPassword.length == 0) {
       newUser = {
        fullName: _username,
        mail: email,
        tel
        
      };
    } 

    else if ( newPassword.length > 8 && !isConfirmPasswordError ) {
       newUser = {
        fullName: _username,
        mail: email,
        tel,
        password : newPassword
        
      };
    }

    try {
      await updateUsers(user.id , newUser);
      setUser( newUser );
      localStorage.setItem("username", _username);

      clearForm();
      onClose();
      window.location.reload();
      
    } catch (error) {
      console.error("Error updating the record:", error);
    }
   
   
   
   
   
   
    /*if (!isConfirmPasswordError) {
      const newUser = {
        fullName: _username,
        mail: email,
        password,
        tel
      };
      updateUsers(selectedUser.id, newUser);
      setUserData((prevUserData) => ({
        ...prevUserData,
        ...newUser,
      }));
      onClose();
      setSelectedUser(null);
    }*/
  };

  return (
    <CompteUserContext.Provider value={{
      isOpen,
      onOpen,
      onClose,
      handleSaveChanges,
      input,
      password,
      confirmPassword,
      showPassword,
      handleInputChange,
      showConfirmPassword,
      handleTogglePassword,
      handleToggleConfirmPassword,
      isError,
      isConfirmPasswordError,
      setConfirmPassword,
      setPassword,
      newPassword,
      setNewPassword,
      handleEdit,
      _username,
      set_UserName,
      tel,
      email,
      setTel,
      getUser,
      setEmail,
    }}>
      {children}
    </CompteUserContext.Provider>
  );
};

export default CompteUserContext;