import { callsService } from "@/services/calls";
import { callTypeColorMap, COLORS } from "@/shared/constants";
import { firstLetterUppercase, secondsToMinutesString } from "@/shared/helper";
import { CallNode } from "@/shared/types";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  notification,
  Row,
  Typography,
} from "antd";
import { ChangeEvent, useState } from "react";

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

interface Props extends CallNode {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export default function AddNoteModal({
  showModal,
  setShowModal,
  call_type,
  duration,
  from,
  to,
  via,
  id,
}: Props) {
  const [note, setNote] = useState("");

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const onAddNote = async () => {
    try {
      await callsService.addNote(id, note);
      notification.open({
        type: "success",
        message: "Note added successfully!",
        duration: 2,
      });
      onClose();
    } catch (error) {
      notification.open({
        type: "error",
        message: (error as Error).message,
        duration: 2,
      });
    }
  };

  const onClose = () => {
    setNote("");
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      footer={null}
      onCancel={onClose}
      closeIcon={
        <CloseOutlined
          style={{
            color: COLORS.primary,
            fontSize: "20px",
            fontWeight: "bolder",
          }}
        />
      }
    >
      <Row>
        <Col span={24}>
          <Title level={3}>Add Notes</Title>
          <Text style={{ color: COLORS.primary }}>{`Call ID ${id}`}</Text>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={4} style={{ fontWeight: "bold" }}>
          <Paragraph>Call Type</Paragraph>
          <Paragraph>Duration</Paragraph>
          <Paragraph>From</Paragraph>
          <Paragraph>To</Paragraph>
          <Paragraph>Via</Paragraph>
        </Col>
        <Col span={20}>
          <Paragraph style={{ color: callTypeColorMap[call_type] }}>
            {firstLetterUppercase(call_type)}
          </Paragraph>
          <Paragraph>{secondsToMinutesString(duration)}</Paragraph>
          <Paragraph>{from}</Paragraph>
          <Paragraph>{to}</Paragraph>
          <Paragraph>{via}</Paragraph>
        </Col>
        <Col span={24}>
          <Paragraph style={{ fontWeight: "bold" }}>Notes</Paragraph>
          <TextArea
            rows={3}
            maxLength={200}
            placeholder="Add Notes"
            value={note}
            onChange={onTextChange}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={onAddNote}
            disabled={!Boolean(note)}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}
