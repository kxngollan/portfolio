import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { server } from "../../../Server";

const Project = () => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${server}/get/project/${id}`, {
        method: "GET",
      });

      if (res.status === 404) {
        setError("Project not found");
      }

      if (!res.ok) {
        setError("Internal server error");
      }

      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return (
      <main>
        <h2>Loading..</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2>{error}</h2>
      </main>
    );
  }

  return <main></main>;
};

export default Project;
