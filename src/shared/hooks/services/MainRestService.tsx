import { mainAPI } from "@/shared/configs/axios";

import { useDataStore, useModelsStore } from "@/shared";
import { AxiosResponse } from "axios";

export const MainRestService = () => {
  const data = useDataStore((state) => state.data);
  const label = useDataStore((state) => state.label);
  const modelId = useDataStore((state) => state.modelId);

  const setInferenceModels = useModelsStore(
    (state) => state.setInferenceModels
  );
  const setTrainingModels = useModelsStore((state) => state.setTrainingModels);

  const getModels = async () => {
    const {
      data: { inferenceModels, trainingModels },
    } = (await mainAPI.get(
      "/combined-models"
    )) as AxiosResponse<Model.getModelsResDto>;

    setInferenceModels(inferenceModels);
    setTrainingModels(trainingModels);
  };

  const postTraining = async () => {
    if (modelId)
      await mainAPI.post(`/training/${modelId}`, {
        data: data,
        label: label,
      });
  };

  return { getModels, postTraining };
};
