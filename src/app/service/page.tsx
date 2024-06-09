import DoorTrimsInfo from "@/components/DoorTrimsInfo";
import ServiceDetails from "@/components/ServiceDetails";
import StandardDoorsInfo from "@/components/StandardDoorsInfo";


const ServicePage = () => {
  return (
    <div className="space-y-8">
      <ServiceDetails />
      <StandardDoorsInfo />
      <DoorTrimsInfo />
    </div>
  );
};

export default ServicePage;
