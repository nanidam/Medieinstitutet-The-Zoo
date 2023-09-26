import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../interfaces/IAnimal";
import "./AnimalInfo.scss";

export const AnimalInfo: React.FC = () => {
  const { query } = useParams();
  const [animal, setAnimal] = useState<IAnimal | null>(null);

  useEffect(() => {
    const ls = localStorage.getItem("zoo");
    if (ls) {
      const animals: IAnimal[] = JSON.parse(ls);
      const findAnimal = animals.find((a) => a.name === query);
      if (findAnimal) {
        setAnimal(findAnimal);
      }
    }
  }, [query, setAnimal]);

  return (
    <>
      {animal && (
        <section className="animal-info">
          <div className="wrapper">
            <h2 className="animal-name">{animal.name}</h2>
            <h3 className="animal-year">Födelseår: {animal.yearOfBirth}</h3>
            <p className="animal-description">{animal.shortDescription}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default AnimalInfo;
