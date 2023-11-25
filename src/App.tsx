import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./pages/NewNote";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>home</p>} />
        <Route path="new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<p>show</p>} />
          <Route path="edit" element={<p>edit</p>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
