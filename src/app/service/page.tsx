import Breadcrumbs from "@/components/BreadCrumbs";
import DoorTrimsInfo from "@/components/DoorTrimsInfo";
import FrameInstallationInfo from "@/components/FrameInstallationInfo";
import ServiceDetails from "@/components/ServiceDetails";
import StandardDoorsInfo from "@/components/StandardDoorsInfo";
import { paths } from "../page";
import BreadCrumbs from "@/components/BreadCrumbs";


const ServicePage = () => {
  return (
    <div className="space-y-8 pt-8">
      <BreadCrumbs paths={paths} />
      <h1 className=" text-2xl md:text-3xl text-gray-700 font-bold mb-4 text-center">
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
