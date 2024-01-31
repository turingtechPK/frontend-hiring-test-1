import { memo } from 'react';

export type Column<T> = {
  key: string; // TODO: Check how can it work with keyof T
  size: 1 | 2 | 3 | 4 | 5;
  displayHeader?: string;
  format?(value: T[keyof T], rowData: T): React.ReactNode;
};

function Header<T extends Record<string, any>>({ columns }: { columns: Column<T>[] }) {
  const sizeClasses = ['w-20', 'w-32', 'w-48', 'w-64', 'w-80'];

  return (
    <thead className="uppercase font-medium bg-[#f4f4f9] border-b border-slate-300">
      <tr className="">
        {columns.map((column) => (
          <th
            className={`py-2 lg:py-4 px-2 lg:px-4 first:pl-4 first:lg:pl-10 last:pr-4 last:lg:pr-10 ${
              sizeClasses[column.size - 1]
            }`}
            key={`column-header-${column.key}`}
          >
            {column?.displayHeader ?? column.key}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Row<T extends Record<string, any>>({
  rowData,
  columns,
  onRowClick,
}: {
  rowData: T;
  columns: Column<T>[];
  onRowClick: (data: T) => void;
}) {
  return (
    <tr className="border-b border-slate-300" onClick={() => onRowClick(rowData)}>
      {columns.map((col) => (
        <td
          className="py-2 lg:py-4 px-2 lg:px-4 first:pl-4 first:lg:pl-10 last:pr-4 last:lg:pr-10"
          key={`${rowData.id}-${col.key}`}
        >
          {col.format ? col.format(rowData[col.key], rowData) : rowData[col.key]}
        </td>
      ))}
    </tr>
  );
}

const typedMemo: <T>(c: T) => T = memo;
const MemoRow = typedMemo(Row);

type TableProps<T> = {
  data?: T[];
  columns: Column<T>[];
  onRowClick: (rowData: T) => void;
};

// TODO: Maybe add a uniqueKey prop instead of using item.id as the key for rows. For now, this is enough.
export default function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
}: TableProps<T>) {
  return (
    <table className="table-fixed text-left border border-slate-300">
      <Header columns={columns} />
      <tbody className="">
        {data ? (
          data.map((item) => (
            <MemoRow columns={columns} rowData={item} onRowClick={onRowClick} key={item.id} />
          ))
        ) : (
          <tr className="">
            <td className="py-2 px-4 lg:py-4 lg:px-10 text-center" colSpan={columns.length}>
              No Data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
