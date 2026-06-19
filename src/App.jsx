import { useState } from "react";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    institute: "",
    course: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const logo = "https://gst-seekhlo.s3.ap-southeast-2.amazonaws.com/Logo/GST+Seekhlo+White+logo.png"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      });

      setMsg("✅ Form submitted successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        institute: "",
        course: "",
        address: "",
      });

    } catch (err) {
      console.log(err);
      setMsg("❌ Submission failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-[768px]  rounded-[20px] overflow-hidden bg-white shadow-2xl rounded-2xl ">
        <div className="bg-blue-600 p-4"> <img src={logo} alt="logo" className="w-[30%] object-contain mx-auto" /></div>

        <h1 className="md:text-3xl text-lg font-bold text-center text-gray-800 italic pt-2">
          Student Registration
        </h1>
        <p className="text-center md:text-[16px] text-xs text-gray-500 pt-2 ">
          Fill your details carefully
        </p>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required

            />

            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"

            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required

            />

            <input
              name="institute"
              placeholder="Institute Name"
              value={form.institute}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              name="course"
              placeholder="Course Name"
              value={form.course}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {loading ? "Submitting..." : "Submit Form"}
            </button>
          </form>


          {msg && (
            <p className="text-center mt-4 text-sm font-medium text-green-600">
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}