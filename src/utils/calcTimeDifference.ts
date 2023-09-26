import { IAnimal } from "../interfaces/IAnimal";

export const calcTimeDiff = (animal: IAnimal) => {
  if (animal) {
    const currentDate = new Date();
    const currentTime: number = currentDate.getTime();

    const lastTimeFed = new Date(animal.lastFed).getTime();
    const timeDifference: number = currentTime - lastTimeFed;
    const hoursDifference: number = timeDifference / 3600000;

    return hoursDifference;
  }
};
