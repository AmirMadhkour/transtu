import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Input, Spacer, Button, Text , Select
} from '@chakra-ui/react';

const EditUserModal = ({
  isOpen,
  onClose,
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
  handleSaveChanges
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Edit User</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <center><label>Login</label></center>
        <Spacer />
        <Input type="text" value={login} onChange={e => setLogin(e.target.value)} className="form-control" borderColor="green" />
        <Spacer />
        <center><label>E-mail</label></center>
        <Spacer />
        <Input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" borderColor="green" />
        {error.email && <Text color="red.500" mt={2}>{error.email}</Text>}
        <Spacer />
        <center><label>Full Name</label></center>
        <Spacer />
        <Input type="text" value={full_name} onChange={e => setFullName(e.target.value)} className="form-control" borderColor="green" />
        <Spacer />
        <center><label>Telephone</label></center>
        <Spacer />
        <Input type="text" value={tel} onChange={e => setTel(e.target.value)} className="form-control" borderColor="green" />
        {error.tel && <Text color="red.500" mt={2}>{error.tel}</Text>}
        <Spacer />
        <center><label>Role</label></center>

        <Select
                value={role}
                borderColor="green"
                onChange={e => setRole(e.target.value)}
                size="sm"
                placeholder='Choose Role'
                bg="White"
                color="black"
              >
                <option >chef Service</option>
                <option >Administrateur</option>
                <option >Agent de Saisie</option>
              </Select>
        <Spacer />
        <center><label>District</label></center>
        <Spacer />
        <Input type="text" value={_district} onChange={e => set_District(e.target.value)} className="form-control" borderColor="green" />
        <Spacer />
        <center><label>Password</label></center>
        <Spacer />
        <Input type="password" value={password} onChange={handlePasswordChange} className="form-control" borderColor="green" />
        {error.password && <Text color="red.500" mt={2}>{error.password}</Text>}
        <Spacer />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={handleSaveChanges}>Save Changes</Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const AddUserModal = ({
  isOpen,
  onClose,
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
  handleAddNewRow
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Add User</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <center><label>Login</label></center>
        <Spacer />
        <Input type="text" value={login} onChange={e => setLogin(e.target.value)} className="form-control" borderColor="green" />
        <Spacer />
        <center><label>E-mail</label></center>
        <Spacer />
        <Input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" borderColor="green" />
        {error.email && <Text color="red.500" mt={2}>{error.email}</Text>}
        <Spacer />
        <center><label>Full Name</label></center>
        <Spacer />
        <Input type="text" value={full_name} onChange={e => setFullName(e.target.value)} className="form-control" borderColor="green" />
        <Spacer />
        <center><label>Telephone</label></center>
        <Spacer />
        <Input type="text" value={tel} onChange={e => setTel(e.target.value)} className="form-control" borderColor="green" />
        {error.tel && <Text color="red.500" mt={2}>{error.tel}</Text>}
        <Spacer />
        <center><label>Role</label></center>
        <Select
                value={role}
                borderColor="green"
                onChange={e => setRole(e.target.value)}
                size="sm"
                placeholder='Choose Role'
                bg="White"
                color="black"
              >
                <option value='1'>chef Service</option>
                <option value='2'>Administrateur</option>
                <option value='3'>Agent de Saisie</option>
              </Select>
        <Spacer />
        <center><label>District</label></center>
        <Spacer />
        <Input type="text" value={_district} onChange={e => set_District(e.target.value)} className="form-control" borderColor="green" />
        <Spacer />
        <center><label>Create Password</label></center>
        <Spacer />
        <Input type="password" value={password} onChange={handlePasswordChange} className="form-control" borderColor="green" />
        {error.password && <Text color="red.500" mt={2}>{error.password}</Text>}
        <Spacer />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={handleAddNewRow}>Add User</Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export { EditUserModal, AddUserModal };
