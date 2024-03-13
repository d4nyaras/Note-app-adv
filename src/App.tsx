import { Navigate, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";

import NewNote from "./pages/NewNote";
import Home from "./components/Home";

export type Note = {
  id: string;
} & NoteDate;

export type Tag = {
  id: string;
  label: string;
};

export type NoteDate = {
  title: string;
  markdown: string;
  tags: Tag[];
};

const App: React.FC = () => {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<p>show</p>} />
          <Route path="edit" element={<p>edit</p>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
};

export default App;
