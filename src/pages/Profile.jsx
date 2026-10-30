import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch(
          "http://localhost:3000/profile",
          {
            credentials: "include"
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to fetch profile");
        }

        setProfile(data);

      } catch (error) {
        setProfile({ error: error.message });
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, []);

  async function handleLogout() {
    try {
      const response = await fetch(
        "http://localhost:3000/logout",
        {
          method: "POST",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) return <h2>Loading profile...</h2>;

  if (profile?.error) {
    return <h2>{profile.error}</h2>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;