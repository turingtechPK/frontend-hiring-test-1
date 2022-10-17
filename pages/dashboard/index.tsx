import { FC, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CallDetail } from "../../components/CallDetail"
import { Option, Select } from "../../components/Select"
import { MESSAGE } from "../../constants"
import { CallList } from "../../container/CallList"
import { ErrorView } from "../../container/ErrorView"
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks"

import {
  Call,
  useAddNoteMutation,
  useArchiveMutation,
  useLazyGetCallsQuery,
} from "../../services/calls"
import { refreshTokenTimer } from "../../services/user"

const Dashboard: FC = () => {
  const dispatch = useAppDispatch()

  const token = useAppSelector((store) => store.auth.access_token)
  const [filter, setFilter] = useState("")
  const [selected, setSelected] = useState<(Call & { edit?: boolean }) | undefined>(undefined)

  const [getcalls, calls] = useLazyGetCallsQuery()
  const [archive] = useArchiveMutation()
  const [addNote] = useAddNoteMutation()

  useEffect(() => {
    if (calls.isUninitialized) getcalls({ limit: 5, offset: 0 })
    if (calls.isError) toast.error(calls.error.message ?? MESSAGE.ERROR)
  }, [calls, getcalls])

  useEffect(() => {
    refreshTokenTimer(dispatch, token as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (calls.isError)
    return (
      <main className="bg-white flex-grow p-5 space-y-3 flex flex-col">
        <ErrorView />
      </main>
    )

  const onArchive = (value: Call) => {
    toast.promise(archive(value).unwrap(), {
      error: (e) => (e ? (Array.isArray(e) ? e[0].message : e.message) : MESSAGE.ERROR),
      loading: MESSAGE.LOADING,
      success: () => "Successful Archived",
    })
  }

  const onAddNote = async (value: string, call: Call) => {
    if (call)
      toast
        .promise(addNote({ content: value, id: call?.id }).unwrap(), {
          error: (e) => (e ? (Array.isArray(e) ? e[0].message : e.message) : MESSAGE.ERROR),
          loading: MESSAGE.LOADING,
          success: () => "Successful Note Added",
        })
        .then(() => setSelected(undefined))
  }

  return (
    <main className="bg-white flex-grow p-5 space-y-3 flex flex-col">
      <section>
        <h3 className="text-2xl mb-10">Turing Technologies Frontend Test</h3>
        This one isnt working: how can we expect to filter on server side without querypram // How
        ever we can filter using table on its filter
        <div className="flex items-center space-x-2">
          <div>Filter by: </div>
          <Select
            className="min-w-[100px]"
            value={filter}
            onChange={(_, value) => value && setFilter(value as string)}
          >
            <Option value="" hidden>
              Status
            </Option>
            <Option value="10">All</Option>
            <Option value="20">Archive</Option>
            <Option value="30">UnArchive</Option>
          </Select>
        </div>
      </section>

      <CallList
        className="flex-grow"
        onEdit={(val) => setSelected({ ...val, edit: true })}
        onRowClick={(val) => setSelected({ ...val, edit: false })}
        onArchive={onArchive}
        loading={calls.isFetching}
        rows={calls.data?.nodes ?? []}
        onPageChange={(page, pageSize) => getcalls({ limit: pageSize, offset: page * pageSize })}
        onPageSizeChange={(page, pageSize) =>
          getcalls({ limit: pageSize, offset: page * pageSize })
        }
        rowCount={calls.data?.totalCount}
      />

      <CallDetail call={selected} onCancel={() => setSelected(undefined)} onAddNote={onAddNote} />
    </main>
  )
}

export default Dashboard
