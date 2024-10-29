import { Element } from "@/entities";
import { HomeContainer } from "@/widget";
import { useModelsStore } from "@/shared";

const TrainingsPage = () => {
  const list = useModelsStore((state) => state.trainingModels);

  return (
    <HomeContainer>
      {list.map((element) => (
        <Element
          key={element.id}
          title={element.name}
          subTitle={element.explanation}
          path={`/training/${element.id}`}
        />
      ))}
    </HomeContainer>
  );
};

export default TrainingsPage;
