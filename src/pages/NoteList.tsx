import { useMemo, useState } from "react";

import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Form,
  Stack,
  FormGroup,
  FormLabel,
  FormControl,
  Card,
  CardBody,
  Badge,
  Modal,
} from "react-bootstrap";
import Select from "react-select";
import { Tag, Note } from "../App";
import styles from "../NoteBox.module.css";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  OnUpdateTags: (id: string, label: string) => void;
  onDelete: (id: string) => void;
};

type simplifyNoteProps = {
  tags: Tag[];
  id: string;
  title: string;
};

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  OnUpdateTags: (id: string, label: string) => void;
  onDelete: (id: string) => void;
};

const NoteList = ({
  availableTags,
  notes,
  OnUpdateTags,
  onDelete,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalOpen, setEditTagModalOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, selectedTags, title]);

  return (
    <div className="gap-4">
      <Row className="justify-content-between align-items-center w-100">
        <Col sm={12} md={6}>
          <h1>Notes</h1>
        </Col>
        <Col sm={12} md={6} className="d-flex justify-content-end">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button>Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              className="mx-3"
              onClick={() => setEditTagModalOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="justify-content-between align-items-center w-100">
          <Col sm={12} md={6}>
            <FormGroup controlId="title-input">
              <FormLabel>Title</FormLabel>
              <FormControl
                type="input"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm={12} md={6}>
            <FormGroup controlId="tag-input">
              <FormLabel>Tags</FormLabel>
              <Select
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Row sm={2} lg={3} xl={4} className="g-4">
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCart id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
      <EditTagsModal
        OnUpdateTags={OnUpdateTags}
        onDelete={onDelete}
        show={editTagsModalOpen}
        handleClose={() => setEditTagModalOpen(false)}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NoteList;

function NoteCart({ id, title, tags }: simplifyNoteProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-text-decoration-none my-4  ${styles.card}`}
      style={{ border: "2px solid black" }}
    >
      <CardBody>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack direction="horizontal" gap={3} className="flex-wrap">
              {tags.map((tag) => {
                return (
                  <Badge key={tag.id} className="">
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDelete,
  OnUpdateTags,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
        <Modal.Body>
          <Form>
            <Stack>
              {availableTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <FormControl
                      type="text"
                      value={tag.label}
                      onChange={(e) => OnUpdateTags(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      onClick={() => onDelete(tag.id)}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
}
