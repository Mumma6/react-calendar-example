import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react"
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Autocomplete,
  Box,
} from "@mui/material"
import { EventFormData, ITodo } from "./EventCalendar"

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  eventFormData: EventFormData
  setEventFormData: Dispatch<SetStateAction<EventFormData>>
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
  todos: ITodo[]
}

const AddEventModal = ({ open, handleClose, eventFormData, setEventFormData, onAddEvent, todos }: IProps) => {
  const { description } = eventFormData

  const onClose = () => handleClose()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleTodoChange = (e: React.SyntheticEvent, value: ITodo | null) => {
    setEventFormData((prevState) => ({
      ...prevState,
      todoId: value?._id,
    }))
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add event</DialogTitle>
      <DialogContent>
        <DialogContentText>To add a event, please fill in the information below.</DialogContentText>
        <Box component="form">
          <TextField
            name="description"
            value={description}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
          <Autocomplete
            onChange={handleTodoChange}
            disablePortal
            id="combo-box-demo"
            options={todos}
            sx={{ marginTop: 4 }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Todo" />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={description === ""} color="success" onClick={onAddEvent}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEventModal
