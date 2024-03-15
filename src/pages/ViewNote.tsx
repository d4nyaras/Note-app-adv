import { useNote } from "../components/NoteLayout";
import { Row, Col, Stack, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

const viewNote = ({ onDelete }: NoteProps) => {
  const note = useNote();
  return (
    <>
      <Row>
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack
              gap={2}
              className="align-items-center justify-content-center h-100"
            >
              {note.tags.length > 0 && (
                <Stack direction="horizontal" gap={3} className="flex-wrap">
                  {note.tags.map((tag) => {
                    return (
                      <Badge key={tag.id} className="">
                        {tag.label}
                      </Badge>
                    );
                  })}
                </Stack>
              )}
            </Stack>
          )}
        </Col>
        <Col sm={12} md={6} className="d-flex justify-content-end gap-5">
          <Stack gap={2} direction="horizontal">
            <Link to={`${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => onDelete(note.id)}>
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary" className="mx-3">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default viewNote;
