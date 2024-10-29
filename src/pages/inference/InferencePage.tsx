import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

import {
  MidContainer,
  SubTitle,
  LargeTitle,
  Explanation,
  MidPointLine,
  Button,
} from "@/entities";
import { HomeContainer } from "@/widget";
import { useDataStore, useModelsStore } from "@/shared";
import { createSnowflake } from "@/utils";

const InferencePage = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const inferenceModels = useModelsStore((state) => state.inferenceModels);

  const resetOriginDatas = useDataStore((state) => state.resetOriginDatas);
  const setClientId = useDataStore((state) => state.setClientId);
  const setModelId = useDataStore((state) => state.setModelId);
  const setModel = useDataStore((state) => state.setModel);

  const model = useDataStore((state) => state.model);

  const snowflacke = createSnowflake();

  useEffect(() => {
    if (!id && !inferenceModels) return;

    const model = inferenceModels.find((model) => model.id === id);
    if (!model) return;

    setClientId(snowflacke());
    setModelId(id!);
    setModel(model);
    resetOriginDatas(model);
  }, [inferenceModels]);

  return (
    <>
      <HomeContainer>
        <MidContainer>
          <div style={{ height: "20px" }}></div>
          <LargeTitle>{model?.name}</LargeTitle>
          <MidPointLine />
          <SubTitle>{model?.explanation}</SubTitle>
          <SubTitle>하단 버튼을 누르면 입력하신 정보를 기반으로</SubTitle>
          <SubTitle>AI 추천 결과를 확인할 수 있습니다.</SubTitle>
          <div style={{ height: "60px" }}></div>
          <img
            src="/img/character.png"
            style={{ width: "120px", marginBottom: "10px" }}
          />
          <Explanation>
            모든 서비스 과정은 암호화를 통해서 이뤄지며,
          </Explanation>
          <Explanation>본 기기를 제외한 어떤 기기와 서버에서도</Explanation>
          <Explanation>
            입력하신 소중한 개인정보를 확인할 수 없습니다.
          </Explanation>
          <Button
            onClick={() => {
              navigation(`/additionalprivacy/${id}`);
            }}
          >
            AI 결과 확인하러 가기!
          </Button>
        </MidContainer>
      </HomeContainer>
    </>
  );
};

export default InferencePage;
