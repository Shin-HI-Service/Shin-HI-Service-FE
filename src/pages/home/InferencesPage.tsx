import { Element } from "@/entities";
import { HomeContainer } from "@/widget";
import { useModelsStore } from "@/shared";

const InferencesPage = () => {
  const list = useModelsStore((state) => state.inferenceModels);

  return (
    <HomeContainer>
      {list.map((element) => (
        <Element
          key={element.id}
          title={element.name}
          subTitle={element.explanation}
          path={`/inference/${element.id}`}
        />
      ))}
    </HomeContainer>
  );
};

export default InferencesPage;
