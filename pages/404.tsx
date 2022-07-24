import { Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Page404 = () => {
  return (
    <>
      <Heading>Not Found</Heading>
      <Text>
        <Link href="/">
          <a>Topへもどる</a>
        </Link>
      </Text>
    </>
  );
};

export default Page404;
