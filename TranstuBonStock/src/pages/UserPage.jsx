import React, { useContext } from 'react';
import NavbarHome from '../share/NavbarHome';
import DataTable from 'react-data-table-component';
import {
  Button, Input, Stack, Switch
} from '@chakra-ui/react';
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import UserPageContext from "../context/UserPageContext";
import { EditUserModal, AddUserModal } from '../share/EditUserModal';


function UserPage() {
  
  
  
  const style = {
    backgroundColor: '#E9D280',
    minHeight: '100vh',
    padding: '20px',
};

  const {
    isOpen,
    filteredUsers,
    onOpen,
    onClose,
    handleRemove,
    handleEdit,
    handleSaveChanges,
    handleAddNewRow,
    clearForm,
    handleFilter,
    filterText,
    login,
    setLogin,
    email,
    setEmail,
    full_name,
    setFullName,
    tel,
    setTel,
    role,
    setRole,
    _district,
    set_District,
    password,
    handlePasswordChange,
    error,
    errorMail, 
    errorPassword,
    errorTel,
    selectedRow,
  } = useContext(UserPageContext);

  const columns = [
    {
      name: 'Active',
      cell: row => (
        <Stack align='center' direction='row'>
          <Switch size='md' isChecked={row.isActive} /> 
        </Stack>
      ),
    },
    {
      name: 'Login',
      selector: row => row.login,
      sortable: true,
    },
    {
      name: 'E-mail',
      selector: row => row.mail,
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: 'Telephone',
      selector: row => row.tel,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'District',
      selector: row => row.district ? row.district.lib : '',
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Button colorScheme="blue" onClick={() => handleEdit(row)} mr={2}>
            <BiSolidEdit />
          </Button>
          <Button colorScheme="red" onClick={() => handleRemove(row)}>
            <BiSolidTrash />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <NavbarHome />
      <div style={style}>
        <Button
          mt={10}
          onClick={() => { clearForm(); onOpen(); }}
          colorScheme="blue"
          mb={4}
        >
          + Add User
        </Button>

        <Input
          onChange={handleFilter}
          value={filterText}
          type="text"
          placeholder="Search..."
          ml="auto"
          backgroundColor="#2653EC"
          color="white"
          borderColor="black"
          mb={4}
        />

        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          paginationPerPage={10}
          fixedHeader
        />
        
        {selectedRow ? (
          <EditUserModal
            isOpen={isOpen}
            onClose={onClose}
            login={login}
            setLogin={setLogin}
            email={email}
            setEmail={setEmail}
            full_name={full_name}
            setFullName={setFullName}
            tel={tel}
            setTel={setTel}
            role={role}
            setRole={setRole}
            _district={_district}
            set_District={set_District}
            password={password}
            handlePasswordChange={handlePasswordChange}
            error={error}
            handleSaveChanges={handleSaveChanges}
          />
        ) : (
          <AddUserModal
            isOpen={isOpen}
            onClose={onClose}
            login={login}
            setLogin={setLogin}
            email={email}
            setEmail={setEmail}
            full_name={full_name}
            setFullName={setFullName}
            tel={tel}
            setTel={setTel}
            role={role}
            setRole={setRole}
            _district={_district}
            set_District={set_District}
            password={password}
            handlePasswordChange={handlePasswordChange}
            error={error}
            handleAddNewRow={handleAddNewRow}
          />
        )}
      </div>
    </>
  );
}

export default UserPage;
