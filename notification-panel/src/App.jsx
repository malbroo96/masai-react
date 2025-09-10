import { Box, Heading } from "@chakra-ui/react";
import NotificationList from "./components/NotificationList";

export default function App() {
  return (
    <Box>
      <Heading textAlign="center" my="4">Real-Time Notification Panel</Heading>
      <NotificationList />
    </Box>
  );
}
