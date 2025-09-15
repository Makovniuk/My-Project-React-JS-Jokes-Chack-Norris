import React, { useState } from "react";
import { Flex, Tag } from "antd";

const CategoriesList = ({ tagsData, onSelectCategory }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [tag] : [];
    setSelectedTags(nextSelectedTags);
    onSelectCategory(tag);
  };

  return (
    <Flex gap={4} wrap align="center" style={{ marginTop: 10 }}>
      {tagsData.map((tag) => (
        <Tag.CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </Tag.CheckableTag>
      ))}
    </Flex>
  );
};

export default CategoriesList;
