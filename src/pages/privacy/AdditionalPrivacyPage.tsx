import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import { HomeContainer, SelectInput, InferenceResultModal } from "@/widget";

import {
  Title,
  SubTitle,
  Label,
  MidContainer,
  SmallInputContainer,
  Button,
  MidPointLine,
  Loading,
} from "@/entities";

import { EncRestService, useDataStore, useModelsStore } from "@/shared";

const AdditionalPrivacyPage = () => {
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [result, onResult] = useState(false);
  const [trainingDone, onTrainingDone] = useState(false);

  const [isInference, setIsInference] = useState(true);
  const [addtionalQuery, setAddtionalQuery] = useState<Model.Query[]>([]);

  const { postTrainingEnc, postInferenceEnc } = EncRestService();

  const inferenceModels = useModelsStore((state) => state.inferenceModels);

  const model = useDataStore((state) => state.model);
  const inferenceResult = useDataStore((state) => state.inferenceResult);
  const getQuery = useDataStore((state) => state.getQuery);
  const setOriginData = useDataStore((state) => state.setOriginData);
  const setInferenceResult = useDataStore((state) => state.setInferenceResult);
  const getOriginDatas = useDataStore((state) => state.getOriginDatas);

  useEffect(() => {
    if (!inferenceModels.find((model) => model.id === id))
      setIsInference(false);
    setAddtionalQuery(getQuery());
  }, [model]);

  useEffect(() => {
    setOriginData("LABEL", `${currentStep}`);
  }, [currentStep]);

  return (
    <>
      {result && model ? (
        inferenceResult ? (
          <InferenceResultModal
            onClose={() => {
              onResult(false);
              setInferenceResult(undefined);
            }}
            result={inferenceResult}
            name={model.explanation}
          />
        ) : (
          <Loading />
        )
      ) : null}

      {trainingDone && model ? (
        <InferenceResultModal
          onClose={() => {
            onTrainingDone(false);
          }}
          name={model.name}
        />
      ) : null}
      <HomeContainer>
        <MidContainer>
          <Title>
            {isInference ? "AI 서비스를 이용하기" : "AI 개발에 기여하기"} 위한
          </Title>
          <Title>정보를 추가로 입력해주세요!</Title>
          <div style={{ height: "5px" }}></div>
          <SubTitle>입력하신 정보는 모두 안전하게</SubTitle>
          <SubTitle>암호화되어 처리되니 안심하고 입력해도 됩니다.</SubTitle>
          <SmallInputContainer>
            {addtionalQuery.map((element) => (
              <SelectInput
                key={element.id}
                required
                label={element.label}
                options={element.options}
                onChange={(newValue) => {
                  if (newValue) setOriginData(element.id, newValue.value);
                }}
              ></SelectInput>
            ))}
          </SmallInputContainer>
          {isInference ? null : (
            <>
              <MidPointLine />
              <div style={{ height: "10px" }}></div>
              <Label>{(model as Model.TrainingModel).labelName}을(를)</Label>
              <Label>어느 정도로 선호하시나요?</Label>

              <div style={{ height: "12px" }}></div>
              <ProgressBar
                percent={currentStep * 25}
                width={320}
                filledBackground="linear-gradient(to right, #f0a00088, #f0a000)"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Step key={index}>
                    {({ accomplished }) => (
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          backgroundColor: accomplished
                            ? "#f0a000"
                            : "lightgray",
                        }}
                        onClick={() => setCurrentStep(index)}
                      />
                    )}
                  </Step>
                ))}
              </ProgressBar>
              <div style={{ height: "10px" }}></div>
              <SubTitle>
                선호하지 않아요 <span style={{ marginRight: "160px" }} />{" "}
                선호해요
              </SubTitle>
            </>
          )}
          <Button
            onClick={() => {
              if (!getOriginDatas()) return;

              if (isInference) {
                onResult(true);
                postInferenceEnc();
              } else {
                onTrainingDone(true);
                postTrainingEnc();
              }
            }}
          >
            {isInference ? "AI 결과 확인하기!" : "AI 개발에 기여하기!"}
          </Button>
        </MidContainer>
      </HomeContainer>
    </>
  );
};

export default AdditionalPrivacyPage;
