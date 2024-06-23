import DoubleArrows from "./icons/DoubleArrows";

interface FeaturesType {
  id: number;
  name: string;
  company: string;
  feedback: string;
  position: string;
}

interface CustomerFeedbackProps {
  data: { feature: FeaturesType[] };
}

export default function CustomerFeedback({ data }: CustomerFeedbackProps) {
  return (
    <div className="container mx-auto mt-4 mb-10 md:mb-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-12 place-content-center">
        {data.feature.map((item) => {
          return (
            <div key={item.id} className="p-6 bg-gray-950 text-gray-50">
              <DoubleArrows className="w-12 h-12 mb-4" />
              <div className="w-full">
                <div className="mb-8 overflow-hidden md:h-60 md:custom-clamp-10">
                  <p title={item.feedback} className="text-base">
                    {item.feedback}
                  </p>
                </div>
                <div className="text-right">
                  <p title={item.name} className="text-base font-bold">
                    {item.name}
                  </p>
                  <p title={item.position} className="text-sm">
                    {item.position}
                  </p>
                  <p title={item.company} className="text-sm">
                    {item.company}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
