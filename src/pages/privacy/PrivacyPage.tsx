import { SingleValue } from "react-select";
import { useNavigate } from "react-router";

import {
  Background,
  Title,
  SubTitle,
  MidContainer,
  InputContainer,
  BottomLogo,
  FirstLoading,
  Button,
} from "@/entities";

import { SelectInput } from "@/widget";

import { defaultPrivacy, storeUserInfo, PAGE_URL } from "@/shared";
import { useRef } from "react";

const PrivacyPage = () => {
  const datas = useRef<Model.DefaultDatas>([
    { id: "d-0", value: "" },
    { id: "d-1", value: "" },
    { id: "d-2", value: "" },
    { id: "d-3", value: "" },
    { id: "d-4", value: "" },
    { id: "d-5", value: "" },
    { id: "d-6", value: "" },
  ]);

  const navigate = useNavigate();

  return (
    <>
      <FirstLoading />
      <Background color="#FCAF16" />
      <MidContainer>
        <Title>서비스를 이용하기 위한</Title>
        <Title>개인 정보를 입력해주세요!</Title>
        <div style={{ height: "5px" }}></div>
        <SubTitle>입력하신 정보는 사용 중이신 기기에만</SubTitle>
        <SubTitle>저장되니 안심하고 입력해도 됩니다.</SubTitle>
        <InputContainer>
          {defaultPrivacy.map((privacy) => (
            <SelectInput
              key={privacy.id}
              required
              label={privacy.label}
              options={privacy.options}
              onChange={(
                newValue: SingleValue<{ label: string; value: string }>
              ) => {
                if (newValue)
                  datas.current.find((data) => data.id === privacy.id)!.value =
                    newValue.value;
              }}
            ></SelectInput>
          ))}
        </InputContainer>
        <Button
          onClick={() => {
            if (!datas.current.find((data) => data.value === "")) {
              storeUserInfo(datas.current);
              navigate(PAGE_URL.Inferences);
            }
          }}
        >
          입력 완료
        </Button>
        <div style={{ height: "40px" }}></div>
      </MidContainer>
      <BottomLogo />
    </>
  );
};

export default PrivacyPage;
