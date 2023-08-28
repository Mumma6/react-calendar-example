import React, { Dispatch, MouseEvent, SetStateAction, ChangeEvent } from "react"
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
  Checkbox,
  Typography,
} from "@mui/material"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DatePickerEventFormData, ITodo } from "./EventCalendar"

interface IProps {
  open: boolean
  handleClose: Dispatch<SetStateAction<void>>
  datePickerEventFormData: DatePickerEventFormData
  setDatePickerEventFormData: Dispatch<SetStateAction<DatePickerEventFormData>>
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void
  todos: ITodo[]
}

const AddDatePickerEventModal = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  onAddEvent,
  todos,
}: IProps) => {
  const { description, start, end, allDay } = datePickerEventFormData

  const onClose = () => {
    handleClose()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      allDay: event.target.checked,
    }))
  }

  const handleTodoChange = (e: React.SyntheticEvent, value: ITodo | null) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      todoId: value?._id,
    }))
  }

  const isDisabled = () => {
    const checkend = () => {
      if (!allDay && end === null) {
        return true
      }
    }
    if (description === "" || start === null || checkend()) {
      return true
    }
    return false
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={5}>
              <DateTimePicker
                label="Start date"
                value={start}
                ampm={true}
                minutesStep={30}
                onChange={(newValue) =>
                  setDatePickerEventFormData((prevState) => ({
                    ...prevState,
                    start: new Date(newValue!),
                  }))
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>

            <Box>
              <Typography variant="caption" color="text" component={"span"}>
                All day?
              </Typography>
              <Checkbox onChange={handleCheckboxChange} value={allDay} />
            </Box>

            <DateTimePicker
              label="End date"
              disabled={allDay}
              minDate={start}
              minutesStep={30}
              ampm={true}
              value={allDay ? null : end}
              onChange={(newValue) =>
                setDatePickerEventFormData((prevState) => ({
                  ...prevState,
                  end: new Date(newValue!),
                }))
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
        <Button disabled={isDisabled()} color="success" onClick={onAddEvent}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDatePickerEventModal
