const TabButton = ({ label, isActive, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
          isActive ? "bg-[#E07A5F] text-blue-600" : "hover:bg-[#E07A5F] hover:text-blue-600"
        }`}
      >
        {label}
      </button>
    );
  };
  
  export default TabButton;
  