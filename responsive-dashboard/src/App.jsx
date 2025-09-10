import { Flex, Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CardGrid from "./components/CardGrid";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1">
        <Sidebar />
        <Box flex="1">
          <CardGrid />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}
