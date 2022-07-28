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

const Player = () => {
  const [player, setPlayer] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const getPlayer = async (id) => {
    if (!id || typeof id !== "string") return;
    try {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) setPlayer(await res.json());
      else throw await res.json();
    } catch (e) {
      router.replace("/404");
    }
  };

  useEffect(() => {
    getPlayer(id);
  }, [id]);

  if (player === null)
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  return (
    <Box maxWidth={800}>
      <HStack borderRadius={5} border="1px solid #ccc" spacing={8} padding={4}>
        <Badge>{player.id}</Badge>
        <Heading size="xl">{player.name}</Heading>
        <div>{player.description}</div>
      </HStack>
      <Box marginTop={2}>
        <ArrowBackIcon></ArrowBackIcon>
        <Link href="/players">
          <a>もどる</a>
        </Link>
      </Box>
    </Box>
  );
};

export default Player;
