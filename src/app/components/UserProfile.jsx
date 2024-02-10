import { Avatar, Badge, Box, Button, Flex, Text, VStack } from "@/app/chakra";
import Repos from "./Repos";

const UserProfile = ({ userData }) => {
  return (
    <>
      <Flex
        my={16}
        border={"2px solid"}
        borderColor={"green.500"}
        borderRadius={4}
        padding={{ base: 4, md: 8 }} // Reduce padding on mobile devices
        direction={{ base: "column", md: "row" }} // Stack on mobile, horizontal on larger screens
        align={{ base: "center", md: "start" }}
      >
        <VStack gap={5}>
          <Avatar size={"2xl"} name={userData.name} src={userData.avatar_url} />
          <Button colorScheme="whatsapp">
            <a href={userData.html_url} target="_blank">
              View Profile
            </a>
          </Button>
        </VStack>
        {" "}
        <Box
          ml={{ base: 0, md: 8 }}
          alignSelf={{ base: "center", md: "start" }}
        >
          <VStack spacing={2} alignItems="center" textAlign="center">
            <Badge
              fontSize={"0.9em"}
              colorScheme="orange"
              display={{ base: "flex", md: "none" }}
              mt={{ base: 3, md: 0 }}
            >
              Public Repos: {userData.public_repos}
            </Badge>
            <Badge
              fontSize={"0.9em"}
              colorScheme="pink"
              display={{ base: "flex", md: "none" }}
            >
              Public Gists: {userData.public_gists}
            </Badge>
            <Badge
              fontSize={"0.9em"}
              colorScheme="cyan"
              display={{ base: "flex", md: "none" }}
            >
              Followers: {userData.followers}
            </Badge>
            <Badge
              fontSize={"0.9em"}
              colorScheme="purple"
              display={{ base: "flex", md: "none" }}
            >
              Following: {userData.following}
            </Badge>
            <Flex
              flexWrap="wrap"
              justifyContent="flex-start"
              display={{ base: "none", md: "flex" }} // Hide on mobile, display on larger screens
            >
              <Badge fontSize={"0.9em"} colorScheme="orange" mr={4}>
                Public Repos: {userData.public_repos}
              </Badge>
              <Badge fontSize={"0.9em"} colorScheme="pink" mr={4}>
                Public Gists: {userData.public_gists}
              </Badge>
              <Badge fontSize={"0.9em"} colorScheme="cyan" mr={4}>
                Followers: {userData.followers}
              </Badge>
              <Badge fontSize={"0.9em"} colorScheme="purple">
                Following: {userData.following}
              </Badge>
            </Flex>
          </VStack>
          <Text fontSize={"2xl"} pb={"2"} fontWeight={"bold"} mt={4} color={"green.400"} textAlign={{ base: "center", md: "start" }}>
            {userData.name}
          </Text>
          <Text fontSize={"md"} pb={"2"} fontWeight={"bold"} color={"green.500"} textAlign={{ base: "center", md: "start" }}>
            {userData.bio}
          </Text>
          <Box>
            <Text fontSize={"md"}>
              <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                Company:
              </Text>
              {userData.company || "Not Specified"}
            </Text>
            <Text fontSize={"md"}>
              <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                Location:
              </Text>
              {userData.location || "Not Specified"}
            </Text>

            <Text fontSize={"md"}>
              <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                Blog / Website:
              </Text>
              {userData.blog ? (
                <a href={userData.blog} target="_blank">
                  {userData.blog}
                </a>
              ) : (
                "Not Specified"
              )}
            </Text>

            <Text fontSize={"md"}>
              <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                Member Since:
              </Text>
              {new Date(userData.created_at).toLocaleDateString()}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Repos reposUrl={userData.repos_url} />
    </>
  );
};

export default UserProfile;
