import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Sidebar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const bgColor = theme === "light" ? "gray.200" : "gray.600";

  return (
    <Box
      w={{ base: "0", md: "200px" }}
      bg={bgColor}
      p="4"
      display={{ base: "none", md: "block" }}
    >
      <Text fontWeight="bold" mb="4">
        Sidebar
      </Text>
      {isLoggedIn && <Text>Welcome, User!</Text>}
    </Box>
  );
}
