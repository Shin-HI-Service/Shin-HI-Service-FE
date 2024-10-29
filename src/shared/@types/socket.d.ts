declare namespace Socket {
  //DTO
  export interface IdSendDto {
    mode: "ID";
    id: string;
  }

  export interface InferenceSendDto {
    mode: "INFERENCE";
    id: string;
    data: string;
  }

  export interface TokenDto {
    mode: "TOKEN";
    token: string;
  }

  export interface InferenceReceiveDto {
    mode: "RESULT";
    result: string;
  }

  export type MainServerMessageDto =
    | Socket.IdSendDto
    | Socket.InferenceSendDto
    | Socket.TokenDto;

  export type DecServerMessageDto =
    | Socket.IdSendDto
    | Socket.InferenceReceiveDto
    | Socket.TokenDto;

  //Store
  export interface DataStore {
    //State
    modelId: string | undefined;
    model: Model.Model | Model.TrainingModel | undefined;
    clientId: string | undefined; //메인 서버로 부터 할당 받은 자기의 식별자
    encClientId: string | undefined; //암호화 서버로부터 받은 자기의 암호화 식별자
    originDatas: Model.Datas; //유저가 입력한 개인 정보
    data: string | undefined; //암호화 서버로부터 받은 자기의 암호화 이진 데이터
    label: string | undefined; //암호화 서버로부터 받은 자기의 암호화 이진 데이터 (Training 시 라벨)
    token: string | undefined; //복호화 서버로부터 받은 임의 암호화 이진 데이터
    inferenceResult: string | undefined; //AI 추론 결과 값

    //Set Function
    setModelId: (id: string) => void;
    setModel: (model: Model.Model | Model.TrainingModel) => void;
    getQuery: () => Model.Query[];
    setClientId: (id: string) => void;
    setEncClientId: (id: string) => void;
    resetOriginDatas: (
      model: Model.Model | Model.TrainingModel,
      isTraining?: boolean
    ) => void;
    setOriginData: (id: string, value: string) => void;
    getOriginDatas: () => Model.Datas | null;
    setData: (data: string) => void;
    setLabel: (label: string) => void;
    setToken: (data: string) => void;
    setInferenceResult: (result: string | undefined) => void;
  }

  export interface SocketStore<M> {
    //State
    socket: WebSocket | undefined;
    messages: M[];

    //Set Function
    setSocket: (socket: WebSocket) => void;
    addMessage: (message: M) => void;
  }
}
