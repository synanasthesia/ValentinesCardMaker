// text credit goes to https://colinwren.is/blog/create-an-editable--resizable-text-label-in-konva-with-react

import React, { useState, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { EditableText } from "./editable-text";

export function TextBox({
  text,
  x,
  y,
  width,
  height,
  onClick,
  onTextResize,
  onTextChange,
  selected,
  onTextClick
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    onTextClick(!isTransforming);
  }

  return (
    <Group draggable x={x} y={y}>
      <Rect
        x={20}
        y={20}
        width={width}
        height={height + 40}
        shadowOffsetY={10}
        shadowOffsetX={0}
        shadowBlur={30}
        shadowOpacity={0.6}
        perfectDrawEnabled={false}
      />
      <Rect
        x={0}
        y={0}
        width={width + 40}
        height={height + 60}
        perfectDrawEnabled={false}
        onClick={onClick}
        onTap={onClick}
      />
      <EditableText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        onResize={onTextResize}
        isEditing={isEditing}
        isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        onToggleTransform={toggleTransforming}
        onChange={onTextChange}
      />
    </Group>
  );
}
