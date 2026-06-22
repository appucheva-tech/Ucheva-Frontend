// // src/routes/PrivateRoutes.jsx
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// // ─── Selectors ────────────────────────────────────────────────────────────────
// const useUser = () => useSelector((state) => state.user.user);
// const useUserToken = () => useSelector((state) => state.user.token);

// const useStaffUser = () => useSelector((state) => state.staff.staffUser);
// const useStaffToken = () => useSelector((state) => state.staff.staffToken);

// const useParentUser = () => useSelector((state) => state.parent.parentUser);
// const useParentToken = () => useSelector((state) => state.parent.parentToken);

// // ─── Admin ────────────────────────────────────────────────────────────────────
// export const AdminRoute = () => {
//   const token = useUserToken();
//   const user = useUser();
//   if (!token) return <Navigate to="/login" replace />;
//   if (user?.role !== "admin") return <Navigate to="/notfound" replace />;
//   return <Outlet />;
// };

// // ─── Parent ───────────────────────────────────────────────────────────────────
// export const ParentRoute = () => {
//   const token = useParentToken();
//   const parent = useParentUser();
//   if (!token) return <Navigate to="/login" replace />;
//   if (!parent) return <Navigate to="/notfound" replace />;
//   return <Outlet />;
// };

// // ─── Class Teacher ────────────────────────────────────────────────────────────
// export const ClassTeacherRoute = () => {
//   const token = useStaffToken();
//   const staff = useStaffUser();
//   if (!token) return <Navigate to="/login" replace />;
//   if (staff?.role !== "classTeacher")
//     return <Navigate to="/notfound" replace />;
//   return <Outlet />;
// };

// // ─── Subject Teacher ──────────────────────────────────────────────────────────
// export const SubjectTeacherRoute = () => {
//   const token = useStaffToken();
//   const staff = useStaffUser();
//   if (!token) return <Navigate to="/login" replace />;
//   if (staff?.role !== "subjectTeacher")
//     return <Navigate to="/notfound" replace />;
//   return <Outlet />;
// };

// // ─── Bursary ──────────────────────────────────────────────────────────────────
// export const BursaryRoute = () => {
//   const token = useStaffToken();
//   const staff = useStaffUser();
//   if (!token) return <Navigate to="/login" replace />;
//   if (staff?.role !== "bursary") return <Navigate to="/notfound" replace />;
//   return <Outlet />;
// };

// // ─── Security ─────────────────────────────────────────────────────────────────
// export const SecurityRoute = () => {
//   const token = useStaffToken();
//   const staff = useStaffUser();
//   if (!token) return <Navigate to="/login" replace />;
//   if (staff?.role !== "security") return <Navigate to="/notfound" replace />;
//   return <Outlet />;
// };

// // ─── Shared Attendance ────────────────────────────────────────────────────────
// // classTeacher, subjectTeacher, bursary, security — NOT admin, NOT parent
// const ATTENDANCE_ROLES = [
//   "classTeacher",
//   "subjectTeacher",
//   "bursary",
//   "security",
// ];

// export const AttendanceRoute = () => {
//   const token = useStaffToken();
//   const staff = useStaffUser();
//   if (!token) return <Navigate to="/login" replace />;
//   if (!ATTENDANCE_ROLES.includes(staff?.role))
//     return <Navigate to="/notfound" replace />;
//   return <Outlet />;
// };
