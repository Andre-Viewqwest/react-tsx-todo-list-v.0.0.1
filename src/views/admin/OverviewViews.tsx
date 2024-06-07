import Cards from "../../component/admin/overview/Cards";
import Chart from "../../component/admin/overview/Chart";

const OverviewViews: React.FC = () => {
  return (
    <>
      <div className="md:ml-[300px] px-8 pt-24 grid gap-4">
        <Cards />
        <Chart />
      </div>
    </>
  );
};

export default OverviewViews;
