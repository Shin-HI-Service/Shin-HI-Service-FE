declare namespace Rest {
  export interface TrainingReqDto {
    data: string;
    label: string;
  }

  export interface TrainingEncResDto {
    datas: string;
    labels: string;
  }

  export interface InferenceEncResDto {
    ids: string;
    datas: string;
  }
}
