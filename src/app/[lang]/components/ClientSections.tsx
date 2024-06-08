interface MediaTypes {
  id: number;
  attributes: {
    url: string;
    width: number;
    height: number;
    caption: string | null;
    alternativeText: string | null;
  };
}

interface FeaturesType {
  id: number;
  newTab: boolean;
  media: MediaTypes;
  url: string | null;
}

interface ClientSectionsProps {
  data: { title: string; feature: FeaturesType[] };
}

export default function ClientSections({ data }: ClientSectionsProps) {
  console.log("ClientSections >>>>>>>>>>", data);
  return (
    <div className="container px-10 py-20 pb-20 mx-auto lg:px-60">
      <h2 className="pb-16 font-normal text-8xl">Client Sections</h2>
      <div className="max-w-4xl text-xl">
        <p className="pb-8">This is the Client Sections page.</p>
      </div>
    </div>
  );
}
