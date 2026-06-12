import { useState } from "react";
import "./AuthStyles/Login.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setUser, setToken } from "../../global/userSlice";
import { useDispatch } from "react-redux";
import { ApiClient } from "../../config/AxiosInstance";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const subdomain = window.location.hostname.split(".")[0];
      const response = await ApiClient.post("/admin/login", formData, {
        headers: {
          "x-tenant": subdomain,
        },
      });

      dispatch(setToken(response?.data?.token));
      dispatch(setUser(response?.data?.data));

      toast.success(response?.data?.message);
      nav("/step1");
      const user = response?.data?.data;

      ADMIN;
      if (user?.role === "admin") {
        nav("/AdminDashboard");
      }

      // PARENT
      else if (user?.role === "parent") {
        nav("/parent");
      }

      // STAFF (handled by backend staffType)
      else if (user?.role === "staff") {
        switch (user?.staffType) {
          case "classTeacher":
            nav("/CTdashboard");
            break;

          case "subjectTeacher":
            nav("/subjectteacherdashboard");
            break;

          case "security":
            nav("/securitydashboard");
            break;

          case "bursary":
            nav("/bursary");
            break;

          default:
            nav("/staff");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login_container geist-content">
      <article className="login_holder">
        {/* LEFT SIDE */}
        <aside className="login_left">
          <img
            src="https://i.postimg.cc/MHwcxd83/Rectangle-2.png"
            alt="signup img"
          />

          <div className="Login-logoholder">
            <img src="https://i.postimg.cc/PJgRQh50/logo.png" alt="" />
          </div>

          <div className="login_text">
            <h1>Welcome Back!</h1>
            <p>
              Log in to access your school workspace and continue where you left
              off.
            </p>
          </div>
        </aside>

        {/* RIGHT SIDE */}
        <aside className="login_right">
          <h2>Log In</h2>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="login_form">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className={`login_input ${errors.email ? "error-input" : ""}`}
                placeholder="e.g: example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            {/* PASSWORD */}
            <div className="login_form">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`login_input password-input ${errors.password ? "error-input" : ""}`}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
            </div>

            {/* ROLE SELECTION */}
            <div className="login_radio_forget">
              <div className="login_raidobox">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                  />
                  Admin
                </label>

                <label>
                  <input
                    type="radio"
                    name="role"
                    value="parent"
                    checked={formData.role === "parent"}
                    onChange={handleChange}
                  />
                  Parent
                </label>

                <label>
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={formData.role === "staff"}
                    onChange={handleChange}
                  />
                  Staff
                </label>
              </div>

              <label className="forget" onClick={() => nav("/forgetPassword")}>
                Forget Password?
              </label>
            </div>

            {/* BUTTON */}
            <div className="loginBtn">
              <button type="submit" className="login_btn">
                {loading ? "Logging in..." : "Log In"}
              </button>

              <label className="Account">
                Don't have an account?
                <span onClick={() => nav("/signup")}>Create Account</span>
              </label>
            </div>
          </form>
        </aside>
      </article>
    </section>
  );
};

export default Login;
