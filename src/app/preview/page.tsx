"use client";
import { useAuth } from "../context/AuthContext";
import ProfilePreview from "../components/ProfilePreview";

const PreviewPage: React.FC = () => {
  const { user, links } = useAuth();

  return <ProfilePreview user={user} links={links} />;
};

export default PreviewPage;
