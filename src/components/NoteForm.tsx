import {
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import Select from "react-select/creatable";
import { Link } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { NoteData, Tag } from "../App";

type NoteFromProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

function NoteFrom({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFromProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const markdownRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const titleValue = titleRef.current?.value ?? "";
    const markdownValue = markdownRef.current?.value ?? "";
    onSubmit({
      title: titleValue,
      markdown: markdownValue,
      tags: selectedTags,
    });
    navigate("/");
  }

  console.log(tags);
  return (
    <Form
      className="d-flex flex-column "
      style={{ gap: "20px" }}
      onSubmit={handleSubmit}
    >
      <Row className="justify-content-between align-items-center w-100">
        <Col sm={12} md={6}>
          <FormGroup controlId="title-input">
            <FormLabel>Title</FormLabel>
            <FormControl
              type="input"
              required
              ref={titleRef}
              defaultValue={title}
            />
          </FormGroup>
        </Col>

        <Col sm={12} md={6}>
          <FormGroup controlId="tag-input">
            <FormLabel>Tags</FormLabel>
            <Select
              isMulti
              onCreateOption={(label) => {
                console.log(label);
                const newTag = { id: uuidv4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
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
      <Row className="w-100">
        <Col>
          <FormGroup controlId="area-input">
            <FormLabel>Body</FormLabel>
            <FormControl
              as="textarea"
              rows={15}
              required
              ref={markdownRef}
              defaultValue={markdown}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className=" w-100 d-flex flex-row justify-content-end">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Link to="..">
          <Button type="button" variant="outline-primary" className="mx-3">
            Cancel
          </Button>
        </Link>
      </Row>
    </Form>
  );
}

export default NoteFrom;
