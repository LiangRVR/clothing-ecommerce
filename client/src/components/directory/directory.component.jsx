import React from "react";
import MenuItems from "../menu-items/menu-item.component";

import { useSelector } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

import { DirectoryMenuContainer } from "./directory.styles";

const Directory = () => {
  const sections = useSelector(selectDirectorySections);
  return (
    <DirectoryMenuContainer>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItems key={id} {...otherSectionProps} />
      ))}
    </DirectoryMenuContainer>
  );
};


export default Directory;
