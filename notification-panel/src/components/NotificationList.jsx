import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { Box, Button, VStack, Text } from "@chakra-ui/react";

export default function NotificationList() {
  const { notifications, markAllAsRead, stopNotifications } = useContext(NotificationContext);

  return (
    <Box p="4">
      <VStack align="stretch" spacing={2}>
        {/* Control Buttons */}
        <Button onClick={markAllAsRead} colorScheme="blue">
          Mark All as Read
        </Button>
        <Button onClick={stopNotifications} colorScheme="red">
          Stop Notifications
        </Button>

        {/* Notification List */}
        {notifications.map((n) => (
          <Box
            key={n.id}
            p="2"
            bg={n.read ? "gray.100" : "yellow.100"}
            fontWeight={n.read ? "normal" : "bold"}
            borderRadius="md"
          >
            {n.message}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
