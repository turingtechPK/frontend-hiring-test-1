import React from "react";
import { Input, Table as ReactStrapTable, } from "reactstrap";
import './index.css'


/**
 * Custom dynamic table to handle data
 * @param data - array of data list to populate in table
 * @param columns - array of objects that contains the properties of dataKeys and render elements
 * @param checkedList - array of string that contain ids of rows that are checked
 * @param setCheckedList - function to set items in checkedlist
 * @param allChecked - Boolean variable that tells whther all row items are checked or not
 * @param setAllChecked - State setter function
 * @returns 
 */
export default function Table({
    data = [],
    columns = [],
    checkedList,
    setCheckedList,
    allChecked,
    setAllChecked
}) {

    // This function is for the header checkbox. When it is checked it checks all the
    // calls that are not archived yet and if unchecked then it uncheck all the calls
    function onHeaderCheckboxChange() {
        if (allChecked) {
            setAllChecked(false);
            setCheckedList([]);
        } else {
            let tempList = [];

            // Only pushing the items that are not archived
            data.forEach(item => {
                if (!item.is_archived) tempList.push(item.id);
            })
            setAllChecked(true);
            setCheckedList(tempList);
        }
    }

    // Function is called every time a row is checked or unchecked and it adds or removes its id 
    // in the checkedList state
    function onCheckboxChange(id) {
        const index = checkedList.indexOf(id);
        if (index === -1) {
            let tempList = [...checkedList, id];

            areAllChecked(tempList)

            setCheckedList(tempList);
        } else {
            let tempList = [...checkedList];

            tempList.splice(index, 1);

            areAllChecked(tempList)

            setCheckedList(tempList);
        }
    }

    // Function is called every time a row is checked or unchecked.
    // It checks whether all the data items are checked and if yes then it make
    // header checkbox true

    // Compares the checklist items with the items that are not archived
    function areAllChecked(tempList) {
        let notArchivedCount = 0;
        data.forEach(item => {
            if (!item.is_archived) notArchivedCount++;
        })

        if (notArchivedCount === tempList.length) setAllChecked(true)
        else setAllChecked(false)
    }

    return (
        <div>
            <ReactStrapTable hover>
                <thead>
                    <tr>
                        {columns.map(column => {
                            if (column.checkbox) {
                                return (
                                    <th>
                                        <Input
                                            type="checkbox"
                                            checked={allChecked}
                                            onChange={onHeaderCheckboxChange}
                                        />
                                    </th>
                                )
                            } else return <th>{column.title}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map(dataItem => (
                        <tr>
                            {columns.map(column => {
                                if (column.checkbox) return (
                                    <td>
                                        <Input
                                            type="checkbox"
                                            disabled={dataItem.is_archived}
                                            checked={checkedList.includes(dataItem.id)}
                                            onChange={() => onCheckboxChange(dataItem.id)}
                                        />
                                    </td>
                                )
                                if (column.hasOwnProperty('render') && column.dataKey) return <td>{column.render(dataItem[column.dataKey])}</td>
                                if (column.hasOwnProperty('render') && !column.dataKey) return <td>{column.render(dataItem)}</td>
                                else return <td>{dataItem[column.dataKey]}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </ReactStrapTable>
        </div>
    )
}
