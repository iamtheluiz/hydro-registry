import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Flex,
  Text,
} from "@chakra-ui/react";

// Icons
import { FaImage } from "react-icons/fa";

interface CoverInputProps {
  cover: File | undefined;
  setCover: (cover: File) => void;
}

export const CoverInput: React.FC<CoverInputProps> = ({
  cover, setCover
}) => {
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");

  useEffect(() => {
    if (cover === undefined) {
      URL.revokeObjectURL(coverPreviewUrl);
      setCoverPreviewUrl("");
    }
  }, [cover]);

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
        h="56"
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