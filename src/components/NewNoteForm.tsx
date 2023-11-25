import { Input, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import CreateTag from "react-select/creatable";
import "../index.css";

const NewNoteForm: React.FC = () => {
  const { TextArea } = Input;
  return (
    <div className="box-new-note">
      <div className="header-new-note">
        <div style={{ flex: 1 }}>
          <Typography.Title level={3}>Title</Typography.Title>
          <Input />
        </div>
        <div style={{ flex: 1 }}>
          <Typography.Title level={3}>Tags</Typography.Title>
          <CreateTag isMulti />
        </div>
      </div>
      <div className="body-new-note">
        <div>
          <TextArea style={{ height: 500 }} />
        </div>
      </div>
      <div className="footer-new-note">
        <Link to="..">
          <Button>Cancel</Button>
        </Link>

        <Button type="primary">Save</Button>
      </div>
    </div>
  );
};

export default NewNoteForm;

//insert options to create tag
