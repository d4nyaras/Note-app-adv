import { useMemo, useState, CSSProperties } from "react";
import "../index.css";

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
  InputGroup,
} from "react-bootstrap";
import Select, { StylesConfig } from "react-select";
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

  const customStyles: any = {
    control: (provided: CSSProperties) => ({
      ...provided,
      borderRadius: "30px",
    }),
  };

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
    <div style={{ gap: "30px" }}>
      <Row className="d-flex justify-content-between align-items-center w-100 my-3">
        <Col>
          <i
            className="bi bi-brightness-high-fill"
            style={{ fontSize: "25px" }}
          ></i>
        </Col>
        <Col className="d-flex justify-content-end">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button className="rounded-pill" variant="primary">
                Create
              </Button>
            </Link>
            <Button
              variant="outline-secondary"
              className="mx-3 rounded-pill"
              onClick={() => setEditTagModalOpen(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="justify-content-between align-items-center w-100">
          <Col sm={12} md={6} className="my-3">
            <FormGroup controlId="title-input">
              <FormControl
                type="input"
                className=" rounded-pill"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm={12} md={6}>
            <FormGroup controlId="tag-input">
              <Select
                styles={customStyles}
                isMulti
                placeholder="Tags"
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
      <Row>
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id} xs={12} md={6} lg={4} xl={3} className="my-3">
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
      className={`h-100 text-reset text-text-decoration-none my-4   ${styles.card}`}
    >
      <CardBody>
        <Stack className="align-items-center justify-content-center h-100 ">
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
      <Modal.Header>
        <Modal.Body>
          <Form>
            <Stack>
              {availableTags.map((tag) => (
                <Row key={tag.id} className="align-items-center">
                  <Col>
                    <FormControl
                      type="text"
                      value={tag.label}
                      onChange={(e) => OnUpdateTags(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-primary"
                      onClick={() => onDelete(tag.id)}
                      className="my-2"
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
