import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

import {
  MidContainer,
  Title,
  SubTitle,
  LargeTitle,
  Explanation,
  MidPointLine,
  Button,
} from "@/entities";
import { HomeContainer } from "@/widget";
import { useDataStore, useModelsStore } from "@/shared";
import { createSnowflake } from "@/utils";

const TrainingPage = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const trainingModels = useModelsStore((state) => state.trainingModels);

  const resetOriginDatas = useDataStore((state) => state.resetOriginDatas);
  const setClientId = useDataStore((state) => state.setClientId);
  const setModelId = useDataStore((state) => state.setModelId);
  const setModel = useDataStore((state) => state.setModel);

  const model = useDataStore((state) => state.model) as Model.TrainingModel;

  const snowflacke = createSnowflake();

  useEffect(() => {
    if (!id && !trainingModels) return;

    const model = trainingModels.find((model) => model.id === id);
    if (!model) return;

    setClientId(snowflacke());
    setModelId(id!);
    setModel(model);
    resetOriginDatas(model, true);
  }, [trainingModels]);

  return (
    <>
      <HomeContainer>
        <MidContainer>
          <LargeTitle>{model?.name}</LargeTitle>
          <MidPointLine />
          <SubTitle>{model?.explanation}</SubTitle>
          <SubTitle>하단 버튼을 누르면 AI 개발에 기여할 수 있습니다.</SubTitle>
          <div style={{ height: "25px" }}></div>

          <Title>학습 진행도</Title>
          <SubTitle>여러분의 도움으로 이만큼 똑똑해지고 있어요!</SubTitle>
          <div style={{ height: "6px" }}></div>
          <ProgressBar
            percent={(model?.trainingStatus * 100) / model?.trainingsGoal}
            width={348}
            height={30}
            filledBackground="linear-gradient(to right, #f0a00088, #f0a000)"
          ></ProgressBar>

          <div style={{ height: "40px" }}></div>
          <img
            src="/img/character.png"
            style={{ width: "100px", marginBottom: "10px" }}
          />
          <Explanation>모든 학습 과정은 암호화를 통해서 이뤄지며,</Explanation>
          <Explanation>본 기기를 제외한 어떤 기기와 서버에서도</Explanation>
          <Explanation>
            입력하신 소중한 개인정보를 확인할 수 없습니다.
          </Explanation>
          <Button
            onClick={() => {
              navigation(`/additionalprivacy/${id}`);
            }}
          >
            AI 개발에 기여하기!
          </Button>
        </MidContainer>
      </HomeContainer>
    </>
  );
};

export default TrainingPage;
