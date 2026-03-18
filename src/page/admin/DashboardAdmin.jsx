import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Input from "../../components/Input";
import Label from "../../components/Label";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [sekolahList, setSekolahList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSekolah, setSelectedSekolah] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchSekolah();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      // filter hanya role Guru (akun sekolah)
      setUsers(data.filter((u) => u.role?.nama_role === "Guru"));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSekolah = async () => {
    try {
      const res = await fetch("http://localhost:3000/sekolah");
      const data = await res.json();
      setSekolahList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!selectedSekolah) return toast.error("Pilih sekolah!");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          email,
          password,
          id_sekolah: Number(selectedSekolah),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal membuat akun");

      toast.success("Akun sekolah berhasil dibuat!");
      setNama("");
      setEmail("");
      setPassword("");
      setSelectedSekolah("");
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus akun ini?")) return;
    try {
      await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
      toast.success("Akun berhasil dihapus!");
      fetchUsers();
    } catch (err) {
      toast.error("Gagal menghapus akun");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">
          Manajemen Akun Sekolah
        </h1>

        <div className="flex flex-col gap-4">
          {/* TOMBOL TAMBAH */}
          <div className="flex justify-end">
            <Button
              text={showForm ? "Batal" : "+ Tambah Akun Sekolah"}
              onClick={() => setShowForm(!showForm)}
            />
          </div>

          {/* FORM TAMBAH */}
          {showForm && (
            <Card className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-[#2E5AA7] mb-4">
                Buat Akun Sekolah
              </h2>
              <form onSubmit={handleCreate} className="grid grid-cols-2 gap-4">
                <div>
                  <Label text="Nama" required />
                  <Input
                    placeholder="Nama akun sekolah"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div>
                  <Label text="Email" required />
                  <Input
                    placeholder="Email sekolah"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label text="Password" required />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label text="Sekolah" required />
                  <select
                    value={selectedSekolah}
                    onChange={(e) => setSelectedSekolah(e.target.value)}
                    className="w-full border px-4 py-2 rounded-lg bg-white"
                    required
                  >
                    <option value="">Pilih sekolah</option>
                    {sekolahList.map((s) => (
                      <option key={s.id_sekolah} value={s.id_sekolah}>
                        {s.nama_sekolah}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button text={loading ? "Menyimpan..." : "Simpan"} />
                </div>
              </form>
            </Card>
          )}

          {/* TABLE */}
          <Card className="bg-white rounded-xl shadow-md p-4">
            <Table
              columns={[
                {
                  header: "No",
                  align: "text-center",
                  render: (row, idx) => idx + 1,
                },
                { header: "Nama", accessor: "nama" },
                { header: "Email", accessor: "email" },
                {
                  header: "Sekolah",
                  render: (row) =>
                    sekolahList.find((s) => s.id_sekolah === row.id_sekolah)
                      ?.nama_sekolah ?? "-",
                },
                {
                  header: "Aksi",
                  align: "text-center",
                  render: (row) => (
                    <Button
                      icon={<Trash2 size={16} />}
                      variant="ghost"
                      className="text-red-500 hover:bg-transparent shadow-none"
                      onClick={() => handleDelete(row.id_user)}
                    />
                  ),
                },
              ]}
              data={users}
            />
          </Card>
        </div>
      </main>
    </div>
  );
}

export default DashboardAdmin;
