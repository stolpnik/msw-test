import {
  Badge,
  Box,
  CircularProgress,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
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

  const getUser = async (id) => {
    if (!id || typeof id !== "string") return;
    try {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) setUser(await res.json());
      else throw await res.json();
    } catch (e) {
      router.replace("/404");
    }
  };

  useEffect(() => {
    getUser(id);
  }, [id]);

  if (user === null)
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  return (
    <Box maxWidth={800}>
      <HStack borderRadius={5} border="1px solid #ccc" spacing={8} padding={4}>
        <Badge>{user.id}</Badge>
        <Heading size="xl">{user.name}</Heading>
        <div>{user.description}</div>
      </HStack>
      <Box marginTop={2}>
        <ArrowBackIcon></ArrowBackIcon>
        <Link href="/users">
          <a>もどる</a>
        </Link>
      </Box>
    </Box>
  );
};

export default User;
