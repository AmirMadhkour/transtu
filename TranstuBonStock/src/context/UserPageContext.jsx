import { createContext, useState, useEffect } from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { fetchUsers, updateUsers, addUsers, deleteUsers } from '../api/UserPageAPI';
import { fetchDistricts} from '../api/DistrictAPI';


const UserPageContext = createContext();

export const UserPageProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [full_name, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [tel, setTel] = useState('');
  const [_district, set_District] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState({});

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };

  const validateTel = (tel) => {
    const telRegex = /^[0-9]{8,}$/;
    return telRegex.test(tel);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRemove = async (row) => {
    if (confirm("Confirm your action")) {
      await deleteUsers(row.id);
      const updatedUsers = users.filter(record => record.id !== row.id);
      setUsers(updatedUsers);
    }
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setLogin(row.login);
    setEmail(row.mail);
    setFullName(row.fullName);
    setRole(row.role);
    setTel(row.tel);
    set_District(row.district ? row.district.lib : '-');
    setOldPassword(row.password);
    onOpen();
  };

  const handleSaveChanges = async () => {
   
   
   

    //district detail
    const allDistrict = await fetchDistricts();
    let DistrictData = null ;

    allDistrict.forEach(
      (district)=> {
        if(district.lib === _district){
          DistrictData = district
        }
      }
    ) 
    if (DistrictData == null ) return alert("District Not Found!")

    const newError = {};

    if (!email || !validateEmail(email)) {
      newError.email = 'Email is invalid';
    }
    if (password !== oldPassword) {
      newError.password = 'Incorrect password';
    }
    if (!tel || !validateTel(tel)) {
      newError.tel = 'Phone number is invalid';
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      const updatedData = {
        login,
        mail: email,
        role,
        tel,
        district : DistrictData,
        fullName: full_name,
      };

      try {
        await updateUsers(selectedRow.id, updatedData);
        const updatedUsers = users.map(row =>
          row.id === selectedRow.id ? { ...row, ...updatedData } : row
        );
        setUsers(updatedUsers);
        onClose();
        clearForm();
      } catch (error) {
        console.error("Error updating the user:", error);
      }
    }
  };

  const handleAddNewRow = async () => {

         //district detail
    const allDistrict = await fetchDistricts();
    let DistrictData = null ;

    allDistrict.forEach(
      (district)=> {
        if(district.lib === _district){
          DistrictData = district
        }
      }
    )
    if (DistrictData == null ) return alert("District Not Found!")

    const newError = {};

    if (!email || !validateEmail(email)) {
      newError.email = 'Email is invalid';
    }
    if (!password || !validatePassword(password)) {
      newError.password = 'Password must be at least 8 characters long';
    }
    if (!tel || !validateTel(tel)) {
      newError.tel = 'Phone number is invalid';
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      const newRow = {
        login,
        mail: email,
        role,
        password,
        tel,
        district: DistrictData,
        fullName: full_name,
      };

      try {
        await addUsers(newRow);
        setUsers([...users, newRow]);
        onClose();
        clearForm();
      } catch (error) {
        console.error("Error adding the user:", error);
      }
    }
  };

  const clearForm = () => {
    setLogin('');
    setEmail('');
    setFullName('');
    setRole('');
    set_District('');
    setPassword('');
    setTel('');
    setError({});
    setSelectedRow(null);
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const filteredUsers = users.filter(row => {
    return (
      (row.login && row.login.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.email && row.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.full_name && row.full_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.role && row.role.toLowerCase().includes(filterText.toLowerCase())) ||
      (row.district.lib || '').toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <UserPageContext.Provider value={{
      isOpen,
      filteredUsers,
      filterText,
      tel,
      setTel,
      onOpen,
      onClose,
      handleRemove,
      handleEdit,
      handleSaveChanges,
      handleAddNewRow,
      clearForm,
      handleFilter,
      login,
      setLogin,
      email,
      setEmail,
      full_name,
      setFullName,
      role,
      setRole,
      _district,
      set_District,
      selectedRow,
      setSelectedRow,
      password,
      handlePasswordChange,
      error,
      setError
    }}>
      {children}
    </UserPageContext.Provider>
  );
};

export default UserPageContext;
