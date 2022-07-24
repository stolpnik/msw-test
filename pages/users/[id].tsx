import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>(null);

  const { id } = useRouter().query;
  console.log(id);

  useEffect(() => {
    fetch(`/api/users/${id}`).then(async (res) => {
      setUser(await res.json());
    });
  }, []);

  if (user === null) return <></>;
  return (
    <>
      <div>{user.id}</div>
      <div>{user.name}</div>
      <div>{user.description}</div>
    </>
  );
};

export default User;
