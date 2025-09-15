import { ChakraProvider, Box, Heading, Button } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box p={5} bg="gray.100" minH="100vh">
        <Heading mb={4} color="teal.600">Chakra UI Test</Heading>
        <Button colorScheme="teal">Click Me</Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
c.country?.toLowerCase()
c.region || "N/A"
