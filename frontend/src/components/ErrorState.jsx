const ErrorState = ({ message = "Something went wrong!", details }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-86 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-6">
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
        />
      </svg>

      {/* Message */}
      <h3 className="text-gray-700 text-lg font-semibold">{message}</h3>

      {/* Details (optional server error / hint) */}
      {details && (
        <p className="text-gray-500 text-sm mt-1 text-center">{details}</p>
      )}
    </div>
  );
};

export default ErrorState;
