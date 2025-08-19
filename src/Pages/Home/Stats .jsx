import CountUp from "react-countup";

const statsData = [
  { number: 5635, label: "HOUSES FOR SALE" },
  { number: 324, label: "OPEN HOUSES" },
  { number: 105, label: "HOUSES RECENTLY SOLD" },
  { number: 301, label: "PRICE REDUCED" },
];

const Stats = () => {
  return (
    <section className="my-16 ">
      <div className="bg-gray-100 rounded-xl py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center shadow-sm">
        {statsData.map((stat, index) => (
          <div key={index} className="py-4">
            <h2 className="text-green-500 text-4xl font-bold">
              <CountUp end={stat.number} duration={4.5} separator="," />
            </h2>
            <p className="mt-2 text-sm text-gray-600 uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
