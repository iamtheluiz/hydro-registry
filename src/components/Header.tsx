import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';

// Icons
import { FaMapMarkedAlt, FaPlus } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showNavigateButtons?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title, subtitle, showNavigateButtons = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavigateToNewMarker() {
    navigate('/new');
  }

  function handleNavigateToList() {
    navigate('/list');
  }

  function handleNavigateToMap() {
    navigate('/map');
  }

  return (
    <Flex maxW="container.md" w="full" direction="row">
      <Flex direction="column" flex="1">
        <Heading fontSize="3xl" fontWeight="medium">{title}</Heading>
        <Text>{subtitle}</Text>
      </Flex>
      {showNavigateButtons && (
        <Flex align="center">
          {location.pathname === '/list' && (
            <IconButton
              zIndex="1001"
              bg="blue.400"
              colorScheme="blue"
              aria-label="Pressione para adicionar uma marcação"
              mr="2"
              size="md"
              fontSize="lg"
              variant="solid"
              icon={<FaPlus color="white" />}
              onClick={handleNavigateToNewMarker}
            />
          )}
          {['new', 'edit', 'about'].includes(location.pathname.split('/')[1]) && (
            <IconButton
              zIndex="1001"
              bg="blue.400"
              colorScheme="blue"
              aria-label="Pressione para ver a lista de marcações"
              mr="2"
              size="md"
              fontSize="lg"
              variant="solid"
              icon={<BsFillGridFill color="white" />}
              onClick={handleNavigateToList}
            />
          )}
          <IconButton
            zIndex="1001"
            bg="blue.400"
            colorScheme="blue"
            aria-label="Pressione para visualizar o mapa"
            size="md"
            fontSize="lg"
            variant="solid"
            icon={<FaMapMarkedAlt color="white" />}
            onClick={handleNavigateToMap}
          />
        </Flex>
      )}
    </Flex>
  );
}