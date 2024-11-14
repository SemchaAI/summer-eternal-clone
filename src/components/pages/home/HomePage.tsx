import {
  MainHeader,
  BrandNewSection,
  SubscriptionSection,
  VideoSection,
  ManifestoSection,
  SupportSection,
  ReadMoreSection,
  CollectiveSection,
  ChartSection,
  FooterSection,
} from '@/components/widgets';

export const HomePage = () => {
  return (
    <>
      <MainHeader />
      <VideoSection />
      <BrandNewSection />
      <SubscriptionSection />
      <ManifestoSection />
      <SupportSection />
      <ReadMoreSection />
      <CollectiveSection />
      <ChartSection />
      {/* <PieChart
        size={416}
        data={[5, 15, 25, 55]} // Данные
        colors={['#E9E9E9', '#ABABAB', '#5E5E5E', '#171717']} // Цвета сегментов
        images={[
          {
            src: '/images/charts/member.webp',
            alt: 'creatives',
            translate: -0.3,
            text: 'some text',
          },
          {
            src: '/images/charts/moneylenders.webp',
            alt: 'moneylenders',
            translate: [-0.5, 0],
            text: 'some text2',
          },
          {
            src: '/images/charts/selfManagment.webp',
            alt: 'selfManagment',
            translate: [0.63, -0],
            text: 'some text3',
          },
          {
            src: '/images/charts/creatives.webp',
            alt: 'creatives',
            translate: [-0.3, 0],
            text: 'some text4',
          },
        ]} // Изображения  
      />*/}
      <FooterSection />
    </>
  );
};
