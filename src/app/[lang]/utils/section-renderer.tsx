import ClientSections from "@/app/[lang]/components/ClientSections";
import ContactUsSection from "@/app/[lang]/components/ContactUsSection";
import CustomerFeedback from "@/app/[lang]/components/CustomerFeedback";
import Email from "@/app/[lang]/components/Email";
import Hero from "@/app/[lang]/components/Hero";
import InfoBlock from "@/app/[lang]/components/InfoBlock";
import InfoBlockWithImage from "@/app/[lang]/components/InfoBlockWithImage";
import LargeInfoSection from "@/app/[lang]/components/LargeInfoSection";
import LogosSection from "@/app/[lang]/components/LogosSection";
import MainHeroSection from "@/app/[lang]/components/MainHeroSection";
import MediaCarousel from "@/app/[lang]/components/MediaCarousel";
import PageTitle from "@/app/[lang]/components/PageTitle";
import PostSection from "@/app/[lang]/components/PostSection";
import PostSectionWithImage from "@/app/[lang]/components/PostSectionWithImage";
import PostStatisticWithImage from "@/app/[lang]/components/PostStatisticWithImage";
import Services from "@/app/[lang]/components/Services";
import ServicesHeadlineWithImage from "@/app/[lang]/components/ServicesHeadlineWithImage";
import WorkHeadlineWithImage from "@/app/[lang]/components/WorkHeadlineWithImage";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.services":
      return <Services key={index} data={section} />;
    case "sections.info-block":
      return <InfoBlock key={index} data={section} />;
    case "sections.page-title":
      return <PageTitle key={index} data={section} />;
    case "sections.post-section":
      return <PostSection key={index} data={section} />;
    case "sections.logos-section":
      return <LogosSection key={index} data={section} />;
    case "sections.image-carousel":
      return <MediaCarousel key={index} data={section} />;
    case "sections.client-section":
      return <ClientSections key={index} data={section} />;
    case "sections.hero-large-section":
      return <MainHeroSection key={index} data={section} />;
    case "sections.large-info-section":
      return <LargeInfoSection key={index} data={section} />;
    case "sections.contact-us":
      return <ContactUsSection key={index} data={section} />;
    case "sections.customer-feedback":
      return <CustomerFeedback key={index} data={section} />;
    case "sections.info-block-with-image":
      return <InfoBlockWithImage key={index} data={section} />;
    case "sections.post-section-with-image":
      return <PostSectionWithImage key={index} data={section} />;
    case "sections.work-headline-with-image":
      return <WorkHeadlineWithImage key={index} data={section} />;
    case "sections.post-statistic-with-image":
      return <PostStatisticWithImage key={index} data={section} />;
    case "sections.services-headline-with-image":
      return <ServicesHeadlineWithImage key={index} data={section} />;
    default:
      console.error("Section not found", section);
      return null;
  }
}
