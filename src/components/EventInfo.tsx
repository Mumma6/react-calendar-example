import React from "react"

import { Typography } from "@mui/material"
import { IEventInfo } from "./EventCalendar"

interface IProps {
  event: IEventInfo
}

const EventInfo = ({ event }: IProps) => {
  return (
    <>
      <Typography variant="body2">{event.title}</Typography>
    </>
  )
}

export default EventInfo
