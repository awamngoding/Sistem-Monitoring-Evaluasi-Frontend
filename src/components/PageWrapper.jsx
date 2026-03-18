/* eslint-disable react/prop-types */
export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {children}
    </div>
  );
}
