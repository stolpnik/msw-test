import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/types/types";
import { ListItem, UnorderedList } from "@chakra-ui/react";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users").then(async (res) => setUsers(await res.json()));
  }, []);

  if (!users) return <>loading...</>;
  return (
    <UnorderedList>
      {users.map((user: User) => (
        <ListItem key={user.id}>
          <Link href={`/users/${user.id}`}>
            <a>
              {user.id}/{user.name}
            </a>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default Users;
