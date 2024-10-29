import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  PAGE_URL,
  getUserInfo,
  useDataStore,
  useMainSocketStore,
  useDecSocketStore,
  MainSocketService,
  DecSocketService,
  MainRestService,
} from "@/shared";

const ControlRouter = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const modelId = useDataStore((state) => state.modelId);

  const encClientId = useDataStore((state) => state.encClientId);
  const label = useDataStore((state) => state.label);
  const setInferenceResult = useDataStore((state) => state.setInferenceResult);

  const { onOpen: mainSocketOn, sendInference } = MainSocketService();
  const { onOpen: decSocketOn, sendToken } = DecSocketService();
  const { getModels, postTraining } = MainRestService();

  const mainSocketMessages = useMainSocketStore((state) => state.messages);
  const decSocketMessages = useDecSocketStore((state) => state.messages);

  useEffect(() => {
    getModels();
    if (!getUserInfo()) navigate(PAGE_URL.Privacy);
  }, []);

  useEffect(() => {
    if (!modelId) return;

    mainSocketOn(modelId);
    decSocketOn(modelId);
  }, [modelId]);

  //Inference
  useEffect(() => {
    if (!encClientId) return;
    sendInference();
  }, [encClientId]);

  useEffect(() => {
    sendToken();
  }, [mainSocketMessages]);

  useEffect(() => {
    if (!decSocketMessages[0]) return;
    setInferenceResult(
      (decSocketMessages[0] as Socket.InferenceReceiveDto).result
    );
  }, [decSocketMessages]);

  //Training
  useEffect(() => {
    if (!label) return;
    postTraining();
  }, [label]);

  return <>{children}</>;
};

export default ControlRouter;
