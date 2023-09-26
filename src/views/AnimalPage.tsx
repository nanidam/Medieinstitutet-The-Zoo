import { Link } from "react-router-dom";

import "./AnimalPage.scss";
import FeedMe from "../components/FeedMe";
import AnimalInfo from "../components/AnimalInfo";

export const AnimalPage: React.FC = () => (
  <>
    <main>
      <FeedMe />
      <AnimalInfo></AnimalInfo>
    </main>
    <footer>
      <Link to="/zoo">
        <button className="return-btn">&larr; Tillbaka</button>
      </Link>
    </footer>
  </>
);

export default AnimalPage;
