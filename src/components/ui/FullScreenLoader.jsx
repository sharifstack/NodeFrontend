import Spinner from "./Spinner";

const FullScreenLoader = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center">
      <Spinner size={60} />
    </div>
  );
};

export default FullScreenLoader;
