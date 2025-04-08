import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Checkbox,
    Button,
    CircularProgress,
    Box,
} from "@mui/material";
import { useCalls } from "../../hooks/useCalls";
import { useArchiveCall } from "../../hooks/useArchiveCall";
import { useAddNote } from "../../hooks/useAddNote";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { groupCalls } from "../../utils/groupByCallProperty";
import PaginationControls from "../Pagination/pagination";
import FilterControls from "../Filters/callFilter";
import CallGroup from "../GroupedCallRows/callGroup";
import NoteModal from "../NoteModal/noteModal";
import styles from "./callTable.module.scss";

const CallTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const offset = (page - 1) * limit;
    const [selectedCalls, setSelectedCalls] = useState<string[]>([]);
    const [selectedCall, setSelectedCall] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | "">("");
    const [groupBy, setGroupBy] = useState<string>("");

    const { calls, loading, totalCount } = useCalls(offset, limit, statusFilter);
    const { mutate: archiveCallMutation } = useArchiveCall();
    const { mutate: addNoteMutation } = useAddNote();
    const token = useSelector((state: RootState) => state.auth.token) as string;

    const totalPages = Math.ceil(totalCount / limit);
    const groupedCalls = groupCalls(calls, groupBy);
    const handleArchive = (id: string) => {
        archiveCallMutation(id);
    };

    const handleRowSelection = (id: string) => {
        setSelectedCalls((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((callId) => callId !== id);
            }
            return [...prevSelected, id];
        });
    };

    const handleSelectAll = () => {
        const allCallIds = Object.values(groupedCalls)
            .flat()
            .map((call: any) => call.id);

        if (selectedCalls.length === allCallIds.length) {
            setSelectedCalls([]);
        } else {
            setSelectedCalls(allCallIds);
        }
    };

    const handleBulkArchive = () => {
        selectedCalls.forEach((callId) => handleArchive(callId));
        setSelectedCalls([]);
    };

    const handleAddNotes = (call: any) => {
        setSelectedCall(call);
        setIsModalOpen(true);
        setNote(call.note || "");
    };

    const handleSaveNote = () => {
        if (selectedCall) {
            addNoteMutation({ activityId: selectedCall.id, content: note, token });
            setIsModalOpen(false);
        }
    };

    return (
        <div className={styles.callTableContainer}>
            <FilterControls
                statusFilter={statusFilter}
                groupBy={groupBy}
                onStatusChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                }}
                onGroupByChange={(e) => setGroupBy(e.target.value)}
            />

            <Button
                variant="contained"
                color="secondary"
                onClick={handleBulkArchive}
                disabled={selectedCalls.length === 0}
            >
                Bulk Archive
            </Button>

            <Box sx={{ overflowX: 'auto' }}>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={
                                            selectedCalls.length > 0 &&
                                            selectedCalls.length === Object.values(groupedCalls).flat().length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>Call Type</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" style={{ height: 'calc(56px * 10)', verticalAlign: 'middle' }}>
                                        <CircularProgress size={40} thickness={4} />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                Object.entries(groupedCalls).map(([groupKey, groupedList]) => (
                                    <CallGroup
                                        key={groupKey}
                                        groupKey={groupKey}
                                        groupBy={groupBy}
                                        calls={groupedList}
                                        onArchive={handleArchive}
                                        onAddNote={handleAddNotes}
                                        onRowSelection={handleRowSelection}
                                        isSelected={groupedList.some((call: any) => selectedCalls.includes(call.id))}
                                        classes={{
                                            groupRow: styles.groupRow,
                                            groupHeader: styles.groupHeader,
                                            addNoteBtn: styles.addNoteBtn,
                                        }}
                                    />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                className={styles.paginationControls}
            />

            <NoteModal
                isOpen={isModalOpen}
                selectedCall={selectedCall}
                note={note}
                onChange={setNote}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveNote}
            />
        </div>
    );
};

export default CallTable;
