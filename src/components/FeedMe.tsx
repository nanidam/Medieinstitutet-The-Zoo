import "./FeedMe.scss";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../interfaces/IAnimal";
import errorPlaceholder from "../assets/errorPlaceholder.png";
import { calcTimeDiff } from "../utils/calcTimeDifference";

export const FeedMe: React.FC = () => {
  const { query } = useParams();
  const [animal, setAnimal] = useState<IAnimal | null>(null);
  const [feedBtnDisabled, setFeedBtnDisabled] = useState(true);
  const [showColor, setShowColor] = useState("");
  const [timeFed, setTimeFed] = useState("");
  const [dateFed, setDateFed] = useState("");

  const checkTime = useCallback(
    (animal: IAnimal) => {
      const timeDiff: number = calcTimeDiff(animal) as number;
      if (timeDiff !== undefined) {
        if (timeDiff <= 3) {
          setShowColor("green");
          setFeedBtnDisabled(true);
        }
        if (timeDiff > 3 && timeDiff < 4) {
          setShowColor("orange");
          setFeedBtnDisabled(false);
        }
        if (timeDiff >= 4) {
          setShowColor("red");
          setFeedBtnDisabled(false);
        }
      }
    },
    [setShowColor, setFeedBtnDisabled]
  );

  const handleFeedBtn = useCallback(() => {
    const currentDate = new Date();
    const ls = localStorage.getItem("zoo");

    if (ls) {
      const animals: IAnimal[] = JSON.parse(ls);
      const findAnimalIndex = animals.findIndex((a) => a.name === query);

      if (findAnimalIndex !== -1) {
        animals[findAnimalIndex].lastFed = currentDate.toISOString();
        localStorage.setItem("zoo", JSON.stringify(animals));

        const formattedDate = currentDate.toLocaleDateString("en-GB");
        const formattedTime = currentDate.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        checkTime(animals[findAnimalIndex]);
        setTimeFed(formattedTime);
        setDateFed(formattedDate);
      }
    }
  }, [checkTime, query, setTimeFed, setDateFed]);

  useEffect(() => {
    const ls = localStorage.getItem("zoo");

    if (ls) {
      const animals: IAnimal[] = JSON.parse(ls);
      const findAnimal = animals.find((a) => a.name === query);

      if (findAnimal) {
        setAnimal(findAnimal);
        const fedDate = new Date(findAnimal.lastFed);

        const updateFedTime = fedDate.toLocaleDateString("en-GB");
        const updateFedDate = fedDate.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        setDateFed(updateFedTime);
        setTimeFed(updateFedDate);
        checkTime(findAnimal);
      }
    }
  }, [query, setDateFed, setAnimal, checkTime, setTimeFed]);

  return (
    <>
      {animal && (
        <section className="wrapper">
          <img
            className={`animal-img ${
              showColor === "green"
                ? ""
                : showColor === "orange"
                ? "animal-img-orange"
                : "animal-img-red"
            }`}
            src={animal.imageUrl}
            alt={animal.name}
            onError={(e) => {
              e.currentTarget.src = errorPlaceholder;
            }}
          />
          <div className="feed-container">
            <p className="animal-last-fed">
              Matad senast: <br />
              {timeFed} <br /> {dateFed}
            </p>
            <button
              className="feed-btn"
              onClick={handleFeedBtn}
              disabled={feedBtnDisabled}
            >
              Mata!
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default FeedMe;
