import React, { useState, MouseEvent } from "react"
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"

import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"
import EventInfo from "./EventInfo"
import AddEventModal from "./AddEventModal"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export interface ITodo {
  _id: string
  title: string
  color?: string
}

export interface IEventInfo extends Event {
  _id: string
  description: string
  todoId?: string
}

export interface EventFormData {
  description: string
  todoId?: string
}

export const initialEventFormState: EventFormData = {
  description: "",
  todoId: undefined,
}

const EventCalendar = () => {
  const [openSlot, setOpenSlot] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null)

  const [myEvents, setEvents] = useState<IEventInfo[]>([])
  const [myTodos, setTodos] = useState<ITodo[]>([
    {
      title: "todo1",
      _id: "1",
      color: "red",
    },
  ])

  const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState)

  const handleSelectSlot = (event: Event) => {
    setOpenSlot(true)
    setCurrentEvent(event)
  }

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event)
    // setEditModalOpen(true)
  }

  const handleClose = () => {
    setEventFormData(initialEventFormState)

    setOpenSlot(false)
  }

  const onAddEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: IEventInfo = {
      ...eventFormData,
      _id: "23231", // skapa en random generator
      start: currentEvent?.start,
      end: currentEvent?.end,
    }

    console.log(data) // spara till localStorage

    handleClose()
  }

  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardHeader
            title="Calendar"
            subheader="Create Events and Todos, maganed them in an effective way.... bla bla bla"
          />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                <Button
                  onClick={() => {
                    //setOpenExternModal(true)
                  }}
                  size="small"
                  variant="contained"
                >
                  Add event
                </Button>
                <Button
                  onClick={() => {
                    // setOpenLabelModal(true)
                  }}
                  size="small"
                  variant="contained"
                >
                  Create todo
                </Button>
              </ButtonGroup>
            </Box>
            <Divider style={{ margin: 10 }} />
            <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              todos={myTodos}
            />
            <Calendar
              localizer={localizer}
              events={myEvents}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="start"
              components={{ event: EventInfo }}
              endAccessor="end"
              defaultView="week"
              eventPropGetter={(event) => {
                // kolla om event har en todo,
                // plocka färgen från todon.
                // event.todoId
                return {
                  style: {
                    backgroundColor: "#b64fc8",
                    borderColor: "#b64fc8",
                  },
                }
              }}
              style={{
                height: 900,
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default EventCalendar
