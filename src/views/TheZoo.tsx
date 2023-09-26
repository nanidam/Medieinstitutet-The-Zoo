import { useEffect, useState, useCallback } from "react";
import { getAllAnimals } from "../services/getAllAnimals";
import errorPlaceholder from "../assets/errorPlaceHolder.png";
import { Link } from "react-router-dom";
import { IAnimal } from "../interfaces/IAnimal";
import { calcTimeDiff } from "../utils/calcTimeDifference";
import "./TheZoo.scss";

const RenderZoo: React.FC = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  const checkLocalStorage = useCallback(async () => {
    const ls = localStorage.getItem("zoo");

    if (ls) {
      const animalsFromLocalStorage: IAnimal[] = JSON.parse(ls);
      setAnimals(animalsFromLocalStorage);
    } else {
      const allAnimals: IAnimal[] = await getAllAnimals();
      setAnimals(allAnimals);
      localStorage.setItem("zoo", JSON.stringify(allAnimals));
    }
  }, [setAnimals]);

  const animalsWithValidImages: IAnimal[] = animals.map((animal) => ({
    ...animal,
    imageUrl: animal.imageUrl || errorPlaceholder,
  }));

  useEffect(() => {
    checkLocalStorage();
  }, [checkLocalStorage]);

  return (
    <>
      <Link to="/">
        <button className="exit-btn">&larr; Tillbaka</button>
      </Link>
      <div className="animal-container">
        {animalsWithValidImages.map((animal) => {
          const timeDiff = calcTimeDiff(animal) || 0;
          return (
            <Link to={animal.name} key={animal.id}>
              <div className="animal-card" key={animal.id}>
                <img
                  className={
                    timeDiff <= 3
                      ? "animal-img"
                      : timeDiff > 3 && timeDiff < 4
                      ? "animal-img animal-img-orange"
                      : "animal-img animal-img-red"
                  }
                  src={animal.imageUrl}
                  alt={animal.name}
                  onError={(e) => {
                    e.currentTarget.src = errorPlaceholder;
                    console.error(`Invalid image URL for ${animal.name}`);
                  }}
                />
                <h2 className="animal-name">{animal.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default RenderZoo;
