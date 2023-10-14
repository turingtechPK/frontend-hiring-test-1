import { Button, Descriptions, Form, Input, Modal } from 'antd'

import { Call } from './types.ts'
import { useState } from 'react'

const { TextArea } = Input

type Props = {
  open: boolean
  saving: boolean
  call: Call | undefined
  onSave: (notes: string) => void
  onClose: () => void
}

export const CallDetailsModal: React.FC<Props> = ({
  open,
  saving,
  onSave,
  onClose,
  call,
}) => {
  const [notes, setNotes] = useState<string>('')

  const handleNotesChange = (value: string) => {
    setNotes(value)
  }

  return (
    <Modal
      open={open}
      title={
        <>
          Add Notes <br /> Call ID {call?.id}
        </>
      }
      onCancel={onClose}
      confirmLoading={saving}
      footer={[
        <Button
          key="save"
          type="primary"
          loading={saving}
          onClick={() => onSave(notes)}
        >
          Save
        </Button>,
      ]}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Call Type">
          {call?.call_type}
        </Descriptions.Item>
        <Descriptions.Item label="Duration">{call?.duration}</Descriptions.Item>
        <Descriptions.Item label="From">{call?.from}</Descriptions.Item>
        <Descriptions.Item label="To">{call?.to}</Descriptions.Item>
        <Descriptions.Item label="Via">{call?.via}</Descriptions.Item>
      </Descriptions>

      <Form layout="vertical">
        <Form.Item label="Notes" name="notes">
          <TextArea
            value={notes}
            rows={4}
            placeholder="Add Notes"
            onChange={e => handleNotesChange(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
