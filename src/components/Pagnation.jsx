import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Text, Box, HStack } from "@chakra-ui/react";
export function Pagnation({
  prevPage,
  data,
  totalLength,
  handleClickPage,
  nextPage,
  pageNumber,
  Number,
}) {
  return (
    <>
      {" "}
      <Box
        paddingInline="20px"
        boxSizing="border-box"
        alignItems="center"
        justifyContent="center"
      >
        <HStack>
          {pageNumber && pageNumber > 0 && (
            <Button
              variant="ghost"
              leftIcon={<ChevronLeftIcon />}
              onClick={prevPage}
            ></Button>
          )}
          {data &&
            totalLength &&
            totalLength.map((value) => (
              <Button
                key={value}
                variant="ghost"
                onClick={handleClickPage}
                value={value}
              >
                {value}
              </Button>
            ))}
          {data && data.hasNextPage && data.hasNextPage && (
            <Button
              leftIcon={<ChevronRightIcon />}
              onClick={nextPage}
              variant="ghost"
            ></Button>
          )}
        </HStack>
      </Box>
      <Box>
        <Text>
          Result{" "}
          {data !== null && pageNumber !== null && data.totalCount !== null && (
            <>
              {pageNumber + 1} -{" "}
              {totalLength &&
              data &&
              Number(pageNumber + 1 * 10) < data.totalCount
                ? Number(pageNumber + 1 * data.nodes.length)
                : data.totalCount}{" "}
              of {data && data.totalCount}
            </>
          )}
        </Text>
      </Box>
    </>
  );
}
