import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Input,
  useColorModeValue as mode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { getCategories, getMe } from "../api/api";
import { auth } from "../api/auth";

import { SET_CATEGORIES, SET_USER } from "../store/actions";

const Authorization = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    auth(username, password).then((response) => {
      localStorage.setItem("token", response.data?.access_token);

      getMe()
        .then((response) => {
          dispatch({ type: SET_USER, payload: response.data });
          setIsOpen(false);
        })
        .catch((error) => {});

      getCategories()
        .then((response) => {
          dispatch({ type: SET_CATEGORIES, payload: response.data });
          setIsOpen(false);
        })
        .catch((error) => {});
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Войти</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Имя пользователя</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Пароль</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAuth}>
            Войти
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Authorization;
