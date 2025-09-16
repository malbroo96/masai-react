import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./todoSlice";
import {
  Box,
  Button,
  Heading,
  Input,
  List,
  ListItem,
  Checkbox,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function App() {
  const [text, setText] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <Heading mb={4} textAlign="center">
        Redux Todo App
      </Heading>

      <HStack mb={4}>
        <Input
          placeholder="Enter todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAdd}>
          Add
        </Button>
      </HStack>

      <List spacing={3}>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            p={2}
            borderWidth={1}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack>
              <Checkbox
                isChecked={todo.status}
                onChange={() => dispatch(toggleTodo(todo.id))}
              >
                <span
                  style={{
                    textDecoration: todo.status ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
              </Checkbox>
            </HStack>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => dispatch(deleteTodo(todo.id))}
            />
          </ListItem>
        ))}
      </List>

      <Heading size="sm" mt={6}>
        Current State:
      </Heading>
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </Box>
  );
}

export default App;
