import React from "react";
import {
  Button,
  Heading,
  Box,
  HStack,
  FormLabel,
  Select,
  Input,
  Spacer,
} from "@chakra-ui/react";

export function Filter({
  handleFilter,
  handleDateChange,
  selectedDate,
  filterDate,
}) {
  return (
    <>
      <Heading as="h1" p="20px" boxSizing="border-box" alignSelf="flex-start">
        Turing Technologies Frontend Test
      </Heading>
      <Box p="20px" boxSizing="border-box">
        <HStack>
          <form>
            <undefined />
            <HStack>
              <FormLabel>Filter By</FormLabel>
              <Select w="130px" placeholder="Status" onChange={handleFilter}>
                <option value="all">All</option>
                <option value="archived">Archived</option>
                <option value="unarchived">Unarchived</option>
              </Select>
            </HStack>
          </form>
          <Spacer />
          <form onSubmit={handleDateChange}>
            <HStack>
              <FormLabel>Group By</FormLabel>
              <Input
                w="150px"
                placeholder="Select Date and Time"
                size="md"
                type="date"
                value={selectedDate}
                onChange={filterDate}
              />
              <Button type="submit">Group</Button>
            </HStack>
          </form>
        </HStack>
      </Box>
    </>
  );
}
