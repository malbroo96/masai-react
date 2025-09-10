import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const bgColor = theme === "light" ? "gray.300" : "gray.800";

  return (
    <Box bg={bgColor} p="4" textAlign="center" position="sticky" bottom="0" w="100%">
      Footer Content
    </Box>
  );
}
