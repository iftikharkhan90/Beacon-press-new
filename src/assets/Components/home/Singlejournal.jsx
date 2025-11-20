import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../common/config";
import AcademicJournalNav from "../../Journals/JournalNavbar";


const SingleJournalPage = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${config.BASE_API_URL}/journals//${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setJournal(res.data.journal))
      .catch((err) => console.log(err));
  }, [id]);

  if (!journal) return <p>Loading...</p>;

  return (
    <>
    <div className="p-10">
      <h1 className="text-3xl font-bold">{journal.title}</h1>
      <img src={journal.image} className="w-full h-96 object-cover my-4" />
      <p>{journal.description}</p>
    </div>
    <AcademicJournalNav/>
    </>
  );
};

export default SingleJournalPage;
