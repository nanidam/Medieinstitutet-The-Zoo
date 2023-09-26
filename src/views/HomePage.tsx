import { Link } from "react-router-dom";
import ZooInfo from "../components/ZooInfo";

export const homePage: React.FC = () => (
  <>
    <ZooInfo />
    <div>
      <Link to="/zoo">
        <button>Zoo &rarr;</button>
      </Link>
    </div>
  </>
);

export default homePage;
