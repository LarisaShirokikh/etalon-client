import Breadcrumbs from "@/components/BreadCrumbs";
import DoorTrimsInfo from "@/components/DoorTrimsInfo";
import FrameInstallationInfo from "@/components/FrameInstallationInfo";
import ServiceDetails from "@/components/ServiceDetails";
import StandardDoorsInfo from "@/components/StandardDoorsInfo";


const ServicePage = () => {
  return (
    <div className="space-y-8">
       <h1 className="mt-12 text-2xl md:text-3xl text-gray-700 font-bold mb-4 text-center">
        Сервисная служба компании Двери Эталон
      </h1>
      <p className="text-center text-gray-700 mb-6">
        Вы можете доверять нам, мы отлично делаем свою работу!
      </p>
      <ServiceDetails />

      <StandardDoorsInfo />

      <DoorTrimsInfo />
      <FrameInstallationInfo />
    </div>
  );
};

export default ServicePage;
