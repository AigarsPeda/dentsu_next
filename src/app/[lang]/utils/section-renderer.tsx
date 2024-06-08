import ClientSections from "@/app/[lang]/components/ClientSections";
import Email from "@/app/[lang]/components/Email";
import Features from "@/app/[lang]/components/Features";
import Hero from "@/app/[lang]/components/Hero";
import InfoBlock from "@/app/[lang]/components/InfoBlock";
import InfoBlockWithImage from "@/app/[lang]/components/InfoBlockWithImage";
import LogosSection from "@/app/[lang]/components/LogosSection";
import MainHeroSection from "@/app/[lang]/components/MainHeroSection";
import Pricing from "@/app/[lang]/components/Pricing";
import Testimonials from "@/app/[lang]/components/Testimonials";

export function sectionRenderer(section: any, index: number) {
  // console.log("section ???????", section);
  switch (section.__component) {
    case "sections.hero-large-section":
      return <MainHeroSection key={index} data={section} />;
    case "sections.info-block":
      return <InfoBlock key={index} data={section} />;
    case "sections.info-block-with-image":
      return <InfoBlockWithImage key={index} data={section} />;
    case "sections.client-section":
      return <ClientSections key={index} data={section} />;
    case "sections.logos-section":
      return <LogosSection key={index} data={section} />;
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    default:
      return null;
  }
}
