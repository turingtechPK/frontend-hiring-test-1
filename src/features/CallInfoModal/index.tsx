import { ActionButton } from '@/components/table/table.styles'
import { Call } from '@/lib/types'
import { postNote } from '@/services/requests/calls'
import { useMutation } from '@tanstack/react-query'
import { Modal } from 'antd'
import { useState } from 'react'
import { ModalHeader, ModalInfoGrid } from '../CallsTable/CallsTable.style'
import moment from 'moment'
import TextArea from 'antd/es/input/TextArea'
import { CallTableColumns } from '../CallsTable'

export const CallInfoModal: React.FC<{ call: CallTableColumns }> = ({ call }) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const mutation = useMutation({
    mutationFn: () => postNote({ id: call.id, content: value }),
    onSuccess: () => {
      setValue('')
      setIsModalOpen(false)
    },
  })
  const handleOk = () => {
    if (value.length > 0) {
      setError('')
      mutation.mutate()
    } else {
      setError('error')
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <ActionButton
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        Add Note
      </ActionButton>
      <Modal
        title="Add Notes"
        open={isModalOpen}
        okText="Save"
        onOk={handleOk}
        destroyOnClose
        onCancel={handleCancel}
      >
        <ModalHeader>Call ID {call.id}</ModalHeader>
        <ModalInfoGrid>
          <div>Call Type</div>
          <div>{call.call_type}</div>
          <div>Duration</div>
          <div>
            {moment
              .duration(call.duration, 'seconds')
              .format('hh [hours] mm [minutes]')}
          </div>
          <div>FROM</div>
          <div>{call.from}</div>
          <div>TO</div>
          <div>{call.to}</div>
          <div>VIA</div>
          <div>{call.via}</div>
        </ModalInfoGrid>
        <div>
          <div>Notes</div>
          <TextArea
            rows={4}
            value={value}
            placeholder="Add Notes"
            onChange={(e) => setValue(e.target.value)}
            status={error as any}
            style={{ resize: 'none' }}
          />
        </div>
      </Modal>
    </>
  )
}
