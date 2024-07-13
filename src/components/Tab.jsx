const Tab = ({ children, active = false, onClick }) => {
  return (
    <button
      className={`py-2 px-4 rounded text-white transition-transform transform hover:scale-125 ${
        active ? "bg-blue-500" : "bg-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Tab;
