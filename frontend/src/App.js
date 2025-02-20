import axios from "axios";
import { useState } from "react";
import * as XLSX from "xlsx";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

function App() {
  const [msg, setmsg] = useState("");
  const [status, setstatus] = useState(false);
  const [emailList, setEmailList] = useState([]);

  function handlemsg(evt) {
    setmsg(evt.target.value);
  }

  function handlefile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: "A" });
      const totalemail = emailList.map((item) => item.A);
      setEmailList(totalemail);
    };
    reader.readAsBinaryString(file);
  }

  function send() {
    setstatus(true);
    axios
      .post("http://localhost:5000/sendemail", { msg, emailList })
      .then((data) => {
        alert(data.data === true ? "Email Sent Successfully" : "Failed");
        setstatus(false);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-purple-700 text-white text-center py-5">
        <h1 className="text-3xl font-bold">AlfinAkash BulkMail</h1>
      </header>

      <section className="bg-purple-600 text-white text-center py-4 px-5">
        <h2 className="text-xl font-medium">
          We can help your business with sending multiple emails at once
        </h2>
      </section>

      <div className="flex-grow bg-purple-400 flex flex-col items-center p-6 text-black">
        <textarea
          onChange={handlemsg}
          value={msg}
          className="w-full max-w-2xl h-32 py-2 px-2 outline-none border border-black rounded-md"
          placeholder="Enter the email text..."
        ></textarea>

        <input
          type="file"
          onChange={handlefile}
          className="border-4 border-dashed py-4 px-4 mt-5 mb-5 w-full max-w-md text-center"
        />

        <p className="mb-4">Total Emails in the file: {emailList.length}</p>

        <button
          onClick={send}
          className="mt-2 bg-purple-700 py-2 px-4 text-white font-medium rounded-md"
        >
          {status ? "Sending..." : "Send"}
        </button>
      </div>

      <footer className="bg-purple-700 text-white text-center py-4 mt-auto">
        <div className="flex justify-center gap-4 text-xl">
          <a href="https://www.instagram.com/a.alfinakash" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com/AlfinAkash" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/AlfinAkash" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/AlfinAkash" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://alfinakash.vercel.app" target="_blank" rel="noopener noreferrer">
            <FaGlobe />
          </a>
        </div>
        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} AlfinAkash. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
