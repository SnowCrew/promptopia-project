"use client";

import { PromptFromDB } from "@/components/Feed";
import Profile from "@/components/Profile";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const [userPosts, setUserPosts] = useState<PromptFromDB[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  useEffect(() => {
    if (userName === null) {
      router.push("/");
    }
  }, [router, userName]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <Profile
      name={userName!}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
