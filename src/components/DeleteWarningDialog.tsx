import React, { useRef } from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react"

import { Marker } from "../contexts/marker"

interface DeleteWarningDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  name: string;
  onConfirm: () => void;
}

export const DeleteWarningDialog: React.FC<DeleteWarningDialogProps> = ({ isOpen, setIsOpen, name, onConfirm }) => {
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef<any>()

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Excluir Marcação</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Você tem certeza que deseja excluir o "{name}"? Não será possível desfazer essa ação.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirm}>
            Excluir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}