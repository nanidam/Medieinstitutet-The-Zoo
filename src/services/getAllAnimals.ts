import axios, { AxiosError } from "axios";

export const getAllAnimals = async () => {
  try {
    const response = await axios.get(
      "https://animals.azurewebsites.net/api/animals"
    );
    const animals = response.data;
    console.log("frudd");

    return animals;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      console.error("Animals not found:", axiosError.response.config.url);
      return [];
    }
    throw axiosError;
  }
};
