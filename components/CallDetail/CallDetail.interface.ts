import { Call } from "../../services/calls"

export interface CallDetailProps {
  className?: string
  call?: Call & { edit?: boolean }
  onCancel: (value?: Call) => void
  onAddNote: (value: string, Call: Call) => void
}

export interface FormState {
  content: string
}
