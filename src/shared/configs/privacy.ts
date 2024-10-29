export const defaultPrivacy: Model.Query[] = [
  {
    id: "d-0",
    label: "나이",
    options: [
      { label: "20대 이하", value: "0" },
      { label: "30대", value: "1" },
      { label: "40대", value: "2" },
      { label: "50대", value: "3" },
      { label: "60대", value: "4" },
      { label: "70대", value: "5" },
      { label: "80대 이상", value: "6" },
    ],
  },
  {
    id: "d-1",
    label: "소득 분위",
    options: [
      { label: "1분위", value: "0" },
      { label: "2분위", value: "1" },
      { label: "3분위", value: "2" },
      { label: "4분위", value: "3" },
      { label: "5분위", value: "4" },
      { label: "6분위", value: "5" },
      { label: "7분위", value: "6" },
      { label: "8분위", value: "7" },
      { label: "9분위", value: "8" },
      { label: "10분위", value: "9" },
    ],
  },
  {
    id: "d-2",
    label: "BMI",
    options: [
      { label: "16.0 ~ 18.4", value: "17.25" },
      { label: "18.5 ~ 23.9", value: "21.25" },
      { label: "24.0 ~ 29.9", value: "27" },
      { label: "30.0 ~ 34.9", value: "32.5" },
      { label: "35.0 ~ 39.9", value: "37.5" },
      { label: "40.0 이상", value: "42.5" },
    ],
  },
  {
    id: "d-3",
    label: "흡연 여부",
    options: [
      { label: "비흡연자", value: "1" },
      { label: "흡연자", value: "0" },
    ],
  },
  {
    id: "d-4",
    label: "혈압 (수축기)",
    options: [
      { label: "120mmHg 미만", value: "115" },
      { label: "120mmHg ~ 129mmHg", value: "125" },
      { label: "130mmHg ~ 139mmHg", value: "135" },
      { label: "140mmHg ~ 159mmHg", value: "155" },
      { label: "160mmHg 이상", value: "160" },
    ],
  },
  {
    id: "d-5",
    label: "혈압 (이완기)",
    options: [
      { label: "80mmHg 미만", value: "75" },
      { label: "80mmHg ~ 84mmHg", value: "82.5" },
      { label: "85mmHg ~ 89mmHg", value: "87.5" },
      { label: "90mmHg ~ 99mmHg", value: "97.5" },
      { label: "100mmHg 이상", value: "100" },
    ],
  },
  {
    id: "d-6",
    label: "혈당",
    options: [
      { label: "99mg/dl 이하", value: "99" },
      { label: "100mmHg ~ 125mmHg", value: "112.5" },
      { label: "126mmHg 이상", value: "126" },
    ],
  },
  {
    id: "d-7",
    label: "가족 구성원",
    options: [
      { label: "부부 (1세대)", value: "0" },
      { label: "부부+자녀 (2세대)", value: "1" },
      { label: "부부+부모 (2세대)", value: "2" },
      { label: "한부모+자녀 (2세대)", value: "3" },
      { label: "부부+부모+자녀 (3세대)", value: "4" },
      { label: "4세대 이상", value: "5" },
    ],
  },
];
