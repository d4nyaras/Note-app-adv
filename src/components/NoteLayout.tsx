import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../App";

type NoteLayoutProps = {
  notes: Note[];
};

const NoteLayout = ({ notes }: NoteLayoutProps) => {
  console.log("here is note layout page ");

  const { id } = useParams();
  const note = notes.find((n) => n.id === id);
  if (note === null) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet context={note} />;
  }
};

export default NoteLayout;

export function useNote() {
  return useOutletContext<Note>();
}
