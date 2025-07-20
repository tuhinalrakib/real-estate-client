import { FaUserPlus, FaSearch, FaUserTie, FaHandshake, FaKey } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus size={30} className="text-white" />,
    title: "Sign Up",
  },
  {
    icon: <FaSearch size={30} className="text-white" />,
    title: "Search",
  },
  {
    icon: <FaUserTie size={30} className="text-white" />,
    title: "House Visit",
  },
  {
    icon: <FaHandshake size={30} className="text-white" />,
    title: "Contract Deal",
  },
  {
    icon: <FaKey size={30} className="text-white" />,
    title: "Key Hand Over",
  },
];

const HowItWorks = () => {
  return (
    <section className="my-16 px-4 py-12 text-center bg-green-50 rounded-lg">
      <h2 className="text-4xl font-bold text-gray-800 mb-12">How It Works</h2>
      <div className="flex flex-wrap justify-center items-start gap-8 md:gap-16">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-green-500 w-20 h-20 flex items-center justify-center rounded-full shadow-md">
              {step.icon}
            </div>
            <p className="mt-3 font-medium text-gray-800">{step.title}</p>
            {index !== steps.length - 1 && (
              <div className="w-16 h-2 border-t-2 border-dashed border-green-500 mt-4"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
