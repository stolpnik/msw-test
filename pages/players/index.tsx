import Link from "next/link";
import { useEffect, useState } from "react";
import type { Player } from "@/types/types";
import { VStack } from "@chakra-ui/react";
import { PlayerListItem } from "@/components/PlayerList";

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetch("/api/users").then(async (res) => setPlayers(await res.json()));
  }, []);

  if (!players) return <>loading...</>;
  return (
    <VStack spacing={8}>
      {players.map((player: Player) => (
        <PlayerListItem key={player.id} player={player} />
      ))}
    </VStack>
  );
};

export default Players;
