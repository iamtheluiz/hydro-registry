import React from "react";
import {
  Flex,
  IconButton,
  Slide
} from "@chakra-ui/react";

// Icons
import { FaTimes } from "react-icons/fa";

interface SideSlideProps extends React.RefAttributes<HTMLDivElement> {
  isOpen: boolean;
  onToggle: () => void;
  direction?: 'right' | 'left';
  children: React.ReactNode;
}

export const SideSlide = React.forwardRef<any, SideSlideProps>(({
  direction = 'right', isOpen, onToggle,...props
}, ref) => {
  return (
    <Slide
      direction={direction}
      in={isOpen}
      style={{
        zIndex: 1000,
        maxWidth: 460,
        maxHeight: '100vh',
        backgroundColor: "#00000070",
        overflowY: "auto"
      }}
      ref={ref}
      {...props}
    >
      <Flex
        p="2"
        flexDirection="column"
        style={{ height: "100%" }}
      >
        <Flex justifyContent="end">
          <IconButton
            zIndex="999"
            colorScheme="red"
            aria-label="Pressione para fechar a aba lateral"
            fontSize="lg"
            variant="solid"
            icon={<FaTimes color="white" />}
            onClick={onToggle}
          />
        </Flex>
        {props.children}
      </Flex>
    </Slide>
  )
});