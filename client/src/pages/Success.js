import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function Success() {
  return (
    <Box textAlign="center" className = "my-5"py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Payment Complete
      </Heading>
      <Text color={'gray.500'}>
      Congratulations and thank you for your purchase! Your payment has been successfully processed.
      </Text>
    </Box>
  );
}