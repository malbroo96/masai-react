import { Grid, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function CardGrid() {
  const { theme } = useContext(ThemeContext);
  const cardBg = theme === "light" ? "gray.100" : "gray.600";

  const products = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5", "Product 6"];

  return (
    <Grid
      templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" }}
      gap="4"
      p="4"
    >
      {products.map((product) => (
        <Box key={product} p="4" bg={cardBg} shadow="md" borderRadius="md" textAlign="center">
          {product}
        </Box>
      ))}
    </Grid>
  );
}
