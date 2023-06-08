import React from "react";
import {
  Button,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  FormControl,
  FormLabel,
  Textarea,
  Center,
} from "@chakra-ui/react";
export function InfoBox({
  isOpen,
  onClose,
  openedNode,
  fixDuration,
  newNote,
  handleNote,
  addNote,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px" borderColor="gray.200">
          Add Notes
          <Text fontSize="sm" color="blue">
            Call ID {openedNode && openedNode.id}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb="10px" mt="5px">
            <HStack>
              <Text as="b" minW="120px">
                Call Type
              </Text>
              {openedNode !== null && openedNode.call_type === "voicemail" ? (
                <Text minW="120px" color="blue.400">
                  Voice Mail
                </Text>
              ) : openedNode.call_type === "missed" ? (
                <Text minW="120px" color="red.400">
                  Missed
                </Text>
              ) : (
                <Text minW="120px" color="green.400">
                  Answered
                </Text>
              )}
            </HStack>
            <HStack>
              <Text as="b" minW="120px">
                Duration
              </Text>
              <Text minW="120px"> {fixDuration(openedNode.duration)} </Text>
            </HStack>
            <HStack>
              <Text as="b" minW="120px">
                From
              </Text>
              <Text minW="120px">{openedNode.from}</Text>
            </HStack>
            <HStack>
              <Text as="b" minW="120px">
                To
              </Text>
              <Text minW="120px">{openedNode.to}</Text>
            </HStack>
            <HStack>
              <Text as="b" minW="120px">
                Via
              </Text>
              <Text minW="120px">{openedNode.via}</Text>
            </HStack>
          </Box>
          <form>
            <FormControl>
              <FormLabel>Add Notes</FormLabel>
              <Textarea
                value={newNote}
                onChange={handleNote}
                placeholder="Add Notes"
                type="text"
                name="notes"
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter borderTop="1px" borderColor="gray.200">
          <Center>
            <Button
              id={openedNode?.id}
              colorScheme="blue"
              w="400px"
              onClick={addNote}
            >
              Save
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
