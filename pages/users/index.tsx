import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/types/types";
import { Badge, Box, Heading, VStack } from "@chakra-ui/react";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users").then(async (res) => setUsers(await res.json()));
  }, []);

  if (!users) return <>loading...</>;
  return (
    <VStack spacing={8}>
      {users.map((user: User) => (
        <Box
          key={user.id}
          border="1px solid #ccc"
          borderRadius={3}
          padding={4}
          width={300}
        >
          <Link href={`/users/${user.id}`}>
            <a>
              <Heading size="l">
                <Badge>{user.id}</Badge> {user.name}
              </Heading>
            </a>
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

export default Users;
