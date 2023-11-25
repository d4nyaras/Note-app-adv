import NewNoteForm from "../components/NewNoteForm";

const NewNote: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <h1>New Note</h1>
      <NewNoteForm />
    </div>
  );
};

export default NewNote;
