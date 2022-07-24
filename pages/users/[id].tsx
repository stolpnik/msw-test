import { CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const getUser = async () => {
    try {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) setUser(await res.json());
      else throw await res.json();
    } catch (e) {
      console.log("e", e);
      router.push("/404");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (user === null)
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  return (
    <>
      <div>{user.id}</div>
      <div>{user.name}</div>
      <div>{user.description}</div>
    </>
  );
};

export default User;
