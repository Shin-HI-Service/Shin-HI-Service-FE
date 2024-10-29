declare namespace Model {
  export type Options = {
    label: string;
    value: string;
  }[];

  export interface Query {
    id: string;
    label: string;
    options: Options;
  }

  export interface Model {
    id: string;
    name: string;
    explanation: string;
    queries: Query[];
  }

  export interface TrainingModel extends Model {
    labelName: string;
    trainingsGoal: number;
    trainingStatus: number;
  }

  export type Datas = { id: string; value: string | undefined }[];

  export type DefaultDatas = [
    { id: "d-0"; value: string },
    { id: "d-1"; value: string },
    { id: "d-2"; value: string },
    { id: "d-3"; value: string },
    { id: "d-4"; value: string },
    { id: "d-5"; value: string },
    { id: "d-6"; value: string }
  ];

  //DTO
  export interface getModelsResDto {
    inferenceModels: Model[];
    trainingModels: TrainingModel[];
  }

  //Store
  export interface Store {
    //State
    inferenceModels: Model[];
    trainingModels: TrainingModel[];

    //Set Function
    setInferenceModels: (models: Model[]) => void;
    setTrainingModels: (models: TrainingModel[]) => void;
  }
}
