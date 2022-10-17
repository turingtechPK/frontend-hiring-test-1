import { Close } from "@mui/icons-material"
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material"
import { intervalToDuration } from "date-fns"
import { FC, useMemo } from "react"
import { useForm } from "react-hook-form"
import { Require } from "../../types/types"
import { FormField } from "../FormField"

import { CallDetailProps, FormState } from "./CallDetail.interface"

export const CallDetail: FC<CallDetailProps> = (props) => {
  const { className, call, onCancel } = props

  const calltype = useMemo(() => {
    if (!call?.call_type) return

    if (call.call_type === "answered") return <span className="text-cyan-500">Answered</span>
    if (call.call_type === "missed") return <span className="text-red-500">Missed</span>
    if (call.call_type === "voicemail") return <span className="text-primary">Voice mail</span>
    return call.call_type
  }, [call])

  const duration = useMemo(() => {
    if (!call?.duration) return

    const duration = intervalToDuration({ start: 0, end: call?.duration * 1000 })
    let str = ""
    if (duration.years) str += ` ${duration.years} year${duration.years > 1 ? "s" : ""}`
    if (duration.days) str += ` ${duration.days} day${duration.days > 1 ? "s" : ""}`
    if (duration.hours) str += ` ${duration.hours} hour${duration.hours > 1 ? "s" : ""}`
    if (duration.minutes) str += ` ${duration.minutes} minute${duration.minutes > 1 ? "s" : ""}`
    if (duration.months) str += ` ${duration.months} month${duration.months > 1 ? "s" : ""}`
    return (
      <div className="whitespace-normal">
        <span>{str}</span> <span className="text-primary">({call?.duration} seconds)</span>
      </div>
    )
  }, [call])

  return (
    <Dialog
      open={!!call}
      onClose={() => onCancel(call)}
      className={className}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="flex justify-between items-start">
        <div>
          <div className="text-2xl mb-3">Add Notes</div>
          <div className="text-primary"> Call ID {call?.id}</div>
        </div>
        <IconButton className="text-3xl text-primary" onClick={() => onCancel(call)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <hr />
      <DialogContent>
        <table>
          <tr>
            <td className="font-bold">Call type</td>
            <td>{calltype}</td>
          </tr>
          <tr>
            <td className="font-bold">Duration</td>
            <td>{duration}</td>
          </tr>
          <tr>
            <td className="font-bold">From</td>
            <td>{call?.from}</td>
          </tr>
          <tr>
            <td className="font-bold">To</td>
            <td>{call?.to}</td>
          </tr>
          <tr>
            <td className="font-bold">Via</td>
            <td>{call?.via}</td>
          </tr>
        </table>
      </DialogContent>
      <hr />
      {call?.edit && (
        <DialogContent>
          <AddNoteForm {...props} call={call} />
        </DialogContent>
      )}
    </Dialog>
  )
}

//
// Created Seperate component to make sure form properly resets after modal close
//
export const AddNoteForm = (props: Require<CallDetailProps, "call">) => {
  const { call, onAddNote } = props

  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      content: "",
    },
  })

  return (
    <form onSubmit={handleSubmit((form) => onAddNote(form.content, call))} className="space-y-10">
      <FormField
        control={control}
        name="content"
        label={<span className="font-bold">Notes</span>}
        rules={{
          required: { message: "Value is Required", value: true },
        }}
      >
        <TextField multiline rows={4} placeholder="Add Notes" fullWidth />
      </FormField>
      <Button fullWidth variant="contained" type="submit">
        Save
      </Button>
    </form>
  )
}
