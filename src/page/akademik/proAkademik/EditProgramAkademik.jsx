import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";

function EditProgramAkademik() {
  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">
          Edit Program Akademik
        </h1>
        <Card className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center h-64">
          <p className="text-gray-400 italic">
            Halaman ini sedang dalam pengembangan...
          </p>
        </Card>
      </main>
    </div>
  );
}
export default EditProgramAkademik;
