import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseDetails from "../components/CourseDetails";
import { getCourseDetails } from "../services/courses/api";
import { mapApiCourseDetailsToModel } from "../services/courses/mapper";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseDetails = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const response = await getCourseDetails(id);
      setCourseDetails(mapApiCourseDetailsToModel(response));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch course details"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!courseDetails) {
    return null;
  }

  return (
    <CourseDetails
      details={courseDetails}
      onBack={() => navigate("/courses")}
      onCourseFinished={fetchCourseDetails}
    />
  );
}
