import { Flex, Button, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const bgColor = theme === "light" ? "gray.100" : "gray.700";

  return (
    <Flex
      as="nav"
      bg={bgColor}
      p="4"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="bold">Dashboard</Text>
      <Flex gap="4">
        <Button onClick={toggleAuth} colorScheme={isLoggedIn ? "red" : "green"}>
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
        <Button onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Flex>
    </Flex>
  );
}
