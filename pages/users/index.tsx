import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/types/types";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users").then(async (res) => setUsers(await res.json()));
  }, []);

  if (!users) return <>loading...</>;
  return (
    <>
      {users.map((user: User) => (
        <div key={user.id}>
          <Link href={`/users/${user.id}`}>
            <a>
              {user.id}/{user.name}
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Users;
