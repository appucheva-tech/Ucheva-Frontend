import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./notFound.css";

const getDashboardByRole = (user) => {
  if (!user) return "/login";
  if (user.role === "admin") return "/admin/dashboard";
  if (user.role === "parent") return "/parentdashboard";
  if (user.role === "staff") {
    switch (user.staffType?.trim().toLowerCase()) {
      case "class teacher": return "/CTdashboard";
      case "subject teacher": return "/subjectteacherdashboard";
      case "non-teaching staff": return "/bursary";
      case "security": return "/securitydashboard";
      default: return "/";
    }
  }
  return "/";
};

export default function NotFound() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const subdomain = parts.length > 2 ? parts.slice(0, parts.length - 2).join(".") : null;



  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token || state.staff.staffToken);

  const dashboardPath = token ? getDashboardByRole(user) : "/";

  return (
    <div className="notfound-page">
      <div className="stars"></div>
      <div className="stars stars-2"></div>
      <div className="stars stars-3"></div>
      <div className="portal"></div>

      <main className="content">
        <div className="badge">
          {subdomain ? `Invalid Workspace: ${subdomain}` : "Page Not Found"}
        </div>

        <h1 className="error-code">404</h1>

        <h2 className="title">
          {subdomain ? "This workspace doesn't exist" : "Oops, you're off the map"}
        </h2>

        <p className="subtitle">
          {subdomain ? (
            <>We couldn't find a configured workspace for <strong>{subdomain}</strong>.</>
          ) : (
            <>The page you're looking for may have been moved, deleted, or never existed.</>
          )}
        </p>

        <div className="actions">
          <Link to={dashboardPath} className="btn primary">
            {token ? "Go to Dashboard" : "Return Home"}
          </Link>
          <a href="mailto:ucheva@gmail.com" className="btn secondary">
            Contact Support
          </a>
        </div>

        <div className="status-card">
          <div>
            <span className="label">Detected Host</span>
            <span>{host}</span>
          </div>
          <div>
            <span className="label">Workspace</span>
            <span>{subdomain || "none"}</span>
          </div>
        </div>
      </main>
    </div>
  );
}