import React, { ChangeEvent, useState } from "react";
import {
  Flex,
  Text,
} from "@chakra-ui/react";

// Icons
import { FaImage } from "react-icons/fa";

interface CoverInputProps {
  setCover: (cover: File) => void;
}

export const CoverInput: React.FC<CoverInputProps> = ({ setCover }) => {
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files === null) return;

    const cover = files[0];
    const coverUrl = URL.createObjectURL(cover);

    setCoverPreviewUrl(coverUrl);
    setCover(cover);
  }

  return (
    <label htmlFor="cover" style={{ width: "100%" }}>
      <Flex
        w="full"
        h="48"
        cursor="pointer"
        direction="column"
        justify="center"
        align="center"
        border="1px"
        borderColor="inherit"
        borderRadius="md"
        backgroundImage={coverPreviewUrl}
        backgroundSize="100% auto"
        backgroundPosition="50% 50%"
      >
        {coverPreviewUrl === '' && (
          <>
            <FaImage color="#718096" size={32} />
            <Text color="gray.500">Selecione uma imagem</Text>
          </>
        )}
      </Flex>
      <input
        type="file"
        name="cover"
        accept="image/*"
        id="cover"
        style={{ display: "none" }}
        onChange={handleCoverChange}
      />
    </label>
  )
}