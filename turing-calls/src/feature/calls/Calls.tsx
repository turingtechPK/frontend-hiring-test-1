import { Alert, Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useCalls } from './useCalls.ts'
import { Call } from './types.ts'

const columns: ColumnsType<Call> = [
  {
    title: 'Call Type',
    dataIndex: 'call_type',
    key: 'call_type',
  },
  {
    title: 'Direction',
    dataIndex: 'direction',
    key: 'direction',
  },
  {
    title: 'Duration',
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
    title: 'From',
    key: 'from',
    dataIndex: 'from',
  },
  {
    title: 'To',
    key: 'to',
    dataIndex: 'to',
  },
  {
    title: 'Via',
    key: 'via',
    dataIndex: 'via',
  },
  {
    title: 'Created At',
    key: 'created_at',
    dataIndex: 'created_at',
    render: (createdAt: Call['created_at']) => (
      <span>{new Date(createdAt).toLocaleDateString()} </span>
    ),
  },
  {
    title: 'Status',
    key: 'is_archived',
    dataIndex: 'is_archived',
    render: (isArchived: Call['is_archived']) => (
      <span>{isArchived ? 'Archived' : 'Unarchived'}</span>
    ),
  },
  {
    title: 'Actions',
    render: () => (
      <Button
        style={{ color: 'white', backgroundColor: `var(--color-primary)` }}
      >
        Add Note
      </Button>
    ),
  },
]

export const Calls: React.FC = () => {
  const { data, error, isLoading } = useCalls(0, 10)
  const calls = data?.paginatedCalls.nodes

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Turing Technologies Frontend Test</h1>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        <Alert
          message="Something went wrong!"
          description="Something went wrong while fetching Calls :("
          type="error"
        />
      ) : (
        <Table columns={columns} dataSource={calls} rowKey={r => r.id} />
      )}
    </div>
  )
}
