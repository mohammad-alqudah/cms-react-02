import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
// import type {
//   CourseDetails as CourseDetailsType,
//   CourseStudent,
// } from "../types/course";
import { finishCourse, getCourseStudents } from "../services/courses/api";
import Card from "./ui/Card";
import CourseStudentsTable from "./course/CourseStudentsTable";
// import { confirmAlert } from "react-confirm-alert";
// import { mapApiCourseToModel } from "../services/courses";

interface CourseDetailsProps {
  details: any;
  onBack: () => void;
  onCourseFinished?: () => void;
}

export default function CourseDetails({
  details,
  onBack,
  onCourseFinished,
}: CourseDetailsProps) {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const permission = JSON.parse(localStorage.getItem("permission") || "");

  useEffect(() => {
    async function fetchStudents() {
      try {
        setIsLoading(true);
        const response = await getCourseStudents(details.id);
        console.log("response", response);
        setStudents(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch students"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
  }, [details.id]);

  const handleFinishCourse = async () => {
    try {
      setIsFinishing(true);
      await finishCourse(details.id);
      setShowConfirmDialog(false);
      onCourseFinished?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to finish course");
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#67B37D] hover:text-[#67B37D]/80 transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
          <span>العودة إلى قائمة الدورات</span>
        </button>

        {permission.permission.__04__all_tajweed_data_access &&
        details.finished_at == null ? (
          <button
            onClick={() => setShowConfirmDialog(true)}
            disabled={isFinishing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFinishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "إنهاء الدورة"
            )}
          </button>
        ) : (
          ""
        )}
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowConfirmDialog(false)}
            />

            <div className="relative transform overflow-hidden rounded-lg bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-right">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                      تأكيد إنهاء الدورة
                    </h3>
                    <div className="mt-2">
                      <p className="text-base text-gray-600">
                        هل أنت متأكد من رغبتك في إنهاء الدورة؟ لا يمكن التراجع
                        عن هذا الإجراء.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                <button
                  type="button"
                  onClick={handleFinishCourse}
                  disabled={isFinishing}
                  className="inline-flex w-full justify-center rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFinishing ? (
                    <Loader2 className="h-4 w-4 animate-spin ml-2" />
                  ) : null}
                  تأكيد الإنهاء
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmDialog(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">{details.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500">المدرب</p>
              <p className="font-medium">{details.instructor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">تكلفة المدرب</p>
              <p className="font-medium">{details.instructorCost} دينار</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">رسوم الدورة</p>
              <p className="font-medium">{details.price} دينار</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">تاريخ البداية</p>
              <p className="font-medium">{details.startDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600">عدد الطلاب</p>
              <p className="text-2xl font-bold">{details.studentCount}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600">عدد الحصص</p>
              <p className="text-2xl font-bold">{details.sessionsCount}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600">نسبة الحضور</p>
              <p className="text-2xl font-bold">{details.attendanceRate}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600">المبلغ المحصل</p>
              <p className="text-2xl font-bold">
                {details.collectedAmount} دينار
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-gray-600">المبلغ المتوقع</p>
              <p className="text-2xl font-bold">
                {details.expectedAmount} دينار
              </p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-gray-600">نسبة التحصيل</p>
              <p className="text-2xl font-bold">{details.paymentRate}%</p>
            </div>
          </div>
        </div>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">جاري تحميل بيانات الطلاب...</div>
      ) : (
        <CourseStudentsTable students={students} />
      )}
    </div>
  );
}
