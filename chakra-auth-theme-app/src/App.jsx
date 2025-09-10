import { Flex, Grid, Box, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ThemeContext } from "./ThemeContext";

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navBg = theme === "light" ? "gray.100" : "gray.700";
  const cardBg = theme === "light" ? "gray.200" : "gray.600";
  const footerBg = theme === "light" ? "gray.300" : "gray.800";

  return (
    <div>
      {/* Navbar */}
      <Flex p="4" bg={navBg} justifyContent="space-between" alignItems="center">
        <Button onClick={toggleAuth} colorScheme={isLoggedIn ? "red" : "green"}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === "light" ? "Dark" : "Light"} Theme
        </Button>
      </Flex>

      {/* Cards */}
      <Grid templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" }} gap="4" p="4">
        {["Card 1", "Card 2", "Card 3"].map((card) => (
          <Box key={card} p="4" bg={cardBg} shadow="md" borderRadius="md" textAlign="center">
            {card}
          </Box>
        ))}
      </Grid>

      {/* Footer */}
      <Box p="4" bg={footerBg} textAlign="center">
        {isLoggedIn ? "Welcome, User!" : "Please log in."}
      </Box>
    </div>
  );
}

export default App;
