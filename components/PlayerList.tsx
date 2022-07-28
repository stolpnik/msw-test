import { Player } from "@/types/types";
import { Badge, Box, Heading, Link } from "@chakra-ui/react";

export const PlayerListItem: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <Link href={`/players/${player.id}`}>
      <Box border="1px solid #ccc" borderRadius={3} padding={4} width={300}>
        <Heading size="l">
          <Badge>{player.id}</Badge> {player.name}
        </Heading>
      </Box>
    </Link>
  );
};
