import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <>
      <h1>here is home page </h1>

      <Link to="./new">
        <Button>New</Button>
      </Link>
    </>
  );
};

export default Home;
