import { Button, Pagination, Table } from 'antd'
import { useState } from 'react'

import { ColumnsType } from 'antd/es/table'
import { useCalls } from './useCalls.ts'
import { Call, CallType } from './types.ts'
import { CallDetailsModal } from './CallDetailsModal.tsx'
import { Error } from '../../components/Error.tsx'

const LIMIT = 10

const Calls: React.FC = () => {
  const [offset, setOffset] = useState(0)
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)
  const [savingCall, setSavingCall] = useState(false)
  const { calls, error, isLoading, total, addNoteToCall, toggleArchiveStatus } =
    useCalls(offset, 10)

  const currentPage = offset === 0 ? 1 : offset / LIMIT + 1
  const startIndex = offset + 1
  const endIndex = offset + LIMIT
  const selectedCall = calls?.find(c => c.id === selectedCallId)

  const columns: ColumnsType<Call> = [
    {
      title: 'CALL TYPE',
      dataIndex: 'call_type',
      key: 'call_type',
      render: (callType: Call['call_type']) => {
        const map = {
          [CallType.Missed]: 'Missed',
          [CallType.Answered]: 'Answered',
          [CallType.Voicemail]: 'Voice Mail',
        }
        const formattedCallType = map[callType]
        const color =
          callType === CallType.Answered
            ? '#4BD2C5'
            : callType === CallType.Missed
            ? '#C81C3E'
            : '#335AE6'

        return <span style={{ color }}>{formattedCallType}</span>
      },
    },
    {
      title: 'DIRECTION',
      dataIndex: 'direction',
      key: 'direction',
      render: (direction: Call['direction']) => {
        const formattedDirection =
          direction.charAt(0).toUpperCase() + direction.slice(1)
        return <span style={{ color: '#335AE6' }}>{formattedDirection}</span>
      },
    },
    {
      title: 'DURATION',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: Call['duration']) => {
        const minutes = Number.parseInt(duration / 60 + '')
        const remainderSeconds = duration % 60

        return (
          <>
            <span>
              {minutes} minutes {remainderSeconds} seconds
            </span>
            <br />
            <span style={{ color: '#4166e9' }}>({duration} seconds)</span>
          </>
        )
      },
    },
    {
      title: 'FROM',
      key: 'from',
      dataIndex: 'from',
    },
    {
      title: 'TO',
      key: 'to',
      dataIndex: 'to',
    },
    {
      title: 'VIA',
      key: 'via',
      dataIndex: 'via',
    },
    {
      title: 'CREATED AT',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (createdAt: Call['created_at']) => (
        <span>{new Date(createdAt).toLocaleDateString()} </span>
      ),
    },
    {
      title: 'STATUS',
      key: 'is_archived',
      dataIndex: 'is_archived',
      render: (isArchived: Call['is_archived']) => {
        const style: React.CSSProperties = {
          color: isArchived ? '#1CC8B7' : '#B5B5B4',
          backgroundColor: isArchived ? '#ECFAFA' : '#EFEFEE',
          padding: '3px 6px',
        }
        return (
          <span style={style}>{isArchived ? 'Archived' : 'Unarchived'}</span>
        )
      },
    },
    {
      title: 'ACTIONS',
      render: (_, call: Call) => (
        <>
          <Button
            style={{ color: 'white', backgroundColor: `var(--color-primary)` }}
            onClick={() => handleAddNote(call.id)}
          >
            Add Note
          </Button>
          <Button
            style={{ color: 'white', backgroundColor: `var(--color-primary)` }}
            onClick={() => handleArchiveCall(call.id)}
          >
            {call.is_archived ? 'Un-Archive' : 'Archive'}
          </Button>
        </>
      ),
    },
  ]

  const handleAddNote = (id: string) => {
    setSelectedCallId(id)
  }

  const handleArchiveCall = async (id: string) => {
    await toggleArchiveStatus(id)
  }

  const handlePageChange = (page: number) => {
    setOffset((page - 1) * 10)
  }

  const handleSavingCall = async (notes: string) => {
    setSavingCall(true)
    await addNoteToCall(selectedCallId!, notes)
    setSavingCall(false)
    setSelectedCallId(null)
  }

  const handleClose = () => {
    setSelectedCallId(null)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'left', fontWeight: 400, margin: '1rem 0' }}>
        Turing Technologies Frontend Test
      </h1>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <Table
            loading={isLoading}
            className="calls-table"
            bordered={true}
            columns={columns}
            dataSource={calls}
            rowKey={r => r.id}
            pagination={false}
          />
          {!isLoading && (
            <>
              <Pagination
                style={{ marginTop: '2rem' }}
                defaultCurrent={currentPage}
                showSizeChanger={false}
                total={total}
                onChange={handlePageChange}
              />
              <span>
                {startIndex} - {endIndex} of {total} results
              </span>
            </>
          )}

          <CallDetailsModal
            open={!!selectedCallId}
            call={selectedCall}
            saving={savingCall}
            onSave={handleSavingCall}
            onClose={handleClose}
          />
        </>
      )}
    </div>
  )
}

export default Calls
