import { Typography } from "@mui/material"
import { IEventInfo } from "./EventCalendar"

interface IProps {
  event: IEventInfo
}

const EventInfo = ({ event }: IProps) => {
  console.log("ven")
  return (
    <>
      <Typography>{event.description}</Typography>
    </>
  )
}

export default EventInfo
