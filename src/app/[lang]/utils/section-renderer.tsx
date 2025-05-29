import ClientSections from "@/app/[lang]/components/ClientSections";
import ContactUsSection from "@/app/[lang]/components/ContactUsSection";
import Contacts from "@/app/[lang]/components/Contacts";
import CustomerFeedback from "@/app/[lang]/components/CustomerFeedback";
import Email from "@/app/[lang]/components/Email";
import FullWidthImage from "@/app/[lang]/components/FullWidthImage";
import Hero from "@/app/[lang]/components/Hero";
import InfoBlock from "@/app/[lang]/components/InfoBlock";
import InfoBlockWithImage from "@/app/[lang]/components/InfoBlockWithImage";
import LargeInfoSection from "@/app/[lang]/components/LargeInfoSection";
import LogosSection from "@/app/[lang]/components/LogosSection";
import MainHeroSection from "@/app/[lang]/components/MainHeroSection";
import MediaCarousel from "@/app/[lang]/components/MediaCarousel";
import NewsPostSection from "@/app/[lang]/components/NewsPostSection";
import NewsPostTitle from "@/app/[lang]/components/NewsPostTitle";
import PageTitle from "@/app/[lang]/components/PageTitle";
import PostImage from "@/app/[lang]/components/PostImage";
import PostSection from "@/app/[lang]/components/PostSection";
import PostSectionWithImage from "@/app/[lang]/components/PostSectionWithImage";
import PostStatisticWithImage from "@/app/[lang]/components/PostStatisticWithImage";
import PostTitle from "@/app/[lang]/components/PostTitle";
import RichTextPost from "@/app/[lang]/components/RichTextPost";
import Services from "@/app/[lang]/components/Services";
import ServicesHeadlineWithImage from "@/app/[lang]/components/ServicesHeadlineWithImage";
import SocialShare from "@/app/[lang]/components/SocialShare";
import Table from "@/app/[lang]/components/Table";
import Vacancies from "@/app/[lang]/components/Vacancies";
import VacanciesHeadline from "@/app/[lang]/components/VacanciesHeadline";
import VideoEmbed from "@/app/[lang]/components/VideoEmbed";
import WorkHeadlineWithImage from "@/app/[lang]/components/WorkHeadlineWithImage";
import PDFDisplay from "@/app/[lang]/components/PDFDisplay";
import { SignUpForm } from "../components/SignUpForm";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.table":
      return <Table key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.contacts":
      return <Contacts key={index} data={section} />;
    case "sections.services":
      return <Services key={index} data={section} />;
    case "sections.post-image":
      return <PostImage key={index} data={section} />;
    case "sections.info-block":
      return <InfoBlock key={index} data={section} />;
    case "sections.page-title":
      return <PageTitle key={index} data={section} />;
    case "sections.post-title":
      return <PostTitle key={index} data={section} />;
    case "sections.vacancies":
      return <Vacancies key={index} data={section} />;
    case "sections.pdf":
      return <PDFDisplay key={index} data={section} />;
    case "shared.video-embed":
      return <VideoEmbed key={index} data={section} />;
    case "sections.social-share":
      return <SocialShare key={index} data={section} />;
    case "sections.post-section":
      return <PostSection key={index} data={section} />;
    case "sections.logos-section":
      return <LogosSection key={index} data={section} />;
    case "sections.post":
      return <RichTextPost key={index} data={section} />;
    case "sections.news-post-title":
      return <NewsPostTitle key={index} data={section} />;
    case "sections.image-carousel":
      return <MediaCarousel key={index} data={section} />;
    case "sections.full-width-image":
      return <FullWidthImage key={index} data={section} />;
    case "sections.client-section":
      return <ClientSections key={index} data={section} />;
    case "sections.hero-large-section":
      return <MainHeroSection key={index} data={section} />;
    case "sections.news-post-section":
      return <NewsPostSection key={index} data={section} />;
    case "sections.large-info-section":
      return <LargeInfoSection key={index} data={section} />;
    case "sections.contact-us":
      return <ContactUsSection key={index} data={section} />;
    case "sections.customer-feedback":
      return <CustomerFeedback key={index} data={section} />;
    case "sections.vacancies-headline":
      return <VacanciesHeadline key={index} data={section} />;
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
    case "elements.sign-up-form":
      return <SignUpForm key={index} data={section} />;
    default:
      console.error("Section not found", section);
      return null;
  }
}
