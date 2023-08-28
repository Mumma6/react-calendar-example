import { useState, Dispatch, SetStateAction } from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { HexColorPicker } from "react-colorful"
import { ITodo, generateId } from "./EventCalendar"

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  todos: ITodo[]
  setTodos: Dispatch<SetStateAction<ITodo[]>>
}

export const AddTodoModal = ({ open, handleClose, todos, setTodos }: IProps) => {
  const [color, setColor] = useState("#b32aa9")
  const [title, setTitle] = useState("")

  const onAddTodo = () => {
    setTitle("")
    setTodos([
      ...todos,
      {
        _id: generateId(),
        color,
        title,
      },
    ])
  }

  const onDeletetodo = (_id: string) => setTodos(todos.filter((todo) => todo._id !== _id))

  const onClose = () => handleClose()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add todo</DialogTitle>
      <DialogContent>
        <DialogContentText>Create todos to add to your Calendar.</DialogContentText>
        <Box>
          <TextField
            name="title"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            sx={{ mb: 6 }}
            required
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            value={title}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <HexColorPicker color={color} onChange={setColor} />
            <Box sx={{ height: 80, width: 80, borderRadius: 1 }} className="value" style={{ backgroundColor: color }}></Box>
          </Box>
          <Box>
            <List sx={{ marginTop: 3 }}>
              {todos.map((todo) => (
                <ListItem
                  key={todo.title}
                  secondaryAction={
                    <IconButton onClick={() => onDeletetodo(todo._id)} color="error" edge="end">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Box
                    sx={{ height: 40, width: 40, borderRadius: 1, marginRight: 1 }}
                    className="value"
                    style={{ backgroundColor: todo.color }}
                  ></Box>
                  <ListItemText primary={todo.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ marginTop: 2 }}>
        <Button sx={{ marginRight: 2 }} variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => onAddTodo()}
          disabled={title === "" || color === ""}
          sx={{ marginRight: 2 }}
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
