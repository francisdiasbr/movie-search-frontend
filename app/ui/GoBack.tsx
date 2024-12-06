import { Icon } from '@iconify/react';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface GoBackProps {
  centerText: string;
}

const GoBack: React.FC<GoBackProps> = ({ centerText }) => {
  const router = useRouter();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
      <Box onClick={() => router.back()} cursor="pointer" mr={2}>
        <Icon fontSize={24} icon={arrowLeft} />
      </Box>
      <Text fontWeight="bold" fontSize="32px" textAlign="center" flex="1">
        {centerText}
      </Text>
    </Box>
  );
};

export default GoBack;