"use client";
import { Badge, Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Text } from "@/app/chakra";
import { Link } from "@chakra-ui/next-js";

const Repos = ({ reposUrl }) => {
  const toast = useToast();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(reposUrl);
        const data = await res.json();
        if (data.message) throw new Error(data.message);
        setRepos(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [reposUrl, toast]);

  return (
    <>
      <Text
        textAlign={"center"}
        letterSpacing={1.5}
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={"green.400"}
        mt={4}
      >
        REPOSITORIES
      </Text>
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} my={4} />
        </Flex>
      )}

      {repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .map((repo, idx) => {
          if (idx > 4 && !showMore) return null;
          return (
            // <Flex
            // 	key={repo.id}
            // 	padding={4}
            // 	bg={"whiteAlpha.200"}
            // 	_hover={{ bg: "whiteAlpha.400" }}
            // 	my={4}
            // 	px={10}
            // 	gap={4}
            // 	borderRadius={4}
            // 	transition={"all 0.3s ease"}
            // 	justifyContent={"space-between"}
            // 	alignItems={"center"}
            // >
            // 	<Flex flex={1} direction={"column"}>
            // 		<Link href={repo.html_url} fontSize={"md"} fontWeight={"bold"}>
            // 			{repo.name}
            // 		</Link>
            // 		<Badge
            // 			fontSize={"0.7em"}
            // 			colorScheme={"whatsapp"}
            // 			w={"min-content"}
            // 			textAlign={"center"}
            // 			px={1}
            // 			mt={1}
            // 		>
            // 			Language: {repo.language || "None"}
            // 		</Badge>
            // 	</Flex>

            // 	<Flex flex={1} gap={4} ml={6}>
            // 		<Badge fontSize={"0.9em"} colorScheme='orange' flex={1} textAlign={"center"}>
            // 			Stars: {repo.stargazers_count}
            // 		</Badge>
            // 		<Badge fontSize={"0.9em"} colorScheme='pink' flex={1} textAlign={"center"}>
            // 			Forks: {repo.forks_count}
            // 		</Badge>
            // 		<Badge fontSize={"0.9em"} colorScheme='cyan' flex={1} textAlign={"center"}>
            // 			Watchers: {repo.watchers_count}
            // 		</Badge>
            // 	</Flex>
            // </Flex>

            <Flex
              key={repo.id}
              padding={4}
              bg={"whiteAlpha.200"}
              _hover={{ bg: "whiteAlpha.400" }}
              my={4}
              px={{ base: 4, md: 8 }} // Adjust padding for smaller and larger devices
              py={{ base: 6, md: 4 }} // Adjust padding for smaller and larger devices
              gap={4}
              borderRadius={4}
              transition={"all 0.3s ease"}
              justifyContent={{ base: "center", md: "space-between" }} // Align center for mobile devices, space-between for larger screens
              alignItems={{ base: "center", md: "center" }} // Align center for both mobile and larger screens
              flexWrap={{ base: "wrap", md: "nowrap" }} // Responsive flex-wrap
              flexDirection={{ base: "column", md: "row" }} // Stack on smaller devices, horizontal on larger screens
            >
              <Flex
                direction={"column"}
                mb={{ base: 4, md: 0 }}
                flex={{ base: 1, md: 2 }}
                alignItems={{ base: "center", md: "flex-start" }} // Align center for mobile devices, flex-start for larger screens
              >
                <Link href={repo.html_url} fontSize={"md"} fontWeight={"bold"}>
                  {repo.name}
                </Link>
                <Badge
                  fontSize={"0.7em"}
                  colorScheme={"whatsapp"}
                  w={"min-content"}
                  textAlign={"center"}
                  px={1}
                  mt={1}
                  maxW={"100%"} // Prevent badge from overflowing
                  isTruncated // Truncate long text
                >
                  Language: {repo.language || "None"}
                </Badge>
              </Flex>

              <Flex
                gap={3}
                ml={{ base: 0, md: 6 }}
                flex={{ base: 1, md: 1 }}
                justifyContent="flex-end"
              >
                <Badge
                  fontSize={"0.9em"}
                  colorScheme="orange"
                  flex={1}
                  textAlign={"center"}
                >
                  Stars: {repo.stargazers_count}
                </Badge>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme="pink"
                  flex={1}
                  textAlign={"center"}
                >
                  Forks: {repo.forks_count}
                </Badge>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme="cyan"
                  flex={1}
                  textAlign={"center"}
                >
                  Watchers: {repo.watchers_count}
                </Badge>
              </Flex>
            </Flex>
          );
        })}

      {showMore && (
        <Flex justifyContent={"center"} my={4}>
          <Button
            size="md"
            colorScheme="whatsapp"
            onClick={() => setShowMore(false)}
          >
            Show Less
          </Button>
        </Flex>
      )}

      {!showMore && repos.length > 5 && (
        <Flex justifyContent={"center"} my={4}>
          <Button
            size="md"
            colorScheme="whatsapp"
            onClick={() => setShowMore(true)}
          >
            Show More
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Repos;
