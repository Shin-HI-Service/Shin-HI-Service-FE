import { create } from "zustand";

export const useModelsStore = create<Model.Store>((set) => ({
  //State
  inferenceModels: [],
  trainingModels: [],

  //Set Function
  setInferenceModels: (models) => {
    set(() => ({ inferenceModels: models }));
  },
  setTrainingModels: (models) => {
    set(() => ({ trainingModels: models }));
  },
}));
